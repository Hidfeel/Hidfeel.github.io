# 变更日志

## 2026-08-28

### 建立
- ✨ 新建 Wiki 结构：创建 `SCHEMA.md`、`raw/`、`wiki/{entities,concepts,topics}/`
- ✨ 归档 6 份原始文献至 `raw/`（PDF 经 anydoc 转换，文件名改为 kebab-case）

### 资料处理
- 📝 `Interpretation`（Govrin）转换时跳过原第 1 页（封面扫描图，无文本层）与第 7 页（献词页，文本量过少），anydoc 以 exit 3 判定需 OCR。改用 pypdf 剔除这两页后转换剩余 99 页，跳过说明已写入 md 头部注释。
- ⚠️ 未使用 anydoc 的 `--ocr hosted` 模式：该模式需将整份文档上传至 Firecrawl Parse。

### 深度提取
- 🔍 完成 4 组文献的结构化提取（Govrin／Ogden＋Symington／Eshel 两篇／Yadlin-Gadot），共约 500 条英文引文，逐条回原始文献校验。

### 页面创建
- ✨ 实体页 13 个：五位作者 ＋ 八位古典／当代各家
- ✨ 概念页 22 个：涵盖诠释技法、比昂机制、关系与场域、温尼科特与科胡特、埃谢尔、真理问题
- ✨ 概念页 `concept-interpretation`（范本页，确立写作规范）

## 2026-08-29

### 页面创建
- ✨ 主题页 6 个：`topic-interpretation-across-schools`、`topic-therapeutic-action-debate`、`comparison-withness-vs-analytic-third`、`topic-truth-in-psychoanalysis`、`topic-analyst-subjectivity`、`topic-reading-guide`
- ✨ `index.md`：47 个页面的完整索引 ＋ 71 处矛盾标注索引 ＋ 已知资料局限清单
- ✨ `log.md`：本文件

### 引文校验
- 🔍 全部页面的英文引文逐条回 `raw/` 原文比对。剔除无法核实者，修正括号内页码格式、PDF 抽取产生的连字符断词与 `<u>` 标记残留。
- 📝 修正正文夹带裸英文词的情况（如 `rigidly` → 「僵化地（rigidly）」），确保符合语言规则。

### 矛盾标注
- ⚠️ 共标注 71 处实质分歧，集中分布在六个议题群：诠释的性质与时机、治疗经验的位置、治疗行动的动因、真理、分析师主体性、各家受到的批评。

### 资料局限（显式记录）
- 📌 费伦齐页全部为二手转述，Govrin 参考文献中无任何费伦齐著作条目。
- 📌 Symington 出版信息缺失，标注「待核实」，未外推期刊、卷期、页码。
- 📌 关系／场域理论家（Ferro、Civitarese、Baranger、Bromberg、Mitchell、Aron）原文不在本批资料，全部系转述。
- 📌 「dreaming the patient」经典出处 Ogden (2004) 正文不在本批；「standing in the spaces」零命中未引用；「Controversial Discussions」一词未见于资料。
- 📌 博拉斯《Catch Them Before They Fall》年份在 Govrin 同节内一处作 2013、一处作 1983，已立矛盾标注，采信 2013。

### 健康巡检（lint）
- 🔗 修复 40 余处断链：命名不一致的链接重定向至实际页面（如 `concept-act-of-freedom` → `concept-analytic-act-of-freedom`）；确实缺失的页面降级为纯文本，不保留空链接。
- ✅ 最终状态：**0 断链、0 孤立页面、1,321 条有效内链。**
- ✅ 语言规则校验：非引文区无英文句子混入，仅 2 处为文献章节名（按规则允许保留英文）。

### 待办
- ⏳ 补齐缺失的原始文献：费伦齐、Ferro、Civitarese、Bromberg、Ogden (2004)
- ⏳ 核实 Symington 论文的出版信息
- ⏳ 考虑补充：自体心理学与关系取向的交叉、拉康传统（本批资料完全未涉及）
- ⏳ 可为尚无专页的人物建页：Ferro、Civitarese、Baranger 夫妇、Bromberg、Mitchell、Aron、Spence、Strachey、Anna Freud、Segal
- ⏳ 可补充的概念页：反移情、投射性认同、梦工作、总情境、无意识幻想、假自体
