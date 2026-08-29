# Wiki 规则配置（SCHEMA）

> **知识库主题**：当代精神分析中的诠释、分析师主体性与真理问题
> **建立时间**：2026-08-28
> **资料基础**：6 份英文原始文献（PDF → Markdown）

---

## 一、语言规则（最高优先级）

本 Wiki 由用户明确指定语言规范，**所有页面必须严格遵守**：

| 元素 | 语言 | 说明 |
|---|---|---|
| 页面正文、标题、摘要、分析 | **中文（简体）** | 一律中文，不得混入英文句子 |
| 原文引文 | **英文** | 逐字照抄原文，不翻译、不改写、不删减 |
| 文件名 | **英文** | kebab-case，如 `concept-withness.md` |
| 专有名词与术语 | **中文译名 + 英文原名** | 首次出现写作「同在（withness）」，之后可用中文 |
| 人名 | **中文译名（英文原名）** | 如「唐纳德·温尼科特（Donald Winnicott）」 |
| 文献标题、期刊名 | **英文原文** | 保留英文，可在括号中给中文译名 |

**禁止事项**：
- 正文中出现完整的英文句子（引文块除外）
- 用英文撰写任何说明性段落
- 把引文翻译成中文后再当作引文使用

---

## 二、目录结构

```
psychoanalysis-wiki/
├── SCHEMA.md              ← 本文件，Wiki 规则
├── raw/                   ← 第一层：原始资料（只读，永不修改）
│   ├── govrin-interpretation.md
│   ├── ogden-ontological-psychoanalysis.md
│   ├── eshel-withness.md
│   ├── eshel-interconnectedness.md
│   ├── symington-act-of-freedom.md
│   └── yadlin-gadot-truth-axes.md
└── wiki/                  ← 第二层：编译后的知识层
    ├── index.md           ← 内容目录索引
    ├── log.md             ← 变更日志
    ├── entities/          ← 实体页（人物）
    ├── concepts/          ← 概念页（理论、术语、方法）
    └── topics/            ← 主题综述页与对比页
```

---

## 三、引用规则

### 3.1 引文格式

所有关键定义与结论**必须**附带原文引文，格式为引用块 + 出处标注：

```markdown
> interpretation is best thought of as the quintessential container and purveyor of intersubjectivity between patient and analyst

— Govrin, *Interpretation*，第六章（引 Aron）
```

### 3.2 出处标注规范

出处采用**「作者 + 文献简称 + 章节/页码」**三段式，文献简称对照：

| 简称 | 完整文献 |
|---|---|
| Govrin, *Interpretation* | Aner Govrin, *Interpretation: A Contemporary Introduction*（Routledge, 2026） |
| Ogden, *Ontological* | Thomas H. Ogden, "Ontological Psychoanalysis or 'What Do You Want to Be When You Grow Up?'", *Psychoanalytic Quarterly*, 2019, 88(4): 661–684 |
| Eshel, *Withness* | Ofra Eshel, "Patient–Analyst 'Withness'", *Psychoanalytic Quarterly*, 2013, 82(4) |
| Eshel, *Interconnectedness* | Ofra Eshel, "Patient–Analyst Interconnectedness: Personal Notes on Close Encounters of a New Dimension" |
| Symington, *Freedom* | Neville Symington, "The Analyst's Act of Freedom as Agent of Therapeutic Change" |
| Yadlin-Gadot, *Truth Axes* | Shlomit Yadlin-Gadot, "Truth Axes and the Transformation of Self" |

### 3.3 三级可信度标注

| 标记 | 含义 |
|---|---|
| 【原文】 | 直接引自原始文献，附英文引文 |
| 【综合】 | 跨多份文献归纳，附各文献引文 |
| 【推断】 | AI 基于文献的推理，**无直接引文支撑**，必须显式标注 |

---

## 四、页面模板

```markdown
# {中文页面标题}（{英文原名}）

> **类型**: entity | concept | topic | comparison
> **创建时间**: YYYY-MM-DD
> **最后更新**: YYYY-MM-DD
> **主来源**: [[raw/xxx.md]]

## 摘要
{一段中文概括，150-300 字，说明这个实体/概念是什么、为什么重要}

## 核心内容
{中文正文，按需要分小节。每个关键论断后紧跟英文引文}

## 关键引文
{集中列出支撑本页的 2-6 条英文原文引文，各标注出处}

## 关联
- 相关实体：[[entities/xxx]]、[[entities/yyy]]
- 相关概念：[[concepts/xxx]]
- 参见主题：[[topics/xxx]]

## 引用来源
- [1] [[raw/xxx.md]] — 说明
- [2] [[raw/yyy.md]] — 说明

## 变更记录
- YYYY-MM-DD: 初始创建，来源 [[raw/xxx]]
```

---

## 五、矛盾标注规则

当不同文献对同一问题有不同说法时，必须使用如下格式明确标记：

```markdown
> ⚠️ **矛盾标注**
> **议题**：{争议的是什么}
> **A 方立场**：{谁，主张什么}——「{英文原文引文}」（出处）
> **B 方立场**：{谁，主张什么}——「{英文原文引文}」（出处）
> **备注**：{是否可调和，或属不可通约的范式差异}
```

---

## 六、命名规范

- 文件命名：`kebab-case`，全小写，英文
- 实体页前缀：`person-`
- 概念页前缀：`concept-`
- 主题页前缀：`topic-`；对比页前缀：`comparison-`
- Wiki 内链：`[[相对路径（不含 .md 后缀）]]`，如 `[[concepts/concept-withness]]`

---

## 七、术语译名对照表（统一使用）

| 英文 | 中文译名 |
|---|---|
| interpretation | 诠释 |
| construction | 建构 |
| transference | 移情 |
| countertransference | 反移情 |
| enactment | 活现 |
| containment | 涵容 |
| projective identification | 投射性认同 |
| reverie | 遐想 |
| holding | 抱持 |
| going-on-being | 持续存在 |
| breakdown | 崩溃 |
| deadness | 死寂 |
| despair | 绝望 |
| witnessing | 见证 |
| presence / presencing | 在场 / 临在 |
| withness | 同在 |
| interconnectedness | 相互贯通 |
| selfobject | 自体客体 |
| empathy / empathic immersion | 共情 / 共情沉浸 |
| optimal frustration | 最佳挫折 |
| transmuting internalization | 蜕变内化 |
| dissociation | 解离 |
| self-states | 自体状态 |
| analytic third / thirdness | 分析性第三方 / 第三方性 |
| intersubjectivity | 主体间性 |
| ontological | 本体论（的） |
| epistemological | 认识论（的） |
| truth | 真理 |
| self | 自体 |
| negative capability | 负性能力 |
| mutative interpretation | 突变性诠释 |
| auxiliary superego | 辅助超我 |
| vertex | 顶点 |
| alpha-function / beta-elements | α功能 / β元素 |
| O（Bion） | O（终极实在，保留符号） |
| corporate personality | 团体性人格 |
| enactment（Symington 语境） | 活现 |
| compassion | 悲悯 |
| passion | 激情 |
| impingement | 侵犯 / 侵扰 |
| disavowal | 否认 |
