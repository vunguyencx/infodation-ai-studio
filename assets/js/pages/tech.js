/* Technology page: 3D layer stack, data-flow diagram, cluster cards, capability matrix, principles. */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI;
  var t = I.t, esc = U.esc;
  var $ = function (id) { return document.getElementById(id); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Non-text facts per cluster (texts live in i18n/tech.js). sol = solutions on this site that use it in production.
  var CL = [
    { id: 'cv', c: 'var(--pop)', metric: '92%', tech: ['YOLOv8', 'PyTorch', 'OpenCV', 'ONNX Runtime'], sol: ['intellicad', 'shrimp-counter'] },
    { id: 'doc', c: 'var(--accent)', metric: '98.5%', tech: ['Azure Document Intelligence', 'Azure OpenAI', 'Tesseract', 'Python'], sol: ['intellicad', 'document-ai'] },
    { id: 'speech', c: 'var(--live)', metric: '8% WER', tech: ['Azure Speech', 'Whisper', 'WebSocket', 'FastAPI'], sol: ['voice-bot'] },
    { id: 'int', c: 'var(--ink)', metric: '15 s', tech: ['Azure Service Bus', 'SAP RFC / BAPI', 'HL7 FHIR', '.NET / C#'], sol: ['document-ai'] },
    { id: 'ops', c: '#3D63FF', metric: '7', tech: ['MLflow', 'Azure ML', 'Grafana', 'Docker / K8s'], sol: ['voice-bot', 'shrimp-counter'] },
    { id: 'sec', c: 'var(--ink-deep)', metric: '100%', tech: ['Azure Private Cloud', 'Kubernetes', 'Vault', 'RBAC'], sol: ['document-ai'] }
  ];
  var MATRIX_SOL = ['intellicad', 'document-ai', 'voice-bot', 'shrimp-counter'];

  function metric(m) { return I.lang === 'en' ? m : m.replace(/(\d)\.(\d)/, '$1,$2'); }
  function px(s) { return esc(I.plain(s)); }
  function solName(slug) { return t('sol.' + slug + '.name'); }

  /* ---------- hero stack ---------- */
  function stack() {
    var L = t('tech.layers'), lay = function (n) { return '<small>' + L.layer + ' ' + n + '</small>'; };
    var sol = '';
    for (var i = 1; i <= 7; i++) sol += '<span>0' + i + '</span>';
    sol += '<span class="lab">' + px(L.sol) + '</span>';
    // DOM order = bottom → top (layer 5 … layer 1)
    $('tstack').innerHTML =
      '<div class="tl sec">' + lay(5) + L.sec + '</div>' +
      '<div class="tl ops">' + lay(4) + L.ops + '</div>' +
      '<div class="tl int">' + lay(3) + L.int + '</div>' +
      '<div class="tl ai"><small>' + px(L.aiT).toUpperCase() + '</small><div class="ai-grid">' +
        L.ai.map(function (n, i) { return '<div class="ai-t t' + i + '">' + esc(n) + '</div>'; }).join('') + '</div></div>' +
      '<div class="tl sol">' + sol + '</div>';
    $('tstack-cap').innerHTML = '<div class="cap-h"><span class="cap-ic" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
      '<div><b>' + L.capT + '</b><span>' + L.aiSub + '</span></div></div><ul>' +
      L.ai.map(function (n, i) { return '<li class="t' + i + '"><em>0' + (i + 1) + '</em>' + esc(n) + '</li>'; }).join('') + '</ul>';
    $('tstack-hint').innerHTML = L.hint;
    document.querySelector('.tstack').setAttribute('aria-label', I.plain(t('tech.stackAria')) + ' — ' + I.plain(L.aiT) + ': ' + L.ai.join(', '));
    $('tstats').innerHTML = t('tech.stats').map(function (s) {
      return '<div><div class="stat-v">' + s[0] + '</div><div class="stat-l">' + s[1] + '</div></div>';
    }).join('');
  }

  // intro: layers drop in from above one by one; scrolling compresses them into one block ("assembling");
  // hovering opens layer 1 like a lid so layer 2 (AI technologies) pops up into view
  var S = { t0: 0, px: 0, py: 0, x: 0, y: 0, open: 0, to: 0, running: false };
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(v) { return 1 - Math.pow(1 - v, 3); }
  function frame(now) {
    var inner = $('tstack'); if (!inner) return;
    var layers = inner.children, vw = innerWidth, vh = innerHeight;
    var gOpen = vw < 640 ? 50 : 70, gClosed = vw < 640 ? 12 : 16;
    var c = ease(clamp(scrollY / (vh * 0.65)));
    var gap = gOpen + (gClosed - gOpen) * c;
    S.x += (S.px - S.x) * 0.08; S.y += (S.py - S.y) * 0.08;
    S.open += (S.to - S.open) * (reduce ? 1 : 0.1);
    var o = S.open, eo = ease(clamp(o));
    inner.style.transform = 'rotateX(' + (57 - S.y * 6 - eo * 6).toFixed(2) + 'deg) rotateZ(' + (-42 + S.x * 8).toFixed(2) + 'deg)';
    var busy = Math.abs(S.px - S.x) > 0.002 || Math.abs(S.py - S.y) > 0.002 || Math.abs(S.to - S.open) > 0.002;
    var top = layers.length - 1;
    for (var i = 0; i < layers.length; i++) {
      var p = reduce ? 1 : ease(clamp((now - S.t0 - 200 - i * 170) / 1000));
      if (p < 1) busy = true;
      var z = i * gap + (1 - p) * (520 + i * 90);
      var extra = '';
      if (i === top) {
        // layer 1 lifts and swings open on its back edge
        z += eo * (vw < 640 ? 70 : 110);
        extra = ' rotateX(' + (-eo * 68).toFixed(2) + 'deg)';
      } else if (i === top - 1) {
        z += eo * 18;
      }
      layers[i].style.transform = 'translateZ(' + z.toFixed(1) + 'px)' + extra + (p < 1 ? ' rotateZ(' + ((1 - p) * (i % 2 ? 25 : -25)).toFixed(2) + 'deg)' : '');
      layers[i].style.opacity = p >= 1 ? (i === top ? (1 - eo * 0.25).toFixed(3) : '') : Math.min(1, p * 1.6).toFixed(3);
      if (layers[i].classList.contains('ai')) {
        // the six technology tiles pop up one after another while the lid opens
        var tiles = layers[i].querySelectorAll('.ai-t'), spread = (1 - c) * 6;
        for (var k = 0; k < tiles.length; k++) {
          var q = ease(clamp(o * 1.7 - k * 0.12));
          tiles[k].style.transform = 'translateZ(' + (spread + q * 26).toFixed(1) + 'px) scale(' + (1 + q * 0.04).toFixed(3) + ')';
        }
      }
    }
    var cap = $('tstack-cap');
    if (cap) { cap.style.opacity = eo.toFixed(3); cap.style.transform = 'translateY(' + ((1 - eo) * 12).toFixed(1) + 'px)'; }
    var hint = $('tstack-hint'); if (hint) hint.style.opacity = (1 - eo).toFixed(3);
    if (busy) requestAnimationFrame(frame); else S.running = false;
  }
  function kick() { if (!S.running) { S.running = true; requestAnimationFrame(frame); } }

  /* ---------- flow diagram ---------- */
  function box(o) {
    var fill = o.fill || 'var(--surface)', tc = o.tc || 'var(--ink)', sc = o.sc || 'var(--text-3)';
    var rect = '<rect x="' + o.x + '" y="' + o.y + '" width="' + o.w + '" height="' + o.h + '" rx="' + (o.rx || 16) + '" style="fill:' + fill + ';stroke:' + (o.stroke || 'rgba(var(--ink-rgb),.15)') + '"' + (o.dash ? ' stroke-dasharray="6 5" stroke-width="2"' : ' stroke-width="1.5"') + '/>';
    var ty = o.ty || (o.num ? o.y + 50 : o.y + o.h / 2 - (o.sub2 ? 10 : o.sub ? 3 : -5));
    var txt = (o.num ? '<text x="' + (o.x + 16) + '" y="' + (o.y + 26) + '" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" style="fill:' + tc + '" opacity=".7">' + o.num + '</text>' : '') +
      '<text x="' + (o.x + 16) + '" y="' + ty + '" font-family="Be Vietnam Pro, sans-serif" font-size="16" font-weight="700" style="fill:' + tc + '">' + px(o.title) + '</text>' +
      (o.sub ? '<text x="' + (o.x + 16) + '" y="' + (ty + 19) + '" font-family="JetBrains Mono, monospace" font-size="11" style="fill:' + sc + '">' + px(o.sub) + '</text>' : '') +
      (o.sub2 ? '<text x="' + (o.x + 16) + '" y="' + (ty + 33) + '" font-family="JetBrains Mono, monospace" font-size="11" style="fill:' + sc + '">' + px(o.sub2) + '</text>' : '') + (o.extra || '');
    var body = o.href ? '<a href="' + o.href + '">' + rect + txt + '</a>' : rect + txt;
    return '<g class="fl-node" data-asm="' + (o.asm || 'rise') + '">' + body + '</g>';
  }
  function flow() {
    var T = function (k) { return t('tech.' + k); };
    var C = T('clusters'), inputs = T('inputs'), sys = T('systems');
    // four input lanes, each feeding its own AI engine; everything converges on the confidence gate (gy)
    var ys = [36, 140, 244, 348], cy = function (i) { return ys[i] + 42; }, gy = 234;
    var lines = '', nodes = '', packets = '';
    ys.forEach(function (y, i) {
      lines += '<path class="fl-line" d="M240 ' + cy(i) + ' H300"/>';
      lines += '<path class="fl-line" d="M530 ' + cy(i) + ' C570 ' + cy(i) + ' 570 ' + gy + ' 610 ' + gy + '"/>';
    });
    lines += '<path class="fl-line" d="M810 ' + gy + ' H870"/>';
    lines += '<path class="fl-line alt" d="M710 179 V116"/>';
    lines += '<path class="fl-line alt" d="M810 78 C900 78 945 116 945 179"/>';
    var sy = [124, 190, 256, 322];
    sy.forEach(function (y) { lines += '<path class="fl-line" d="M1030 ' + gy + ' C1050 ' + gy + ' 1050 ' + (y + 26) + ' 1070 ' + (y + 26) + '"/>'; });
    if (!reduce) {
      [[0, '0s', '3.4s'], [1, '0.9s', '3s'], [2, '1.8s', '3.6s'], [3, '2.6s', '3.2s']].forEach(function (p) {
        var y = cy(p[0]), end = sy[p[0]] + 26;
        var path = 'M240 ' + y + ' H530 C570 ' + y + ' 570 ' + gy + ' 610 ' + gy + ' H1030 C1050 ' + gy + ' 1050 ' + end + ' 1070 ' + end;
        packets += '<circle r="5" style="fill:var(--note)"><animateMotion dur="' + p[2] + '" begin="' + p[1] + '" repeatCount="indefinite" path="' + path + '"/></circle>';
      });
    }
    var ENG = [
      { title: 'LLMs & Knowledge AI', sub: 'Azure OpenAI · RAG · Vector DB', fill: 'var(--pop)' },
      { title: 'Document AI & LLMs', sub: 'OCR · Azure DI · Azure OpenAI', fill: 'var(--accent)', href: '#c-doc' },
      { title: C[2].name, sub: 'Azure Speech · Whisper', fill: 'var(--live)', href: '#c-speech' },
      { title: 'Computer Vision', sub: 'YOLOv11 · PyTorch', fill: 'color-mix(in srgb, var(--ink) 14%, #FFFFFF)', href: '#c-cv' }
    ];
    inputs.forEach(function (n, i) { nodes += box({ x: 20, y: ys[i], w: 220, h: 84, title: n[0], sub: n[1], sub2: n[2], asm: 'left' }); });
    ENG.forEach(function (e, i) { nodes += box({ x: 300, y: ys[i], w: 230, h: 84, num: '0' + (i + 1), title: e.title, sub: e.sub, fill: e.fill, stroke: 'transparent', sc: 'var(--ink)', href: e.href, asm: 'drop' }); });
    var gauge = '<rect x="626" y="258" width="168" height="8" rx="4" style="fill:rgba(var(--ink-rgb),.1)"/><rect x="626" y="258" width="128" height="8" rx="4" style="fill:var(--live)"/>' +
      '<rect x="726" y="252" width="3" height="20" rx="1.5" style="fill:var(--note)"/>';
    nodes += box({ x: 610, y: 179, w: 200, h: 110, title: T('gate'), sub: T('gateSub'), ty: 213, extra: gauge, stroke: 'var(--ink)', asm: 'zoom' });
    nodes += box({ x: 610, y: 40, w: 200, h: 76, title: T('human'), sub: T('humanSub'), dash: true, stroke: 'var(--note)', asm: 'drop' });
    nodes += box({ x: 870, y: 179, w: 160, h: 110, num: '05', title: t('tech.layers').flowInt, sub: 'SAP · HL7 FHIR', fill: 'var(--ink)', tc: '#FFFFFF', sc: 'var(--on-ink-2)', stroke: 'transparent', href: '#c-int', asm: 'right' });
    sys.forEach(function (n, i) { nodes += box({ x: 1070, y: sy[i], w: 120, h: 52, title: n, rx: 12, asm: 'right' }); });
    nodes += box({ x: 20, y: 470, w: 1170, h: 56, title: '06 · ' + C[4].name + '  —  ' + I.plain(T('opsSub')), fill: 'rgba(61,99,255,.1)', stroke: 'rgba(61,99,255,.5)', href: '#c-ops', asm: 'rise' });
    nodes += box({ x: 20, y: 536, w: 1170, h: 56, title: '07 · ' + C[5].name + '  —  ' + I.plain(T('secSub')), fill: 'var(--ink-deep)', tc: '#FFFFFF', stroke: 'transparent', href: '#c-sec', asm: 'rise' });
    var labels = '<g font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">' +
      '<text x="840" y="222" text-anchor="middle" style="fill:var(--ink)">' + px(T('pass')) + '</text>' +
      '<text x="720" y="152" style="fill:var(--note)">' + px(T('below')) + '</text>' +
      '<text x="890" y="68" style="fill:var(--note)">' + px(T('approved')) + '</text>' +
      '<text x="1070" y="110" style="fill:var(--text-3)">' + px(T('yours')) + '</text>' +
      '<text x="20" y="458" style="fill:var(--text-3)">' + px(T('under')) + '</text></g>';
    $('flow-svg').innerHTML = '<svg viewBox="0 0 1200 610" role="img" aria-label="' + px(T('flowAria')) + '">' + lines + packets + labels +
      '<g data-asm-stagger=".04">' + nodes + '</g></svg>';
  }

  /* ---------- cluster cards ---------- */
  function cards() {
    var C = t('tech.clusters');
    $('tcards').innerHTML = CL.map(function (cl, i) {
      var c = C[i];
      return '<article class="tcard lift" id="c-' + cl.id + '" style="--c:' + cl.c + '" data-asm="piece" data-tilt="4">' +
        '<div class="tcard-top"><div><span class="tcard-n">0' + (i + 1) + ' / 06</span><h3>' + c.name + '</h3></div>' +
        '<div class="tcard-m"><b>' + metric(cl.metric) + '</b><span>' + c.metricL + '</span></div></div>' +
        '<div class="tchips" aria-label="' + px(t('tech.stackT')) + '">' + cl.tech.map(function (x) { return '<span class="tchip">' + esc(x) + '</span>'; }).join('') + '</div>' +
        '<p>' + c.desc + '</p>' +
        '<ul class="tcaps">' + c.caps.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
        '<span class="note">' + c.note + '</span>' +
        '<div class="tlimit"><b>' + t('tech.limitT') + ':</b> ' + c.limit + '</div>' +
        '<div class="tprod"><span>' + t('tech.prodT') + '</span>' + cl.sol.map(function (s) { return '<a href="' + U.solUrl(s) + '">' + solName(s) + '</a>'; }).join('') + '</div>' +
        '</article>';
    }).join('');
  }

  /* ---------- matrix ---------- */
  function matrix() {
    var C = t('tech.clusters'), h = '<div class="ch" aria-hidden="true"></div>';
    h += MATRIX_SOL.map(function (s) { return '<div class="ch"><a href="' + U.solUrl(s) + '">' + solName(s) + '</a></div>'; }).join('');
    CL.forEach(function (cl, i) {
      h += '<div class="rh" style="--c:' + cl.c + '"><i></i><a href="#c-' + cl.id + '" style="text-decoration:none">' + C[i].name + '</a></div>';
      MATRIX_SOL.forEach(function (s) {
        var on = cl.sol.indexOf(s) !== -1;
        h += '<div style="--c:' + cl.c + '"' + (on ? ' data-asm="flip"' : '') + '><span class="' + (on ? 'dot-on' : 'dot-off') + '" role="img" aria-label="' + px(C[i].name) + ' × ' + px(solName(s)) + (on ? ' ✓' : ' —') + '"></span></div>';
      });
    });
    $('matrix').innerHTML = h;
  }

  /* ---------- principles ---------- */
  var ICONS = [
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 44a24 24 0 0 1 48 0" fill="none" stroke-width="7" stroke-linecap="round" style="stroke:rgba(var(--ink-rgb),.12)"/><path d="M8 44a24 24 0 0 1 40-18" fill="none" stroke-width="7" stroke-linecap="round" style="stroke:var(--live)"/><path d="M32 44 L46 24" stroke-width="3.5" stroke-linecap="round" style="stroke:var(--ink)"/><circle cx="32" cy="44" r="5" style="fill:var(--ink)"/><path d="M50 14 v10" stroke-width="3" style="stroke:var(--note)"/></svg>',
    '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="24" cy="20" r="9" style="fill:var(--ink)"/><path d="M8 52c0-10 7-17 16-17s16 7 16 17z" style="fill:var(--ink)"/><circle cx="44" cy="40" r="10" fill="none" stroke-width="4" style="stroke:var(--accent)"/><path d="M51 47 l7 7" stroke-width="4.5" stroke-linecap="round" style="stroke:var(--accent)"/></svg>',
    '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="18" width="22" height="28" rx="6" style="fill:var(--ink)"/><rect x="36" y="18" width="22" height="28" rx="6" style="fill:var(--pop)"/><path d="M28 32 h8" stroke-width="5" stroke-linecap="round" style="stroke:var(--note)"/><path d="M12 28h10M12 36h6" stroke-width="3" stroke-linecap="round" stroke="#FFFFFF"/></svg>',
    '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="34" width="10" height="20" rx="3" style="fill:rgba(var(--ink-rgb),.2)"/><rect x="24" y="24" width="10" height="30" rx="3" style="fill:rgba(var(--ink-rgb),.35)"/><rect x="40" y="12" width="10" height="42" rx="3" style="fill:var(--accent)"/><path d="M6 18 H58" stroke-width="2.5" stroke-dasharray="4 4" style="stroke:var(--note)"/></svg>'
  ];
  function principles() {
    $('prs').innerHTML = t('tech.principles').map(function (p, i) {
      return '<div class="pr lift" data-asm="piece" data-tilt="6">' + ICONS[i] + '<span class="num">0' + (i + 1) + '</span><h3>' + p.t + '</h3><p>' + p.x + '</p></div>';
    }).join('');
  }

  var first = true;
  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(function () {
    stack(); flow(); cards(); matrix(); principles();
    if (first) {
      first = false;
      S.t0 = performance.now(); kick();
      addEventListener('scroll', kick, { passive: true });
      addEventListener('resize', kick);
      var host = document.querySelector('.tstack');
      host.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { S.to = 1; kick(); } });
      host.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { S.to = 0; kick(); } });
      host.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') { S.to = S.to ? 0 : 1; kick(); } });
      host.addEventListener('focus', function () { S.to = 1; kick(); });
      host.addEventListener('blur', function () { S.to = 0; kick(); });
      if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
        host.addEventListener('pointermove', function (e) {
          var r = host.getBoundingClientRect();
          S.px = ((e.clientX - r.left) / r.width - 0.5) * 2; S.py = ((e.clientY - r.top) / r.height - 0.5) * 2; kick();
        });
        host.addEventListener('pointerleave', function () { S.px = 0; S.py = 0; kick(); });
      }
    } else {
      S.t0 = -1e6; kick(); // language switch: re-rendered layers jump straight to their resting place
    }
  });
})();
