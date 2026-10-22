/* IntelliCALL solution page — hand-built from the IntelliCALL design (texts in i18n/intellicall.js, styles in css/intellicall.css).
 * Renders the whole <main>; re-runs on language change and keeps the selected scenario.
 */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI, SITE = window.IFD_SITE;
  var esc = U.esc, SLUG = 'voice-bot';
  var VI = '#6A54F0', CY = '#4FD6E8';
  var ORDER = ['cc', 'mt', 'tr', 'fb', 'ht', 'cl'];
  // anim alternates ca/cb so the message stagger animation restarts on every switch / replay
  var state = { tab: 'cc', anim: 'ca' };

  function t(k) { return I.t('intellicall.' + k); }
  function tx(k) { return I.tx('intellicall.' + k); }
  function each(list, fn) { return list.map(fn).join(''); }

  /* ---------- small building blocks ---------- */
  function wave(small) {
    var s = '';
    for (var i = 0; i < 40; i++) {
      var h = 28 + Math.round((Math.sin(i * 1.7) * 0.5 + 0.5) * 72);
      var c = i % 7 === 0 ? CY : (i % 3 === 0 ? VI : 'rgba(255,255,255,0.5)');
      s += '<span style="height:' + h + '%;animation-delay:' + (-(i * 0.07)).toFixed(2) + 's;background:' + c + '"></span>';
    }
    return '<div class="ic-wave' + (small ? ' small' : '') + '" aria-hidden="true">' + s + '</div>';
  }
  function head(label, title, lead, opts) {
    opts = opts || {};
    return '<div class="ic-head' + (opts.cls ? ' ' + opts.cls : '') + '" data-reveal>' +
      '<div class="ic-head-main"><span class="ic-label' + (opts.cy ? ' cy' : '') + '">' + label + '</span>' +
      '<h2 class="ic-h2">' + title + '</h2></div>' +
      (lead ? '<p>' + lead + '</p>' : '') + '</div>';
  }
  function badge(cls, d, l, v) {
    return '<div class="ic-badge pop ' + cls + '" style="--d:' + d + 'ms"><span>' + l + '</span><strong>' + v + '</strong></div>';
  }

  /* ---------- hero ---------- */
  function hero() {
    var c = t('call');
    return '<section class="ic-hero"><div class="ic-hero-in">' +
      '<div class="ic-hero-copy">' +
      '<nav aria-label="Breadcrumb" class="ic-crumb rise-in" style="--d:0ms"><a href="' + U.url('index.html') + '">' + t('crumbStudio') + '</a> / <a href="' + U.url('solutions.html') + '">' + t('crumbSol') + '</a> / ' + t('crumbCat') + ' / <b>INTELLICALL</b></nav>' +
      '<span class="ic-eyebrow rise-in" style="--d:60ms">' + t('eyebrow') + '</span>' +
      '<h1 class="ic-h1 rise-in" style="--d:120ms">Intelli<span>CALL</span></h1>' +
      '<p class="ic-tagline rise-in" style="--d:200ms">' + t('tagline') + '</p>' +
      '<p class="ic-lead rise-in" style="--d:270ms">' + t('lead') + '</p>' +
      '<div class="ic-tags rise-in" style="--d:320ms">' + each(t('heroTags'), function (x) { return '<span>' + x + '</span>'; }) + '</div>' +
      '<div class="ic-actions rise-in" style="--d:380ms">' +
      '<a href="#demo" class="ic-btn ic-btn-accent ic-btn-lg">' + t('heroDemo') + ' <span class="arw" aria-hidden="true">↓</span></a>' +
      '<a href="#ho-so-giai-phap" class="ic-btn ic-btn-ghost ic-btn-lg">' + t('heroProfile') + '</a>' +
      '</div></div>' +
      // live call card
      '<div class="ic-callwrap">' +
      '<div class="ic-callcard deal" style="--d:250ms">' +
      '<div class="ic-callhead"><span><span class="ic-live" aria-hidden="true"></span>' + c.incoming + '</span><span class="ic-mono">' + c.time + '</span></div>' +
      wave(false) +
      '<div class="ic-msg g pop narrow" style="--d:900ms"><span class="who">' + c.guest + '</span><span class="txt">' + c.q + '</span></div>' +
      '<div class="ic-msg a pop" style="--d:1800ms"><span class="who">' + c.agent + '</span><span class="txt">' + c.a + '</span></div>' +
      '<code class="ic-json pop" style="--d:2600ms">' + esc(c.json) + '</code>' +
      '</div>' +
      badge('b1', 600, c.langL, c.langV) +
      badge('b2', 3100, c.moodL, c.moodV) +
      badge('b3', 3350, c.intentL, c.intentV) +
      '</div></div>' +
      '<div class="ic-pillars">' + each(t('pillars'), function (p, i) {
        return '<div data-reveal style="--i:' + i + '"><strong>' + p.t + '</strong><span>' + p.d + '</span></div>';
      }) + '</div></section>';
  }

  /* ---------- 01 problem ---------- */
  function problem() {
    var s = t('s01'), n = s.problems.length;
    return '<section class="ic-sec" style="gap:40px">' + head(s.label, s.title, s.lead) +
      '<div class="ic-probs">' + each(s.problems, function (p, i) {
        return '<div class="ic-prob lift' + (i === n - 1 ? ' last' : '') + '" data-reveal style="--i:' + i + '"><strong>' + p.t + '</strong><span>' + p.d + '</span></div>';
      }) + '</div>' +
      '<div class="ic-day" data-reveal="day"><p>' + s.day + '</p>' +
      '<div class="ic-daybar"><div class="ic-dayfill"></div><div class="ic-office">' + s.office + '</div></div>' +
      '<div class="ic-dayaxis"><span>00:00</span><span>08:00</span><span>17:00</span><span>24:00</span></div></div>' +
      '</section>';
  }

  /* ---------- 02 demo ---------- */
  function scen() { return t('s02.scen.' + state.tab); }
  function chatHtml() {
    var sc = scen();
    return each(sc.msgs, function (m, i) {
      return '<div class="ic-msg ' + (i % 2 ? 'a' : 'g') + '" style="--i:' + i + '"><span class="who">' + m.who + '</span><span class="txt">' + m.text + '</span>' +
        (m.tr ? '<span class="tr">' + m.tr + '</span>' : '') + '</div>';
    }) + '<div class="ic-chips" style="--i:' + sc.msgs.length + '">' + each(sc.chips, function (c) { return '<span>✓ ' + c + '</span>'; }) + '</div>';
  }
  function demo() {
    var s = t('s02'), sc = scen();
    var tabs = each(ORDER, function (k) {
      var on = k === state.tab;
      return '<button type="button" role="tab" id="ic-tab-' + k + '" aria-controls="ic-panel" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-ic-tab="' + k + '">' + s.scen[k].label + '</button>';
    });
    var side = each(ORDER, function (k) {
      var on = k === state.tab;
      return '<button type="button" class="ic-scard' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-ic-tab="' + k + '"><strong>' + s.scen[k].label + '</strong><span>' + s.scen[k].title + '</span></button>';
    });
    return '<section id="demo" class="ic-dark"><div class="ic-sec" style="gap:28px">' +
      head(s.label, s.title, s.lead, { cy: true, cls: 'demo' }) +
      '<div class="ic-tabs" role="tablist" aria-label="' + esc(I.plain(s.tabsAria)) + '" data-reveal style="--i:1">' + tabs + '</div>' +
      '<div class="ic-demo-row">' +
      '<div class="ic-chatcard" id="ic-panel" role="tabpanel" aria-labelledby="ic-tab-' + state.tab + '">' +
      '<div class="ic-chathead"><div><strong id="ic-sc-title">' + sc.title + '</strong><span id="ic-sc-sub">' + sc.sub + '</span></div>' +
      '<button type="button" class="ic-replay" data-ic-replay>' + s.replay + '</button></div>' +
      wave(true) +
      '<div id="ic-chat" class="ic-chat ' + state.anim + '">' + chatHtml() + '</div>' +
      '<span class="ic-demo-note">' + s.note + '</span></div>' +
      '<div class="ic-side">' + side + '</div>' +
      '</div></div></section>';
  }
  function paintDemo() {
    var sc = scen(), chat = document.getElementById('ic-chat');
    if (!chat) return;
    document.querySelectorAll('[data-ic-tab]').forEach(function (b) {
      var on = b.getAttribute('data-ic-tab') === state.tab;
      if (b.getAttribute('role') === 'tab') { b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; }
      else { b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }
    });
    document.getElementById('ic-panel').setAttribute('aria-labelledby', 'ic-tab-' + state.tab);
    document.getElementById('ic-sc-title').innerHTML = sc.title;
    document.getElementById('ic-sc-sub').innerHTML = sc.sub;
    chat.className = 'ic-chat ' + state.anim;
    chat.innerHTML = chatHtml();
  }
  function pick(k) {
    state.tab = k;
    state.anim = state.anim === 'ca' ? 'cb' : 'ca';
    paintDemo();
  }

  /* ---------- 03 inside a call ---------- */
  function inside() {
    var s = t('s03'), c = t('call');
    var bubbles = each(s.msgs, function (m, i) {
      return '<div class="ic-b3 ' + (i % 2 ? 'a' : 'g') + '"><span>' + (i % 2 ? c.agent : s.guest) + '</span>' + m + '</div>';
    });
    return '<section class="ic-sec" style="gap:36px">' +
      '<div class="ic-head-col" data-reveal><span class="ic-label">' + s.label + '</span><h2 class="ic-h2">' + s.title + '</h2></div>' +
      '<div class="ic-row">' +
      '<div class="ic-call3" data-reveal><div class="ic-call3-head"><span>' + c.incoming + '</span><span class="ic-mono">' + c.time + '</span></div>' + bubbles + '</div>' +
      '<div class="ic-steps" data-reveal="steps" style="--i:1"><strong>' + s.behindT + '</strong>' +
      each(s.behind, function (b, i) {
        return '<div class="ic-step" style="--i:' + i + '"><span class="n">' + (i + 1) + '</span><div><strong>' + b.t + '</strong><span>' + b.d + '</span></div></div>';
      }) + '</div></div>' +
      '<div class="ic-note cy" data-reveal>' + s.result + '</div>' +
      '</section>';
  }

  /* ---------- 04 technology ---------- */
  function tech() {
    var s = t('s04');
    return '<section class="ic-white"><div class="ic-sec" style="gap:40px">' + head(s.label, s.title, s.lead) +
      '<div class="ic-flow" data-reveal="flow">' +
      '<div class="ic-flowcol"><span class="ic-flowcap">' + s.channelsT + '</span>' + each(s.channels, function (x, i) { return '<span class="ic-chan" style="--i:' + i + '">' + x + '</span>'; }) + '</div>' +
      '<div class="ic-stages">' + each(s.stages, function (g, i) {
        return '<div class="ic-stage" style="--i:' + i + '"><div class="top"><span class="tag">' + g.tag + '</span><span class="n">0' + (i + 1) + '</span></div>' +
          '<strong>' + g.t + '</strong><span>' + g.d + '</span></div>';
      }) + '</div>' +
      '<div class="ic-flowcol"><span class="ic-flowcap">' + s.systemsT + '</span>' + each(s.systems, function (x, i) { return '<span class="ic-chan sys" style="--i:' + i + '">' + x + '</span>'; }) + '</div>' +
      '</div>' +
      '<div class="ic-note vi" data-reveal>' + s.know + '</div>' +
      '<div class="ic-feats">' + each(s.feats, function (f, i) {
        return '<div data-reveal style="--i:' + i + '"><strong>' + f.t + '</strong><span>' + f.d + '</span></div>';
      }) + '</div></div></section>';
  }

  /* ---------- 05 physics-based voice ---------- */
  function voice() {
    var s = t('s05'), last = s.chainB.length - 1;
    return '<section class="ic-dark"><div class="ic-sec" style="gap:36px">' + head(s.label, s.title, s.lead, { cy: true, cls: 'voice' }) +
      '<div class="ic-chain" data-reveal="chain">' +
      '<div class="ic-chaingrp"><span class="cap">' + s.chainAT + '</span><div class="ic-chaingrid">' + each(s.chainA, function (n, i) {
        return '<div class="ic-cnode a" style="--i:' + i + '"><strong>' + n.t + '</strong><span>' + n.d + '</span></div>';
      }) + '</div></div>' +
      '<div class="ic-chaingrp"><span class="cap cy">' + s.chainBT + '</span><div class="ic-chaingrid">' + each(s.chainB, function (n, i) {
        return '<div class="ic-cnode b' + (i === last ? ' end' : '') + '" style="--i:' + i + ';--base:500ms"><strong>' + n.t + '</strong><span>' + n.d + '</span></div>';
      }) + '</div></div>' +
      '<svg viewBox="0 0 1200 80" width="100%" height="70" aria-hidden="true" preserveAspectRatio="none"><path class="ic-voicewave" d="M0 40 Q 25 10 50 40 T 100 40 T 150 40 T 200 40 Q 225 20 250 40 T 300 40 Q 330 0 360 40 T 420 40 T 480 40 Q 510 15 540 40 T 600 40 Q 640 5 680 40 T 760 40 Q 790 25 820 40 T 880 40 Q 920 0 960 40 T 1040 40 Q 1070 20 1100 40 T 1160 40 T 1200 40" fill="none" stroke="' + CY + '" stroke-width="2.5"></path></svg>' +
      '<div class="ic-tones"><span>' + s.tonesT + '</span>' + each(s.tones, function (x) { return '<span class="pill">' + x + '</span>'; }) + '</div>' +
      '</div>' +
      '<div class="ic-vstats">' + each(s.stats, function (x, i) {
        return '<div data-reveal style="--i:' + i + '"><span class="v">' + x.v + '</span><span>' + x.d + '</span></div>';
      }) + '</div>' +
      '<span class="ic-fine">' + s.note + '</span>' +
      '</div></section>';
  }

  /* ---------- 06 proven + 07 security + 08 process ---------- */
  function proven() {
    var a = t('s06'), b = t('s07'), c = t('s08');
    return '<section class="ic-sec" style="gap:56px"><div class="ic-row">' +
      '<div class="ic-proven" data-reveal><span class="ic-label">' + a.label + '</span><h2 class="ic-h2 sm">' + a.title + '</h2>' +
      '<div class="ic-proofs">' +
      '<div class="ic-ite lift"><span class="cap">' + a.iteT + '</span><span class="ic-num" data-count="30" data-suffix="+">30+</span><span>' + a.iteX + '</span></div>' +
      '<div class="ic-daily lift"><span class="cap">' + a.dailyT + '</span><strong>' + a.dailyH + '</strong><span>' + a.dailyX + '</span></div>' +
      '</div>' +
      '<a class="ic-try" href="https://infodation.ai/intellicall" target="_blank" rel="noopener">' + a.link + ' <span class="arw" aria-hidden="true">→</span></a></div>' +
      '<div class="ic-secur" data-reveal style="--i:1"><span class="ic-label">' + b.label + '</span><h2 class="ic-h2 sm">' + b.title + '</h2>' +
      each(b.items, function (x, i) { return '<div class="ic-sbox s' + i + '"><strong>' + x.t + '</strong><div>' + x.d + '</div></div>'; }) +
      '</div></div>' +
      '<div class="ic-process" data-reveal><span class="ic-label">' + c.label + '</span><h2 class="ic-h2 sm">' + c.title + '</h2>' +
      '<div class="ic-psteps">' + each(c.steps, function (x, i) {
        return '<div class="p' + i + '"><strong>' + x.t + '</strong><span class="time">' + x.time + '</span><span>' + x.d + '</span></div>';
      }) + '</div>' +
      '<div class="ic-kpis">' + each(c.kpis, function (k) { return '<div><strong>' + k.t + '</strong><div>' + k.d + '</div></div>'; }) + '</div>' +
      '</div></section>';
  }

  /* ---------- 09 solution profile ---------- */
  function profile() {
    var s = t('s09'), has = !!U.doc(SLUG);
    var img = '<img src="' + U.url('assets/img/intellicall-cover-' + (I.lang === 'vi' ? 'vi' : 'en') + '.jpg') + '" width="210" height="297" alt="' + esc(I.plain(s.coverAlt)) + '" loading="lazy">';
    var cover = has ? '<a class="ic-cover" data-doc="' + SLUG + '" target="_blank" rel="noopener">' + img + '</a>' : '<div class="ic-cover">' + img + '</div>';
    var mail = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(I.plain(s.mailSubject));
    var btns = has
      ? '<a data-doc="' + SLUG + '" target="_blank" rel="noopener" class="ic-btn ic-btn-accent ic-btn-sm">' + s.view + '</a>' +
        '<a data-doc="' + SLUG + '" download class="ic-btn ic-btn-ghost ic-btn-sm">' + s.download + '<span data-doc-size="' + SLUG + '"></span></a>'
      : '<a href="' + mail + '" class="ic-btn ic-btn-accent ic-btn-sm">' + s.request + '</a>';
    return '<section id="ho-so-giai-phap" class="ic-profile"><div class="ic-dl lift" data-reveal>' + cover +
      '<div class="ic-dl-copy"><span class="ic-label cy">' + s.label + '</span><h2 class="ic-h2 pf">' + s.title + '</h2>' +
      '<p>' + s.text + '</p><div class="ic-dl-btns">' + btns + '</div>' +
      '<a class="ic-also" data-doc="company-profile" target="_blank" rel="noopener">' + s.alsoProfile + '</a></div></div></section>';
  }

  /* ---------- CTA + form ---------- */
  function contact() {
    var s = t('cta');
    return '<section id="lien-he" class="ic-cta"><div class="ic-cta-in">' +
      '<div class="ic-cta-copy" data-reveal><span class="ic-label cy">' + s.label + '</span>' +
      '<h2 class="ic-h2 cta">' + s.title1 + '<br><span>' + s.title2 + '</span></h2><p>' + s.lead + '</p>' +
      '<div class="ic-contacts">' +
      '<div><span class="cap">' + s.emailL + '</span><a href="mailto:' + SITE.email + '">' + esc(SITE.email) + '</a></div>' +
      '<div><span class="cap">' + s.phoneL + '</span><a href="tel:+842583526477">(+84) 2583 526 477</a></div>' +
      '</div></div>' +
      '<form class="ic-form" id="ic-form" novalidate data-reveal style="--i:1"><h3>' + s.formTitle + '</h3>' +
      '<label><span>' + s.name + '</span><input type="text" name="name" autocomplete="name" required></label>' +
      '<label><span>' + s.email + '</span><input type="email" name="email" autocomplete="email" required></label>' +
      '<label><span>' + s.industry + '</span><select name="industry">' + each(s.industries, function (o) { return '<option>' + esc(I.plain(o)) + '</option>'; }) + '</select></label>' +
      '<label><span>' + s.calls + '</span><input type="text" name="calls" placeholder="' + esc(I.plain(s.callsPh)) + '"></label>' +
      '<div class="form-msg" role="status" aria-live="polite"></div>' +
      '<button type="submit" class="ic-btn ic-btn-accent ic-submit">' + s.submit + ' <span class="arw" aria-hidden="true">→</span></button>' +
      '<span class="ic-form-note">' + s.nda + '</span></form>' +
      '</div></section>';
  }

  function render() {
    var main = document.getElementById('main');
    // keep what the visitor typed when the language changes
    var kept = {};
    main.querySelectorAll('#ic-form input, #ic-form select').forEach(function (f) { kept[f.name] = f.tagName === 'SELECT' ? f.selectedIndex : f.value; });
    main.className = 'ic';
    main.innerHTML = hero() + problem() + demo() + inside() + tech() + voice() + proven() + profile() + contact();
    main.querySelectorAll('#ic-form input, #ic-form select').forEach(function (f) {
      if (kept[f.name] == null) return;
      if (f.tagName === 'SELECT') f.selectedIndex = kept[f.name]; else f.value = kept[f.name];
    });
    document.title = tx('title');
    var md = document.querySelector('meta[name=description]');
    if (md) md.setAttribute('content', tx('lead'));
    U.bindMailForm(document.getElementById('ic-form'), { subject: function () { return 'IntelliCALL — ' + tx('cta.formTitle'); } });
  }

  // tab pills, side cards and replay
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ic-tab]');
    if (b) { pick(b.getAttribute('data-ic-tab')); return; }
    if (e.target.closest('[data-ic-replay]')) { state.anim = state.anim === 'ca' ? 'cb' : 'ca'; paintDemo(); }
  });
  // arrow keys move between tabs (WAI-ARIA tabs pattern)
  document.addEventListener('keydown', function (e) {
    var b = e.target.closest && e.target.closest('[role=tab][data-ic-tab]');
    if (!b) return;
    var i = ORDER.indexOf(state.tab), n = ORDER.length, j = -1;
    if (e.key === 'ArrowRight') j = (i + 1) % n;
    else if (e.key === 'ArrowLeft') j = (i + n - 1) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    pick(ORDER[j]);
    document.getElementById('ic-tab-' + ORDER[j]).focus();
  });

  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(render);
})();
