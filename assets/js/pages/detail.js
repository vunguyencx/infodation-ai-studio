/* Solution detail page — one template for all solutions, laid out like the IntelliCAD design. */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI, SOL = window.IFD_SOLUTIONS, SITE = window.IFD_SITE, X = window.IFD_DETAIL;
  var t = I.t, esc = U.esc;
  var slug = document.body.getAttribute('data-solution');
  var sol = SOL.filter(function (s) { return s.slug === slug; })[0];
  var k = 'sol.' + slug + '.';
  var demo = X.DEMOS[slug];
  var first = true;

  function hero() {
    var name = t(k + 'name');
    return '<section class="bp"><div class="wrap" style="padding-top:40px;padding-bottom:56px"><div class="sheet">' +
      '<div class="sheet-cols" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span></div>' +
      '<div class="d-hero"><div class="d-copy">' +
      '<nav class="d-crumb intro" style="--i:0" aria-label="Breadcrumb"><a href="' + U.url('index.html') + '">' + t('detail.crumbStudio') + '</a> / <a href="' + U.url('solutions.html') + '">' + t('detail.crumbSol') + '</a> / ' + t(k + 'tag') + ' / <b>' + name + '</b></nav>' +
      '<span class="d-eyebrow intro" style="--i:1">' + t('detail.eyebrow') + '</span>' +
      '<h1 class="d-h1 intro' + (I.plain(name).length > 14 ? ' long' : '') + '" style="--i:2">' + name + '</h1>' +
      '<p class="d-sub intro" style="--i:3">' + t(k + 'sub') + '</p>' +
      '<p class="d-lead intro" style="--i:4">' + t(k + 'lead') + '</p>' +
      '<span class="d-tools intro" style="--i:5">' + t(k + 'tools') + '</span>' +
      '<div class="row intro" style="--i:6;gap:12px;padding-top:6px">' +
      '<a href="#demo" class="btn btn-accent btn-lg" style="padding:15px 26px">' + t('detail.heroDemo') + '</a>' +
      (U.doc(slug) ? '<a data-doc="' + slug + '" target="_blank" rel="noopener" class="btn btn-ghost btn-lg" style="padding:14px 24px">' + t('common.pdf') + '</a>'
        : '<a href="#solution-profile" class="btn btn-ghost btn-lg" style="padding:14px 24px">' + t('nav.solProfile') + '</a>') +
      '</div></div>' +
      '<figure class="d-fig" data-tilt="5">' + X.HERO[slug](first && slug === 'intellicad' ? 0 : null) + '</figure></div>' +
      '<div class="title-block-wrap"><div class="title-block">' +
      '<div><div class="tb-l">' + t('detail.project') + '</div><div class="tb-v">' + name + '</div></div>' +
      '<div><div class="tb-l">' + t('detail.field') + '</div><div class="tb-v">' + t(k + 'field') + '</div></div>' +
      '<div><div class="tb-l">' + t('detail.version') + '</div><div class="tb-v acc">' + sol.version + '</div></div>' +
      '</div></div></div></div></section>';
  }

  function summary() {
    var tasks = t(k + 'tasks').map(function (x, i) {
      return '<article class="task lift" data-asm="drop" data-tilt="5"><div class="task-top"><span>' + x.sheet + '</span><span>' + t('detail.sheet') + ' 0' + (i + 1) + '/04</span></div>' +
        '<div class="task-body"><span class="task-n">0' + (i + 1) + '</span><h3>' + x.t + '</h3><p>' + x.x + '</p></div></article>';
    }).join('');
    return '<section class="paper"><div class="wrap d-sec">' +
      '<div class="d-head"><div><span class="d-label" data-asm="left">' + t('detail.s01') + '</span><h2 class="h2" data-split>' + t(k + 'sumTitle') + '</h2></div>' +
      '<p data-asm="right">' + t(k + 'sumLead') + '</p></div>' +
      '<div class="tasks" data-asm-stagger=".1">' + tasks + '</div>' +
      '<div class="tailored" data-asm="left"><strong>' + t('detail.tailoredT') + '</strong> ' + t('detail.tailoredX') + '</div>' +
      '</div></section>';
  }

  function demoSection() {
    return '<section id="demo" class="bp"><div class="wrap d-sec" style="gap:32px">' +
      '<div class="d-head"><div><span class="d-label">' + t('detail.s02') + '</span><h2 class="h2" data-split>' + t('detail.demoTitle') + '</h2></div>' +
      '<p data-asm="right">' + t(k + 'demoLead') + '</p></div>' +
      '<div class="asm-stage"><div id="demo-root" data-asm="screen" data-asm-end=".45">' + demo.render() + '</div></div>' +
      '<div class="demo-foot"><span>' + t('detail.demoCta') + '</span><a href="#contact" class="btn btn-white btn-md">' + t('detail.demoBtn') + '</a></div>' +
      '</div></section>';
  }

  function process() {
    var proc = t('detail.proc').map(function (p, i) {
      var x = (i === 1 && t(k + 'pilotX')) || p.x;
      return '<div data-asm="piece"><span class="proc-n">' + p.n + '</span><span class="proc-t">' + p.t + '</span><span class="proc-time">' + p.time + '</span><span class="proc-x">' + x + '</span></div>';
    }).join('');
    var res = t(k + 'results').map(function (r) {
      return '<div data-asm="flip" data-tilt="6"><span class="res-v">' + r.v + '</span><span class="res-l">' + r.l + '</span></div>';
    }).join('');
    return '<section class="wrap d-sec" style="gap:40px">' +
      '<div class="d-head"><div><span class="d-label">' + t('detail.s03') + '</span><h2 class="h2" data-split>' + t('detail.procTitle') + '</h2></div>' +
      '<p data-asm="right">' + t('detail.procLead') + '</p></div>' +
      '<div class="proc" data-asm-stagger=".1">' + proc + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:16px"><span class="d-label">' + t('detail.results') + '</span>' +
      '<div class="res" data-asm-stagger=".12">' + res + '</div></div></section>';
  }

  function experience() {
    var cases = t(k + 'cases'), left;
    if (cases) {
      left = '<span class="d-label">' + t('detail.s04') + '</span><h2 class="h2-sm" data-split>' + t('detail.xpTitle') + '</h2>' +
        '<div style="display:flex;flex-direction:column;gap:12px" data-asm-stagger=".12">' + cases.map(function (c, i) {
          return '<div class="case" data-asm="left"><div class="case-h"><span>' + c.t + '</span><span class="case-tag' + (i ? ' out' : '') + '">' + c.tag + '</span></div>' +
            (c.items ? '<ul>' + c.items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p>' + c.text + '</p>') + '</div>';
        }).join('') + '<span class="small-note">' + t('detail.xpNote') + '</span></div>';
    } else {
      left = '<span class="d-label">' + t('detail.s04uses') + '</span><h2 class="h2-sm" data-split>' + t('detail.usesTitle') + '</h2>' +
        '<div style="display:flex;flex-direction:column;gap:12px" data-asm-stagger=".12">' + t(k + 'uses').map(function (u, i) {
          return '<div class="case" data-asm="left"><div class="case-h"><span>' + u.t + '</span><span class="case-tag' + (i ? ' out' : '') + '">0' + (i + 1) + '</span></div><p>' + u.x + '</p></div>';
        }).join('') + '<span class="small-note">' + t('detail.usesNote') + '</span></div>';
    }
    var sec = t('detail.sec').map(function (s, i) {
      var x = (i === 1 && t(k + 'secNda')) ? t(k + 'secNda') : s.x;
      return '<div data-asm="flip"><strong>' + s.t + '</strong><span>' + x + '</span></div>';
    }).join('');
    return '<section class="band-white"><div class="wrap xp-wrap">' +
      '<div class="xp-col">' + left + '</div>' +
      '<div class="xp-col narrow"><span class="d-label">' + t('detail.s05') + '</span><h2 class="h2-sm" data-split>' + (t(k + 'secTitle') || t('detail.secTitle')) + '</h2>' +
      '<div class="secs" data-asm-stagger=".1">' + sec + '</div></div></div></section>';
  }

  function download() {
    var mail = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(I.plain(t('detail.s06')).replace(/^\d+ · /, '') + ' — ' + I.plain(t(k + 'name')));
    var cover = sol.cover
      ? '<a class="dl-cover" data-doc="' + slug + '" target="_blank" rel="noopener" data-asm="book" data-asm-delay=".2"><img src="' + U.url(sol.cover) + '" width="220" height="311" alt="' + I.plain(t('common.pdf')) + '" loading="lazy"></a>'
      : '<div class="dl-cover gen" aria-hidden="true" data-asm="book" data-asm-delay=".2"><img src="' + U.url('assets/img/logo-ink.svg') + '" alt="" style="width:110px"><span class="mono" style="font-size:10px;letter-spacing:.12em;color:#C2451F;margin-top:18px">' + I.plain(t('detail.eyebrow')).toUpperCase() + '</span>' +
        '<b style="font-family:var(--f-display);font-size:24px;line-height:1.05">' + t(k + 'name') + '</b><span style="font-size:11px;color:#4A5B68">' + t(k + 'field') + '</span>' +
        '<span style="margin-top:auto;height:6px;border-radius:3px;background:var(--accent)"></span></div>';
    var btns = U.doc(slug)
      ? '<a data-doc="' + slug + '" target="_blank" rel="noopener" class="btn btn-accent btn-md">' + t('detail.viewOnline') + '</a>' +
        '<a data-doc="' + slug + '" download class="btn btn-ghost btn-md" style="padding:12px 20px">' + t('detail.download') + '<span data-doc-size="' + slug + '"></span></a>'
      : '<a href="' + mail + '" class="btn btn-accent btn-md">' + t('detail.request') + '</a>';
    return '<section id="solution-profile" class="wrap" style="padding-top:104px;padding-bottom:104px">' +
      '<div class="dl bp lift" data-asm="zoom" data-tilt="3">' + cover +
      '<div class="dl-copy"><span class="d-label">' + t('detail.s06') + '</span><h2 class="h2">' + t('detail.dlTitle') + '</h2>' +
      '<p>' + (t(k + 'dlText') || t('detail.dlText')) + '</p><div class="row" style="gap:12px;padding-top:4px">' + btns + '</div>' +
      '<a class="more" data-doc="company-profile" target="_blank" rel="noopener">' + t('detail.alsoProfile') + '</a></div></div></section>';
  }

  function others() {
    var idx = SOL.indexOf(sol), list = [1, 2, 3].map(function (i) { return SOL[(idx + i) % SOL.length]; });
    return '<section class="wrap d-sec others" style="gap:28px">' +
      '<div class="d-head"><div><span class="d-label">' + t('detail.others') + '</span><h2 class="h2-sm" data-split>' + t('detail.othersTitle') + '</h2></div></div>' +
      '<div class="grid-cards asm-stage" data-asm-stagger=".1">' + list.map(function (s) {
        var kk = 'sol.' + s.slug + '.';
        return '<article class="card lift" data-asm="piece" data-tilt="6"><div class="meta"><span class="num">' + s.n + '</span>' + t(kk + 'tag') + '</div>' +
          '<h3>' + t(kk + 'name') + '</h3><p class="card-pain">' + t(kk + 'pain') + '</p>' +
          '<div class="card-foot">' + (s.metric ? '<span class="chip"><strong>' + s.metric + '</strong><span class="chip-lab">' + t(kk + 'metricLab') + '</span></span>' : '<span class="pending">' + t('common.metricsPending') + '</span>') +
          '<a class="card-cta card-link" href="' + U.solUrl(s.slug) + '">' + t(s.demo ? 'common.viewDetailsDemo' : 'common.viewDetails') + '</a></div></article>';
      }).join('') + '</div></section>';
  }

  function contact() {
    var people = SITE.people.map(function (p) {
      return '<div class="person" data-asm="left"><span class="role">' + t('detail.' + p.role) + '</span><b>' + esc(p.name) + '</b>' +
        '<a href="mailto:' + p.email + '">' + p.email + '</a><a href="tel:' + p.tel + '">' + p.phone + '</a></div>';
    }).join('');
    var extra = t(k + 'software')
      ? '<label><span>' + t(k + 'formSoftware') + '</span><select name="software">' + t(k + 'software').map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></label>'
      : '';
    var interest = t(k + 'tasks').map(function (x) { return '<option>' + esc(I.plain(x.t)) + '</option>'; }).join('');
    return '<section id="contact" class="bp-cta"><div class="wrap inner">' +
      '<div class="copy"><span class="d-label amber">' + t('detail.next') + '</span><h2 class="h2" data-split>' + t('detail.ctaTitle') + '</h2>' +
      '<p data-asm="rise">' + t('detail.ctaLead') + '</p><div class="people asm-stage" data-asm-stagger=".12">' + people + '</div></div>' +
      '<form class="form" id="detail-form" novalidate data-asm="right" data-asm-end=".5"><h3>' + t('detail.formTitle') + '</h3>' +
      '<label><span>' + t('contact.name') + '</span><input type="text" name="name" autocomplete="name" required></label>' +
      '<label><span>' + t('contact.workEmail') + '</span><input type="email" name="email" autocomplete="email" required></label>' +
      extra +
      '<label><span>' + t('detail.interest') + '</span><select name="interest">' + interest + '</select></label>' +
      '<div class="form-msg" role="status" aria-live="polite"></div>' +
      '<button type="submit" class="btn btn-accent">' + t('detail.submit') + '</button>' +
      '<span class="form-note">' + (t(k + 'ndaNote') || t('detail.ndaNote')) + '</span></form></div></section>';
  }

  function heroBuildIntro() {
    if (slug !== 'intellicad') return;
    var t0 = window.IFD_MOTION.reduce ? -1e6 : performance.now();
    (function step(now) {
      var p = Math.min(1, Math.max(0, (now - t0 - 700) / 1500)), f = 9 * (1 - Math.pow(1 - p, 3));
      var el = document.getElementById('hero-building');
      if (el) el.innerHTML = X.building(X.iso({ s: 12, cx: 430, cy: 262, floors: f }), 1.6);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  function render() {
    var main = document.getElementById('main');
    var formState = {};
    main.querySelectorAll('form input, form select').forEach(function (f) { formState[f.name] = f.value; });
    main.innerHTML = hero() + summary() + demoSection() + process() + experience() + download() + others() + contact();
    main.querySelectorAll('form input, form select').forEach(function (f) { if (formState[f.name] && f.tagName === 'INPUT') f.value = formState[f.name]; });
    document.title = I.plain(t(k + 'name')) + ' — Infodation AI Studio';
    var md = document.querySelector('meta[name=description]');
    if (md) md.setAttribute('content', I.plain(t(k + 'lead')));
    U.bindMailForm(document.getElementById('detail-form'), { subject: function () { return I.plain(t('detail.subject')) + ' — ' + I.plain(t(k + 'name')); } });
    if (demo.after) demo.after();
    if (first) { heroBuildIntro(); first = false; }
  }

  function redrawDemo() {
    var root = document.getElementById('demo-root');
    if (!root) return;
    root.innerHTML = demo.render();
    window.IFD_UI.icons(root);
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
