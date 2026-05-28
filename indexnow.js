#!/usr/bin/env node
/**
 * IndexNow Integration for HouseTech Group
 * 
 * This script submits URLs to IndexNow to notify search engines about content updates.
 * 
 * Usage:
 *   node indexnow.js                     Submit all URLs from sitemap
 *   node indexnow.js <url>               Submit a single URL
 *   node indexnow.js <url1> <url2>      Submit multiple URLs
 * 
 * Commands:
 *   npm run indexnow                     Submit all URLs
 *   npm run indexnow:verify             Verify key file
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================================
// Configuration
// ========================================

const CONFIG = {
  // IndexNow API Key
  key: '7fe664292fba494997f79a1169c38bcd',
  
  // Key location URL (this file should be accessible at this URL after deployment)
  keyLocation: 'https://www.housetech-ch.com/7fe664292fba494997f79a1169c38bcd.txt',
  
  // Site URL
  siteUrl: 'https://www.housetech-ch.com',
  
  // IndexNow endpoints (Bing and other search engines)
  endpoints: [
    'https://www.bing.com/indexnow',
    'https://www.indexnow.org/indexnow',
    'https://yandex.com/indexnow'
  ],
  
  // Sitemap files to parse for URLs
  sitemapFiles: [
    'public/sitemap-main.xml',
    'public/sitemap-product-cat.xml',
    'public/sitemap-product-item.xml',
    'public/sitemap-news-article.xml'
  ]
};

// ========================================
// Helper Functions
// ========================================

/**
 * Submit URLs to IndexNow endpoint
 */
async function submitToIndexNow(urls, endpoint) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      host: new URL(CONFIG.siteUrl).hostname,
      key: CONFIG.key,
      keyLocation: CONFIG.keyLocation,
      urlList: urls
    });

    const urlObj = new URL(endpoint);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, statusCode: res.statusCode, endpoint });
        } else {
          resolve({ 
            success: false, 
            statusCode: res.statusCode, 
            body,
            endpoint 
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ success: false, error: error.message, endpoint });
    });

    req.write(data);
    req.end();
  });
}

/**
 * Parse XML file and extract URLs
 */
function parseSitemap(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const urls = [];
    
    // Simple regex to extract <loc> content
    const locRegex = /<loc>([^<]+)<\/loc>/gi;
    let match;
    
    while ((match = locRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    return urls;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Get all URLs from sitemaps
 */
function getAllUrls() {
  const allUrls = [];
  
  for (const sitemapFile of CONFIG.sitemapFiles) {
    const fullPath = path.join(__dirname, sitemapFile);
    const urls = parseSitemap(fullPath);
    allUrls.push(...urls);
  }
  
  // Remove duplicates and ensure URLs are valid
  return [...new Set(allUrls)].filter(url => {
    try {
      new URL(url);
      return url.startsWith(CONFIG.siteUrl);
    } catch {
      return false;
    }
  });
}

/**
 * Submit URLs in batches
 */
async function submitUrls(urls, endpoint) {
  const batchSize = 10000; // IndexNow allows up to 10,000 URLs per request
  const results = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`  Submitting batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);
    
    const result = await submitToIndexNow(batch, endpoint);
    results.push(result);
    
    // Small delay between batches to avoid rate limiting
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

/**
 * Format results for display
 */
function formatResults(results) {
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  return {
    total: results.length,
    successful,
    failed,
    details: results
  };
}

// ========================================
// Main Functions
// ========================================

/**
 * Submit all URLs from sitemap
 */
async function submitAllUrls() {
  console.log('\n🔍 Fetching all URLs from sitemaps...');
  const urls = getAllUrls();
  console.log(`📊 Found ${urls.length} URLs to submit\n`);
  
  if (urls.length === 0) {
    console.error('❌ No URLs found in sitemaps. Make sure sitemap files exist.');
    process.exit(1);
  }
  
  console.log('🚀 Submitting to search engines...\n');
  
  // Submit to all endpoints
  for (const endpoint of CONFIG.endpoints) {
    console.log(`📡 Submitting to ${endpoint}...`);
    const results = await submitUrls(urls, endpoint);
    const summary = formatResults(results);
    
    if (summary.successful > 0) {
      console.log(`  ✅ Success! (${summary.successful}/${summary.total} batches)\n`);
    } else {
      console.log(`  ❌ Failed\n`);
      summary.details.filter(r => !r.success).forEach(r => {
        console.log(`     - ${r.endpoint}: ${r.statusCode || r.error}`);
      });
    }
  }
  
  console.log('✨ IndexNow submission completed!');
}

/**
 * Submit specific URLs
 */
async function submitSpecificUrls(urls) {
  console.log(`\n🔍 Submitting ${urls.length} URL(s)...\n`);
  
  // Validate URLs
  const validUrls = urls.map(url => {
    try {
      const urlObj = new URL(url);
      // Ensure URL starts with our site URL
      if (!urlObj.href.startsWith(CONFIG.siteUrl)) {
        console.warn(`⚠️  URL doesn't match site: ${url}`);
        return null;
      }
      return urlObj.href;
    } catch {
      console.error(`❌ Invalid URL: ${url}`);
      return null;
    }
  }).filter(Boolean);
  
  if (validUrls.length === 0) {
    console.error('❌ No valid URLs to submit.');
    process.exit(1);
  }
  
  console.log(`📋 URLs to submit:\n${validUrls.map(u => `   - ${u}`).join('\n')}\n`);
  
  // Submit to Bing (primary)
  console.log(`📡 Submitting to ${CONFIG.endpoints[0]}...`);
  const results = await submitUrls(validUrls, CONFIG.endpoints[0]);
  const summary = formatResults(results);
  
  if (summary.successful > 0) {
    console.log(`  ✅ Success! (${summary.successful}/${summary.total} batches)\n`);
  } else {
    console.log(`  ❌ Failed\n`);
    summary.details.filter(r => !r.success).forEach(r => {
      console.log(`     - ${r.endpoint}: ${r.statusCode || r.error}`);
    });
  }
  
  console.log('✨ IndexNow submission completed!');
}

