/* IntelliDOC solution page (design "IntelliDOC v2"). Texts live in i18n/intellidoc.js, styles in css/intellidoc.css.
 * Uses the design's own animations (.rise-in, .deal, .pane, [data-reveal]) — not the 3D data-asm engine.
 */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI, SITE = window.IFD_SITE;
  var esc = U.esc;
  var SLUG = 'document-ai';
  var TABS = ['inv', 'con', 'match'];
  // confidence (%) per extracted field, same order as demo.docs.<tab>.fields
  var CONF = { inv: [99, 99, 98, 97, 99, 72, 99], con: [98, 97, 96, 95, 66], match: [99, 99, 98, 99, 61] };
  var LOW = 80;
  var PHONE = '(+84) 2583 526 477', PHONE_HREF = 'tel:+842583526477';

  // demo state survives re-renders (language switch)
  var state = { tab: 'inv', run: {}, ok: {}, saved: {} };

  function t(k, v) { return I.t('intellidoc.' + k, v); }
  function tx(k, v) { return I.plain(t(k, v)); }
  function W(v, mx) { return Math.max(v / mx * 100, 3).toFixed(1) + '%'; }
  function label(text, cls) { return '<span class="idc-label' + (cls ? ' ' + cls : '') + '">' + text + '</span>'; }
  function head(lab, title, lead) {
    return '<div data-reveal class="idc-head"><div class="idc-head-t">' + label(lab) + '<h2 class="idc-h2">' + title + '</h2></div>' +
      (lead ? '<p class="idc-head-p">' + lead + '</p>' : '') + '</div>';
  }

  /* ---------- hero ---------- */
  function hero() {
    var v = t('inv');
    var rows = v.rows.map(function (r, i) {
      return '<div class="idc-inv-grid idc-inv-row' + (i === v.rows.length - 1 ? ' last' : '') + '"><span class="idc-inv-item">' + r[0] + '</span><span>' + r[1] + '</span><span>' + r[2] + '</span><span class="r">' + r[3] + '</span></div>';
    }).join('');
    var ex = v.extracted.map(function (f, i) {
      return '<div class="rowin idc-xrow" style="--i:' + i + '"><span>' + f[0] + ' · <b>' + f[1] + '</b></span><span class="idc-xconf">99%</span></div>';
    }).join('');
    return '<section class="idc-hero"><div class="idc-hero-in">' +
      '<div class="idc-hero-copy">' +
      '<nav class="rise-in idc-crumb" style="--d:0ms" aria-label="' + tx('crumb.aria') + '"><a href="' + U.url('index.html') + '">' + t('crumb.studio') + '</a> / <a href="' + U.url('solutions.html') + '">' + t('crumb.sol') + '</a> / ' + t('crumb.cat') + ' / <span>' + t('crumb.name') + '</span></nav>' +
      '<span class="rise-in idc-eyebrow" style="--d:60ms"><span class="idc-hlbg">' + t('eyebrowTag') + '</span> · ' + t('eyebrow') + '</span>' +
      '<h1 class="rise-in idc-h1" style="--d:120ms">' + t('h1') + '</h1>' +
      '<p class="rise-in idc-sub" style="--d:200ms">' + t('sub') + '</p>' +
      '<p class="rise-in idc-lead" style="--d:270ms">' + t('lead') + '</p>' +
      '<div class="rise-in idc-btns" style="--d:340ms">' +
      '<a href="#demo" class="idc-btn idc-btn-accent idc-btn-lg">' + t('heroDemo') + ' <span class="arw" aria-hidden="true">↓</span></a>' +
      '<a href="#ho-so-giai-phap" class="idc-btn idc-btn-line idc-btn-lg">' + t('heroProfile') + '</a>' +
      '</div></div>' +
      '<div class="idc-hero-vis">' +
      '<div class="deal idc-paper" style="--d:300ms">' +
      '<div class="scan" aria-hidden="true"></div>' +
      '<div class="idc-inv-top"><div class="idc-inv-title"><strong>' + v.title + '</strong><span>' + v.dateL + ' <mark class="hlm" style="--d:1500ms">' + v.date + '</mark></span></div>' +
      '<div class="idc-inv-no">' + v.serialL + ' <mark class="hlm" style="--d:1100ms">1C26TAA</mark><br>' + v.noL + ' <mark class="hlm" style="--d:1300ms">0002231</mark></div></div>' +
      '<div class="idc-inv-party"><span>' + v.sellerL + ' <mark class="hlm" style="--d:1700ms"><strong>' + v.seller + '</strong></mark></span>' +
      '<span>' + v.taxL + ' <mark class="hlm" style="--d:1900ms"><span class="idc-mono">0312 345 678</span></mark></span>' +
      '<span class="idc-inv-addr">' + v.addr + '</span></div>' +
      '<div class="idc-inv-grid idc-inv-cols"><span>' + v.cols[0] + '</span><span>' + v.cols[1] + '</span><span>' + v.cols[2] + '</span><span class="r">' + v.cols[3] + '</span></div>' +
      rows +
      '<div class="idc-inv-sum"><span>' + v.vatL + ' <span class="idc-mono">' + v.vat + '</span></span><span>' + v.totalL + ' <mark class="hlm" style="--d:2100ms"><strong class="idc-mono">' + v.total + '</strong></mark></span></div>' +
      '<div class="stamp" aria-hidden="true">' + v.stamp + '</div>' +
      '</div>' +
      '<div class="deal idc-xcard" style="--d:2300ms;--rd:2500ms">' +
      '<div class="idc-xcard-h"><span>' + v.fieldsH + '</span><span>' + v.confH + '</span></div>' + ex +
      '</div></div></div></section>';
  }

  function stats() {
    return '<section class="idc-stats"><div class="idc-stats-in">' + t('stats').map(function (s, i) {
      var count = s.n ? ' data-count="' + s.n + '"' + (s.n >= 1000 ? ' data-fmt="vi"' : '') + ' data-suffix="' + esc(s.s) + '"' : '';
      return '<div data-reveal class="idc-stat" style="--i:' + i + '"><span class="idc-stat-v"' + count + '>' + s.v + '</span><span class="idc-stat-l">' + s.l + '</span></div>';
    }).join('') + '</div></section>';
  }

  /* ---------- 01 problem ---------- */
  function problem() {
    var p = t('problem');
    return '<section class="idc-sec idc-wrap">' +
      head(p.label, p.titleA + '<span class="idc-hlbg idc-hl-pad">' + p.titleB + '</span>', p.lead) +
      '<div data-reveal class="idc-vs" style="--i:1">' +
      '<div class="idc-vs-card"><span class="idc-vs-l">' + p.manualL + '</span><span class="idc-vs-v">' + p.manualV + '</span><span class="idc-vs-x">' + p.manualX + '</span></div>' +
      '<div class="idc-vs-arrow" aria-hidden="true">→</div>' +
      '<div class="idc-vs-card dark"><span class="idc-vs-l">' + p.withL + '</span><span class="idc-vs-v">' + p.withV + '</span><span class="idc-vs-x">' + p.withX + '</span></div>' +
      '</div>' +
      '<div data-reveal class="idc-points" style="--i:2">' + p.points.map(function (x) {
        return '<div class="idc-point"><strong>' + x.t + '</strong><span>' + x.x + '</span></div>';
      }).join('') + '</div></section>';
  }

  /* ---------- 02 how it works ---------- */
  function how() {
    var STYLE = ['', '', ' is-hl', '', ' dark'];
    return '<section class="idc-band"><div class="idc-sec idc-wrap" style="gap:48px">' +
      '<div data-reveal class="idc-head-col">' + label(t('how.label')) + '<h2 class="idc-h2">' + t('how.title') + '</h2></div>' +
      '<div data-reveal="pipe" class="idc-pipe"><div class="pipe-line" aria-hidden="true"></div><ol class="idc-steps">' +
      t('how.steps').map(function (s, i) {
        return '<li class="node idc-step" style="--i:' + i + '"><span class="idc-step-n' + STYLE[i] + '">0' + (i + 1) + '</span><strong>' + s.t + '</strong><span>' + s.d + '</span></li>';
      }).join('') + '</ol></div></div></section>';
  }

  /* ---------- 03 demo ---------- */
  function model() {
    var key = state.tab, d = t('demo.docs.' + key), conf = CONF[key], ok = state.ok[key] || {};
    var fields = d.fields.map(function (f, i) {
      var low = conf[i] < LOW, done = low && !!ok[i];
      return { k: f[0], v: f[1], c: conf[i], low: low, needs: low && !done, done: done };
    });
    var pending = fields.filter(function (f) { return f.needs; }).length, run = !!state.run[key];
    return { key: key, doc: d, fields: fields, pending: pending, run: run, allOk: run && pending === 0, saved: !!state.saved[key] };
  }
  function statusText(m) {
    if (!m.run) return tx('demo.notRun');
    return m.saved ? tx('demo.sent') : tx('demo.status', { n: m.fields.length, p: m.pending });
  }
  function tabs() {
    return '<div role="tablist" class="idc-tabs" data-reveal style="--i:1" aria-label="' + tx('demo.tabsAria') + '">' + TABS.map(function (k) {
      var on = k === state.tab;
      return '<button type="button" role="tab" id="idc-tab-' + k + '" aria-controls="idc-pane" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-idc="tab" data-tab="' + k + '">' + t('demo.docs.' + k + '.label') + '</button>';
    }).join('') + '</div>';
  }
  // left: the sample document; anim = play highlight sweep + scan
  function docView(m, anim) {
    return '<div class="idc-doc-h"><strong>' + m.doc.title + '</strong><span>' + t('demo.sample') + '</span></div>' +
      m.fields.map(function (f, i) {
        return '<div class="idc-doc-line"><span class="k">' + f.k + '</span><span class="v' + (m.run ? ' hlm' : '') + '" style="--d:' + (200 + i * 140) + 'ms">' + f.v + '</span></div>';
      }).join('') +
      (m.run && anim ? '<div class="scan once" aria-hidden="true"></div>' : '');
  }
  // right: extraction result; animRows = stagger rows in, animJson = fade the JSON block in
  function panelBody(m, animRows, animJson) {
    if (!m.run) {
      return '<div class="idc-empty"><span>' + t('demo.prompt') + '</span>' +
        '<button type="button" class="idc-btn idc-btn-hl" data-idc="run">' + t('demo.run') + ' <span class="arw" aria-hidden="true">→</span></button></div>';
    }
    var rows = m.fields.map(function (f, i) {
      var act = f.needs ? '<button type="button" class="idc-confirm" data-idc="confirm" data-i="' + i + '">' + t(m.key === 'match' ? 'demo.handled' : 'demo.confirm') + '</button>'
        : f.done ? '<span class="idc-done">' + t('demo.reviewed') + '</span>' : '';
      return '<div class="idc-field' + (animRows ? ' rowin' : '') + '" style="--i:' + i + '"><span class="k">' + f.k + '</span><span class="v">' + f.v + '</span>' +
        '<span class="c"><span class="pct' + (f.low ? ' is-low' : '') + '">' + f.c + '%</span>' + act + '</span></div>';
    }).join('');
    var saveLabel = m.saved ? t('demo.saved') : m.allOk ? t('demo.save') : t('demo.needConfirm');
    return '<div class="idc-fields">' + rows + '</div>' +
      (m.allOk ? '<pre class="idc-json' + (animJson ? ' pane' : '') + '">' + esc(m.doc.json) + '</pre>' : '') +
      '<div class="idc-actions"><button type="button" class="idc-retry" data-idc="reset">' + t('demo.retry') + '</button>' +
      '<button type="button" class="idc-btn idc-save' + (m.allOk ? ' on' : '') + '" data-idc="save" aria-disabled="' + !m.allOk + '">' + saveLabel + '</button></div>';
  }
  function pane(anim) {
    var m = model();
    return '<div class="pane idc-demo" id="idc-pane" role="tabpanel" aria-labelledby="idc-tab-' + m.key + '">' +
      '<div class="idc-doc" id="idc-doc">' + docView(m, anim) + '</div>' +
      '<div class="idc-panel"><div class="idc-panel-h"><span class="idc-panel-t">' + t('demo.resultT') + '</span><span class="idc-status" id="idc-status" role="status" aria-live="polite">' + statusText(m) + '</span></div>' +
      '<div class="idc-body" id="idc-body">' + panelBody(m, anim, anim) + '</div></div></div>';
  }
  function demo() {
    return '<section id="demo" class="idc-dark"><div class="idc-sec idc-wrap" style="gap:28px">' +
      '<div data-reveal class="idc-head idc-head-demo"><div class="idc-head-col">' + label(t('demo.label'), 'is-hl') + '<h2 class="idc-h2">' + t('demo.title') + '</h2></div>' +
      '<p class="idc-head-p">' + t('demo.lead') + '</p></div>' +
      tabs() + pane(false) +
      '<div data-reveal class="idc-demo-cta"><span>' + t('demo.ctaText') + '</span>' +
      '<a href="#lien-he" class="idc-btn idc-btn-white">' + t('demo.ctaBtn') + ' <span class="arw" aria-hidden="true">→</span></a></div>' +
      '</div></section>';
  }

  // partial redraws keep the rest of the demo (and its finished animations) in place
  function drawPanel(animRows, animJson) {
    var m = model();
    document.getElementById('idc-status').textContent = statusText(m);
    document.getElementById('idc-body').innerHTML = panelBody(m, animRows, animJson);
  }
  function drawDoc(anim) { document.getElementById('idc-doc').innerHTML = docView(model(), anim); }
  function focusIn(sel) {
    var el = document.querySelector('#idc-body ' + sel) || document.querySelector('#idc-body [data-idc=save]');
    if (el) el.focus({ preventScroll: true });
  }
  function pick(key, focus) {
    state.tab = key;
    document.querySelectorAll('.idc-tabs [role=tab]').forEach(function (b) {
      var on = b.getAttribute('data-tab') === key;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    var old = document.getElementById('idc-pane');
    if (old) old.outerHTML = pane(true);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.idc [data-idc]');
    if (!b) return;
    var act = b.getAttribute('data-idc'), key = state.tab, before;
    if (act === 'tab') { if (b.getAttribute('data-tab') !== key) pick(b.getAttribute('data-tab')); return; }
    if (act === 'run') {
      state.run[key] = true;
      drawDoc(true); drawPanel(true, true); focusIn('[data-idc=confirm]');
    } else if (act === 'reset') {
      state.run[key] = false; state.ok[key] = {}; state.saved[key] = false;
      drawDoc(false); drawPanel(false, false); focusIn('[data-idc=run]');
    } else if (act === 'confirm') {
      before = model().allOk;
      (state.ok[key] = state.ok[key] || {})[b.getAttribute('data-i')] = true;
      drawPanel(false, !before && model().allOk); focusIn('[data-idc=confirm]');
    } else if (act === 'save') {
      if (!model().allOk) return;
      state.saved[key] = true;
      drawPanel(false, false); focusIn('[data-idc=save]');
    }
  });
  // arrow keys move between tabs (WAI-ARIA tabs pattern)
  document.addEventListener('keydown', function (e) {
    var b = e.target.closest && e.target.closest('.idc-tabs [role=tab]');
    if (!b) return;
    var i = TABS.indexOf(b.getAttribute('data-tab')), n = TABS.length, j = -1;
    if (e.key === 'ArrowRight') j = (i + 1) % n;
    else if (e.key === 'ArrowLeft') j = (i + n - 1) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    pick(TABS[j], true);
  });

  /* ---------- 04 use cases ---------- */
  function uses() {
    var u = t('uses');
    return '<section class="idc-sec idc-wrap" style="gap:40px">' + head(u.label, u.title, u.lead) +
      '<div class="idc-cases">' + u.cases.map(function (c, i) {
        var real = i < 2;
        return '<article class="idc-lift idc-case" data-reveal style="--i:' + i + '">' +
          '<span class="idc-case-dept">' + c.dept + '</span><h3>' + c.title + '</h3>' +
          '<p><strong>' + u.now + '</strong> ' + c.now + '</p><p><strong>' + u['with'] + '</strong> ' + c['with'] + '</p>' +
          '<div class="idc-case-foot"><span class="idc-tag' + (real ? ' is-hl' : '') + '">' + (real ? u.measured : u.pilot) + '</span><span class="idc-case-res">' + c.result + '</span></div>' +
          '</article>';
      }).join('') + '</div></section>';
  }

  /* ---------- 05 proven ---------- */
  function bars(title, list, nums, mx, i) {
    return '<div data-reveal="bars" class="idc-bars"' + (i ? ' style="--i:' + i + '"' : '') + '><strong class="idc-bars-t">' + title + '</strong>' +
      list.map(function (b, j) {
        return '<div class="idc-bar-g"><span class="idc-bar-l">' + b.label + '</span>' +
          '<div class="idc-bar-row"><div class="idc-track"><div class="bar before" style="width:' + W(nums[j][0], mx) + '"></div></div><span class="idc-bar-v">' + b.before + '</span></div>' +
          '<div class="idc-bar-row"><div class="idc-track"><div class="bar after" style="width:' + W(nums[j][1], mx) + ';--bd:300ms"></div></div><strong class="idc-bar-v">' + b.after + '</strong></div></div>';
      }).join('') + '</div>';
  }
  function proven() {
    var p = t('proven');
    return '<section class="idc-band"><div class="idc-sec idc-wrap" style="gap:40px">' + head(p.label, p.title, p.lead) +
      '<div class="idc-bars-grid">' + bars(p.barsAT, p.barsA, [[210, 30], [300, 30]], 320, 0) + bars(p.barsBT, p.barsB, [[4605, 657], [4916, 491]], 5200, 1) + '</div>' +
      '<div data-reveal class="idc-save-band"><div class="idc-save-k"><span class="idc-save-l">' + p.saveL + '</span>' +
      '<span class="idc-save-v" data-count="8373" data-fmt="vi" data-suffix="' + esc(p.saveS) + '">' + p.saveV + '</span></div>' +
      '<p>' + p.saveX + '</p></div>' +
      '<div class="idc-facts">' + p.facts.map(function (f, i) {
        return '<div data-reveal class="idc-fact" style="--i:' + i + '"><span class="idc-fact-v">' + f.v + '</span><span class="idc-fact-l">' + f.l + '</span></div>';
      }).join('') + '</div>' +
      '<div data-reveal class="idc-countries"><span class="idc-countries-l">' + p.countriesL + '</span>' +
      p.countries.map(function (c) { return '<span class="idc-country">' + c + '</span>'; }).join('') + '</div>' +
      '</div></section>';
  }

  /* ---------- 06 process + 07 security ---------- */
  function work() {
    var w = t('work'), s = t('security');
    return '<section class="idc-sec idc-wrap idc-work">' +
      '<div data-reveal class="idc-work-l">' + label(w.label) + '<h2 class="idc-h2-sm">' + w.title + '</h2>' +
      '<div class="idc-phases">' + w.phases.map(function (p, i) {
        return '<div class="idc-phase' + (i === 2 ? ' dark' : '') + '"><div><strong>' + p.t + '</strong><div class="idc-phase-time">' + p.time + '</div></div><span>' + p.x + '</span></div>';
      }).join('') + '</div>' +
      '<strong class="idc-kpi-t">' + w.kpiT + '</strong>' +
      '<div class="idc-kpis">' + w.kpis.map(function (k) {
        return '<div class="idc-kpi"><strong>' + k.t + '</strong><div>' + k.x + '</div></div>';
      }).join('') + '</div></div>' +
      '<div data-reveal class="idc-work-r" style="--i:1">' + label(s.label) + '<h2 class="idc-h2-sm">' + s.title + '</h2>' +
      '<div class="idc-secs">' + s.items.map(function (x, i) {
        return '<div class="idc-secitem' + (i === 1 ? ' is-hl' : '') + '"><strong>' + x.t + '</strong><span>' + x.x + '</span></div>';
      }).join('') + '</div></div></section>';
  }

  /* ---------- 08 solution profile ---------- */
  function profile() {
    var p = t('profile'), has = !!U.doc(SLUG);
    var img = '<img src="' + U.url('assets/img/intellidoc-cover-' + (I.lang === 'vi' ? 'vi' : 'en') + '.jpg') + '" width="210" height="297" alt="' + esc(I.plain(p.coverAlt)) + '" loading="lazy">';
    var cover = has ? '<a class="idc-cover" data-doc="' + SLUG + '" target="_blank" rel="noopener">' + img + '</a>' : '<div class="idc-cover">' + img + '</div>';
    var mail = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(I.plain(p.mailSubject));
    var btns = has
      ? '<a data-doc="' + SLUG + '" target="_blank" rel="noopener" class="idc-btn idc-btn-accent idc-btn-sm">' + p.view + '</a>' +
        '<a data-doc="' + SLUG + '" download class="idc-btn idc-btn-ghost idc-btn-sm">' + p.download + '</a>'
      : '<a href="' + mail + '" class="idc-btn idc-btn-accent idc-btn-sm">' + p.request + ' <span class="arw" aria-hidden="true">→</span></a>';
    return '<section id="ho-so-giai-phap" class="idc-wrap idc-profile-sec">' +
      '<div class="idc-lift idc-profile" data-reveal>' + cover +
      '<div class="idc-profile-copy">' + label(p.label, 'is-hl') + '<h2 class="idc-h2-dl">' + p.title + '</h2><p>' + p.text + '</p>' +
      '<div class="idc-profile-btns">' + btns + '</div>' +
      '<a class="idc-also" data-doc="company-profile" target="_blank" rel="noopener">' + p.also + '</a>' +
      '</div></div></section>';
  }

  /* ---------- CTA + form ---------- */
  function contact() {
    var c = t('cta'), f = t('form');
    return '<section id="lien-he" class="idc-cta"><div class="idc-cta-in idc-wrap">' +
      '<div data-reveal class="idc-cta-copy">' + label(c.label, 'is-hl') +
      '<h2 class="idc-h2-cta">' + c.titleA + '<br><span class="idc-accent">' + c.titleB + '</span></h2><p>' + c.lead + '</p>' +
      '<div class="idc-contacts"><div class="idc-contact"><span>' + c.emailL + '</span><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></div>' +
      '<div class="idc-contact"><span>' + c.phoneL + '</span><a href="' + PHONE_HREF + '">' + PHONE + '</a></div></div></div>' +
      '<form class="idc-form" id="idc-form" novalidate data-reveal style="--i:1"><h3>' + f.title + '</h3>' +
      '<label><span>' + f.name + '</span><input type="text" name="name" autocomplete="name" required></label>' +
      '<label><span>' + f.email + '</span><input type="email" name="email" autocomplete="email" required></label>' +
      '<label><span>' + f.doctype + '</span><select name="doctype">' + f.types.map(function (o) { return '<option>' + esc(I.plain(o)) + '</option>'; }).join('') + '</select></label>' +
      '<label><span>' + f.volume + '</span><input type="text" name="volume" placeholder="' + esc(I.plain(f.volumePh)) + '"></label>' +
      '<div class="form-msg" role="status" aria-live="polite"></div>' +
      '<button type="submit" class="idc-btn idc-btn-accent idc-submit">' + f.submit + ' <span class="arw" aria-hidden="true">→</span></button>' +
      '<span class="idc-form-note">' + f.note + '</span></form>' +
      '</div></section>';
  }

  function render() {
    var main = document.getElementById('main');
    var saved = {};
    main.querySelectorAll('#idc-form [name]').forEach(function (el) { saved[el.name] = el.tagName === 'SELECT' ? el.selectedIndex : el.value; });
    main.innerHTML = '<div class="idc">' + hero() + stats() + problem() + how() + demo() + uses() + proven() + work() + profile() + contact() + '</div>';
    main.querySelectorAll('#idc-form [name]').forEach(function (el) {
      if (saved[el.name] == null) return;
      if (el.tagName === 'SELECT') el.selectedIndex = saved[el.name]; else el.value = saved[el.name];
    });
    document.title = 'IntelliDOC — Infodation AI Studio';
    var md = document.querySelector('meta[name=description]');
    if (md) md.setAttribute('content', tx('metaDesc'));
    U.bindMailForm(document.getElementById('idc-form'), { subject: function () { return 'IntelliDOC — ' + tx('form.title'); } });
  }

  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(render);
})();
