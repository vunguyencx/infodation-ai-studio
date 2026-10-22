/* Shared header / footer + small helpers used by every page. */
(function () {
  var ROOT = document.documentElement.getAttribute('data-root') || '';
  var I = window.IFD_I18N, S = window.IFD_SITE;
  var t = I.t;

  var ICON = {
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
    pin: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s-7.5-6.4-7.5-11.5a7.5 7.5 0 0 1 15 0C19.5 15.6 12 22 12 22z" fill="var(--note)"/><circle cx="12" cy="10.5" r="2.8" fill="#FFFFFF"/></svg>',
    check: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--live)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    shield: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function url(p) { return ROOT + p; }
  function solUrl(slug) { return url('solutions/' + slug + '.html'); }

  function langSwitch() {
    return '<div class="lang" role="group" data-i18n-attr="aria-label:nav.lang">' +
      I.langs.map(function (l) { return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === I.lang) + '">' + l.toUpperCase() + '</button>'; }).join('') +
      '</div>';
  }

  function header(kind, current) {
    var bp = kind === 'bp', sol = kind === 'sol';
    // solution pages: IntelliCAD (dark blueprint header) and IntelliDOC / IntelliCALL (light header, Vietnamese section ids)
    var links = bp || sol
      ? '<a class="back" href="' + url('solutions.html') + '" data-i18n="nav.back"></a>' +
        '<a href="#demo" data-i18n="nav.demoLink"></a>' +
        '<a href="' + (sol ? '#ho-so-giai-phap' : '#solution-profile') + '" data-i18n="nav.solProfile"></a>' +
        langSwitch() +
        '<a href="' + (sol ? '#lien-he' : '#contact') + '" class="btn btn-accent btn-nav" data-i18n="nav.book60"></a>'
      : '<a href="' + url('solutions.html') + '"' + (current === 'solutions' ? ' aria-current="page"' : '') + ' data-i18n="nav.solutions"></a>' +
        '<a href="' + url('technologies.html') + '"' + (current === 'tech' ? ' aria-current="page"' : '') + ' data-i18n="nav.tech"></a>' +
        '<a href="' + url('index.html#profile') + '" data-spy="profile" data-i18n="nav.profile"></a>' +
        langSwitch() +
        '<a href="' + url('index.html#contact') + '" class="btn btn-accent btn-nav" data-i18n="nav.demo"></a>';
    return '<a class="skip" href="#main" data-i18n="nav.skip"></a>' +
      '<header class="site-header' + (bp ? ' bp-header' : sol ? ' bp-header sol-header' : '') + '"><div class="wrap bar">' +
      '<a href="' + url('index.html') + '" class="brand"><img src="' + url(bp || sol ? 'assets/img/logo-white.svg' : 'assets/img/logo-ink.svg') + '" alt="Infodation" width="128" height="34"><span class="studio-tag">AI STUDIO</span></a>' +
      '<button type="button" class="menu-btn" aria-expanded="false" aria-controls="main-nav" data-i18n="nav.menu"></button>' +
      '<nav id="main-nav" class="main-nav" data-i18n-attr="aria-label:' + (bp || sol ? 'nav.detailNav' : 'nav.main') + '">' + links + '</nav>' +
      '</div></header>';
  }

  function footer() {
    return '<footer class="footer"><div class="wrap top">' +
      '<div class="brandcol"><div style="display:flex;align-items:center;gap:12px"><img src="' + url('assets/img/logo-white.svg') + '" alt="Infodation" width="143" height="38"><span class="studio-tag">AI STUDIO</span></div>' +
      '<p class="quote" data-i18n="footer.quote"></p></div>' +
      '<div class="fcols">' +
      '<div class="fcol"><span class="fcol-h" data-i18n="footer.studio"></span>' +
      '<a href="' + url('solutions.html') + '" data-i18n="nav.solutions"></a>' +
      '<a href="' + url('technologies.html') + '" data-i18n="nav.tech"></a>' +
      '<a href="' + url('index.html#profile') + '" data-i18n="footer.profilePdf"></a>' +
      '<a href="' + S.website + '">www.infodation.ai</a></div>' +
      '<div class="fcol"><span class="fcol-h" data-i18n="footer.offices"></span><span data-i18n="footer.hq"></span><span data-i18n="footer.eng"></span><span data-i18n="footer.us"></span></div>' +
      '</div></div>' +
      '<div class="wrap bottom"><span data-i18n="footer.copy"></span><span data-i18n="footer.cyber"></span></div></footer>';
  }

  function mount() {
    document.querySelectorAll('[data-layout]').forEach(function (el) {
      var k = el.getAttribute('data-layout');
      el.outerHTML = k === 'footer' ? footer() : header(k === 'bp-header' ? 'bp' : k === 'sol-header' ? 'sol' : 'light', el.getAttribute('data-current'));
    });
    icons(document);
    spy();
  }
  // On the home page, underline "Company profile" while its section is on screen (same style as the current page link)
  function spy() {
    var link = document.querySelector('[data-spy="profile"]'), sec = document.getElementById('profile');
    if (!link || !sec) return;
    function check() {
      var r = sec.getBoundingClientRect(), mid = innerHeight * 0.4;
      if (r.top < mid && r.bottom > mid) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    }
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    check();
  }
  function arrows(root) {
    (root || document).querySelectorAll('a, button').forEach(function (el) {
      if (el.querySelector('.arw')) return;
      var n = el.lastChild;
      while (n && n.nodeType === 1 && !n.classList.contains('arw') && n.namespaceURI === 'http://www.w3.org/1999/xhtml') n = n.lastChild;
      if (!n || n.nodeType !== 3) return;
      var m = n.textContent.match(/^([\s\S]*?)\s*([→↓])\s*$/);
      if (!m) return;
      n.textContent = m[1] + ' ';
      var a = document.createElement('span'); a.className = 'arw'; a.setAttribute('aria-hidden', 'true'); a.textContent = m[2];
      n.parentNode.insertBefore(a, n.nextSibling);
    });
  }
  function icons(root) {
    root.querySelectorAll('[data-icon]').forEach(function (el) {
      if (!el.firstChild) el.innerHTML = ICON[el.getAttribute('data-icon')] || '';
    });
  }

  // delegated UI: language buttons, mobile menu, closing menu on navigation
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (b) { I.set(b.getAttribute('data-lang')); return; }
    var m = e.target.closest('.menu-btn');
    if (m) {
      var h = m.closest('.site-header'), open = !h.classList.contains('open');
      h.classList.toggle('open', open); m.setAttribute('aria-expanded', String(open));
      return;
    }
    var a = e.target.closest('.main-nav a');
    if (a) { var hh = a.closest('.site-header'); if (hh) hh.classList.remove('open'); }
  });

  /* Forms have no backend: validate, then hand the message to the visitor's mail client. */
  function bindMailForm(form, opts) {
    if (form._bound) return; form._bound = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var name = form.querySelector('[name=name]').value.trim();
      var email = form.querySelector('[name=email]').value.trim();
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.className = 'form-msg err'; msg.textContent = I.tx('contact.required'); return;
      }
      var lines = [];
      form.querySelectorAll('input, select, textarea').forEach(function (f) {
        if (!f.name || !f.value.trim()) return;
        var lab = f.closest('label'), sp = lab && lab.querySelector('span');
        var l = sp ? sp.textContent.trim() : f.name;
        lines.push(l + ': ' + f.value.trim());
      });
      lines.push('', location.href);
      var href = 'mailto:' + (opts.to || S.email) + '?subject=' + encodeURIComponent(opts.subject()) + '&body=' + encodeURIComponent(lines.join('\n'));
      msg.className = 'form-msg ok'; msg.textContent = I.tx('contact.ok');
      location.href = href;
    });
  }

  /* Documents uploaded in admin → assets/js/docs.js. Each key has one PDF per language;
   * visitors get the file in the page language, else the English one, else the built-in default. */
  var DOC_DEFAULT = { 'company-profile': S.companyPdf, 'intellicad': 'assets/docs/IntelliCAD_Solution-profile.pdf' };
  var DOC_NAME = { 'company-profile': 'Infodation_Company-profile', 'intellicad': 'IFD_IntelliCAD_Capability-Brief', 'document-ai': 'IFD_IntelliDOC_Capability-Brief', 'voice-bot': 'IFD_IntelliCALL_Capability-Brief' };
  function doc(key) {
    var d = (window.IFD_DOCS || {})[key] || {}, lang = d[I.lang] ? I.lang : 'en', e = d[lang];
    if (e) return { url: url(e.path) + '?v=' + Date.parse(e.updated), size: e.size, lang: lang, file: (DOC_NAME[key] || key) + '_' + lang.toUpperCase() + '.pdf' };
    if (DOC_DEFAULT[key]) return { url: url(DOC_DEFAULT[key]), size: 0, lang: 'en', file: (DOC_NAME[key] || key) + '.pdf' };
    return null;
  }
  function fmtSize(b) {
    if (!b) return '';
    var mb = b / 1048576, v = mb >= 1 ? mb.toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
    return I.lang === 'en' ? v : v.replace('.', ',');
  }
  // fill every [data-doc] link and [data-doc-size] label on the page
  function docs(root) {
    (root || document).querySelectorAll('[data-doc]').forEach(function (el) {
      var d = doc(el.getAttribute('data-doc'));
      if (!d) { el.hidden = true; return; }
      el.hidden = false;
      el.setAttribute('href', d.url);
      if (el.hasAttribute('download')) el.setAttribute('download', d.file);
      el.setAttribute('hreflang', d.lang);
    });
    (root || document).querySelectorAll('[data-doc-size]').forEach(function (el) {
      var d = doc(el.getAttribute('data-doc-size')), s = d && fmtSize(d.size);
      el.textContent = s ? ' · ' + s : '';
    });
  }

  window.IFD_UI = { ROOT: ROOT, ICON: ICON, esc: esc, url: url, solUrl: solUrl, mount: mount, icons: icons, arrows: arrows, doc: doc, docs: docs, bindMailForm: bindMailForm };
})();
