/**
 * HouseTech Group - 新闻 .astro 文件生成器
 * 基于现有新闻模板生成完整的 .astro 页面文件
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getMonthYear(date) {
  const d = new Date(date);
  return {
    monthName: MONTH_NAMES[d.getUTCMonth()],
    year: d.getUTCFullYear(),
    iso: d.toISOString().split('T')[0],
  };
}

export function generateAstroFile(newsData, slug, date, prevArticle = null, nextArticle = null) {
  const { monthName, year, iso } = getMonthYear(date);
  const { title, excerpt, sections, category, gradient } = newsData;

  const safeTitle = escapeHtml(title);
  const safeExcerpt = escapeHtml(excerpt);
  const metaTitle = escapeHtml(`${title} - HouseTech Group News`);
  const seoDescription = escapeHtml(
    `${excerpt} HouseTech Group is a leading OEM/ODM manufacturer of premium kitchen appliances, serving brand partners and distributors worldwide.`
  );

  const sectionsHtml = sections.map(section => {
    let html = `        <h2>${escapeHtml(section.heading)}</h2>\n`;
    if (section.type === 'list' && section.items) {
      html += `        <ul>\n`;
      section.items.forEach(item => {
        html += `          <li>${item.replace(/^([^:]+:)/, '<strong>$1</strong>')}</li>\n`;
      });
      html += `        </ul>\n`;
    } else if (section.content) {
      html += `        <p>${escapeHtml(section.content)}</p>\n`;
    }
    return html;
  }).join('\n');

  const prevLink = prevArticle
    ? `          <a href="/news/${prevArticle.slug}" class="article-nav-link">
            <span class="article-nav-label">← Previous</span>
            <span class="article-nav-title">${escapeHtml(prevArticle.title)}</span>
          </a>`
    : `          <a href="/news" class="article-nav-link">
            <span class="article-nav-label">← All News</span>
            <span class="article-nav-title">Back to News Center</span>
          </a>`;

  const nextLink = nextArticle
    ? `          <a href="/news/${nextArticle.slug}" class="article-nav-link" style="margin-left:auto;text-align:right;">
            <span class="article-nav-label">Next →</span>
            <span class="article-nav-title">${escapeHtml(nextArticle.title)}</span>
          </a>`
    : `          <a href="/news" class="article-nav-link" style="margin-left:auto;text-align:right;">
            <span class="article-nav-label">All News →</span>
            <span class="article-nav-title">Browse More Articles</span>
          </a>`;

  const breadcrumbCategory = escapeHtml(category);

  return `---
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

const title = ${JSON.stringify(`${title} - HouseTech Group News`)};
const description = ${JSON.stringify(`${excerpt} HouseTech Group is a leading OEM/ODM manufacturer of premium kitchen appliances, serving brand partners and distributors worldwide.`)};
const publishDate = ${JSON.stringify(iso)};
const articleCategory = ${JSON.stringify(category)};
---

<Layout title={title} description={description} publishDate={publishDate} articleCategory={articleCategory}>
  <Header activeNav="news" />

  <!-- Page Hero -->
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb">
        <a href="/">Home</a> / <a href="/news">News</a> / <span>${breadcrumbCategory}</span>
      </nav>
    </div>
  </section>

  <!-- Article Content -->
  <section class="content-section">
    <div class="container">
      <article class="content-area" style="max-width: 850px;">

        <!-- Article Header -->
        <header class="article-header">
          <span class="article-category">${breadcrumbCategory}</span>
          <h1 class="article-title">${safeTitle}</h1>
          <div class="article-meta-info">
            <span>📅 ${monthName} ${year}</span>
            <span>🏷️ ${breadcrumbCategory}</span>
            <span>⏱️ 5 min read</span>
          </div>
        </header>

        <!-- Featured Image -->
        <figure class="article-image-figure">
          <div style="width:100%;aspect-ratio:16/9;background:${gradient};display:flex;align-items:center;justify-content:center;border-radius:var(--radius-lg);">
            <img src="/images/news/${slug}.svg" alt="${safeTitle}" loading="eager" width="1200" height="675" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);"/>
          </div>
          <figcaption class="article-image-caption">${safeExcerpt}</figcaption>
        </figure>

        <!-- Article Body -->
        <div class="article-body">
${sectionsHtml}
        </div>

        <!-- Article Navigation -->
        <nav class="article-nav">
${prevLink}
${nextLink}
        </nav>

        <!-- Back to News -->
        <div style="text-align:center;margin-top:var(--spacing-xl);">
          <a href="/news" class="btn btn-accent-outline">← Back to All News</a>
        </div>

      </article>
    </div>
  </section>

  <Footer />
</Layout>
`;
}
