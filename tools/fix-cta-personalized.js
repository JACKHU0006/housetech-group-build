import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const newsDir = './src/pages/news';
const files = readdirSync(newsDir).filter(f => f.endsWith('.astro'));

// 根据文件名匹配主题和对应的个性化CTA
const ctaMap = {
  // 技术指南类
  'kitchen-range-hood-static-pressure-guide': {
    inlineTitle: 'Need Range Hoods for High-Rise Buildings?',
    inlineSub: 'We supply ≥380Pa static pressure range hoods with custom airflow configurations. OEM support for project-based orders.',
    boxedTitle: 'Develop Your Custom Range Hood Line',
    boxedSub: 'From 200Pa to 450Pa, from wall-mount to island — design your range hood with our engineering team. Full certification included.',
    footerTitle: 'Your Range Hood OEM Partner',
    footerSub: '15 years manufacturing range hoods for 50+ countries. Custom motor specs, filter systems, and panel finishes available.'
  },
  'gas-stove-thermal-efficiency-tier-1-guide': {
    inlineTitle: 'Need Tier-1 Gas Stoves for Your Market?',
    inlineSub: 'We manufacture ≥63% thermal efficiency gas stoves with cast iron burners and FFD safety. Custom gas types supported.',
    boxedTitle: 'Build Your Gas Stove Product Line',
    boxedSub: 'From 2-burner to 5-burner, tempered glass or stainless steel — customize every detail. OEM/ODM with full safety certifications.',
    footerTitle: 'Your Gas Appliance Manufacturing Partner',
    footerSub: 'CE, CB, ETL, SASO certified gas stoves. Custom burner power, ignition type, and panel design. Contact for OEM pricing.'
  },
  'electric-water-heater-safety-standards-guide': {
    inlineTitle: 'Need Safety-Certified Water Heaters?',
    inlineSub: 'Our electric water heaters include 0.7-0.8MPa relief valves and 30mA ELCB protection. OEM with your brand.',
    boxedTitle: 'Develop Your Water Heater Line',
    boxedSub: 'Storage, tankless, or solar-assisted — customize capacity, power, and safety features. Full certification support for EU, NA, Middle East.',
    footerTitle: 'Your Water Heater OEM Partner',
    footerSub: 'ISO9001 certified factory. CE, CB, ETL, SASO approvals. Custom enamel coating, heating elements, and control panels.'
  },
  // 技术类
  'oil-filtration-technology': {
    inlineTitle: 'Want 99.8% Grease Separation in Your Range Hoods?',
    inlineSub: 'Our CycloClean filtration system outperforms standard filters by 15-30%. Available for OEM integration.',
    boxedTitle: 'Integrate CycloClean into Your Product Line',
    boxedSub: 'License our proprietary 3-stage filtration technology. Custom filter geometry, collection capacity, and smart home integration available.',
    footerTitle: 'Advanced Filtration Technology Partner',
    footerSub: 'Patented oil-filtration systems for range hood OEMs. Washable filters, reduced maintenance, and superior grease capture.'
  },
  '18-month-product-development': {
    inlineTitle: 'Need a Reliable Product Development Partner?',
    inlineSub: 'Our 18-month development cycle includes 120 tests and 5 prototype iterations. 99.5% first-pass yield target.',
    boxedTitle: 'Launch Your Product with Our R&D Team',
    boxedSub: 'From concept to mass production in 18 months. CFD analysis, safety testing, and certification management all included.',
    footerTitle: 'End-to-End Product Development Partner',
    footerSub: '50+ engineers. 3,000m² R&D center. 200+ patents. Let us develop your next kitchen appliance from scratch.'
  },
  'ces-2025-smart-kitchen-launch': {
    inlineTitle: 'Want Smart Kitchen Appliances for Your Brand?',
    inlineSub: 'IoT connectivity, voice control, and app monitoring — all customizable for your smart home ecosystem.',
    boxedTitle: 'Build Your Smart Appliance Product Line',
    boxedSub: 'WiFi-enabled range hoods, gas stoves, and ovens with your branded app. Works with Alexa, Google Home, and custom protocols.',
    footerTitle: 'Smart Kitchen Technology Partner',
    footerSub: 'Full-stack IoT development for kitchen appliances. Hardware, firmware, cloud platform, and mobile app — all in-house.'
  },
  'new-rd-center-opening': {
    inlineTitle: 'Need Advanced R&D for Your Product Line?',
    inlineSub: 'Our new 3,000m² center features CFD labs, noise chambers, and safety testing facilities. Open for joint development.',
    boxedTitle: 'Co-Develop with Our Engineering Team',
    boxedSub: 'Joint R&D programs for OEM partners. Shared IP models available. From concept sketch to production-ready design.',
    footerTitle: 'Innovation Partner for Kitchen Appliances',
    footerSub: '50+ engineers. Annual R&D investment at 8% of revenue. 200+ patents. Collaborate on your next breakthrough product.'
  },
  // 认证类
  'energy-efficient-eu-aplusplus': {
    inlineTitle: 'Need A+++ Energy-Efficient Appliances?',
    inlineSub: 'Our EC motors reduce energy consumption by 60%. Full EU Energy Label compliance for range hoods and ovens.',
    boxedTitle: 'Launch A+++ Rated Products in Europe',
    boxedSub: 'Pre-certified A+++ range hoods and cooking appliances. Meet EU Ecodesign 2019/2020 requirements without additional testing.',
    footerTitle: 'EU Energy Efficiency Partner',
    footerSub: 'All products pre-tested for EU Energy Label compliance. A+++ ratings verified by accredited labs. Ready for CE marking.'
  },
  'etl-certification-north-america': {
    inlineTitle: 'Need ETL-Certified Products for North America?',
    inlineSub: 'Full UL 507 compliance for range hoods. Intertek-certified manufacturing with factory surveillance support.',
    boxedTitle: 'Enter North America with ETL Certification',
    boxedSub: 'Pre-certified product lines ready for US and Canadian markets. UL 507, CSA C22.2 compliance. No additional testing needed.',
    footerTitle: 'North America Certification Partner',
    footerSub: 'ETL Listed manufacturing facility. Annual factory audits. Products ship with ETL mark for immediate retail placement.'
  },
  // 产品发布类
  'ultra-quiet-range-hood-series': {
    inlineTitle: 'Want Ultra-Quiet Range Hoods Under 35dB?',
    inlineSub: 'Active noise cancellation and magnetic levitation motors. Perfect for luxury apartments and open-plan kitchens.',
    boxedTitle: 'Add WhisperSilence to Your Product Catalog',
    boxedSub: '6 models across all mounting types. Custom finishes from minimalist glass to premium stainless steel. OEM branding included.',
    footerTitle: 'Ultra-Quiet Kitchen Ventilation Partner',
    footerSub: 'Proprietary noise reduction technology. 35dB at full power. Patented motor design. Exclusive territory deals available.'
  },
  // 质量类
  'zero-defect-quality-achievement': {
    inlineTitle: 'Need Zero-Defect Manufacturing for Your Brand?',
    inlineSub: '99.8% first-pass yield rate. 200+ inspection points. Six Sigma process control. Your brand quality guaranteed.',
    boxedTitle: 'Manufacture with Six Sigma Quality Standards',
    boxedSub: '200+ QC checkpoints per unit. Automated optical inspection. Full traceability from component to shipment.',
    footerTitle: 'Quality-First Manufacturing Partner',
    footerSub: '1,000,000+ units produced with <0.2% defect rate. ISO9001 certified. Your brand reputation protected by our quality system.'
  },
  // 展会类
  'canton-fair-2024-phase2': {
    inlineTitle: 'Could Not Attend Canton Fair?',
    inlineSub: 'Schedule a virtual factory tour or video meeting with our sales team. Full catalog and pricing available digitally.',
    boxedTitle: 'Meet Us at the Next Trade Show',
    boxedSub: 'Canton Fair, IFA Berlin, CES Las Vegas — we exhibit globally. Schedule a meeting or visit our booth.',
    footerTitle: 'Connect with HouseTech at Industry Events',
    footerSub: '200+ buyer meetings per exhibition. Virtual and in-person meeting options. Contact us for the next event schedule.'
  },
  'ifa-berlin-2024-success': {
    inlineTitle: 'Interested in European Distribution?',
    inlineSub: 'We signed 35 new distributors at IFA Berlin. Exclusive territory partnerships still available in select regions.',
    boxedTitle: 'Become a HouseTech Distributor',
    boxedSub: 'Exclusive regional distribution agreements. Marketing support, training, and competitive margins. Apply for your territory.',
    footerTitle: 'European Distribution Partner Program',
    footerSub: '35 new distributors joined at IFA 2024. Full product training. Local warehouse support. Apply for exclusive territory rights.'
  },
  // 公司新闻类
  '10-years-excellence-anniversary': {
    inlineTitle: 'Looking for a Stable Long-Term Manufacturing Partner?',
    inlineSub: '10 years in business. 30,000m² facility. 500+ employees. No supplier risk — we have the capacity and stability you need.',
    boxedTitle: 'Partner with a Proven Manufacturer',
    boxedSub: 'Decade of consistent delivery. Financial stability. Multi-year contracts welcomed. Your supply chain secured.',
    footerTitle: '10 Years of Manufacturing Excellence',
    footerSub: 'Stable ownership. No debt. Reinvesting profits into capacity and quality. A partner you can count on for the long term.'
  },
  'factory-expansion-production-capacity': {
    inlineTitle: 'Need Higher Production Capacity?',
    inlineSub: 'We just doubled our capacity to 2 million units/year with 12 new lines. Large orders welcome without lead time delays.',
    boxedTitle: 'Scale Your Orders with Confidence',
    boxedSub: '2 million units annual capacity. 12 new production lines. Large-volume OEM contracts with guaranteed delivery schedules.',
    footerTitle: 'High-Volume Manufacturing Partner',
    footerSub: 'Doubled capacity in 2024. 500,000-unit orders accepted. Flexible scheduling for seasonal demand spikes.'
  },
  'global-40-countries-journey': {
    inlineTitle: 'Need a Manufacturer with Global Export Experience?',
    inlineSub: 'Products in 40+ countries. We understand certifications, packaging, and logistics for every major market.',
    boxedTitle: 'Export to Any Market with Our Support',
    boxedSub: 'Europe, Middle East, Southeast Asia, North America — we know the regulations. CE, CB, ETL, SASO, GCC all handled.',
    footerTitle: 'Global Export Manufacturing Partner',
    footerSub: '40 countries served. Multi-language packaging. Regional voltage and gas type customization. Your global expansion partner.'
  },
  'southeast-asia-market-expansion': {
    inlineTitle: 'Expanding into Southeast Asia?',
    inlineSub: 'We have local support offices and understand regional preferences. Custom products for ASEAN markets available.',
    boxedTitle: 'Local Support for Southeast Asian Markets',
    boxedSub: 'Offices in Thailand and Vietnam. Local language support. Products adapted for tropical climates and regional gas types.',
    footerTitle: 'Your ASEAN Market Entry Partner',
    footerSub: '6 countries actively served. 45% annual growth in region. Local technical support and spare parts availability.'
  },
  // 合作类
  'european-distributor-partnership': {
    inlineTitle: 'Looking for European Distribution?',
    inlineSub: '5-year exclusive agreements available. 38% annual growth proven. Full OEM product lines for kitchen appliances.',
    boxedTitle: 'Become Our Exclusive Distributor',
    boxedSub: '12-country coverage. €12M first-year orders. Marketing support, training, and competitive OEM pricing.',
    footerTitle: 'European Distribution Partnership',
    footerSub: 'Proven growth: 38% annually. Exclusive territories. Full product range. Marketing co-investment. Apply now.'
  },
  'german-brand-oem-success': {
    inlineTitle: 'Need German-Quality Manufacturing at China Prices?',
    inlineSub: '99.7% yield rate for German OEM partner. 8-year relationship. Precision engineering meets cost efficiency.',
    boxedTitle: 'Match German Quality Standards',
    boxedSub: 'German brand OEM reference available. Same quality controls. ISO9001 + VDA 6.3 processes. Audit welcome.',
    footerTitle: 'German-Standard OEM Manufacturing',
    footerSub: '8-year German brand partnership. 150,000 units/year. Zero quality escapes. Your brand deserves this level of care.'
  },
  // 奖项类
  'red-dot-design-award-2024': {
    inlineTitle: 'Want Award-Winning Design for Your Products?',
    inlineSub: 'Red Dot 2024 winner. Our design team creates products that stand out on retail shelves and win industry recognition.',
    boxedTitle: 'Design Products That Win Awards',
    boxedSub: 'In-house industrial design team. Red Dot, iF, and Good Design award track record. Elevate your brand perception.',
    footerTitle: 'Award-Winning Design Partner',
    footerSub: 'Red Dot 2024. Design-driven development. Products that command premium pricing. Design excellence as your competitive edge.'
  },
  // 可持续类
  'carbon-neutral-manufacturing': {
    inlineTitle: 'Need Sustainable Manufacturing for Your Brand?',
    inlineSub: '30% annual emission reduction. 25% solar power. ISO14001 certified. Meet your ESG goals with our green factory.',
    boxedTitle: 'Manufacture with Carbon-Neutral Processes',
    boxedSub: 'Solar-powered production. Recyclable packaging. Waste reduction programs. Carbon footprint documentation for your marketing.',
    footerTitle: 'Sustainable Manufacturing Partner',
    footerSub: 'ISO14001 certified. 30% emission reduction achieved. Green factory audit welcome. Help your customers meet their ESG targets.'
  },
  // 2026年新文章（自动化生成）
  '2026-06-housetech-develops-breakthrough-airpure-plus-technology-for-kitchen-appliances': {
    inlineTitle: 'Want AirPure Plus Technology in Your Products?',
    inlineSub: 'License our noise reduction technology for your range hood line. Measurable performance improvements for your brand.',
    boxedTitle: 'Integrate AirPure Plus into Your Line',
    boxedSub: 'Proprietary noise reduction system. Available for OEM licensing. Custom integration support included.',
    footerTitle: 'Technology Licensing Partner',
    footerSub: 'AirPure Plus available for brand integration. Full technical support. Patent protection. Exclusive deals possible.'
  },
  '2026-06-housetech-introduces-premium-kitchen-set-collection-for-international-markets': {
    inlineTitle: 'Want Complete Kitchen Sets for Your Catalog?',
    inlineSub: 'Range hood + gas stove + oven + water heater bundles. Coordinated design. Single supplier. Simplified logistics.',
    boxedTitle: 'Launch a Complete Kitchen Appliance Line',
    boxedSub: 'Matched designs across 4 product categories. Shared packaging. Coordinated certifications. One PO, one delivery.',
    footerTitle: 'Full Kitchen Appliance Line Partner',
    footerSub: 'Bundle pricing advantages. Coordinated product launches. Shared marketing assets. Simplify your supply chain.'
  },
  '2026-07-housetech-invites-global-partners-to-ambiente-frankfurt-2026-in-frankfurt-german': {
    inlineTitle: 'Will You Be at Ambiente Frankfurt 2026?',
    inlineSub: 'Meet our team in person. See our full product range. Discuss OEM partnerships and distribution opportunities.',
    boxedTitle: 'Schedule a Meeting at Ambiente Frankfurt',
    boxedSub: 'Hall 8.0, Stand B-42. Private meeting rooms available. Product demos and OEM consultations. Reserve your slot.',
    footerTitle: 'See You at Ambiente Frankfurt 2026',
    footerSub: 'January 30 - February 3, 2026. Frankfurt, Germany. Schedule a meeting or stop by our booth for a product demo.'
  }
};

