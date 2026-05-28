#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

// 当前日期 ISO 格式
const today = new Date().toISOString().split('T')[0];

// 要处理的 sitemap 文件列表
const sitemapFiles = [
  'sitemap_index.xml',
  'sitemap-main.xml',
  'sitemap-product-cat.xml',
  'sitemap-product-item.xml',
  'sitemap-news-article.xml',
  'sitemap-images.xml'
];

console.log('Updating sitemaps...');

sitemapFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: ${file} not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 替换所有 lastmod 日期为今天
  content = content.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  
  // 确保所有 URL 是 www.housetech-ch.com
  content = content.replace(/https:\/\/housetech-ch.com/g, 'https://www.housetech-ch.com');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated ${file}`);
});

// 更新 robots.txt
const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robotsContent = fs.readFileSync(robotsPath, 'utf8');
  robotsContent = robotsContent.replace(/Sitemap: .*/, 'Sitemap: https://www.housetech-ch.com/sitemap_index.xml');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ Updated robots.txt');
}

console.log('\nAll sitemaps updated successfully!');
