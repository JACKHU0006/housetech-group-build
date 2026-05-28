# IndexNow 配置说明

## 📋 概述

HouseTech Group 网站已配置 IndexNow，可以主动通知搜索引擎（Bing、Yandex 等）页面更新，加快索引速度。

## 🔑 已配置的信息

- **API Key**: `7fe664292fba494997f79a1169c38bcd`
- **Key 文件**: `public/7fe664292fba494997f79a1169c38bcd.txt`
- **Key 位置**: `https://www.housetech-ch.com/7fe664292fba494997f79a1169c38bcd.txt`
- **IndexNow 端点**:
  - Bing: https://www.bing.com/indexnow
  - IndexNow: https://www.indexnow.org/indexnow
  - Yandex: https://yandex.com/indexnow

## 🚀 使用方法

### 方式 1：提交所有 URL（推荐）

每次部署后，运行以下命令通知所有搜索引擎：

```bash
npm run indexnow
```

或

```bash
node indexnow.js
```

### 方式 2：提交特定 URL

提交单个或多个特定 URL：

```bash
# 单个 URL
node indexnow.js https://www.housetech-ch.com/products/range-hood/

# 多个 URL
node indexnow.js https://www.housetech-ch.com/products/range-hood/ https://www.housetech-ch.com/news/new-product/
```

### 方式 3：验证 Key 文件

在提交前验证 key 文件是否可访问：

```bash
npm run indexnow:verify
```

## ⚙️ 在部署流程中自动执行

### 使用 CI/CD 自动提交

#### GitHub Actions 示例

创建 `.github/workflows/indexnow.yml`:

```yaml
name: IndexNow Submission

on:
  push:
    branches:
      - main

jobs:
  indexnow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        env:
          NODE_ENV: production
          
      - name: Submit to IndexNow
        run: npm run indexnow
```

#### 部署后自动提交

修改 `package.json` 中的 `deploy` 脚本：

```json
{
  "scripts": {
    "deploy": "npm run build && npm run indexnow"
  }
}
```

## 📊 提交统计

运行 `npm run indexnow` 时会显示：
- 找到的 URL 总数
- 提交到的搜索引擎列表
- 每个端点的提交结果

## ⚠️ 注意事项

1. **Key 文件必须在部署后可访问**
   - 确保 `https://www.housetech-ch.com/7fe664292fba494997f79a1169c38bcd.txt` 可以访问
   - 内容应该是纯文本，包含 API Key

2. **提交频率限制**
   - IndexNow 建议每次提交最多 10,000 个 URL
   - 脚本会自动批量提交，避免超限

3. **URL 必须属于同一域名**
   - 所有提交的 URL 必须以 `https://www.housetech-ch.com` 开头
   - 脚本会自动验证 URL

4. **提交时机**
   - 建议在内容更新或部署后立即提交
   - Bing 通常在几分钟内响应
   - 其他搜索引擎可能需要更长时间

## 🔍 验证提交结果

### Bing Webmaster Tools

1. 访问 https://www.bing.com/webmasters
2. 登录您的账户
3. 进入 "Configure My Site" > "IndexNow"
4. 查看提交历史

### IndexNow 官方工具

访问 https://www.indexnow.org/ 查看提交状态。

## 📝 自动化脚本说明

### `indexnow.js`

主脚本，功能包括：
- 从 sitemap 文件读取所有 URL
- 自动批量提交（每批 1000 个 URL）
- 支持同时提交到多个搜索引擎
- 包含详细的日志输出

### `update-sitemaps.js`

用于更新 sitemap 文件日期：

```bash
node update-sitemaps.js
```

## 🆘 故障排除

### Key 文件无法访问

**问题**: 运行 `npm run indexnow:verify` 提示 key 文件不可访问

**解决方案**:
1. 确认网站已部署
2. 检查 key 文件是否在 `dist/` 目录中
3. 确认服务器正确配置了静态文件服务

### 提交失败

**问题**: 提交返回错误

**解决方案**:
1. 检查网络连接
2. 验证 URL 格式正确
3. 确认 key 和 keyLocation 匹配

### URL 不在允许的域名内

**问题**: 脚本警告 URL 不匹配

**解决方案**:
1. 确保 sitemap 文件中的 URL 使用 `https://www.housetech-ch.com`
2. 检查 `indexnow.js` 中的 `siteUrl` 配置

## 📚 更多信息

- [IndexNow 官方文档](https://www.indexnow.org/documentation)
- [Bing IndexNow 指南](https://www.bing.com/indexnow)
- [Yandex IndexNow](https://yandex.com/indexnow)

## 🔄 更新日志

- **2026-05-25**: 初始配置
  - 创建 key 文件
  - 实现 IndexNow 提交脚本
  - 添加 npm 命令
