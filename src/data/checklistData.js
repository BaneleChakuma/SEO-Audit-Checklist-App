// Checklist data — 3 categories, 6 items each (18 total).
// Each category groups related SEO checks; each item has a weight for future scoring.

const checklistData = [
  {
    id: 'on-page',
    name: 'On-Page SEO',
    description: 'Checks on individual pages: titles, headings, and content structure.',
    items: [
      {
        id: 'onpage-title-tag',
        title: 'Page has a unique title tag',
        description: 'Every page should have one <title> tag, 50–60 characters, with the main keyword.',
        fixTip: 'Add a unique <title> in your page <head> or CMS SEO settings.',
        weight: 5,
      },
      {
        id: 'onpage-meta-description',
        title: 'Page has a meta description',
        description: 'A short summary (150–160 characters) shown in search results.',
        fixTip: 'Add <meta name="description" content="..."> in the <head>.',
        weight: 5,
      },
      {
        id: 'onpage-h1-tag',
        title: 'Page has one H1 heading',
        description: 'Each page should have a single H1 that clearly states the main topic.',
        fixTip: 'Use one <h1> per page and make it match the page topic.',
        weight: 5,
      },
      {
        id: 'onpage-image-alt',
        title: 'Images have descriptive alt text',
        description: 'Important images should include alt attributes that describe the image.',
        fixTip: 'Add alt="..." to <img> tags, especially for content and product images.',
        weight: 5,
      },
      {
        id: 'onpage-url-structure',
        title: 'URLs are clean and readable',
        description: 'URLs should be short, lowercase, and use hyphens instead of random IDs.',
        fixTip: 'Use readable slugs like /seo-audit-checklist instead of /page?id=123.',
        weight: 5,
      },
      {
        id: 'onpage-canonical',
        title: 'Canonical tag is set correctly',
        description: 'Pages with duplicate or similar content should point to the preferred URL.',
        fixTip: 'Add <link rel="canonical" href="..."> to the preferred version of the page.',
        weight: 5,
      },
    ],
  },
  {
    id: 'technical',
    name: 'Technical SEO',
    description: 'Site-wide technical health: speed, crawlability, and mobile readiness.',
    items: [
      {
        id: 'technical-https',
        title: 'Site uses HTTPS',
        description: 'All pages should load over a secure connection (padlock in the browser).',
        fixTip: 'Install an SSL certificate and redirect HTTP to HTTPS.',
        weight: 5,
      },
      {
        id: 'technical-mobile-friendly',
        title: 'Site is mobile-friendly',
        description: 'Layout and text should work well on phones and tablets.',
        fixTip: 'Use responsive design and test with Google Mobile-Friendly Test.',
        weight: 5,
      },
      {
        id: 'technical-sitemap',
        title: 'XML sitemap exists and is submitted',
        description: 'A sitemap helps search engines discover all important pages on your site.',
        fixTip: 'Create a sitemap.xml and submit it in Google Search Console.',
        weight: 5,
      },
      {
        id: 'technical-robots-txt',
        title: 'robots.txt is configured correctly',
        description: 'robots.txt should not accidentally block important pages from being crawled.',
        fixTip: 'Review /robots.txt and remove Disallow rules for pages you want indexed.',
        weight: 5,
      },
      {
        id: 'technical-page-speed',
        title: 'Core pages load in under 3 seconds',
        description: 'Slow pages hurt rankings and user experience, especially on mobile.',
        fixTip: 'Compress images, enable caching, and reduce unused JavaScript.',
        weight: 5,
      },
      {
        id: 'technical-broken-links',
        title: 'No broken internal links (404s)',
        description: 'Broken links frustrate users and waste crawl budget.',
        fixTip: 'Run a crawl with Screaming Frog or Search Console and fix 404 links.',
        weight: 5,
      },
    ],
  },
  {
    id: 'content',
    name: 'Content SEO',
    description: 'Quality and structure of your written content for search and users.',
    items: [
      {
        id: 'content-heading-structure',
        title: 'Pages use proper heading hierarchy',
        description: 'One H1 per page, then H2/H3 in logical order — not skipped levels.',
        fixTip: 'Restructure headings so H1 is the main topic and subsections use H2, H3.',
        weight: 5,
      },
      {
        id: 'content-internal-links',
        title: 'Important pages have internal links',
        description: 'Key pages should be linked from other relevant pages on your site.',
        fixTip: 'Add contextual links from blog posts or nav to your priority pages.',
        weight: 5,
      },
      {
        id: 'content-keyword-usage',
        title: 'Target keyword appears naturally in content',
        description: 'The main keyword should appear in the opening paragraph without stuffing.',
        fixTip: 'Rewrite the intro to include your target phrase once, in a natural sentence.',
        weight: 5,
      },
      {
        id: 'content-word-count',
        title: 'Key pages have sufficient depth',
        description: 'Thin pages often struggle to rank — aim for enough depth to answer the query.',
        fixTip: 'Expand thin pages with useful sections, FAQs, or examples.',
        weight: 5,
      },
      {
        id: 'content-duplicate',
        title: 'No duplicate content across pages',
        description: 'Multiple pages with near-identical content can confuse search engines.',
        fixTip: 'Merge similar pages or use canonical tags to point to the preferred version.',
        weight: 5,
      },
      {
        id: 'content-freshness',
        title: 'Important content is up to date',
        description: 'Outdated stats, prices, or product info hurt trust and rankings.',
        fixTip: 'Review top pages yearly and update dates, figures, and screenshots.',
        weight: 5,
      },
    ],
  },
];

export default checklistData;
