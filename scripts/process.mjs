#!/usr/bin/env node
// 微信文章归档到 Archive.org + Gist 的定时脚本（Node 22，零依赖）
//
// 流程：扫描 Raindrop 中「域名是 mp.weixin.qq.com 且未带 gist 标签」的书签，
//   1) 提交 archive.org 保存，拿到存档快照地址
//   2) 调 changfengbox.top 接口转 Markdown，存入私密 Gist
//   3) 把 Gist/Archive 两条 link 写回书签 media，并加 gist 标签（幂等标记）

import crypto from "node:crypto";

// ---------- 配置 ----------
const RAINDROP_API = "https://api.raindrop.io/rest/v1";
const WECHAT_DOMAIN = "mp.weixin.qq.com";
const ARCHIVE_SAVE = "https://web.archive.org/save";
const CFB_API = "https://changfengbox.top/api/download/wechat";
const CFB_SECRET = process.env.CFB_SECRET || "changfengbox.top";
const CFB_ORIGIN = "https://changfengbox.top";
const CFB_REFERER = "https://changfengbox.top/wechat";
const GIST_TAG = "gist";
const MAX_PER_RUN = Math.max(1, Number(process.env.MAX_PER_RUN) || 3);
const SLEEP_MS = 1500; // 书签间限流延时

const RAINDROP_TOKEN = process.env.RAINDROP_TOKEN;
const GH_TOKEN = process.env.GH_TOKEN;

function fail(msg) {
  console.error(`[错误] ${msg}`);
  process.exitCode = 1;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeFilename(name) {
  const base = (name || "wechat-article")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 80);
  return `${base || "wechat-article"}.md`;
}

// 带超时的 fetch
async function fetchWithTimeout(url, opts = {}, timeoutMs = 60000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// ---------- 1. 拉取 Raindrop 书签 ----------
// 用 search 在服务端按域名 + 排除已处理标签（-#gist）过滤；
// 文章页路径以 /s 开头（mp.weixin.qq.com/s...），专辑页 /mp/appmsgalbum 等排除（search 无路径前缀运算符，客户端兜底）
async function fetchBookmarks() {
  if (!RAINDROP_TOKEN) throw new Error("缺少 RAINDROP_TOKEN");
  const todo = [];
  let page = 0;
  const perpage = 50;
  const search = `domain:${WECHAT_DOMAIN} -#${GIST_TAG}`;
  while (true) {
    const url = `${RAINDROP_API}/raindrops/0?search=${encodeURIComponent(
      search
    )}&page=${page}&perpage=${perpage}`;
    const res = await fetchWithTimeout(url, {
      headers: { Authorization: `Bearer ${RAINDROP_TOKEN}` },
    }, 30000);
    if (!res.ok) throw new Error(`Raindrop 列表请求失败: ${res.status}`);
    const json = await res.json();
    const items = json.items || [];
    for (const it of items) {
      // 双保险：服务端 search 可能未完全排除，客户端再校验
      const domain = (it.domain || "").toLowerCase();
      const tags = it.tags || [];
      if (domain !== WECHAT_DOMAIN || tags.includes(GIST_TAG)) continue;
      // 只处理文章页 /s...，排除专辑页 /mp/appmsgalbum 等
      let pathname = "";
      try { pathname = new URL(it.link || "").pathname; } catch {}
      if (!pathname.startsWith("/s")) continue;
      todo.push(it);
      if (todo.length >= MAX_PER_RUN) return todo;
    }
    if (items.length < perpage) break; // 最后一页
    page++;
  }
  return todo;
}

// ---------- 2. 提交 archive.org 保存 ----------
async function saveToArchive(url, attempt = 0) {
  const saveUrl = `${ARCHIVE_SAVE}?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetchWithTimeout(
      saveUrl,
      { method: "GET", redirect: "manual" },
      90000
    );
    const loc = res.headers.get("content-location");
    if (loc) {
      return loc.startsWith("http")
        ? loc
        : `https://web.archive.org${loc}`;
    }
    // 兜底：构造最新快照地址
    return `https://web.archive.org/web/0/${url}`;
  } catch (e) {
    if (attempt < 1) {
      await sleep(2000);
      return saveToArchive(url, attempt + 1);
    }
    throw new Error(`archive.org 保存失败: ${e.message}`);
  }
}

