/**
 * HouseTech Group - 工具函数库
 * 提供 slug 生成、日期处理、文件操作等通用工具
 */

import path from 'path';
import fs from 'fs';

export function generateSlug(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

export function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

export function readFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

export function listFiles(dirPath, extension = '.astro') {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter(f => f.endsWith(extension));
}

export function getCurrentMonthDate() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}-01`;
}

export function getMonthName(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return months[new Date(date).getUTCMonth()];
}

export function getYear(date) {
  return new Date(date).getUTCFullYear();
}

export function isValidDate(dateString) {
  const d = new Date(dateString);
  return d instanceof Date && !isNaN(d);
}

export function logHeader(text) {
  const line = '═'.repeat(60);
  console.log('\n' + line);
  console.log(`  ${text}`);
  console.log(line);
}

export function logStep(text) {
  console.log(`\n▶ ${text}`);
}

export function logSuccess(text) {
  console.log(`  ✅ ${text}`);
}

export function logWarning(text) {
  console.log(`  ⚠️  ${text}`);
}

export function logError(text) {
  console.log(`  ❌ ${text}`);
}

export function logInfo(text) {
  console.log(`  ℹ️  ${text}`);
}