function getCTAForFile(filename) {
  const base = filename.replace('.astro', '');
  // Try exact match first
  if (ctaMap[base]) return ctaMap[base];
  // Try partial match
  for (const key of Object.keys(ctaMap)) {
    if (base.includes(key) || key.includes(base)) return ctaMap[key];
  }
  // Default fallback
  return {
    inlineTitle: 'Need Custom Kitchen Appliances?',
    inlineSub: 'From OEM to ODM, we deliver tailored solutions for your market. Factory-direct pricing, full certification support, and flexible MOQ.',
    boxedTitle: 'Ready to Develop Your Custom Product Line?',
    boxedSub: 'HouseTech provides end-to-end OEM/ODM services — from concept design to mass production. Get factory-direct pricing with full certification support.',
    footerTitle: 'Partner with HouseTech for Your Next Product Launch',
    footerSub: '15+ years of manufacturing excellence. 500+ employees. 30,000m² facility. Serving 50+ countries. Let us build your brand together.'
  };
}

let modifiedCount = 0;

for (const file of files) {
  const filepath = join(newsDir, file);
  let content = readFileSync(filepath, 'utf-8');
  
  const cta = getCTAForFile(file);
  let modified = false;
  
  // Replace inline CTA
  if (content.includes('Need Custom Kitchen Appliances?') || content.includes('Need Range Hoods') || content.includes('Need Tier-1') || content.includes('Want 99.8%') || content.includes('Could Not Attend')) {
    // Already has some personalized CTA from previous run, skip or replace all
  }
  
  // Use regex to replace the inline CTA block
  const inlinePattern = /<div style="background:linear-gradient\(135deg, rgba\(247,147,30,0\.08\)[\s\S]*?<\/div>\s*(?=\s*<h2|$)/;
  const newInline = `<div style="background:linear-gradient(135deg, rgba(247,147,30,0.08), rgba(10,37,64,0.05));border-left:4px solid var(--color-accent);padding:var(--spacing-md) var(--spacing-lg);border-radius:0 var(--radius-md) var(--radius-md) 0;margin:var(--spacing-lg) 0;">
          <p style="font-weight:600;color:var(--color-primary);margin-bottom:var(--spacing-xs);font-size:var(--font-size-sm);">${cta.inlineTitle}</p>
          <p style="color:var(--color-text-light);font-size:var(--font-size-sm);margin-bottom:var(--spacing-sm);">${cta.inlineSub}</p>
          <a href="/contact" class="btn btn-sm btn-primary" style="text-decoration:none;">Get OEM Quote →</a>
        </div>`;
  
  if (content.match(/background:linear-gradient\(135deg, rgba\(247,147,30,0\.08\)/)) {
    content = content.replace(/<div style="background:linear-gradient\(135deg, rgba\(247,147,30,0\.08\)[\s\S]*?<\/div>(?=\s*\n\s*<h2|)/, newInline);
    modified = true;
  }
  
  // Replace boxed CTA
  const boxedPattern = /<div style="background:linear-gradient\(135deg, var\(--color-primary\), #1a4a7a\)[\s\S]*?<\/div>\s*<\/div>/;
  const newBoxed = `<div style="background:linear-gradient(135deg, var(--color-primary), #1a4a7a);border-radius:var(--radius-lg);padding:var(--spacing-xl);margin:var(--spacing-xl) 0;text-align:center;color:white;">
          <h3 style="font-size:var(--font-size-xl);margin-bottom:var(--spacing-sm);color:white;">${cta.boxedTitle}</h3>
          <p style="color:rgba(255,255,255,0.85);margin-bottom:var(--spacing-lg);max-width:600px;margin-left:auto;margin-right:auto;">${cta.boxedSub}</p>
          <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-sm);justify-content:center;">
            <a href="/contact" class="btn btn-primary" style="text-decoration:none;">Get OEM Quote →</a>
            <a href="/download" class="btn btn-outline-white" style="text-decoration:none;">Download Catalog</a>
            <a href="/contact" class="btn btn-outline-white" style="text-decoration:none;">Request Sample</a>
          </div>
        </div>`;
  
  if (content.match(/background:linear-gradient\(135deg, var\(--color-primary\), #1a4a7a\)/)) {
    content = content.replace(/<div style="background:linear-gradient\(135deg, var\(--color-primary\), #1a4a7a\)[\s\S]*?<\/div>\s*<\/div>(?=\s*\n\s*<div style="background:var\(--color-bg-alt\)|\s*\n\s*<nav)/, newBoxed);
    modified = true;
  }
  
  // Replace footer CTA
  const footerPattern = /<div style="background:var\(--color-bg-elevated\);border:2px solid var\(--color-accent\)[\s\S]*?<\/div>\s*<\/div>/;
  const newFooter = `<div style="background:var(--color-bg-elevated);border:2px solid var(--color-accent);border-radius:var(--radius-lg);padding:var(--spacing-xl);margin:var(--spacing-xl) 0;text-align:center;">
          <h3 style="font-size:var(--font-size-lg);margin-bottom:var(--spacing-sm);color:var(--color-primary);">${cta.footerTitle}</h3>
          <p style="color:var(--color-text-light);margin-bottom:var(--spacing-lg);max-width:600px;margin-left:auto;margin-right:auto;">${cta.footerSub}</p>
          <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-sm);justify-content:center;">
            <a href="/contact" class="btn btn-primary" style="text-decoration:none;">Contact Sales →</a>
            <a href="/download" class="btn btn-accent-outline" style="text-decoration:none;">Download Catalog</a>
            <a href="/service" class="btn btn-accent-outline" style="text-decoration:none;">View OEM Services</a>
          </div>
        </div>`;
  
  if (content.match(/background:var\(--color-bg-elevated\);border:2px solid var\(--color-accent\)/)) {
    content = content.replace(/<div style="background:var\(--color-bg-elevated\);border:2px solid var\(--color-accent\)[\s\S]*?<\/div>\s*<\/div>(?=\s*\n\s*<nav)/, newFooter);
    modified = true;
  }
  
  if (modified) {
    writeFileSync(filepath, content, 'utf-8');
    modifiedCount++;
    console.log(`✅ Updated CTA: ${file}`);
  } else {
    console.log(`⏭️ No CTA found: ${file}`);
  }
}

console.log(`\n📊 Total updated: ${modifiedCount}/${files.length}`);
