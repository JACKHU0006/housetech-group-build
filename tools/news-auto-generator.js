#!/usr/bin/env node
/**
 * HouseTech Group - 自动化新闻生成主脚本
 *
 * 用法:
 *   node tools/news-auto-generator.js                          # 生成当前月份新闻
 *   node tools/news-auto-generator.js --date=2025-06-01        # 生成指定日期月份的新闻
 *   node tools/news-auto-generator.js --type=product-launch    # 指定类型
 *   node tools/news-auto-generator.js --dry-run                # 试运行，不实际写文件
 *   node tools/news-auto-generator.js --type=product-launch --date=2025-07-15 --title="..."
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

import { generateNewsData, NEWS_TEMPLATES } from './news-templates.js';
import { generateNewsSVG } from './news-svg-generator.js';
import { generateAstroFile } from './news-astro-generator.js';
import { updateNewsList } from './news-list-updater.js';
import {
  generateSlug, ensureDir, writeFile, fileExists, readFile, listFiles,
  getCurrentMonthDate, getMonthName, getYear,
  logHeader, logStep, logSuccess, logWarning, logError, logInfo,
} from './news-utils.js';

const NEWS_DIR = path.join(ROOT_DIR, 'src', 'pages', 'news');
const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images', 'news');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    date: null,
    type: null,
    title: null,
    dryRun: false,
    skipList: false,
    help: false,
  };

  for (const arg of args) {
    if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--skip-list') options.skipList = true;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg.startsWith('--date=')) options.date = arg.split('=')[1];
    else if (arg.startsWith('--type=')) options.type = arg.split('=')[1];
    else if (arg.startsWith('--title=')) options.title = arg.split('=')[1];
  }

  return options;
}

function showHelp() {
  console.log(`
HouseTech Group - 自动化新闻生成工具

用法:
  node tools/news-auto-generator.js [选项]

选项:
  --date=YYYY-MM-DD     生成指定日期所在月份的新闻（默认：当前月）
  --type=TYPE           指定新闻类型（默认：随机）
                        可选: ${Object.keys(NEWS_TEMPLATES).join(', ')}
  --title="..."         自定义标题（覆盖模板生成的标题）
  --dry-run             试运行，仅显示将生成的内容，不实际写文件
  --skip-list           跳过 news.astro 列表更新
  --help, -h            显示此帮助

示例:
  node tools/news-auto-generator.js
  node tools/news-auto-generator.js --date=2026-07-01
  node tools/news-auto-generator.js --type=product-launch
  node tools/news-auto-generator.js --type=technology-innovation --dry-run
`);
}

function pickRandomType() {
  const types = Object.keys(NEWS_TEMPLATES);
  return types[Math.floor(Math.random() * types.length)];
}

function getExistingSlugs() {
  if (!fileExists(NEWS_DIR)) return new Set();
  const files = listFiles(NEWS_DIR, '.astro');
  return new Set(files.map(f => f.replace(/\.astro$/, '')));
}

function buildSlug(newsData, date) {
  const baseSlug = generateSlug(newsData.title);
  const ym = `${getYear(date)}-${String(new Date(date).getUTCMonth() + 1).padStart(2, '0')}`;
  return `${ym}-${baseSlug}`;
}

function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  logHeader('🏠 HouseTech Group - 自动化新闻生成');

  const date = options.date || getCurrentMonthDate();
  const monthName = getMonthName(date);
  const year = getYear(date);

  logInfo(`目标月份: ${monthName} ${year}`);
  logInfo(`日期: ${date}`);

  const templateType = options.type || pickRandomType();
  if (!NEWS_TEMPLATES[templateType]) {
    logError(`无效的新闻类型: ${templateType}`);
    logInfo(`有效类型: ${Object.keys(NEWS_TEMPLATES).join(', ')}`);
    process.exit(1);
  }
  logInfo(`新闻类型: ${templateType} (${NEWS_TEMPLATES[templateType].name})`);

  const newsData = generateNewsData(templateType, date);
  if (options.title) {
    logInfo(`自定义标题: ${options.title}`);
    newsData.title = options.title;
  }

  const slug = buildSlug(newsData, date);
  logInfo(`Slug: ${slug}`);
  logInfo(`标题: ${newsData.title}`);
  logInfo(`分类: ${newsData.category}`);
  logInfo(`摘要: ${newsData.excerpt}`);

  const astroPath = path.join(NEWS_DIR, `${slug}.astro`);
  const svgPath = path.join(IMAGES_DIR, `${slug}.svg`);

  if (fileExists(astroPath) && !options.dryRun) {
    logWarning(`文件已存在: ${slug}.astro`);
    logInfo('跳过生成。如需重新生成，请删除现有文件。');
    process.exit(0);
  }

  if (options.dryRun) {
    logStep('DRY RUN 模式 - 不写入文件');
    logInfo(`将创建: src/pages/news/${slug}.astro`);
    logInfo(`将创建: public/images/news/${slug}.svg`);
    return;
  }

  logStep('生成 SVG 配图...');
  const svgContent = generateNewsSVG(newsData, slug);
  writeFile(svgPath, svgContent);
  logSuccess(`已创建: public/images/news/${slug}.svg`);

  logStep('生成 .astro 页面...');
  const existingSlugs = getExistingSlugs();
  const sortedSlugs = Array.from(existingSlugs).sort().reverse();
  const newSlugIdx = sortedSlugs.length;
  const prev = sortedSlugs[newSlugIdx - 1] ? { slug: sortedSlugs[newSlugIdx - 1], title: extractTitle(sortedSlugs[newSlugIdx - 1]) } : null;
  const next = sortedSlugs[newSlugIdx - 2] ? { slug: sortedSlugs[newSlugIdx - 2], title: extractTitle(sortedSlugs[newSlugIdx - 2]) } : null;

  const astroContent = generateAstroFile(newsData, slug, date, prev, next);
  writeFile(astroPath, astroContent);
  logSuccess(`已创建: src/pages/news/${slug}.astro`);

  if (!options.skipList) {
    logStep('更新 news.astro 列表...');
    updateNewsList();
  }

  logHeader('🎉 新闻生成完成！');
  logInfo(`访问路径: /news/${slug}`);
  logInfo(`图片路径: /images/news/${slug}.svg`);
  logInfo('');
  logInfo('下一步:');
  logInfo('  1. 运行 npm run build 测试构建');
  logInfo('  2. 部署后运行 npm run indexnow 通知搜索引擎');
  logInfo('  3. 提交到 Git: git add . && git commit -m "Add news: ..." && git push');
}

function extractTitle(slug) {
  const filePath = path.join(NEWS_DIR, `${slug}.astro`);
  const content = readFile(filePath);
  if (!content) return slug;
  const match = content.match(/^const\s+title\s*=\s*['"`]([^'"`]+)['"`]/m);
  if (!match) return slug;
  return match[1].replace(/\s*-\s*HouseTech Group News\s*$/i, '').trim();
}

main();
