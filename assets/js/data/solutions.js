/* Solution catalogue. Texts live in i18n/<lang>.js under sol.<slug>.
 * Every solution has its own page at solutions/<slug>.html.
 * Solution-profile PDFs are uploaded per language in admin.html → Documents (see assets/js/docs.js).
 * Without one the page offers "request by email".
 */
window.IFD_SOLUTIONS = [
  { slug: 'intellicad', n: '01', cat: 'xd', metric: '40–60%', demo: true, featured: true, version: '2026', page: true, brand: '#FF5A1F',
    cover: { vi: 'assets/img/intellicad-cover-vi.jpg', en: 'assets/img/intellicad-cover-en.jpg' },
    hero: { cls: 'c4', status: 'running' } },
  { slug: 'document-ai', n: '02', cat: 'tc', metric: '7–10×', version: '2026', page: true, brand: '#A1BD35', hero: { cls: 'c1', status: 'live6', tagKey: 'market.filters.tc' } },
  { slug: 'voice-bot', n: '03', cat: 'cskh', metric: '24/7', version: '2026', page: true, brand: '#6A54F0', hero: { cls: 'c2', status: 'multi' } },
  { slug: 'shrimp-counter', n: '04', cat: 'ts', metric: '95–99%', version: 'Pilot', hero: { cls: 'c3', status: 'pilot', ring: true } },
  { slug: 'predictive-analytics', n: '05', cat: 'vh', metric: '', version: '2026' },
  { slug: 'genai-tech-docs', n: '06', cat: 'it', metric: '', version: '2026' },
  { slug: 'ai-agents', n: '07', cat: 'any', metric: '', version: '2026' }
];

window.IFD_SITE = {
  email: 'sales@infodation.com',
  phone: '(+84) 2583 526 477', phoneHref: 'tel:+842583526477',
  companyPdf: 'assets/docs/Infodation-Vietnam_Company-profile.pdf',
  website: 'https://www.infodation.com',
  partners: ['Microsoft TAP Partner', 'Autodesk Developer Network'],
  certs: ['ISO/IEC 27001:2022', 'ICTWaarborg', 'SBB Accredited', 'Scrum Maturity Level 3'],
  // Logo khách hàng (assets/img/clients/<logo>), theo đúng thứ tự: hàng trên rồi hàng dưới
  clientLogos: [
    { name: 'Gridsz', logo: 'gridsz.svg' },
    { name: 'Kikker', logo: 'kikker.svg' },
    { name: 'TeamsCX', logo: 'teamscx.svg' },
    { name: 'Sportpartner', logo: 'sportpartner.svg' },
    { name: 'EE Accommodations', logo: 'ee-accommodations.svg' },
    { name: 'De Heus', logo: 'deheus.svg' },
    { name: 'Atlas', logo: 'atlas.svg' },
    { name: 'K-biz Consulting', logo: 'kbiz.png' },
    { name: 'SCB Global', logo: 'scbglobal.png' }
  ],
  // Ô chữ đứng sau các logo (cuối hàng dưới)
  clients: ['US market'],
  people: [
    { role: 'roleC', name: 'Lê Quốc Huy', email: 'huy.le@infodation.vn', phone: '(+84) 988 343 262', tel: '+84988343262' },
    { role: 'roleD', name: 'Nguyễn Đình Hoàng Vũ', email: 'vu.nguyen@infodation.vn', phone: '(+84) 908 270 582', tel: '+84908270582' }
  ]
};
