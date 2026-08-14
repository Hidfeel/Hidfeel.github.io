# 变更日志 — 心智化治疗（MBT）知识库

## [2026-08-13] ingest | 摄入《心智化治疗剑桥指南》(Cambridge Guide to MBT)
- 初始化 Wiki 结构：`~/.workbuddy/wiki-knowledge/`（raw/、wiki/、WIKI-SCHEMA.md）。
- 原始资料归档：`raw/mbt-cambridge-guide-2025.md`（中文译本 PDF 经 OCR 转 markdown，1.1MB / 9417 行）。
- 全书一次性摄入，新建 **34** 个页面：
  - ✨ 资料源: [[source-mbt-cambridge-guide]]
  - ✨ 综合: [[synthesis-overview]]
  - ✨ 核心概念 (13): [[concepts/concept-mentalization]] [[concepts/concept-mentalizing-dimensions]] [[concepts/concept-non-mentalizing-modes]] [[concepts/concept-alien-self]] [[concepts/concept-attachment-epistemic-trust]] [[concepts/concept-mbt]] [[concepts/concept-mentalizing-stance]] [[concepts/concept-mbt-loop]] [[concepts/concept-clinical-techniques]] [[concepts/concept-formulation-assessment]] [[concepts/concept-mbt-structure]] [[concepts/concept-mbt-group]] [[concepts/concept-psychopathology-mentalizing]]
  - ✨ 主题/应用 (14): [[topics/topic-mbt-bpd]] [[topics/topic-mbt-npd]] [[topics/topic-mbt-aspd]] [[topics/topic-mbt-avpd]] [[topics/topic-mbt-depression]] [[topics/topic-mbt-psychosis]] [[topics/topic-mbt-trauma]] [[topics/topic-mbt-eating-disorders]] [[topics/topic-mbt-children]] [[topics/topic-mbt-adolescents]] [[topics/topic-mbt-families]] [[topics/topic-mbt-couples]] [[topics/topic-mbt-other-settings]] [[topics/topic-mbt-emergency]]
  - ✨ 实体 (5): [[entities/entity-anthony-bateman]] [[entities/entity-peter-fonagy]] [[entities/entity-chloe-campbell]] [[entities/entity-patrick-luyten]] [[entities/entity-martin-debbane]]
- 🔗 交叉引用：全页使用 `[[wiki-link]]` 形式连接概念/主题/实体；构建以 [[synthesis-overview]] 为入口的概念地图。
- 📝 工作流：5 个并行抽取代理提取各章结构化内容 → 核心理论页由主代理撰写 → 4 个并行写作代理产出障碍/人群/实体/资料页 → 集中生成 index.md 与 log.md。
- ⚠️ 备注：原始资料为 OCR 转写，个别术语（如"うんふん"误识别）非正文内容，已忽略；技术术语以原文英文附于中文后，确保可追溯至 [[source-mbt-cambridge-guide]] 章节。

## 待办 / 后续建议
- 🔍 Lint 巡检：核查断链、孤立页、矛盾标注（目前尚无矛盾，因单源摄入）。
- ➕ 可扩展：补充 MBT 实证研究原文（Cochrane 综述、Bateman & Fonagy RCT）作为第二资料源，丰富证据页。
- 🌐 可扩展：跨文化适应（非西方文化中的 MBT）目前仅在原书简介提及，可单独立页。
