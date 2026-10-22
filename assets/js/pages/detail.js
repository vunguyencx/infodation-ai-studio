/* Solution detail page — one template for the blueprint-style solution pages (IntelliCAD design, v2). */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI, SOL = window.IFD_SOLUTIONS, SITE = window.IFD_SITE, X = window.IFD_DETAIL;
  var t = I.t, esc = U.esc;
  var slug = document.body.getAttribute('data-solution');
  var sol = SOL.filter(function (s) { return s.slug === slug; })[0];
  var k = 'sol.' + slug + '.';
  var demo = X.DEMOS[slug];

  function hero() {
    var name = t(k + 'name');
    var d = function (ms) { return ' style="--d:' + ms + 'ms"'; };
    return '<section class="bp"><div class="wrap" style="padding-top:40px;padding-bottom:56px"><div class="sheet">' +
      '<div class="sheet-cols" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span></div>' +
      '<div class="d-hero"><div class="d-copy">' +
      '<nav class="d-crumb rise-in"' + d(0) + ' aria-label="Breadcrumb"><a href="' + U.url('index.html') + '">' + t('detail.crumbStudio') + '</a> / <a href="' + U.url('solutions.html') + '">' + t('detail.crumbSol') + '</a> / ' + t(k + 'tag') + ' / <b>' + name + '</b></nav>' +
      '<span class="d-eyebrow rise-in"' + d(60) + '>' + t('detail.eyebrow') + '</span>' +
      '<h1 class="d-h1 rise-in' + (I.plain(name).length > 14 ? ' long' : '') + '"' + d(120) + '>' + name + '</h1>' +
      '<p class="d-sub rise-in"' + d(200) + '>' + t(k + 'sub') + '</p>' +
      '<p class="d-lead rise-in"' + d(270) + '>' + t(k + 'lead') + '</p>' +
      '<span class="d-tools rise-in"' + d(330) + '>' + t(k + 'tools') + '</span>' +
      '<div class="row rise-in" style="--d:390ms;gap:12px;padding-top:6px">' +
      '<a href="#demo" class="btn btn-accent btn-lg" style="padding:15px 26px">' + t('detail.heroDemo') + '</a>' +
      (U.doc(slug) ? '<a data-doc="' + slug + '" target="_blank" rel="noopener" class="btn btn-ghost btn-lg" style="padding:14px 24px">' + t('common.pdf') + '</a>'
        : '<a href="#solution-profile" class="btn btn-ghost btn-lg" style="padding:14px 24px">' + t('nav.solProfile') + '</a>') +
      '</div></div>' +
      '<figure class="d-fig">' + X.HERO[slug]() + '</figure></div>' +
      '<div class="title-block-wrap"><div class="title-block">' +
      '<div><div class="tb-l">' + t('detail.project') + '</div><div class="tb-v">' + name + '</div></div>' +
      '<div><div class="tb-l">' + t('detail.field') + '</div><div class="tb-v">' + t(k + 'field') + '</div></div>' +
      '<div><div class="tb-l">' + t('detail.version') + '</div><div class="tb-v acc">' + sol.version + '</div></div>' +
      '</div></div></div></div></section>';
  }

  function summary() {
    var tasks = t(k + 'tasks').map(function (x, i) {
      return '<article class="task lift" data-reveal style="--i:' + i + '"><div class="task-top"><span>' + x.sheet + '</span><span>' + t('detail.sheet') + ' 0' + (i + 1) + '/04</span></div>' +
        '<div class="task-body"><span class="task-n">0' + (i + 1) + '</span><h3>' + x.t + '</h3><p>' + x.x + '</p></div></article>';
    }).join('');
    return '<section class="paper"><div class="wrap d-sec">' +
      '<div class="d-head" data-reveal><div><span class="d-label">' + t('detail.s01') + '</span><h2 class="h2">' + t(k + 'sumTitle') + '</h2></div>' +
      '<p>' + t(k + 'sumLead') + '</p></div>' +
      '<div class="tasks">' + tasks + '</div>' +
      '<div class="tailored" data-reveal><strong>' + t('detail.tailoredT') + '</strong> ' + t('detail.tailoredX') + '</div>' +
      '</div></section>';
  }

  function demoSection() {
    return '<section id="demo" class="bp"><div class="wrap d-sec" style="gap:32px">' +
      '<div class="d-head" data-reveal><div><span class="d-label">' + t('detail.s02') + '</span><h2 class="h2">' + t('detail.demoTitle') + '</h2></div>' +
      '<p>' + t(k + 'demoLead') + '</p></div>' +
      '<div id="demo-root" data-reveal style="--i:1">' + demo.render() + '</div>' +
      '<div class="demo-foot"><span>' + t('detail.demoCta') + '</span><a href="#contact" class="btn btn-white btn-md">' + t('detail.demoBtn') + '</a></div>' +
      '</div></section>';
  }

  function process() {
    var proc = t('detail.proc').map(function (p, i) {
      var x = (i === 1 && t(k + 'pilotX')) || p.x;
      return '<div data-reveal style="--i:' + i + '"><span class="proc-n">' + p.n + '</span><span class="proc-t">' + p.t + '</span><span class="proc-time">' + p.time + '</span><span class="proc-x">' + x + '</span></div>';
    }).join('');
    var res = t(k + 'results').map(function (r, i) {
      return '<div data-reveal style="--i:' + i + '"><span class="res-v">' + r.v + '</span><span class="res-l">' + r.l + '</span></div>';
    }).join('');
    return '<section class="wrap d-sec" style="gap:40px">' +
      '<div class="d-head" data-reveal><div><span class="d-label">' + t('detail.s03') + '</span><h2 class="h2">' + t('detail.procTitle') + '</h2></div>' +
      '<p>' + t('detail.procLead') + '</p></div>' +
      '<div class="proc">' + proc + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:16px"><span class="d-label">' + t('detail.results') + '</span>' +
      '<div class="res">' + res + '</div></div></section>';
  }

  function experience() {
    var cases = t(k + 'cases'), left;
    if (cases) {
      left = '<span class="d-label">' + t('detail.s04') + '</span><h2 class="h2-sm">' + t('detail.xpTitle') + '</h2>' +
        '<div style="display:flex;flex-direction:column;gap:12px">' + cases.map(function (c, i) {
          return '<div class="case"><div class="case-h"><span>' + c.t + '</span><span class="case-tag' + (i ? ' out' : '') + '">' + c.tag + '</span></div>' +
            (c.items ? '<ul>' + c.items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p>' + c.text + '</p>') + '</div>';
        }).join('') + '<span class="small-note">' + t('detail.xpNote') + '</span></div>';
    } else {
      left = '<span class="d-label">' + t('detail.s04uses') + '</span><h2 class="h2-sm">' + t('detail.usesTitle') + '</h2>' +
        '<div style="display:flex;flex-direction:column;gap:12px">' + t(k + 'uses').map(function (u, i) {
          return '<div class="case"><div class="case-h"><span>' + u.t + '</span><span class="case-tag' + (i ? ' out' : '') + '">0' + (i + 1) + '</span></div><p>' + u.x + '</p></div>';
        }).join('') + '<span class="small-note">' + t('detail.usesNote') + '</span></div>';
    }
    var sec = t('detail.sec').map(function (s, i) {
      var x = (i === 1 && t(k + 'secNda')) ? t(k + 'secNda') : s.x;
      return '<div><strong>' + s.t + '</strong><span>' + x + '</span></div>';
    }).join('');
    return '<section class="band-white"><div class="wrap xp-wrap">' +
      '<div class="xp-col" data-reveal>' + left + '</div>' +
      '<div class="xp-col narrow" data-reveal style="--i:1"><span class="d-label">' + t('detail.s05') + '</span><h2 class="h2-sm">' + (t(k + 'secTitle') || t('detail.secTitle')) + '</h2>' +
      '<div class="secs">' + sec + '</div></div></div></section>';
  }

  function download() {
    var mail = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(I.plain(t('detail.s06')).replace(/^\d+ · /, '') + ' — ' + I.plain(t(k + 'name')));
    var coverSrc = sol.cover && (sol.cover[I.lang] || sol.cover.en);
    var cover = coverSrc
      ? '<a class="dl-cover" data-doc="' + slug + '" target="_blank" rel="noopener"><img src="' + U.url(coverSrc) + '" width="220" height="311" alt="' + I.plain(t('common.pdf')) + '" loading="lazy"></a>'
      : '<div class="dl-cover gen" aria-hidden="true"><img src="' + U.url('assets/img/logo-ink.svg') + '" alt="" style="width:110px"><span class="mono" style="font-size:10px;letter-spacing:.12em;color:#C2451F;margin-top:18px">' + I.plain(t('detail.eyebrow')).toUpperCase() + '</span>' +
        '<b style="font-family:var(--f-display);font-size:24px;line-height:1.05">' + t(k + 'name') + '</b><span style="font-size:11px;color:#4A5B68">' + t(k + 'field') + '</span>' +
        '<span style="margin-top:auto;height:6px;border-radius:3px;background:var(--accent)"></span></div>';
    var btns = U.doc(slug)
      ? '<a data-doc="' + slug + '" target="_blank" rel="noopener" class="btn btn-accent btn-md">' + t('detail.viewOnline') + '</a>' +
        '<a data-doc="' + slug + '" download class="btn btn-ghost btn-md" style="padding:12px 20px">' + t('detail.download') + '<span data-doc-size="' + slug + '"></span></a>'
      : '<a href="' + mail + '" class="btn btn-accent btn-md">' + t('detail.request') + '</a>';
    return '<section id="solution-profile" class="wrap" style="padding-top:104px;padding-bottom:104px">' +
      '<div class="dl bp lift" data-reveal>' + cover +
      '<div class="dl-copy"><span class="d-label">' + t('detail.s06') + '</span><h2 class="h2">' + t('detail.dlTitle') + '</h2>' +
      '<p>' + (t(k + 'dlText') || t('detail.dlText')) + '</p><div class="row" style="gap:12px;padding-top:4px">' + btns + '</div>' +
      '<a class="more" data-doc="company-profile" target="_blank" rel="noopener">' + t('detail.alsoProfile') + '</a></div></div></section>';
  }

  function contact() {
    var extra = t(k + 'software')
      ? '<label><span>' + t(k + 'formSoftware') + '</span><select name="software">' + t(k + 'software').map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></label>'
      : '';
    var interest = t(k + 'tasks').map(function (x) { return '<option>' + esc(I.plain(x.t)) + '</option>'; }).join('');
    return '<section id="contact" class="bp-cta bp"><div class="wrap inner">' +
      '<div class="copy" data-reveal><span class="d-label amber">' + t('detail.next') + '</span><h2 class="h2">' + t('detail.ctaTitle') + '</h2>' +
      '<p>' + t('detail.ctaLead') + '</p><div class="people">' +
      '<div class="person"><span class="role">' + t('detail.emailT') + '</span><a class="big" href="mailto:' + SITE.email + '">' + SITE.email + '</a></div>' +
      '<div class="person"><span class="role">' + t('detail.phoneT') + '</span><a class="big" href="' + SITE.phoneHref + '">' + SITE.phone + '</a></div>' +
      '</div></div>' +
      '<form class="form" id="detail-form" novalidate data-reveal style="--i:1"><h3>' + t('detail.formTitle') + '</h3>' +
      '<label><span>' + t('contact.name') + '</span><input type="text" name="name" autocomplete="name" required></label>' +
      '<label><span>' + t('contact.workEmail') + '</span><input type="email" name="email" autocomplete="email" required></label>' +
      extra +
      '<label><span>' + t('detail.interest') + '</span><select name="interest">' + interest + '</select></label>' +
      '<div class="form-msg" role="status" aria-live="polite"></div>' +
      '<button type="submit" class="btn btn-accent">' + t('detail.submit') + '</button>' +
      '<span class="form-note">' + (t(k + 'ndaNote') || t('detail.ndaNote')) + '</span></form></div></section>';
  }

  function render() {
    var main = document.getElementById('main');
    var formState = {};
    main.querySelectorAll('form input, form select').forEach(function (f) { formState[f.name] = f.value; });
    main.innerHTML = hero() + summary() + demoSection() + process() + experience() + download() + contact();
    main.querySelectorAll('form input, form select').forEach(function (f) { if (formState[f.name] && f.tagName === 'INPUT') f.value = formState[f.name]; });
    document.title = I.plain(t(k + 'name')) + ' — Infodation AI Studio';
    var md = document.querySelector('meta[name=description]');
    if (md) md.setAttribute('content', I.plain(t(k + 'lead')));
    U.bindMailForm(document.getElementById('detail-form'), { subject: function () { return I.plain(t('detail.subject')) + ' — ' + I.plain(t(k + 'name')); } });
    if (demo.after) demo.after();
  }

  function redrawDemo(paneChanged) {
    var root = document.getElementById('demo-root');
    if (!root) return;
    root.innerHTML = demo.render(paneChanged === true);
    U.icons(root);
    U.arrows(root);
    if (demo.after) demo.after();
    window.IFD_MOTION.refresh();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('#demo-root [data-act]');
    if (b && demo.act) demo.act(b.getAttribute('data-act'), b, redrawDemo);
  });
  document.addEventListener('input', function (e) {
    var el = e.target.closest('#demo-root [data-act-input]');
    if (el && demo.input) demo.input(el.getAttribute('data-act-input'), el, redrawDemo);
  });

  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(render);
})();
