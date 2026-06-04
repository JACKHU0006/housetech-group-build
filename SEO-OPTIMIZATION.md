# SEO/GEO/AEO 优化配置指南

本文档记录了 HouseTech Group 网站的 SEO、GEO（地理优化）和 AEO（答案引擎优化）配置。

## 📍 本地SEO结构化数据配置

HouseTech Group 的本地SEO配置已经集成到以下页面：

### 1. 主页 (index.astro)
- Organization Schema
- LocalBusiness Schema (在 Contact 页面)

### 2. 联系页面 (contact.astro)
- LocalBusiness Schema
- PostalAddress
- OpeningHoursSpecification
- GeoCoordinates

### 3. 关于页面 (about.astro)
- AboutPage Schema
- Organization Schema

## 🌐 GEO优化配置

### Meta 地理位置标签
```html
<meta name="geo.region" content="CN-GD" />
<meta name="geo.placename" content="Zhongshan" />
<meta name="geo.position" content="22.5;113.4" />
<meta name="ICBM" content="22.5, 113.4" />
```

## ❓ AEO（答案引擎优化）

### FAQPage 结构化数据
已添加到以下页面：
- `/faq` - 完整的常见问题页面
- `/products/range-hood` - 抽油烟机FAQ
- 其他产品页面（按需添加）

### FAQ Schema 示例
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "问题内容",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "答案内容"
      }
    }
  ]
}
```

## 🔍 语音搜索优化

### 内容优化要点
1. **使用自然语言**: FAQ内容使用完整的疑问句格式
2. **直接回答**: 每个答案开头直接回答问题
3. **长尾关键词**: 包含语音搜索常用的完整问题格式
4. **结构化数据**: FAQPage schema 帮助搜索引擎理解内容

### 语音搜索友好示例
❌ 不推荐："Extraction rate 800m³/h"
✅ 推荐："What extraction rate do I need for my kitchen? For Asian kitchens with high-heat wok cooking, choose range hoods with 800-1200m³/h extraction."

## 🗺️ 面包屑导航结构

所有页面已配置 BreadcrumbList 结构化数据：
- 首页 → 产品 → 产品类别 → 具体产品
- 首页 → 新闻 → 新闻详情
- 首页 → 关于我们

## 📱 Open Graph 和社交媒体

已配置完整的 OG 标签：
- og:title, og:description, og:image
- og:url, og:type, og:site_name
- og:locale

## 🔒 技术SEO清单

- ✅ 规范的 canonical URLs
- ✅ XML sitemap（自动生成）
- ✅ robots.txt 配置
- ✅ 结构化数据（Schema.org）
- ✅ Meta description 优化
- ✅ 语义化 HTML 标签
- ✅ 图片 alt 文本
- ✅ 页面加载速度优化
- ✅ 移动端友好设计
- ✅ HTTPS 安全
- ✅ SSL 证书（Cloudflare）

## 🚀 后续优化建议

### 1. Google Business Profile（需用户操作）
- 创建/认领 Google Business Profile
- 完善商家信息（地址、电话、营业时间）
- 添加真实客户评价
- 上传工厂和办公室照片

### 2. 本地目录提交
- Yelp Business Directory
- Bing Places
- Apple Maps
- 当地商业目录（中国：百度地图、高德；国际：Google Maps）

### 3. 客户评价收集
- 联系现有客户请求评价
- 在Google Business Profile展示评价
- 添加评价到网站 testimonials 部分

### 4. 本地内容优化
- 添加中山地区相关内容
- 参与当地商业活动
- 与本地企业建立链接

## 📊 监控和分析

### Google Analytics 4
- 配置 Measurement ID（在环境变量中设置）
- 追踪核心指标：会话、转化、事件

### Core Web Vitals
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

### 性能监控
- 使用 PerformanceObserver API 实时监控
- 数据自动发送到 Google Analytics

## 🔧 配置说明

### 环境变量配置
在 `.env` 文件中配置：
```env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### IndexNow 配置
- API Key: `7fe664292fba494997f79a1169c38bcd`
- Key 文件: `/7fe664292fba494997f79a1169c38bcd.txt`
- 端点: Bing, IndexNow.org, Yandex

### Sitemap 配置
自动生成在 `dist/sitemap-index.xml`

## 📝 更新日志

### 2024-06-03
- 添加 @astrojs/sitemap 插件
- 配置 Google Analytics 4 和 Core Web Vitals
- 添加 FAQPage 结构化数据
- 增强产品页面FAQ内容
- 创建 CI/CD 工作流
- 配置 Playwright 测试框架
- 添加 Lighthouse 性能预算

## 🆘 需要用户操作的事项

1. **Google Analytics 4**: 创建 GA4 账号并获取 Measurement ID
2. **Google Business Profile**: 创建并认领商家信息
3. **客户评价**: 收集并展示真实客户评价
4. **社交媒体**: 完善 LinkedIn、Facebook、YouTube 链接
