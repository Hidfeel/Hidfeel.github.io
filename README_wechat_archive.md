# 微信文章归档到 Archive.org + Gist（定时 GitHub Action）

每隔 11 分钟自动扫描 [Raindrop](https://raindrop.io) 中「域名是 `mp.weixin.qq.com` 且未带 `gist` 标签」的书签，完成：

1. 提交到 **archive.org**（Wayback Machine）保存，拿到存档快照地址；
2. 通过 `changfengbox.top` 接口把文章转成 **Markdown**，存入一个**私密 Gist**；
3. 把 Gist 的 **raw 地址**（`gist.githubusercontent.com/.../raw`，可直接获取 Markdown 文本）和 Archive 地址写回该书签的 `media` 字段（每个地址作为一个 `{"link": url}` 项），并加上 `gist` 标签（作为「已处理」幂等标记，避免重复处理）。

## 文件
- `.github/workflows/wechat-archive.yml` — 定时触发的 Action（每 11 分钟 + 手动触发）
- `scripts/process.mjs` — Node.js 主脚本（零依赖，使用 Node 22 内置 `fetch`/`crypto`）

## 配置 Secrets
在仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret | 说明 |
|---|---|
| `RAINDROP_TOKEN` | Raindrop 的 **test token**（读+写），在 raindrop.io/app#settings/integrations 生成 |
| `GH_TOKEN` | **Personal Access Token**，勾选 `gist` scope。注意：内置的 `GITHUB_TOKEN` **没有 gist 权限**，不可用 |
| `CFB_SECRET` | `changfengbox.top` 接口签名密钥（默认 `changfengbox.top`，留空则走默认） |

> 可选：在仓库 Secrets 中新增 `MAX_PER_RUN`（单次最多处理条数，不设则默认 **3**）。直接改 workflow 的 `env` 块也可，但用 Secret 更方便。

## 手动运行
在仓库 **Actions → WeChat Archive to Gist → Run workflow** 即可立即触发一次。

## 说明
- 微信文章过滤：用 Raindrop `search` 参数服务端按 `domain:mp.weixin.qq.com -tag:gist` 缩小结果，客户端再只保留文章页（`/s...`，排除 `/mp/appmsgalbum` 专辑页等），并二次校验 tag/domain。
- `gist` 标签是幂等标记：任一步失败都不会打标签，下一周期自动重试。
- `changfengbox` 接口返回 JSON，Markdown 取 `data` 字段（脚本对纯文本/其他字段做了兼容兜底）。
- archive.org 保存较慢，脚本含超时、1 次重试与回退地址。
- Raindrop 的 `media` 数组只需 `{"link":"url"}`、不接受 `type` 字段（早期版本误用 `type:"link"` 导致回写 400）。