/**
 * Verify key file is accessible
 */
async function verifyKeyFile() {
  console.log('🔍 Verifying key file accessibility...');
  
  return new Promise((resolve) => {
    https.get(CONFIG.keyLocation, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 && body.trim() === CONFIG.key) {
          console.log('✅ Key file is accessible and contains correct API key!');
          console.log(`   URL: ${CONFIG.keyLocation}`);
          console.log(`   Content: ${body.trim()}`);
          resolve(true);
        } else if (res.statusCode === 200) {
          console.error(`❌ Key file accessible but content is incorrect!`);
          console.error(`   Expected: ${CONFIG.key}`);
          console.error(`   Received: ${body.trim()}`);
          resolve(false);
        } else {
          console.error(`❌ Key file not accessible (HTTP ${res.statusCode})`);
          console.error(`   URL: ${CONFIG.keyLocation}`);
          console.error('   Make sure the site is deployed and the key file is accessible.');
          resolve(false);
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error accessing key file: ${error.message}`);
      console.error(`   URL: ${CONFIG.keyLocation}`);
      console.error('   Make sure the site is deployed.');
      resolve(false);
    });
  });
}

// ========================================
// CLI Interface
// ========================================

async function main() {
  console.log('\n========================================');
  console.log('🏠 HouseTech Group - IndexNow Tool');
  console.log('========================================\n');
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (args.length === 0) {
    // Verify key first, then submit all URLs
    const keyOk = await verifyKeyFile();
    if (!keyOk) {
      console.log('\n⚠️  Cannot submit without valid key file!');
      console.log('   Please deploy the site first, or run "npm run indexnow:verify" to check.\n');
      process.exit(1);
    }
    await submitAllUrls();
  } else if (command === 'verify') {
    await verifyKeyFile();
  } else if (command === 'help') {
    console.log('Usage:');
    console.log('  node indexnow.js                     Submit all URLs from sitemap');
    console.log('  node indexnow.js <url>               Submit a single URL');
    console.log('  node indexnow.js <url1> <url2>      Submit multiple URLs');
    console.log('  node indexnow.js verify              Verify key file accessibility');
    console.log('  node indexnow.js help                Show this help');
    console.log('\nCommands (npm run):');
    console.log('  npm run indexnow                     Submit all URLs');
    console.log('  npm run indexnow:verify             Verify key file');
  } else {
    // Submit specific URLs
    const keyOk = await verifyKeyFile();
    if (!keyOk) {
      console.log('\n⚠️  Cannot submit without valid key file!');
      process.exit(1);
    }
    await submitSpecificUrls(args);
  }
}

// Run main function
main().catch(console.error);
