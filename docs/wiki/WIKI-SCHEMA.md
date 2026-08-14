# WIKI-SCHEMA — 心智化治疗（MBT）知识库

> 本文件定义本 Wiki 的目录结构、页面模板、链接约定与工作流。由 LLM Wiki Expert 维护，用户与 LLM 共同演化。

## 知识领域
本 Wiki 围绕 **心智化治疗（Mentalization-Based Treatment, MBT）** 构建，知识源自：
- 安东尼·贝特曼 等（2025）《心智化治疗剑桥指南》（中文译本，化学工业出版社；英文原版 Cambridge Guide to Mentalization-Based Treatment, Cambridge University Press 2023）。原始资料见 `raw/mbt-cambridge-guide-2025.md`。

## 目录结构（三层）
```
wiki-knowledge/
├── WIKI-SCHEMA.md          # 本文件：结构、约定、模板
├── raw/                    # 原始资料（只读，绝不修改）
│   └── mbt-cambridge-guide-2025.md
└── wiki/                   # LLM 维护的知识层
    ├── index.md            # 内容目录索引
    ├── log.md              # 变更时间线日志
    ├── source-mbt-cambridge-guide.md   # 单一资料源摘要页
    ├── concepts/           # 概念页（理论、技术、机制）
    ├── topics/             # 主题/综述页（按障碍、人群、设置）
    └── entities/           # 实体页（人物、作者）
```

## 页面类型与命名
| 类型 | 前缀 | 示例 |
|------|------|------|
| 概念 concept | `concept-` | `concept-mentalization.md` |
| 主题 topic | `topic-` | `topic-mbt-bpd.md` |
| 实体 entity | `entity-` | `entity-anthony-bateman.md` |
| 资料源 source-summary | `source-` | `source-mbt-cambridge-guide.md` |
| 综合 synthesis | `synthesis-` | `synthesis-overview.md` |

- 文件名统一 kebab-case。
- 链接使用 Vault 相对路径（以 `wiki/` 为根）：`[[concepts/concept-mentalization]]`、`[[topics/topic-mbt-bpd]]`、`[[entities/entity-peter-fonagy]]`、`[[source-mbt-cambridge-guide]]`。

## 页面模板
```markdown
---
title: 页面标题
type: concept | topic | entity | source-summary | synthesis
created: 2026-08-13
updated: 2026-08-13
source: [[source-mbt-cambridge-guide]]
tags: [mbt, 中文标签...]
---

# 页面标题

> **一句话**: 用一句话概括核心内容。

## 摘要
1–3 段，提炼最关键的信息。

## 详情
按子标题组织。技术术语首次出现标注英文（如：心智化 mentalization）。

## 关联
- 相关概念: [[concepts/xxx]]
- 相关主题: [[topics/xxx]]
- 相关实体: [[entities/xxx]]
- 参见: [[synthesis-overview]]

## 引用来源
- [[source-mbt-cambridge-guide]] — 第 X 章

## 变更记录
- 2026-08-13: 由原始资料初始化创建
```

## 内容约定
1. **绝不臆造**：所有内容须可追溯至 `raw/` 原始资料；AI 综合推理须明确标注。
2. **必引来源**：每页在"引用来源"标注对应章节；行内可用 `（Ch.X）` 注明。
3. **标注矛盾**：不同来源冲突时用 `> ⚠️ 矛盾` 引用块标记。
4. **中文为主**：正文中文，专业术语保留英文原文于括号内。
5. **双向链接**：页面间尽量建立 `[[wiki-link]]` 交叉引用，提升网络密度。
6. **增量更新**：更新已有页面时保留历史，在"变更记录"追加条目，勿覆盖原内容。

## 工作流
- **Ingest（摄入）**：新资料放入 `raw/` → 提取关键概念 → 新建/更新 concept/topic/entity 页 → 更新 `index.md`、`log.md`。单次摄入通常触及 10–30 个页面。
- **Query（查询）**：读取 `index.md` 定位 → 综合多页回答并标注来源 → 有价值的综合结论归档为新页。
- **Lint（巡检）**：检查矛盾、过时、孤立页（零入链）、缺失引用、断链，并提议探索方向。

## 核心概念地图（锚点页）
- 入门：`[[synthesis-overview]]`（全景导图）
- 理论基石：`[[concepts/concept-mentalization]]`、`[[concepts/concept-mentalizing-dimensions]]`、`[[concepts/concept-non-mentalizing-modes]]`、`[[concepts/concept-alien-self]]`、`[[concepts/concept-attachment-epistemic-trust]]`
- 临床模型：`[[concepts/concept-mbt]]`、`[[concepts/concept-mentalizing-stance]]`、`[[concepts/concept-mbt-loop]]`、`[[concepts/concept-clinical-techniques]]`、`[[concepts/concept-formulation-assessment]]`、`[[concepts/concept-mbt-structure]]`、`[[concepts/concept-mbt-group]]`
- 原始适应证：`[[topics/topic-mbt-bpd]]`
