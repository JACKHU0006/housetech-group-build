# 📰 HouseTech Group - 自动化新闻生成系统

## 概述

本系统实现了每月自动生成新闻文章的功能，包含以下核心组件：

- **模板库**: 6 种新闻类型模板（产品发布、技术创新、市场活动、合作伙伴、奖项认证、可持续发展）
- **SVG 图片生成器**: 自动生成新闻配图
- **Astro 页面生成器**: 生成完整的 `.astro` 页面文件
- **列表更新器**: 自动更新 news.astro 列表页面
- **GitHub Actions**: 每月 1 号自动触发生成

## 快速开始

### 生成随机新闻（当前月份）
```bash
npm run news
```

### 指定新闻类型
```bash
npm run news:product   # 产品发布
npm run news:tech      # 技术创新
npm run news:event     # 市场活动
npm run news:partner   # 合作伙伴
npm run news:award     # 奖项认证
npm run news:sustain   # 可持续发展
```

### 试运行模式（不写文件）
```bash
npm run news:dry
```

### 更新新闻列表
```bash
npm run news:update-list
```

## 命令行参数

```bash
node tools/news-auto-generator.js [选项]

选项:
  --date=YYYY-MM-DD     指定日期（默认：当前月）
  --type=TYPE           指定新闻类型
  --title="..."         自定义标题
  --dry-run             试运行模式
  --skip-list           跳过列表更新
  --help, -h            显示帮助
```

## 新闻类型

| 类型 | 名称 | 描述 |
|------|------|------|
| `product-launch` | Product Launch | 新产品发布新闻 |
| `technology-innovation` | Technology | 技术创新与研发成果 |
| `market-event` | Exhibition | 展会与市场活动 |
| `partnership` | Business | 战略合作与合作伙伴 |
| `award-certification` | Awards | 认证与奖项 |
| `sustainability` | Sustainability | 可持续发展与环保 |

## 文件结构

```
├── tools/
│   ├── news-auto-generator.js    # 主脚本
│   ├── news-templates.js         # 新闻模板库
│   ├── news-svg-generator.js     # SVG 图片生成
│   ├── news-astro-generator.js   # Astro 页面生成
│   ├── news-list-updater.js      # 列表更新
│   └── news-utils.js             # 工具函数
├── .github/
│   └── workflows/
│       └── monthly-news.yml      # GitHub Actions
├── src/pages/news/               # 新闻页面目录
└── public/images/news/           # 新闻配图目录
```

## GitHub Actions 配置

工作流文件: `.github/workflows/monthly-news.yml`

**触发方式**:
- **自动**: 每月 1 号 UTC 02:00（北京时间 10:00）
- **手动**: 在 GitHub 页面点击 "Run workflow"

**执行流程**:
1. 检出代码仓库
2. 设置 Node.js 环境
3. 安装依赖
4. 生成新闻文章
5. 构建验证
6. 更新 sitemaps
7. 提交并推送
8. 调用 IndexNow 提交

## 配置说明

### 模板配置 (`news-templates.js`)

每个模板包含：
- `title`: 标题模板数组
- `excerptTemplate`: 摘要模板
- `sections`: 文章内容区块（标题、段落、列表）
- `gradient`: 配色方案
- `icon`: 图标类型

### 自定义扩展

1. **添加新模板**: 在 `news-templates.js` 中添加新类型
2. **修改样式**: 在 `news-svg-generator.js` 中调整 SVG 模板
3. **修改页面结构**: 在 `news-astro-generator.js` 中调整页面模板

## SEO 优化

生成的新闻自动包含：
- 规范的 Title 标签（包含品牌名）
- Meta Description（包含摘要）
- Open Graph 图片
- 结构化数据（Schema.org）
- 完整的 sitemap 更新

## 注意事项

1. **重复检测**: 如果同月同名文章已存在，将自动跳过
2. **构建验证**: GitHub Actions 会先构建确保无错误
3. **Git 提交**: 使用 `github-actions[bot]` 用户自动提交
4. **IndexNow**: 部署后自动通知搜索引擎

## 故障排除

### 新闻生成失败
```bash
# 检查参数
node tools/news-auto-generator.js --help

# 试运行查看输出
npm run news:dry
```

### 构建失败
```bash
npm run build
```

### 列表不更新
```bash
npm run news:update-list
```

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-06 | 初始版本，支持 6 种新闻类型 |
