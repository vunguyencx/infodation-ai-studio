(function () {
  var I = window.IFD_I18N, U = window.IFD_UI, SOL = window.IFD_SOLUTIONS;
  var t = I.t;
  var $ = function (id) { return document.getElementById(id); };
  var CATS = ['all', 'xd', 'tc', 'cskh', 'ts', 'it', 'vh'];
  var params = new URLSearchParams(location.search);
  var state = { ind: CATS.indexOf(params.get('ind')) > 0 ? params.get('ind') : 'all', q: params.get('q') || '' };

  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function matchInd(s, k) { return k === 'all' || s.cat === k || s.cat === 'any'; }
  function matchQ(s) {
    var q = norm(state.q.trim());
    if (!q) return true;
    var k = 'sol.' + s.slug + '.';
    // search across all languages so "hóa đơn", "invoice" and "factuur" all work
    return I.langs.some(function (l) {
      var d = window.IFD_I18N_DICT[l].sol[s.slug];
      return norm([d.name, d.pain, d.tag, d.field].join(' ')).indexOf(q) !== -1;
    }) || norm(I.tx(k + 'name')).indexOf(q) !== -1;
  }

  function card(s) {
    var k = 'sol.' + s.slug + '.', dark = !!s.demo;
    var metric = s.metric
      ? '<span class="chip"><strong>' + s.metric + '</strong><span class="chip-lab">' + t(k + 'metricLab') + '</span></span>'
      : '<span class="pending">' + t('common.metricsPending') + '</span>';
    return '<article class="card tall lift' + (dark ? ' dark' : '') + '" data-asm="piece" data-tilt="6">' +
      '<div class="meta"><span class="num">' + s.n + '</span>' + t(k + 'tag') +
      (dark ? '<span class="pill-live">' + t('common.tryNow') + '</span>' : '') + '</div>' +
      '<h2>' + t(k + 'name') + '</h2>' +
      '<p class="card-pain">' + t(k + 'pain') + '</p>' +
      '<div class="card-foot">' + metric +
      '<a class="card-cta card-link" href="' + U.solUrl(s.slug) + '">' + t(dark ? 'common.viewDetailsDemo' : 'common.viewDetails') + '</a></div></article>';
  }

  function render() {
    $('filters').innerHTML = CATS.map(function (c) {
      var n = SOL.filter(function (s) { return matchInd(s, c); }).length;
      return '<button type="button" data-ind="' + c + '" aria-pressed="' + (state.ind === c) + '">' + t('market.filters.' + c) + ' <span>' + n + '</span></button>';
    }).join('');
    var shown = SOL.filter(function (s) { return matchInd(s, state.ind) && matchQ(s); });
    $('grid').innerHTML = shown.map(card).join('');
    $('grid').hidden = !shown.length;
    $('count').textContent = I.tx('market.count', { a: shown.length, b: SOL.length });
    if ($('q').value !== state.q) $('q').value = state.q;
    document.querySelector('[data-i18n="market.lead"]').setAttribute('data-i18n-vars', JSON.stringify({ n: SOL.length }));
  }

  function update() {
    render();
    I.apply();
    window.IFD_MOTION.refresh();
    var u = new URL(location.href);
    state.ind === 'all' ? u.searchParams.delete('ind') : u.searchParams.set('ind', state.ind);
    state.q ? u.searchParams.set('q', state.q) : u.searchParams.delete('q');
    history.replaceState(null, '', u);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ind]');
    if (b) { state.ind = b.getAttribute('data-ind'); update(); }
  });
  $('q').addEventListener('input', function (e) { state.q = e.target.value; update(); });

  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(render);
})();
