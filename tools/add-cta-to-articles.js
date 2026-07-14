import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const newsDir = './src/pages/news';
const files = readdirSync(newsDir).filter(f => f.endsWith('.astro'));

// CTA HTML snippets
const inlineCTA = `
        <div style="background:linear-gradient(135deg, rgba(247,147,30,0.08), rgba(10,37,64,0.05));border-left:4px solid var(--color-accent);padding:var(--spacing-md) var(--spacing-lg);border-radius:0 var(--radius-md) var(--radius-md) 0;margin:var(--spacing-lg) 0;">
          <p style="font-weight:600;color:var(--color-primary);margin-bottom:var(--spacing-xs);font-size:var(--font-size-sm);">Need Custom Kitchen Appliances?</p>
          <p style="color:var(--color-text-light);font-size:var(--font-size-sm);margin-bottom:var(--spacing-sm);">From OEM to ODM, we deliver tailored solutions for your market. Factory-direct pricing, full certification support, and flexible MOQ.</p>
          <a href="/contact" class="btn btn-sm btn-primary" style="text-decoration:none;">Get OEM Quote →</a>
        </div>
`;

const boxedCTA = `
        <div style="background:linear-gradient(135deg, var(--color-primary), #1a4a7a);border-radius:var(--radius-lg);padding:var(--spacing-xl);margin:var(--spacing-xl) 0;text-align:center;color:white;">
          <h3 style="font-size:var(--font-size-xl);margin-bottom:var(--spacing-sm);color:white;">Ready to Develop Your Custom Product Line?</h3>
          <p style="color:rgba(255,255,255,0.85);margin-bottom:var(--spacing-lg);max-width:600px;margin-left:auto;margin-right:auto;">HouseTech provides end-to-end OEM/ODM services — from concept design to mass production. Get factory-direct pricing with full certification support.</p>
          <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-sm);justify-content:center;">
            <a href="/contact" class="btn btn-primary" style="text-decoration:none;">Get OEM Quote →</a>
            <a href="/download" class="btn btn-outline-white" style="text-decoration:none;">Download Catalog</a>
            <a href="/contact" class="btn btn-outline-white" style="text-decoration:none;">Request Sample</a>
          </div>
        </div>
`;

const footerCTA = `
        <div style="background:var(--color-bg-elevated);border:2px solid var(--color-accent);border-radius:var(--radius-lg);padding:var(--spacing-xl);margin:var(--spacing-xl) 0;text-align:center;">
          <h3 style="font-size:var(--font-size-lg);margin-bottom:var(--spacing-sm);color:var(--color-primary);">Partner with HouseTech for Your Next Product Launch</h3>
          <p style="color:var(--color-text-light);margin-bottom:var(--spacing-lg);max-width:600px;margin-left:auto;margin-right:auto;">15+ years of manufacturing excellence. 500+ employees. 30,000m² facility. Serving 50+ countries. Let's build your brand together.</p>
          <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-sm);justify-content:center;">
            <a href="/contact" class="btn btn-primary" style="text-decoration:none;">Contact Sales →</a>
            <a href="/download" class="btn btn-accent-outline" style="text-decoration:none;">Download Catalog</a>
            <a href="/service" class="btn btn-accent-outline" style="text-decoration:none;">View OEM Services</a>
          </div>
        </div>
`;

let modifiedCount = 0;

for (const file of files) {
  const filepath = join(newsDir, file);
  let content = readFileSync(filepath, 'utf-8');
  let modified = false;

  // 1. Insert inline CTA after second </h2> in article-body
  const h2Matches = content.match(/<h2>/g);
  if (h2Matches && h2Matches.length >= 2) {
    let h2Count = 0;
    let insertPos = -1;
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('<h2>')) h2Count++;
      if (h2Count === 2) {
        // Find the closing </p> after this h2 section
        for (let j = i + 1; j < lines.length && j < i + 20; j++) {
          if (lines[j].trim() === '</p>') {
            insertPos = j;
            break;
          }
        }
        break;
      }
    }
    if (insertPos > 0 && !content.includes('Need Custom Kitchen Appliances?')) {
      lines.splice(insertPos + 1, 0, inlineCTA);
      content = lines.join('\n');
      modified = true;
    }
  }

  // 2. Insert boxed CTA after </div> of article-body (before FAQ or nav)
  // Look for the closing </div> before FAQ section or article-nav
  if (!content.includes('Ready to Develop Your Custom Product Line?')) {
    // Find the article-body closing div
    const articleBodyClose = content.indexOf('</div>\n\n        <div style="background:var(--color-bg-alt)');
    const articleBodyClose2 = content.indexOf('</div>\n\n        <nav class="article-nav"');
    const insertPoint = articleBodyClose > 0 ? articleBodyClose + 6 : (articleBodyClose2 > 0 ? articleBodyClose2 + 6 : -1);
    
    if (insertPoint > 0) {
      content = content.slice(0, insertPoint) + boxedCTA + content.slice(insertPoint);
      modified = true;
    }
  }

  // 3. Insert footer CTA before article-nav
  if (!content.includes('Partner with HouseTech for Your Next Product Launch')) {
    const navPos = content.indexOf('<nav class="article-nav">');
    if (navPos > 0) {
      content = content.slice(0, navPos) + footerCTA + content.slice(navPos);
      modified = true;
    }
  }

  if (modified) {
    writeFileSync(filepath, content, 'utf-8');
    modifiedCount++;
    console.log(`✅ Modified: ${file}`);
  } else {
    console.log(`⏭️ Skipped: ${file}`);
  }
}

console.log(`\n📊 Total modified: ${modifiedCount}/${files.length}`);
