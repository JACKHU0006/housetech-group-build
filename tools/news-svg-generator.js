/**
 * HouseTech Group - 新闻 SVG 图片生成器
 * 为每种新闻类型生成独特的 SVG 配图
 */

const ICONS = {
  rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  cpu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  handshake: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l2 2a1 1 0 1 0 3-3"/><path d="M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="M21 3l-4 12"/><path d="M11 17H7a2 2 0 0 1-2-2v-1"/></svg>`,
  trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96a1 1 0 0 1 1.8.67c0 9.84-5.7 14.71-10 16.37"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`,
};

const TYPE_TITLES = {
  'product-launch': 'NEW LAUNCH',
  'technology-innovation': 'TECHNOLOGY',
  'market-event': 'EXHIBITION',
  'partnership': 'PARTNERSHIP',
  'award-certification': 'CERTIFIED',
  'sustainability': 'SUSTAINABILITY',
};

function parseGradient(gradientStr) {
  const match = gradientStr.match(/linear-gradient\(135deg,\s*(#[0-9a-fA-F]{6}),\s*(#[0-9a-fA-F]{6})\)/);
  if (!match) {
    return { from: '#0066ff', to: '#0a2540' };
  }
  return { from: match[1], to: match[2] };
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxLen) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxLen) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export function generateNewsSVG(newsData, slug) {
  const { category, gradient, icon, title, templateType } = newsData;
  const { from, to } = parseGradient(gradient);
  const iconSvg = ICONS[icon] || ICONS.rocket;
  const typeLabel = TYPE_TITLES[templateType] || 'NEWS';
  const titleLines = wrapText(title, 32);

  const safeTitle = escapeXml(title);
  const safeType = escapeXml(typeLabel);
  const safeCategory = escapeXml(category);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="${safeTitle}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="20%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#grid)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>

  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="180" height="48" rx="24" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <text x="90" y="32" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="rgba(255,255,255,0.95)" letter-spacing="3">${safeType}</text>
  </g>

  <g transform="translate(80, 180)">
    ${titleLines.map((line, i) => `<text x="0" y="${i * 56}" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="800" fill="rgba(255,255,255,1)">${escapeXml(line)}</text>`).join('\n    ')}
  </g>

  <g transform="translate(80, 360)">
    <rect x="0" y="0" width="120" height="4" fill="rgba(255,255,255,0.7)"/>
    <text x="0" y="40" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="rgba(255,255,255,0.85)">${safeCategory}</text>
  </g>

  <g transform="translate(900, 200)">
    <circle cx="0" cy="0" r="120" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <circle cx="0" cy="0" r="90" fill="rgba(255,255,255,0.12)"/>
    <g transform="translate(-60, -60) scale(5)">
      ${iconSvg}
    </g>
  </g>

  <g transform="translate(80, 600)">
    <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.95)">HouseTech Group</text>
    <text x="0" y="28" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.7)">Premium OEM/ODM Kitchen Appliances | www.housetech-ch.com</text>
  </g>
</svg>
`;
}
