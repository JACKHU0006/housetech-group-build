/**
 * HouseTech Group - 新闻内容模板库
 * 提供多种类型的新闻模板：产品发布、技术创新、市场活动、合作伙伴、奖项认证、可持续发展
 * 所有内容均为行业通用知识，可安全公开
 */

export const NEWS_TEMPLATES = {
  'product-launch': {
    name: 'Product Launch',
    category: 'Product Launch',
    gradient: 'linear-gradient(135deg, #0066ff, #0a2540)',
    icon: 'rocket',
    titles: [
      'HouseTech Launches Next-Generation {productType} Series for Global B2B Partners',
      'HouseTech Unveils Advanced {productType} Line with Enhanced Smart Features',
      'New {productType} Series from HouseTech Sets Industry Standards for OEM Excellence',
      'HouseTech Introduces Premium {productType} Collection for International Markets',
      'HouseTech Expands {productType} Portfolio with Innovative {feature} Technology',
      'HouseTech Announces Flagship {productType} Series for European and North American Brands',
    ],
    products: ['Range Hood', 'Induction Cooker', 'Gas Stove', 'Ceramic Cooker', 'Oven', 'Air Fryer', 'Water Heater', 'Kitchen Set'],
    features: ['IoT Connectivity', 'Energy-Efficient', 'AI-Powered', 'Voice Control', 'Auto-Cleaning', 'Smart Sensor', 'Inverter Technology', 'Steam Assist'],
    locations: ['Shenzhen, China', 'Hong Kong', 'Frankfurt, Germany', 'Las Vegas, USA', 'Milan, Italy'],
    excerptTemplate: 'HouseTech Group unveils its latest {productType} series featuring {feature} technology, designed specifically for OEM/ODM partners and global B2B distributors seeking premium kitchen appliances.',
    sections: [
      {
        heading: 'Product Highlights',
        type: 'list',
        items: [
          'Premium-grade construction using food-safe stainless steel and tempered glass for long-term durability',
          'Advanced {feature} system that adapts to user behavior and environmental conditions',
          'Energy efficiency rating that meets or exceeds EU A+++ and ENERGY STAR standards',
          'Modular design enabling flexible OEM branding, color customization, and packaging options',
        ],
      },
      {
        heading: 'OEM/ODM Customization Options',
        type: 'paragraph',
        content: 'HouseTech Group provides comprehensive OEM/ODM services including private labeling, custom color matching, packaging design, user manual localization in 20+ languages, and flexible minimum order quantities starting at 500 units. Our dedicated engineering team works directly with brand partners from concept to mass production.',
      },
      {
        heading: 'Manufacturing Excellence',
        type: 'paragraph',
        content: 'Produced at HouseTech Group ISO 9001-certified manufacturing facility with an annual production capacity of 1 million units, the new {productType} series benefits from fully automated production lines, rigorous quality control at six inspection points, and a 2-year comprehensive warranty backed by global spare parts inventory.',
      },
      {
        heading: 'Market Availability',
        type: 'paragraph',
        content: 'The new {productType} series is now available for sampling and bulk orders. HouseTech Group invites distributors, brand owners, and retail chains to schedule factory visits and product demonstrations. Sample units can be shipped within 7 business days for qualified B2B partners.',
      },
    ],
  },

  'technology-innovation': {
    name: 'Technology Innovation',
    category: 'Technology',
    gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    icon: 'cpu',
    titles: [
      'HouseTech Develops Breakthrough {techName} Technology for Kitchen Appliances',
      'HouseTech R&D Team Achieves Major Milestone in {techField} Innovation',
      'New {techName} System from HouseTech Sets New Performance Benchmarks',
      'HouseTech Patents Innovative {techName} Technology for {productType} Applications',
      'HouseTech Engineering Team Completes {techName} Development Program',
    ],
    techFields: ['Air Filtration', 'Heat Recovery', 'Noise Reduction', 'Energy Recovery', 'Smart Sensing', 'Motor Efficiency', 'Grease Separation', 'Inverter Control'],
    techNames: ['CycloClean Pro', 'SilentFlow', 'EcoRecover', 'SmartSense AI', 'PowerCore Inverter', 'NanoGuard', 'AirPure Plus', 'ThermoShield'],
    productTypes: ['Range Hoods', 'Ovens', 'Induction Cookers', 'Kitchen Ventilation Systems', 'Air Fryers'],
    excerptTemplate: 'HouseTech Group announces the successful development of {techName} technology, delivering measurable improvements in {techField} for next-generation kitchen appliances.',
    sections: [
      {
        heading: 'Technical Breakthrough',
        type: 'paragraph',
        content: 'The {techName} technology represents two years of dedicated research and development by HouseTech Group engineering team. Through advanced {techField} algorithms and precision-engineered components, the new system achieves performance levels previously considered unattainable in mass-market kitchen appliances.',
      },
      {
        heading: 'Performance Improvements',
        type: 'list',
        items: [
          'Up to 35% improvement in energy efficiency compared to previous generation models',
          'Noise reduction of 8-12 decibels through proprietary acoustic engineering',
          '99.8% grease separation efficiency verified by independent laboratory testing',
          'Extended product lifespan with 25% reduction in component wear',
        ],
      },
      {
        heading: 'Industry Impact',
        type: 'paragraph',
        content: 'This innovation reinforces HouseTech Group position as a technology leader in the kitchen appliance OEM/ODM sector. The {techName} system is available for licensing and integration into partner products, with engineering support provided by our in-house R&D team based at the new Shenzhen Technology Center.',
      },
      {
        heading: 'Patent Protection',
        type: 'paragraph',
        content: 'HouseTech Group has filed multiple international patent applications covering the core innovations of {techName} technology. This intellectual property protection provides OEM partners with exclusive market advantages and differentiation opportunities in their respective regional markets.',
      },
    ],
  },

  'market-event': {
    name: 'Market Event',
    category: 'Exhibition',
    gradient: 'linear-gradient(135deg, #dc2626, #991b1b)',
    icon: 'calendar',
    titles: [
      'HouseTech to Exhibit at {eventName} {year} - Booth {boothNumber}',
      'HouseTech Group Confirms Participation in {eventName} {year}',
      'HouseTech Showcases OEM Solutions at {eventName} {year}',
      'HouseTech Invites Global Partners to {eventName} {year} in {city}',
      'HouseTech Group Prepares Major Showcase for {eventName} {year}',
    ],
    events: [
      { name: 'IFA Berlin', city: 'Berlin, Germany', booth: 'H6.2-128' },
      { name: 'CES Las Vegas', city: 'Las Vegas, USA', booth: 'Westgate-1812' },
      { name: 'Canton Fair Phase 2', city: 'Guangzhou, China', booth: 'Hall 4.1-K12' },
      { name: 'EuroCucina Milan', city: 'Milan, Italy', booth: 'Pad.9-A03' },
      { name: 'Kitchen & Bath China', city: 'Shanghai, China', booth: 'Hall 6.2-F18' },
      { name: 'Spoga+Gafa Cologne', city: 'Cologne, Germany', booth: 'Hall 9-D040' },
      { name: 'The Inspired Home Show', city: 'Chicago, USA', booth: 'Lakeside-3210' },
      { name: ' Ambiente Frankfurt', city: 'Frankfurt, Germany', booth: 'Hall 9.1-A21' },
    ],
    excerptTemplate: 'HouseTech Group announces its participation at {eventName} {year}, presenting the latest OEM/ODM kitchen appliance solutions to international brand partners and distributors.',
    sections: [
      {
        heading: 'Exhibition Overview',
        type: 'paragraph',
        content: 'HouseTech Group is pleased to announce its participation in {eventName} {year}, taking place in {city}. As one of the premier global exhibitions for the kitchen and home appliance industry, this event provides an ideal platform to showcase our latest OEM/ODM innovations to brand partners, distributors, and retail chains worldwide.',
      },
      {
        heading: 'Featured Products at the Show',
        type: 'list',
        items: [
          'Complete 2026 product line including smart range hoods, induction cookers, and built-in ovens',
          'Live demonstrations of new AI-powered kitchen appliance ecosystem',
          'OEM/ODM customization showcase featuring partner brand success stories',
          'Exclusive preview of Q3 2026 product launches with advance sampling opportunities',
        ],
      },
      {
        heading: 'B2B Meeting Opportunities',
        type: 'paragraph',
        content: 'HouseTech Group management team and senior engineers will be available throughout the exhibition for private B2B meetings. Partners and prospective clients are invited to schedule appointments in advance to discuss OEM/ODM cooperation, exclusive distribution agreements, and joint product development programs.',
      },
      {
        heading: 'Visit Our Booth',
        type: 'paragraph',
        content: 'Visitors to {eventName} {year} are warmly welcomed at HouseTech Group booth {boothNumber}. Pre-registered visitors will receive complimentary product samples and exclusive show-day pricing on opening orders. Contact our international business team to arrange your visit.',
      },
    ],
  },

  'partnership': {
    name: 'Partnership',
    category: 'Business',
    gradient: 'linear-gradient(135deg, #059669, #047857)',
    icon: 'handshake',
    titles: [
      'HouseTech Group Announces Strategic Partnership with {partnerType} {region}',
      'HouseTech Signs OEM Agreement with Leading {partnerType} Brand in {region}',
      'HouseTech Expands Distribution Network with {partnerType} Partner in {region}',
      'HouseTech Group Forms Joint Venture with {partnerType} for {region} Market',
      'HouseTech Partners with {partnerType} to Strengthen {region} Market Presence',
    ],
    partnerTypes: ['Appliance Distributor', 'Kitchen Brand', 'Retail Chain', 'Hospitality Group', 'Real Estate Developer', 'Home Builder'],
    regions: ['Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Netherlands', 'Poland', 'United Arab Emirates', 'Saudi Arabia', 'Australia', 'Japan', 'South Korea', 'Brazil', 'Mexico', 'Canada', 'Thailand', 'Vietnam', 'Indonesia', 'Philippines', 'South Africa'],
    excerptTemplate: 'HouseTech Group signs strategic partnership agreement with {partnerType} in {region}, expanding the company OEM/ODM service network and strengthening its presence in key international markets.',
    sections: [
      {
        heading: 'Partnership Announcement',
        type: 'paragraph',
        content: 'HouseTech Group is pleased to announce a new strategic partnership with a leading {partnerType} in {region}. This collaboration marks a significant milestone in HouseTech global expansion strategy and reinforces the company commitment to providing localized OEM/ODM services to brand partners across diverse markets.',
      },
      {
        heading: 'Partnership Scope',
        type: 'list',
        items: [
          'Exclusive distribution rights for HouseTech premium kitchen appliance lines in {region}',
          'Joint product development programs tailored to local consumer preferences and regulatory requirements',
          'Shared marketing investments including trade show participation, digital campaigns, and retail promotions',
          'Co-branded product lines leveraging both HouseTech manufacturing excellence and local market insights',
        ],
      },
      {
        heading: 'Strategic Value',
        type: 'paragraph',
        content: 'This partnership combines HouseTech Group decade-long manufacturing expertise with deep local market knowledge from our {region} partner. Together, we will deliver kitchen appliance solutions that meet the highest standards of quality, design, and value that consumers in {region} expect from premium brands.',
      },
      {
        heading: 'Market Outlook',
        type: 'paragraph',
        content: 'The {region} kitchen appliance market continues to show strong growth potential, driven by rising disposable income, urbanization trends, and increasing consumer interest in smart home technology. HouseTech Group is well-positioned to capture this growth through our expanded partnership network and agile OEM/ODM service model.',
      },
    ],
  },

  'award-certification': {
    name: 'Award & Certification',
    category: 'Awards',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    icon: 'trophy',
    titles: [
      'HouseTech Receives {certName} Certification for {productType} Manufacturing',
      'HouseTech Group Awarded {certName} Recognition for {category} Excellence',
      'HouseTech Achieves {certName} Milestone in Quality and Safety Standards',
      'HouseTech {productType} Series Receives Prestigious {certName} Certification',
      'HouseTech Group Honored with {certName} for {category} Achievement',
    ],
    certs: [
      { name: 'CE', fullName: 'European Conformity', region: 'European Union' },
      { name: 'ETL', fullName: 'ETL Listed', region: 'North America' },
      { name: 'UL', fullName: 'Underwriters Laboratories', region: 'North America' },
      { name: 'CCC', fullName: 'China Compulsory Certification', region: 'China' },
      { name: 'RoHS', fullName: 'Restriction of Hazardous Substances', region: 'European Union' },
      { name: 'REACH', fullName: 'REACH Compliance', region: 'European Union' },
      { name: 'ISO 9001:2015', fullName: 'Quality Management System', region: 'International' },
      { name: 'ISO 14001:2015', fullName: 'Environmental Management System', region: 'International' },
      { name: 'BSCI', fullName: 'Business Social Compliance Initiative', region: 'International' },
      { name: 'CB Scheme', fullName: 'IECEE CB Scheme', region: 'International' },
      { name: 'Energy Star', fullName: 'ENERGY STAR', region: 'North America' },
      { name: 'A+++', fullName: 'EU Energy Rating A+++', region: 'European Union' },
    ],
    categories: ['Quality Management', 'Environmental Sustainability', 'Product Safety', 'Energy Efficiency', 'Social Responsibility', 'Manufacturing Excellence', 'Innovation', 'Design Excellence'],
    productTypes: ['Range Hoods', 'Induction Cookers', 'Gas Stoves', 'Ovens', 'Air Fryers', 'Water Heaters', 'Complete Kitchen Sets'],
    excerptTemplate: 'HouseTech Group receives {certName} certification, validating the company commitment to international standards in {category} for {productType} products.',
    sections: [
      {
        heading: 'Certification Achievement',
        type: 'paragraph',
        content: 'HouseTech Group is proud to announce that its {productType} products have been awarded the {certName} certification by the relevant international certification body. This recognition validates the company unwavering commitment to meeting the highest standards of {category} across all product lines.',
      },
      {
        heading: 'Certification Scope',
        type: 'list',
        items: [
          'Comprehensive audit of manufacturing processes and quality management systems',
          'Independent laboratory testing of product samples across multiple performance criteria',
          'Verification of supply chain traceability and component sourcing practices',
          'Review of corporate social responsibility policies and worker safety standards',
        ],
      },
      {
        heading: 'Benefits for OEM Partners',
        type: 'paragraph',
        content: 'The {certName} certification provides HouseTech Group OEM/ODM partners with significant market access advantages. Brand partners can leverage these certifications to streamline their own regulatory approval processes, accelerate time-to-market in regulated markets, and demonstrate compliance to retail buyers and end consumers.',
      },
      {
        heading: 'Continuous Improvement',
        type: 'paragraph',
        content: 'HouseTech Group views certification as an ongoing journey rather than a destination. The company maintains dedicated compliance and quality assurance teams that continuously monitor regulatory developments across all major markets, ensuring that products and processes remain at the forefront of industry standards.',
      },
    ],
  },

  'sustainability': {
    name: 'Sustainability',
    category: 'Sustainability',
    gradient: 'linear-gradient(135deg, #10b981, #047857)',
    icon: 'leaf',
    titles: [
      'HouseTech Group Achieves {milestone} in Sustainable Manufacturing',
      'HouseTech Launches Eco-Friendly {productType} Series with {feature} Design',
      'HouseTech Group Commits to {milestone} as Part of {initiative}',
      'HouseTech Receives Recognition for {category} Sustainability Efforts',
      'HouseTech Group Publishes Annual {reportType} Highlighting {milestone}',
    ],
    milestones: [
      'Carbon Neutral Manufacturing Operations',
      '30% Reduction in Carbon Emissions',
      '100% Renewable Energy at Primary Facility',
      'Zero Waste to Landfill Certification',
      'ISO 14001 Environmental Management Certification',
      'Science-Based Targets Initiative Alignment',
      'UN Global Compact Signatory Status',
      '50% Recycled Material Content in Packaging',
    ],
    initiatives: ['UN Sustainable Development Goals', 'Paris Climate Agreement', 'EU Green Deal', 'China Dual Carbon Goals', 'Circular Economy Action Plan'],
    productTypes: ['Range Hoods', 'Induction Cookers', 'Air Fryers', 'Water Heaters', 'Complete Kitchen Solutions'],
    features: ['Energy-Efficient', 'Recyclable Materials', 'Reduced Packaging', 'Low-VOC Coating', 'Modular Repair-Friendly'],
    categories: ['Carbon Reduction', 'Water Conservation', 'Waste Minimization', 'Renewable Energy', 'Sustainable Sourcing', 'Product Lifecycle Management'],
    reportTypes: ['ESG Report', 'Sustainability Report', 'Carbon Disclosure Report', 'Corporate Social Responsibility Report'],
    excerptTemplate: 'HouseTech Group advances its sustainability agenda with {milestone}, demonstrating leadership in environmentally responsible manufacturing for the kitchen appliance industry.',
    sections: [
      {
        heading: 'Sustainability Milestone',
        type: 'paragraph',
        content: 'HouseTech Group is pleased to announce the achievement of {milestone} at its primary manufacturing facilities. This accomplishment reflects the company long-term strategic commitment to environmental stewardship and positions HouseTech as a sustainability leader within the global kitchen appliance OEM/ODM sector.',
      },
      {
        heading: 'Environmental Impact',
        type: 'list',
        items: [
          'Reduction of 12,000 tons of CO2 equivalent emissions annually through energy efficiency programs',
          'Installation of 8.5 MW rooftop solar capacity powering 40% of manufacturing operations',
          'Implementation of closed-loop water recycling systems reducing freshwater consumption by 65%',
          'Diversion of 95% of manufacturing waste from landfills through recycling and reuse programs',
        ],
      },
      {
        heading: 'Product Sustainability',
        type: 'paragraph',
        content: 'Beyond manufacturing operations, HouseTech Group integrates sustainability into product design through {feature} principles. The company offers OEM partners environmentally optimized product lines that help brands meet their own sustainability commitments while delivering high-performance kitchen appliances to conscious consumers.',
      },
      {
        heading: 'Future Commitments',
        type: 'paragraph',
        content: 'HouseTech Group sustainability roadmap extends through 2030 with ambitious targets aligned with {initiative}. The company continues to invest in clean technology, supplier engagement programs, and product innovation to drive continuous environmental improvement across the entire value chain.',
      },
    ],
  },
};

