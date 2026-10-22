(function () {
  var I = window.IFD_I18N, U = window.IFD_UI, SOL = window.IFD_SOLUTIONS, S = window.IFD_SITE;
  var t = I.t, esc = U.esc;
  var $ = function (id) { return document.getElementById(id); };

  function heroStack() {
    var order = ['c1', 'c2', 'c3', 'c4'];
    var cards = order.map(function (cls) {
      var s = SOL.filter(function (x) { return x.hero && x.hero.cls === cls; })[0];
      var k = 'sol.' + s.slug + '.';
      var lab = t(k + 'heroLab') || t(k + 'metricLab');
      return '<a href="' + (s.page ? U.solUrl(s.slug) : '#solutions') + '" class="scard ' + cls + '">' +
        '<div class="scard-top"><span>' + t(s.hero.tagKey || k + 'tag') + '</span>' +
        '<span class="scard-status"><span class="dot' + (s.hero.ring ? ' ring' : '') + '"></span>' + t('status.' + s.hero.status) + '</span></div>' +
        '<span class="scard-name">' + (t(k + 'heroName') || t(k + 'name')) + '</span>' +
        '<div class="scard-metric"><span class="scard-v">' + s.metric + '</span><span class="scard-lab">' + lab + '</span></div></a>';
    });
    cards.push('<a href="solutions.html" class="btn btn-live btn-sm stack-more">' + t('hero.more', { n: SOL.length - 4 }) + '</a>');
    var el = $('hero-stack');
    // keep the same nodes after first render so the intro animation state survives a language switch
    if (el.children.length === cards.length) {
      cards.forEach(function (html, i) {
        var tmp = document.createElement('div'); tmp.innerHTML = html;
        el.children[i].innerHTML = tmp.firstChild.innerHTML;
      });
    } else {
      el.innerHTML = cards.join('');
    }
  }

  function marquee() {
    var dot = '<span class="dot" aria-hidden="true"></span>';
    var set = t('industries').map(function (x) { return '<span>' + x + '</span>' + dot; }).join('');
    $('marquee').innerHTML = '<div class="mq-set">' + set + '</div><div class="mq-set" aria-hidden="true">' + set + '</div>';
  }

  // home cards: solutions with a live demo get the "Try it now" badge and link to their page;
  // the others invite a conversation instead
  function card(s) {
    var k = 'sol.' + s.slug + '.', demo = !!s.page;
    var m = s.metric, lab = t(k + 'metricLab');
    var metric = m
      ? '<span class="chip"><strong>' + m + '</strong><span class="chip-lab">' + lab + '</span></span>'
      : '<span class="pending">' + t('common.metricsPending') + '</span>';
    var cta = demo
      ? '<a class="card-cta card-link" href="' + U.solUrl(s.slug) + '">' + t('common.viewDetailsDemo') + '</a>'
      : '<a class="card-cta card-link" href="#contact">' + t('common.bookChat') + '</a>';
    return '<article class="card lift" data-asm="piece" data-tilt="6">' +
      '<div class="meta"><span class="num">' + s.n + '</span>' + t(k + 'tag') + (demo ? '<span class="pill-live">' + t('common.tryNow') + '</span>' : '') + '</div>' +
      '<h3>' + (t(k + 'heroName') || t(k + 'name')) + '</h3>' +
      '<p class="card-pain">' + t(k + 'pain') + '</p>' +
      '<div class="card-foot stacked">' + metric + cta + '</div></article>';
  }

  function cards() {
    var f = SOL[0];
    var featured = '<article class="featured lift" data-asm="zoom">' +
      '<div class="featured-copy">' +
      '<div class="meta"><span class="num">' + f.n + '</span>' + t('sol.intellicad.tag') + '<span class="pill-live" style="margin-left:4px">' + t('common.tryNow') + '</span></div>' +
      '<h3>IntelliCAD</h3>' +
      '<p>' + t('problem.featuredLead') + '</p>' +
      '<div class="row" style="gap:12px;padding-top:6px">' +
      '<a href="' + U.solUrl('intellicad') + '" class="btn btn-accent btn-md">' + t('common.viewDetailsDemo') + '</a>' +
      '<a data-doc="intellicad" target="_blank" rel="noopener" class="link-light">' + t('common.pdf') + '</a></div></div>' +
      '<div class="featured-stats" data-asm-stagger=".12">' +
      '<div class="fstat" data-asm="drop" data-asm-delay=".2"><div class="fstat-v">40–60%</div><div class="fstat-l">' + t('problem.fs1') + '</div></div>' +
      '<div class="fstat" data-asm="drop" data-asm-delay=".2"><div class="fstat-v">2D → 3D</div><div class="fstat-l">' + t('problem.fs2') + '</div></div>' +
      '<div class="fstat" data-asm="drop" data-asm-delay=".2"><div class="fstat-v">RedLine</div><div class="fstat-l">' + t('problem.fs3') + '</div></div>' +
      '</div></article>';
    $('home-cards').innerHTML = featured + SOL.slice(1, 4).map(card).join('');
  }

  function steps() {
    $('steps').innerHTML = t('how.steps').map(function (st, i) {
      return '<li class="step" data-asm="piece">' +
        '<div class="step-top"><span class="step-n">' + (i + 1) + '</span><span class="step-t' + (i === 1 ? ' pop' : '') + '">' + st.time + '</span></div>' +
        '<h3>' + st.name + ' <span>· ' + st.sub + '</span></h3><p>' + st.text + '</p></li>';
    }).join('');
  }

  function profile() {
    $('partners').innerHTML = S.partners.map(function (p) { return '<span class="partner" data-asm="flip">' + esc(p) + '</span>'; }).join('');
    var subs = t('profile.certSubs');
    $('certs').innerHTML = S.certs.map(function (c, i) {
      return '<div class="cert" data-asm="flip"><span data-icon="shield"></span><div style="display:flex;flex-direction:column;gap:2px"><span class="cert-n">' + esc(c) + '</span><span class="cert-s">' + subs[i] + '</span></div></div>';
    }).join('');
    $('clients').innerHTML = (S.clientLogos || []).map(function (c) {
      return '<div class="logo" data-logo="' + c.logo.replace(/\.\w+$/, '') + '" data-asm="unfold"><img src="' + U.ROOT + 'assets/img/clients/' + c.logo + '" alt="' + esc(c.name) + '" decoding="async"></div>';
    }).join('') + S.clients.map(function (c) { return '<div data-asm="unfold">' + esc(c) + '</div>'; }).join('') +
      '<div class="more" data-asm="unfold">' + t('profile.more') + '</div>';
  }

  function form() {
    var sel = $('problem-select'), keep = sel.selectedIndex;
    sel.innerHTML = SOL.map(function (s) {
      var name = I.tx('sol.' + s.slug + '.formName') || I.tx('sol.' + s.slug + '.name');
      return '<option>' + esc(name) + '</option>';
    }).join('') + '<option>' + esc(I.tx('contact.other')) + '</option>';
    if (keep > 0) sel.selectedIndex = keep;
    U.bindMailForm($('contact-form'), { subject: function () { return I.tx('contact.subject'); } });
  }

  function counts() {
    document.querySelectorAll('[data-i18n="hero.badge"], [data-i18n="problem.seeAll"]').forEach(function (el) {
      el.setAttribute('data-i18n-vars', JSON.stringify({ n: SOL.length }));
    });
  }

  // hero stats count up from 0 ("100+", "14 days") while the intro plays — first load only
  var counted = false;
  function countUp() {
    if (counted || window.IFD_MOTION.reduce) return;
    counted = true;
    document.querySelectorAll('.stats .stat-v').forEach(function (el) {
      var m = el.textContent.match(/^(\D*)(\d+)(.*)$/);
      if (!m || /ISO/.test(el.textContent)) return;
      var end = +m[2], t0 = performance.now() + 380, dur = 1500;
      el.textContent = m[1] + '0' + m[3];
      var done = false, finish = function () { if (!done) { done = true; el.innerHTML = t(el.getAttribute('data-i18n')); } };
      setTimeout(finish, 380 + dur + 300); // safety net if animation frames are paused (background tab)
      (function step(now) {
        var p = Math.min(1, Math.max(0, (now - t0) / dur)), e = 1 - Math.pow(1 - p, 3);
        el.textContent = m[1] + Math.round(end * e) + m[3];
        if (p < 1) requestAnimationFrame(step);
        else finish(); // final text in the current language
      })(performance.now());
    });
  }


  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(function () {
    counts(); heroStack(); marquee(); cards(); steps(); profile(); form();
    setTimeout(countUp, 0); // after i18n has filled the stat values
  });
})();
