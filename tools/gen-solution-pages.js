// Generates solutions/<slug>.html for every entry in assets/js/data/solutions.js.
// Run after adding a solution:  node tools/gen-solution-pages.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/data/solutions.js'), 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/i18n/en.js'), 'utf8'), ctx);
const sols = ctx.window.IFD_SOLUTIONS, en = ctx.window.IFD_I18N_DICT.en;
const strip = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

fs.mkdirSync(path.join(root, 'solutions'), { recursive: true });
// IntelliDOC (document-ai) and IntelliCALL (voice-bot) have their own hand-built pages
const CUSTOM = ['document-ai', 'voice-bot'];
for (const s of sols) {
  if (CUSTOM.includes(s.slug)) continue;
  const d = en.sol[s.slug];
  const html = `<!DOCTYPE html>
<html lang="en" data-root="../">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${strip(d.name)} — Infodation AI Studio</title>
<meta name="description" content="${strip(d.lead).replace(/"/g, '&quot;')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@500;700&display=swap">
<link rel="stylesheet" href="../assets/css/main.css">
<script src="../assets/js/palettes.js"></script>
<script src="../assets/js/config.js"></script>
<script src="../assets/js/theme.js"></script>
</head>
<body class="bp-page" data-solution="${s.slug}">
<div class="page">
<div data-layout="bp-header"></div>
<main id="main"></main>
<div data-layout="footer"></div>
</div>
<script src="../assets/js/i18n/en.js"></script>
<script src="../assets/js/i18n/vi.js"></script>
<script src="../assets/js/i18n/nl.js"></script>
<script src="../assets/js/i18n.js"></script>
<script src="../assets/js/data/solutions.js"></script>
<script src="../assets/js/docs.js"></script>
<script src="../assets/js/layout.js"></script>
<script src="../assets/js/motion.js"></script>
<script src="../assets/js/reveal.js"></script>
<script src="../assets/js/pages/demos.js"></script>
<script src="../assets/js/pages/detail.js"></script>
<script src="../assets/js/app.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, 'solutions', s.slug + '.html'), html);
  console.log('solutions/' + s.slug + '.html');
}