/**
 * 随机选择数组元素
 */
export function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 替换模板中的占位符
 */
export function fillTemplate(template, replacements) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return replacements[key] !== undefined ? replacements[key] : match;
  });
}

/**
 * 生成新闻数据
 */
export function generateNewsData(templateType, monthDate) {
  const template = NEWS_TEMPLATES[templateType];
  if (!template) {
    throw new Error(`Unknown template type: ${templateType}`);
  }

  let replacements = {};
  let title, excerpt, sections;

  if (templateType === 'product-launch') {
    const product = pickRandom(template.products);
    const feature = pickRandom(template.features);
    replacements = { productType: product, feature: feature };
    title = fillTemplate(pickRandom(template.titles), replacements);
    excerpt = fillTemplate(template.excerptTemplate, replacements);
    sections = template.sections.map(s => ({
      ...s,
      content: s.content ? fillTemplate(s.content, replacements) : s.content,
      items: s.items ? s.items.map(i => fillTemplate(i, replacements)) : s.items,
    }));
  } else if (templateType === 'technology-innovation') {
    const techName = pickRandom(template.techNames);
    const techField = pickRandom(template.techFields);
    const productType = pickRandom(template.productTypes);
    replacements = { techName, techField, productType };
    title = fillTemplate(pickRandom(template.titles), replacements);
    excerpt = fillTemplate(template.excerptTemplate, replacements);
    sections = template.sections.map(s => ({
      ...s,
      content: s.content ? fillTemplate(s.content, replacements) : s.content,
      items: s.items ? s.items.map(i => fillTemplate(i, replacements)) : s.items,
    }));
  } else if (templateType === 'market-event') {
    const event = pickRandom(template.events);
    const year = monthDate ? new Date(monthDate).getFullYear() : new Date().getFullYear();
    const eventFullName = `${event.name} ${year}`;
    const eventShort = event.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    replacements = { eventName: event.name, year, city: event.city, boothNumber: event.booth, eventShort };
    title = fillTemplate(pickRandom(template.titles), replacements);
    excerpt = fillTemplate(template.excerptTemplate, replacements);
    sections = template.sections.map(s => ({
      ...s,
      content: s.content ? fillTemplate(s.content, replacements) : s.content,
      items: s.items ? s.items.map(i => fillTemplate(i, replacements)) : s.items,
    }));
  } else if (templateType === 'partnership') {
    const partnerType = pickRandom(template.partnerTypes);
    const region = pickRandom(template.regions);
    replacements = { partnerType, region };
    title = fillTemplate(pickRandom(template.titles), replacements);
    excerpt = fillTemplate(template.excerptTemplate, replacements);
    sections = template.sections.map(s => ({
      ...s,
      content: s.content ? fillTemplate(s.content, replacements) : s.content,
      items: s.items ? s.items.map(i => fillTemplate(i, replacements)) : s.items,
    }));
  } else if (templateType === 'award-certification') {
    const cert = pickRandom(template.certs);
    const category = pickRandom(template.categories);
    const productType = pickRandom(template.productTypes);
    replacements = { certName: cert.fullName, category, productType, certShort: cert.name };
    title = fillTemplate(pickRandom(template.titles), replacements);
    excerpt = fillTemplate(template.excerptTemplate, replacements);
    sections = template.sections.map(s => ({
      ...s,
      content: s.content ? fillTemplate(s.content, replacements) : s.content,
      items: s.items ? s.items.map(i => fillTemplate(i, replacements)) : s.items,
    }));
  } else if (templateType === 'sustainability') {
    const milestone = pickRandom(template.milestones);
    const initiative = pickRandom(template.initiatives);
    const productType = pickRandom(template.productTypes);
    const feature = pickRandom(template.features);
    const category = pickRandom(template.categories);
    const reportType = pickRandom(template.reportTypes);
    replacements = { milestone, initiative, productType, feature, category, reportType };
    title = fillTemplate(pickRandom(template.titles), replacements);
    excerpt = fillTemplate(template.excerptTemplate, replacements);
    sections = template.sections.map(s => ({
      ...s,
      content: s.content ? fillTemplate(s.content, replacements) : s.content,
      items: s.items ? s.items.map(i => fillTemplate(i, replacements)) : s.items,
    }));
  }

  return {
    templateType,
    category: template.category,
    gradient: template.gradient,
    icon: template.icon,
    title,
    excerpt,
    sections,
    replacements,
  };
}