// ---------- 3. 调 changfengbox 接口转 Markdown ----------
async function fetchMarkdown(url) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const sign = crypto
    .createHash("md5")
    .update(timestamp + CFB_SECRET)
    .digest("hex");

  const res = await fetchWithTimeout(
    CFB_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-timestamp": timestamp,
        "x-sign": sign,
        Origin: CFB_ORIGIN,
        Referer: CFB_REFERER,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      body: JSON.stringify({ url, config: { MD: true } }),
    },
    90000
  );
  if (!res.ok) throw new Error(`changfengbox 接口返回 ${res.status}`);

  const text = await res.text();
  // 接口返回 {"status":"completed","progress":100,"urls":["<markdown文件地址>"]}
  // 取 urls[0]；兼容把 Markdown 直接放在 data/markdown/content 的字符串形式
  let mdUrl;
  try {
    const json = JSON.parse(text);
    mdUrl =
      (Array.isArray(json.urls) && json.urls[0]) ||
      (typeof json.data === "string" ? json.data : null) ||
      (typeof json.markdown === "string" ? json.markdown : null) ||
      (typeof json.content === "string" ? json.content : null) ||
      text;
  } catch {
    mdUrl = text; // 纯文本回退
  }

  // 若取到的是 URL，则再下载真正的 Markdown 内容；否则视为原始 Markdown
  let md = mdUrl;
  if (typeof mdUrl === "string" && /^https?:\/\//i.test(mdUrl.trim())) {
    const r2 = await fetchWithTimeout(mdUrl.trim(), {}, 60000);
    if (!r2.ok) throw new Error(`下载 Markdown 文件失败: ${r2.status}`);
    md = await r2.text();
  }

  if (!md || !String(md).trim()) throw new Error("changfengbox 返回的 Markdown 为空");
  return String(md);
}

// ---------- 4. 创建私密 Gist ----------
async function createGist(title, markdown) {
  if (!GH_TOKEN) throw new Error("缺少 GH_TOKEN（需带 gist scope 的 PAT）");
  const filename = sanitizeFilename(title);
  const res = await fetchWithTimeout(
    "https://api.github.com/gists",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GH_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "wechat-archive-action",
      },
      body: JSON.stringify({
        description: title || "WeChat article",
        public: false,
        files: { [filename]: { content: markdown } },
      }),
    },
    30000
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub Gist 创建失败: ${res.status} ${body}`);
  }
  const json = await res.json();
  // 返回 raw 地址（gist.githubusercontent.com/.../raw），便于直接获取 Markdown 文本，
  // 而非网页地址（gist.github.com/...）。取首个文件的 raw_url，回退到 html_url。
  const firstFile = json.files ? Object.values(json.files)[0] : null;
  return firstFile?.raw_url || json.html_url;
}

// ---------- 5. 回写 Raindrop media + 标签 ----------
async function updateRaindrop(item, gistUrl, archiveUrl) {
  const existingMedia = Array.isArray(item.media) ? item.media : [];
  const existingTags = Array.isArray(item.tags) ? item.tags : [];

  // Raindrop 的 media 数组官方格式为 [{"link":"url"}]，不接受 type 字段
  const appendLink = (media, link) => {
    if (media.some((m) => m && m.link === link)) return media; // 去重
    return [...media, { link }];
  };

  let media = appendLink(existingMedia, gistUrl);
  media = appendLink(media, archiveUrl);

  const tags = existingTags.includes(GIST_TAG)
    ? existingTags
    : [...existingTags, GIST_TAG];

  const res = await fetchWithTimeout(
    `${RAINDROP_API}/raindrop/${item._id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${RAINDROP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ media, tags }),
    },
    30000
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Raindrop 回写失败: ${res.status} ${body}`);
  }
  return true;
}

// ---------- 主流程 ----------
async function main() {
  console.log(`[开始] 拉取 Raindrop 书签（微信文章 & 无 ${GIST_TAG} 标签）…`);
  let todo;
  try {
    todo = await fetchBookmarks();
  } catch (e) {
    fail(`拉取书签失败，终止：${e.message}`);
    return;
  }
  console.log(`[信息] 待处理书签数：${todo.length}（单次上限 ${MAX_PER_RUN}）`);

  let ok = 0;
  let err = 0;
  for (const item of todo) {
    const title = item.title || item.link;
    const link = item.link;
    console.log(`\n[处理] ${title}\n        ${link}`);
    try {
      const archiveUrl = await saveToArchive(link);
      console.log(`[存档] ${archiveUrl}`);
      const md = await fetchMarkdown(link);
      console.log(`[Markdown] 长度 ${md.length}`);
      const gistUrl = await createGist(title, md);
      console.log(`[Gist] ${gistUrl}`);
      await updateRaindrop(item, gistUrl, archiveUrl);
      console.log(`[完成] 已回写 media 并加 ${GIST_TAG} 标签`);
      ok++;
    } catch (e) {
      err++;
      console.error(`[跳过] 处理失败（下个周期重试）：${e.message}`);
      // 不打 gist 标签，保持可重试
    }
    await sleep(SLEEP_MS);
  }

  console.log(`\n[结束] 成功 ${ok} 条，失败 ${err} 条。`);
}

main();
