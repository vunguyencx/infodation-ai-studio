/* Per-solution hero drawings (blueprint style) and live demos.
 * Each demo keeps its own state and re-renders from it, so a language switch never loses progress.
 * Actions use data-act="name" (click) / data-act-input="name" (input) and are routed by detail.js.
 */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI;
  var t = I.t, esc = U.esc;
  var MONO = 'font-family="JetBrains Mono, monospace"';
  var ACC = 'style="fill:var(--accent)"', ACCS = 'style="stroke:var(--accent)"';

  function LOC() { return { en: 'en-GB', vi: 'vi-VN', nl: 'nl-NL' }[I.lang] || 'en-GB'; }
  function rnd(seed) { var x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function D(slug) { return function (k, v) { return t('sol.' + slug + '.demo.' + k, v); }; }
  function arrowAI(x1, x2, y) {
    return '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - 12) + '" y2="' + y + '" stroke="#F5B13D" stroke-width="2.4" stroke-dasharray="6 5"/>' +
      '<path d="M' + (x2 - 14) + ' ' + (y - 9) + ' L' + x2 + ' ' + y + ' L' + (x2 - 14) + ' ' + (y + 9) + ' Z" fill="#F5B13D"/>' +
      '<text x="' + ((x1 + x2) / 2) + '" y="' + (y - 15) + '" fill="#F5B13D" ' + MONO + ' font-size="15" font-weight="700" text-anchor="middle">AI</text>';
  }

  /* ---------- isometric building (ported from the IntelliCAD design) ---------- */
  function iso(o) {
    var s = o.s, cx = o.cx, cy = o.cy, w = 9, d = 6, fh = 1.1, h = o.floors * fh;
    var P = function (x, y, z) { return [cx + (x - y) * 0.866 * s, cy + (x + y) * 0.5 * s - z * s]; };
    var pts = function (arr) { return arr.map(function (p) { return P(p[0], p[1], p[2]).map(function (n) { return n.toFixed(1); }).join(','); }).join(' '); };
    var L = function (a, b) { var p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]); return 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' L' + q[0].toFixed(1) + ' ' + q[1].toFixed(1); };
    var lines = [], i, x, y;
    var whole = Math.floor(o.floors);
    for (i = 1; i <= whole && i < o.floors; i++) { var z = i * fh; lines.push(L([w, 0, z], [w, d, z])); lines.push(L([0, d, z], [w, d, z])); }
    if (o.floors > 0) {
      for (x = 1.5; x < w; x += 1.5) lines.push(L([x, d, 0], [x, d, h]));
      for (y = 1.5; y < d; y += 1.5) lines.push(L([w, y, 0], [w, y, h]));
    }
    var cr = o.floors > 0 ? [[0, 0, h], [w, 0, h], [w, d, h], [0, d, h], [0, d, 0], [w, d, 0], [w, 0, 0]] : [[0, 0, 0], [w, 0, 0], [w, d, 0], [0, d, 0]];
    return {
      top: pts([[0, 0, h], [w, 0, h], [w, d, h], [0, d, h]]),
      right: pts([[w, 0, 0], [w, d, 0], [w, d, h], [w, 0, h]]),
      front: pts([[0, d, 0], [w, d, 0], [w, d, h], [0, d, h]]),
      base: pts([[0, 0, 0], [w, 0, 0], [w, d, 0], [0, d, 0]]),
      wallsD: [L([5.5, 0, 0], [5.5, 3, 0]), L([0, 3, 0], [w, 3, 0]), L([4, 3, 0], [4, d, 0])].join(' '),
      linesD: lines.join(' ') || 'M0 0',
      cornersD: cr.map(function (p) { var q = P(p[0], p[1], p[2]); return 'M' + (q[0] - 3.4).toFixed(1) + ' ' + q[1].toFixed(1) + ' a3.4 3.4 0 1 0 6.8 0 a3.4 3.4 0 1 0 -6.8 0'; }).join(' '),
      built: o.floors > 0 ? 1 : 0, planOp: o.floors > 0 ? 0.25 : 1
    };
  }
  function building(m, sw) {
    return '<g opacity="' + m.built + '"><polygon points="' + m.front + '" fill="#2443B8" stroke="#FFFFFF" stroke-width="' + sw + '"/>' +
      '<polygon points="' + m.right + '" fill="#1B3489" stroke="#FFFFFF" stroke-width="' + sw + '"/>' +
      '<polygon points="' + m.top + '" fill="#22354F" stroke="#FFFFFF" stroke-width="' + sw + '"/>' +
      '<path d="' + m.linesD + '" stroke="#7FA2EE" stroke-width="0.8" fill="none"/></g>' +
      '<path d="' + m.cornersD + '" fill="#F5B13D"/>';
  }

  /* ---------- hero drawings ---------- */
  var HERO = {
    // design v2 sequence: plan walls draw in → dimensions fade → AI arrow flows → building rises → corners pop
    intellicad: function () {
      var m = iso({ s: 12, cx: 430, cy: 262, floors: 9 });
      var d = function (ms) { return ' style="--d:' + ms + 'ms"'; };
      return '<svg viewBox="0 0 540 380" role="img" aria-label="' + I.tx('sol.intellicad.demo.figAria') + '">' +
        '<g class="dfade"' + d(1100) + ' stroke="#5E86C9" stroke-width="1" fill="none"><line x1="20" y1="96" x2="130" y2="96"/><line x1="130" y1="96" x2="220" y2="96"/><line x1="20" y1="90" x2="20" y2="102"/><line x1="130" y1="90" x2="130" y2="102"/><line x1="220" y1="90" x2="220" y2="102"/><line x1="4" y1="120" x2="4" y2="270"/><line x1="-2" y1="120" x2="10" y2="120"/><line x1="-2" y1="270" x2="10" y2="270"/></g>' +
        '<text class="dfade"' + d(1200) + ' x="75" y="88" fill="#F5B13D" ' + MONO + ' font-size="11" text-anchor="middle">5 200</text><text class="dfade"' + d(1250) + ' x="175" y="88" fill="#F5B13D" ' + MONO + ' font-size="11" text-anchor="middle">3 000</text>' +
        '<g stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="square">' +
        '<path class="dd"' + d(300) + ' pathLength="1" d="M20 120 H220 V270 H20 Z"/><path class="dd"' + d(650) + ' pathLength="1" d="M130 120 V200"/>' +
        '<path class="dd"' + d(750) + ' pathLength="1" d="M20 200 H220"/><path class="dd"' + d(850) + ' pathLength="1" d="M95 200 V270"/></g>' +
        '<g stroke="#8FB3E8" stroke-width="1.2" fill="none"><path class="dd"' + d(1000) + ' pathLength="1" d="M130 165 A 22 22 0 0 0 108 187"/><path class="dd"' + d(1050) + ' pathLength="1" d="M95 235 A 18 18 0 0 1 113 253"/></g>' +
        '<circle class="dspin" cx="168" cy="236" r="22" ' + ACCS + ' stroke-width="2.4" fill="none" stroke-dasharray="7 4"/>' +
        '<text class="dfade"' + d(950) + ' x="168" y="241" ' + ACC + ' ' + MONO + ' font-size="13" font-weight="700" text-anchor="middle">R1</text>' +
        '<text class="dfade"' + d(1200) + ' x="20" y="298" fill="#A7B6C6" ' + MONO + ' font-size="11">A-101 · 2D</text>' +
        '<line class="dflow" x1="242" y1="195" x2="300" y2="195" stroke="#F5B13D" stroke-width="2.4" stroke-dasharray="6 5"/>' +
        '<path class="dfade"' + d(1150) + ' d="M298 186 L312 195 L298 204 Z" fill="#F5B13D"/>' +
        '<text class="dfade"' + d(1100) + ' x="268" y="180" fill="#F5B13D" ' + MONO + ' font-size="15" font-weight="700" text-anchor="middle">AI</text>' +
        '<g class="drise"><polygon points="' + m.front + '" fill="#2443B8" stroke="#FFFFFF" stroke-width="1.6"/><polygon points="' + m.right + '" fill="#1B3489" stroke="#FFFFFF" stroke-width="1.6"/>' +
        '<polygon points="' + m.top + '" fill="#22354F" stroke="#FFFFFF" stroke-width="1.6"/><path d="' + m.linesD + '" stroke="#7FA2EE" stroke-width="0.8" fill="none"/></g>' +
        '<path class="dpop" d="' + m.cornersD + '" fill="#F5B13D"/>' +
        '<text class="dfade"' + d(2200) + ' x="430" y="372" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">3D · LOD 300</text></svg>';
    },
    'document-ai': function () {
      var rows = '';
      for (var i = 0; i < 6; i++) rows += '<line x1="40" y1="' + (176 + i * 16) + '" x2="' + (150 + rnd(i) * 40) + '" y2="' + (176 + i * 16) + '" stroke="#5E86C9" stroke-width="2"/><line x1="176" y1="' + (176 + i * 16) + '" x2="200" y2="' + (176 + i * 16) + '" stroke="#5E86C9" stroke-width="2"/>';
      var fields = [['SUPPLIER', '99.6'], ['INVOICE NO.', '99.9'], ['DATE', '99.8'], ['VAT NO.', '98.9'], ['TOTAL', '99.7']];
      return '<svg viewBox="0 0 540 380" role="img" aria-label="Invoice → ERP">' +
        '<g class="draw" fill="none" stroke="#FFFFFF" stroke-width="2.4"><rect x="20" y="40" width="200" height="290" rx="4" pathLength="1"/></g>' +
        '<rect x="40" y="62" width="70" height="14" fill="#FFFFFF" opacity=".85"/><line x1="40" y1="92" x2="120" y2="92" stroke="#8FB3E8" stroke-width="2"/><line x1="40" y1="104" x2="100" y2="104" stroke="#8FB3E8" stroke-width="2"/>' +
        '<line x1="150" y1="64" x2="200" y2="64" stroke="#8FB3E8" stroke-width="2"/><line x1="160" y1="76" x2="200" y2="76" stroke="#8FB3E8" stroke-width="2"/>' +
        '<rect x="34" y="56" width="82" height="26" rx="3" fill="none" ' + ACCS + ' stroke-width="2" stroke-dasharray="6 4"/>' +
        '<rect x="144" y="56" width="62" height="28" rx="3" fill="none" ' + ACCS + ' stroke-width="2" stroke-dasharray="6 4"/>' +
        '<line x1="40" y1="150" x2="200" y2="150" stroke="#FFFFFF" stroke-width="1.2"/>' + rows +
        '<line x1="120" y1="282" x2="200" y2="282" stroke="#FFFFFF" stroke-width="1.2"/><rect x="150" y="290" width="50" height="14" fill="#F5B13D"/>' +
        '<rect x="142" y="284" width="66" height="28" rx="3" fill="none" ' + ACCS + ' stroke-width="2.4" stroke-dasharray="6 4"/>' +
        '<text x="20" y="352" fill="#A7B6C6" ' + MONO + ' font-size="11">INV-0042 · PDF</text>' +
        arrowAI(238, 300, 190) +
        '<g transform="translate(316 92)"><rect width="214" height="200" rx="8" fill="#13202E" stroke="#5E86C9"/>' +
        '<text x="14" y="24" fill="#FFFFFF" ' + MONO + ' font-size="11" font-weight="700">ERP · PURCHASE INVOICE</text>' +
        fields.map(function (f, i) {
          return '<g transform="translate(14 ' + (44 + i * 30) + ')"><text y="10" fill="#A7B6C6" ' + MONO + ' font-size="10">' + f[0] + '</text>' +
            '<rect x="96" y="1" width="64" height="5" rx="2.5" fill="rgba(255,255,255,.1)"/><rect x="96" y="1" width="' + (64 * f[1] / 100) + '" height="5" rx="2.5" fill="#7FD49B"/>' +
            '<text x="186" y="10" fill="#EAF0F6" ' + MONO + ' font-size="10" text-anchor="end">' + f[1] + '%</text></g>';
        }).join('') + '</g>' +
        '<text x="423" y="320" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">ERP / CRM · SYNC</text></svg>';
    },
    'voice-bot': function () {
      var bars = '';
      for (var i = 0; i < 22; i++) { var h = 8 + Math.abs(Math.sin(i * 1.7)) * 46 * (0.4 + rnd(i) * 0.6); bars += '<rect x="' + (44 + i * 7.4) + '" y="' + (190 - h / 2) + '" width="4" height="' + h.toFixed(1) + '" rx="2" fill="#F5B13D"/>'; }
      var cal = '';
      for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) cal += '<rect x="' + (350 + c * 34) + '" y="' + (226 + r * 22) + '" width="30" height="18" rx="3" fill="' + (r === 1 && c === 1 ? 'var(--accent)' : 'rgba(255,255,255,.07)') + '"' + (r === 1 && c === 1 ? ' style="fill:var(--accent)"' : '') + '/>';
      return '<svg viewBox="0 0 540 380" role="img" aria-label="Voice → calendar → CRM">' +
        '<g class="draw" fill="none" stroke="#FFFFFF" stroke-width="2.4"><rect x="30" y="60" width="190" height="260" rx="26" pathLength="1"/></g>' +
        '<text x="125" y="98" fill="#EAF0F6" ' + MONO + ' font-size="12" text-anchor="middle">21:47 · INCOMING</text>' + bars +
        '<circle cx="125" cy="270" r="20" ' + ACC + '/><path d="M117 266c2 6 8 12 14 14l4-4-5-4-3 2c-2-1-5-4-6-6l2-3-4-5z" fill="#0E1A27"/>' +
        arrowAI(238, 300, 190) +
        '<rect x="316" y="70" width="170" height="40" rx="18" fill="rgba(255,255,255,.08)"/><text x="334" y="95" fill="#EAF0F6" ' + MONO + ' font-size="11">“next week, please”</text>' +
        '<rect x="346" y="120" width="180" height="40" rx="18" ' + ACC + '/><text x="364" y="145" fill="#0E1A27" ' + MONO + ' font-size="11" font-weight="700">TUE 09:30 · BOOKED</text>' +
        '<text x="350" y="214" fill="#A7B6C6" ' + MONO + ' font-size="10">MON TUE WED THU FRI</text>' + cal +
        '<text x="430" y="340" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">CALENDAR · CRM</text></svg>';
    },
    'shrimp-counter': function () {
      var larvae = '', boxes = '';
      for (var i = 0; i < 70; i++) {
        var a = rnd(i) * Math.PI * 2, rr = Math.sqrt(rnd(i + 50)) * 108, x = 125 + Math.cos(a) * rr, y = 190 + Math.sin(a) * rr, rot = rnd(i + 9) * 360;
        larvae += '<path d="M-6 0 q6 -6 12 0" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(0) + ')" stroke="#EAF0F6" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
        if (i % 9 === 0) boxes += '<rect x="' + (x - 9).toFixed(1) + '" y="' + (y - 9).toFixed(1) + '" width="18" height="18" fill="none" ' + ACCS + ' stroke-width="1.4"/>';
      }
      return '<svg viewBox="0 0 540 380" role="img" aria-label="Tray → count">' +
        '<g class="draw" fill="none" stroke="#FFFFFF" stroke-width="2.4"><circle cx="125" cy="190" r="120" pathLength="1"/></g>' +
        '<circle cx="125" cy="190" r="112" fill="none" stroke="#5E86C9" stroke-dasharray="3 5"/>' + larvae + boxes +
        '<text x="125" y="340" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">TRAY_CAM_01 · PL-12</text>' +
        arrowAI(262, 318, 190) +
        '<text x="430" y="186" fill="#FFFFFF" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="64" text-anchor="middle">1 248</text>' +
        '<text x="430" y="216" fill="#F5B13D" ' + MONO + ' font-size="13" font-weight="700" text-anchor="middle">PL · 98.6% · 7.4 s</text>' +
        '<line x1="350" y1="236" x2="510" y2="236" stroke="#5E86C9"/><text x="430" y="258" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">BATCH 2026-10-21 · #07</text></svg>';
    },
    'predictive-analytics': function () {
      var hist = [], fc = [], up = [], lo = [], i;
      for (i = 0; i <= 30; i++) { var v = 250 - i * 2.4 - Math.sin(i / 3) * 18 - rnd(i) * 14; hist.push((40 + i * 9) + ',' + v.toFixed(1)); }
      var last = 250 - 30 * 2.4 - Math.sin(10) * 18 - rnd(30) * 14;
      for (i = 0; i <= 18; i++) { var x = 310 + i * 11, f = last - i * 2.6 - Math.sin((30 + i) / 3) * 18, b = 6 + i * 2.2; fc.push(x + ',' + f.toFixed(1)); up.push(x + ',' + (f - b).toFixed(1)); lo.unshift(x + ',' + (f + b).toFixed(1)); }
      return '<svg viewBox="0 0 540 380" role="img" aria-label="Forecast">' +
        '<g stroke="#5E86C9" stroke-width="1"><line x1="40" y1="300" x2="520" y2="300"/><line x1="40" y1="60" x2="40" y2="300"/>' +
        [100, 160, 220].map(function (y) { return '<line x1="40" y1="' + y + '" x2="520" y2="' + y + '" stroke-dasharray="2 6"/>'; }).join('') + '</g>' +
        '<polygon points="' + up.concat(lo).join(' ') + '" style="fill:var(--accent)" opacity=".22"/>' +
        '<polyline class="draw" points="' + hist.join(' ') + '" fill="none" stroke="#FFFFFF" stroke-width="2.6" pathLength="1"/>' +
        '<polyline points="' + fc.join(' ') + '" fill="none" stroke="#F5B13D" stroke-width="2.6" stroke-dasharray="7 5"/>' +
        '<line x1="310" y1="60" x2="310" y2="300" ' + ACCS + ' stroke-width="1.6" stroke-dasharray="4 4"/>' +
        '<text x="314" y="74" ' + ACC + ' ' + MONO + ' font-size="11" font-weight="700">NOW · W26</text>' +
        '<text x="40" y="324" fill="#A7B6C6" ' + MONO + ' font-size="11">ERP · CRM · EXCEL</text><text x="520" y="324" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="end">FORECAST +18W</text></svg>';
    },
    'genai-tech-docs': function () {
      var code = '';
      for (var i = 0; i < 12; i++) code += '<rect x="' + (44 + (i % 4 === 0 ? 0 : 16) + (i % 3 === 2 ? 16 : 0)) + '" y="' + (78 + i * 18) + '" width="' + (40 + rnd(i) * 110).toFixed(0) + '" height="6" rx="3" fill="' + (i % 4 === 0 ? '#F5B13D' : '#5E86C9') + '"/>';
      var box = function (x, y, w, label, sub, acc) {
        return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="52" rx="6" fill="' + (acc ? 'none' : '#13202E') + '" stroke="' + (acc ? '' : '#FFFFFF') + '" ' + (acc ? ACCS : '') + ' stroke-width="1.6"/>' +
          '<text x="' + (x + w / 2) + '" y="' + (y + 23) + '" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif">' + label + '</text>' +
          '<text x="' + (x + w / 2) + '" y="' + (y + 40) + '" fill="#A7B6C6" ' + MONO + ' font-size="9.5" text-anchor="middle">' + sub + '</text>';
      };
      return '<svg viewBox="0 0 540 380" role="img" aria-label="Code → C4 diagram">' +
        '<g class="draw" fill="none" stroke="#FFFFFF" stroke-width="2.4"><rect x="28" y="50" width="200" height="270" rx="8" pathLength="1"/></g>' +
        '<circle cx="44" cy="64" r="3.5" fill="#FF6A3D"/><circle cx="56" cy="64" r="3.5" fill="#F5B13D"/><circle cx="68" cy="64" r="3.5" fill="#7FD49B"/>' + code +
        '<text x="28" y="344" fill="#A7B6C6" ' + MONO + ' font-size="11">src/ · 412 FILES</text>' +
        arrowAI(240, 296, 190) +
        '<g stroke="#7FA2EE" stroke-width="1.4" fill="none"><path d="M410 112 V146"/><path d="M410 198 V232"/><path d="M362 172 H336 V258 H350"/><path d="M458 172 H486 V258 H470"/></g>' +
        box(350, 60, 120, 'Web shop', 'React SPA') + box(350, 146, 120, 'API', 'Node.js', true) + box(306, 232, 100, 'Orders DB', 'PostgreSQL') + box(420, 232, 100, 'Worker', 'queue') +
        '<text x="412" y="320" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">C4 · CONTAINER</text></svg>';
    },
    'ai-agents': function () {
      var nodes = [[60, 120, 'IN'], [160, 80, 'ERP'], [160, 170, 'CRM'], [270, 125, 'RULES'], [380, 80, 'ACT'], [380, 180, '!'], [480, 130, 'OUT']];
      var edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6]];
      return '<svg viewBox="0 0 540 380" role="img" aria-label="Agent workflow">' +
        '<g stroke="#7FA2EE" stroke-width="1.6" fill="none">' + edges.map(function (e) { var a = nodes[e[0]], b = nodes[e[1]]; return '<path d="M' + a[0] + ' ' + a[1] + ' C' + ((a[0] + b[0]) / 2) + ' ' + a[1] + ' ' + ((a[0] + b[0]) / 2) + ' ' + b[1] + ' ' + b[0] + ' ' + b[1] + '"/>'; }).join('') + '</g>' +
        nodes.map(function (n, i) {
          var warn = n[2] === '!';
          return '<g class="draw"><circle cx="' + n[0] + '" cy="' + n[1] + '" r="26" fill="' + (warn ? 'rgba(245,177,61,.15)' : '#13202E') + '" stroke="' + (warn ? '#F5B13D' : '#FFFFFF') + '" stroke-width="2" pathLength="1" style="animation-delay:' + (i * 0.12) + 's"/></g>' +
            '<text x="' + n[0] + '" y="' + (n[1] + 4) + '" fill="' + (warn ? '#F5B13D' : '#EAF0F6') + '" ' + MONO + ' font-size="' + (warn ? 18 : 10) + '" font-weight="700" text-anchor="middle">' + n[2] + '</text>';
        }).join('') +
        '<g transform="translate(380 252)"><circle cx="0" cy="0" r="12" ' + ACC + '/><path d="M-20 34 q20 -26 40 0" ' + ACC + '/></g>' +
        '<path d="M380 208 V236" stroke="#F5B13D" stroke-width="1.6" stroke-dasharray="4 4"/>' +
        '<text x="380" y="310" fill="#A7B6C6" ' + MONO + ' font-size="11" text-anchor="middle">HUMAN-IN-THE-LOOP</text>' +
        '<text x="60" y="340" fill="#A7B6C6" ' + MONO + ' font-size="11">AG-07 · 6 TASKS · 1 FLAG</text></svg>';
    }
  };

  /* ---------- demos ---------- */
  var DEMOS = {};

  // IntelliCAD — redline review, 2D → 3D, product UI (as in the design)
  DEMOS.intellicad = (function () {
    var d = D('intellicad');
    var S = { tab: 0, st: {}, floors: 6, done: false };
    var base = [['D-101', 94], ['A-102', 87], ['A-103', 78], ['S-201', 91], ['W-201', 82], ['A-104', 55]];
    function render(paneIn) {
      var tabs = '<div class="tabs" role="tablist" aria-label="' + I.tx('sol.intellicad.demo.tabsLabel') + '">' +
        d('tabs').map(function (l, i) { return '<button type="button" role="tab" aria-selected="' + (S.tab === i) + '" data-act="tab" data-v="' + i + '">' + l + '</button>'; }).join('') + '</div>';
      var body = S.tab === 0 ? redline() : S.tab === 1 ? model() : ui();
      return tabs + '<div class="demo-body' + (paneIn ? ' pane' : '') + '">' + body + '</div>';
    }
    function redline() {
      var names = d('rows'), approved = 0, rejected = 0;
      var rows = base.map(function (r, i) {
        var v = S.st[i] || 'p';
        if (v === 'a') approved++; if (v === 'r') rejected++;
        var bg = v === 'a' ? 'rgba(127,212,155,0.06)' : v === 'r' ? 'rgba(255,106,61,0.05)' : 'transparent';
        var act = v === 'p'
          ? '<button type="button" class="b-ok" data-act="row" data-i="' + i + '" data-v="a">' + d('approve') + '</button><button type="button" class="b-no" data-act="row" data-i="' + i + '" data-v="r">' + d('reject') + '</button>'
          : '<span class="' + (v === 'a' ? 'st-ok' : 'st-no') + '">' + d(v === 'a' ? 'isOk' : 'isNo') + '</span><button type="button" class="b-undo" data-act="row" data-i="' + i + '" data-v="p">' + d('undo') + '</button>';
        return '<div class="ws-grid" style="background:' + bg + '"><div style="display:flex;flex-direction:column;gap:4px"><span class="ws-task">' + names[i] + '</span>' +
          (r[1] < 70 ? '<span class="low">' + d('low') + '</span>' : '') + '</div>' +
          '<span class="ws-sheet">' + r[0] + '</span>' +
          '<div class="conf"><div class="conf-bar"><i style="width:' + r[1] + '%;background:' + (r[1] < 70 ? '#F5B13D' : '#7FD49B') + '"></i></div><span>' + r[1] + '%</span></div>' +
          '<div class="act">' + act + '</div></div>';
      }).join('');
      var pending = base.length - approved - rejected;
      var st = S.done ? (approved ? d('stDone', { a: approved }) : d('stNone')) : approved ? d('stReady', { a: approved, p: pending }) : d('stIdle');
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<div class="counts"><span>' + d('total') + ' <strong style="color:#FFFFFF">' + base.length + '</strong></span><span class="c-pend">' + d('pending') + ' <strong>' + pending + '</strong></span><span class="c-ok">' + d('approved') + ' <strong>' + approved + '</strong></span><span class="c-no">' + d('rejected') + ' <strong>' + rejected + '</strong></span></div></div>' +
        '<div class="scroll-x"><div><div class="ws-grid hd"><span>' + d('hTask') + '</span><span>' + d('hSheet') + '</span><span>' + d('hConf') + '</span><span>' + d('hReview') + '</span></div>' + rows + '</div></div>' +
        '<div class="ws-foot"><span aria-live="polite">' + st + '</span><button type="button" class="ws-btn" data-act="exec">' + d('exec') + '</button></div></div>';
    }
    function model() {
      var m = iso({ s: 20, cx: 230, cy: 250, floors: S.floors });
      return '<div class="ws ws-pad"><div class="ws-side"><span class="mono" style="font-size:12px;color:var(--bp-m3)">' + d('modelLabel') + '</span>' +
        '<span class="ws-big" id="model-title">' + (S.floors === 0 ? d('plan') : d('model', { n: S.floors })) + '</span>' +
        '<label>' + d('drag') + ' <strong id="floors-v">' + S.floors + '</strong><input class="rng" type="range" min="0" max="12" step="1" value="' + S.floors + '" data-act-input="floors" aria-label="' + I.tx('sol.intellicad.demo.floors') + '"></label>' +
        '<p>' + d('modelText') + '</p></div>' +
        '<figure class="ws-fig" data-tilt="6"><svg viewBox="0 0 500 400" role="img" aria-label="' + I.tx('sol.intellicad.demo.figAria') + '" id="model-svg">' + modelSvg(m) + '</svg></figure></div>';
    }
    function modelSvg(m) {
      return '<polygon points="' + m.base + '" fill="none" stroke="#FFFFFF" stroke-width="2.4" opacity="' + m.planOp + '"/>' +
        '<path d="' + m.wallsD + '" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="' + m.planOp + '"/>' + building(m, 1.4);
    }
    function ui() {
      return '<figure class="ui-shot"><img src="' + U.url('assets/img/intellicad-ui.jpg') + '" alt="' + I.tx('sol.intellicad.demo.uiAlt') + '" loading="lazy"><figcaption>' + d('uiCap') + '</figcaption></figure>';
    }
    var anim;
    return {
      render: render,
      act: function (a, el, redraw) {
        if (a === 'tab') { S.tab = +el.getAttribute('data-v'); redraw(true); }
        if (a === 'row') { S.st[el.getAttribute('data-i')] = el.getAttribute('data-v'); S.done = false; redraw(); }
        if (a === 'exec') { S.done = true; redraw(); }
      },
      input: function (a, el) {
        if (a !== 'floors') return;
        var target = +el.value, from = S.floors;
        S.floors = target;
        document.getElementById('floors-v').textContent = target;
        document.getElementById('model-title').innerHTML = target === 0 ? d('plan') : d('model', { n: target });
        // grow/shrink floor by floor so the model visibly assembles
        cancelAnimationFrame(anim);
        var t0 = performance.now(), svg = document.getElementById('model-svg');
        (function step(now) {
          var p = Math.min(1, (now - t0) / 260), f = from + (target - from) * (1 - Math.pow(1 - p, 3));
          svg.innerHTML = modelSvg(iso({ s: 20, cx: 230, cy: 250, floors: f }));
          if (p < 1) anim = requestAnimationFrame(step);
        })(t0);
      }
    };
  })();

  // Document AI — invoice extraction
  DEMOS['document-ai'] = (function () {
    var d = D('document-ai');
    var S = { n: 0, running: false, synced: false };
    var VALUES = ['Nordwind Sensors B.V.', 'INV-2026-0042', '14-10-2026', 'NL861234567B01', '€ 4.180,00', '€ 877,80', '€ 5.057,80'];
    var CONF = [99.6, 99.9, 99.8, 98.9, 99.4, 99.5, 99.7];
    var timer;
    function f(i) { return S.n > i ? ' hit' : ''; }
    function render() {
      var L = d('lines');
      var doc = '<div class="doc-mock" aria-hidden="true">' +
        '<div class="dm-h"><div><div class="f' + f(0) + '" style="font-weight:700;font-size:15px">Nordwind Sensors B.V.</div><div style="color:#6b7c89">Havenweg 12, 3011 Rotterdam</div><div class="f' + f(3) + '" style="color:#6b7c89;display:inline-block">BTW NL861234567B01</div></div>' +
        '<div style="text-align:right"><div style="font-family:var(--f-display);font-weight:800;font-size:20px">' + d('inv') + '</div><div class="f' + f(1) + '" style="display:inline-block">INV-2026-0042</div><br><div class="f' + f(2) + '" style="display:inline-block">14-10-2026</div></div></div>' +
        '<div style="color:#6b7c89;font-size:11px;text-transform:uppercase">' + d('billTo') + '</div><div>Infodation B.V. · Bodegraven</div>' +
        '<table><tr><th>' + d('desc') + '</th><th>' + d('qty') + '</th><th style="text-align:right">' + d('amount') + '</th></tr>' +
        '<tr><td>' + L[0] + '</td><td>1</td><td style="text-align:right">€ 2.400,00</td></tr><tr><td>' + L[1] + '</td><td>8</td><td style="text-align:right">€ 1.120,00</td></tr><tr><td>' + L[2] + '</td><td>2</td><td style="text-align:right">€ 660,00</td></tr></table>' +
        '<div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;justify-content:end;text-align:right"><span>' + d('net') + '</span><span class="f' + f(4) + '">€ 4.180,00</span><span>' + d('vat') + '</span><span class="f' + f(5) + '">€ 877,80</span><b>' + d('total') + '</b><b class="f' + f(6) + '">€ 5.057,80</b></div></div>';
      var rows = d('fields').map(function (name, i) {
        var on = S.n > i;
        return '<div class="ws-grid"><span class="ws-sheet">' + name + '</span><span class="val">' + (on ? esc(VALUES[i]) : '—') + '</span>' +
          '<div class="conf"><div class="conf-bar"><i style="width:' + (on ? CONF[i] : 0) + '%;background:#7FD49B"></i></div><span>' + (on ? CONF[i].toFixed(1) + '%' : '') + '</span></div></div>';
      }).join('');
      var avg = S.n ? (CONF.slice(0, S.n).reduce(function (a, b) { return a + b; }, 0) / S.n).toFixed(1) : 0;
      var st = S.synced ? d('stSynced') : S.n === VALUES.length ? d('stDone', { n: S.n, c: avg }) : d('stIdle');
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<button type="button" class="ws-btn" data-act="run"' + (S.running ? ' disabled' : '') + '>' + (S.running ? d('running') : d('run')) + '</button></div>' +
        '<div class="ws-pad" style="align-items:stretch">' + doc +
        '<div class="fields"><div class="ws-grid hd"><span>' + d('hField') + '</span><span>' + d('hVal') + '</span><span>' + d('hConf') + '</span></div>' + rows + '</div></div>' +
        '<div class="ws-foot"><span aria-live="polite">' + st + '</span><button type="button" class="ws-btn" data-act="sync"' + (S.n < VALUES.length ? ' disabled' : '') + '>' + d('sync') + '</button></div></div>';
    }
    return {
      render: render,
      act: function (a, el, redraw) {
        if (a === 'run' && !S.running) {
          S.n = 0; S.synced = false; S.running = true; redraw();
          clearInterval(timer);
          timer = setInterval(function () {
            S.n++;
            if (S.n >= VALUES.length) { S.running = false; clearInterval(timer); }
            redraw();
          }, 420);
        }
        if (a === 'sync' && S.n === VALUES.length) { S.synced = true; redraw(); }
      }
    };
  })();

  // Voice bot — simulated call
  DEMOS['voice-bot'] = (function () {
    var d = D('voice-bot');
    var S = { shown: 0, playing: false, done: false };
    var timer, waveT;
    function render() {
      var lines = d('lines').slice(0, S.shown).map(function (l) {
        var bot = l[0] === 'b';
        return '<div class="bubble ' + (bot ? 'bot' : 'caller') + '"><small>' + d(bot ? 'bot' : 'caller') + '</small>' + esc(l[1]) + '</div>';
      }).join('');
      var bars = '';
      for (var i = 0; i < 28; i++) bars += '<i></i>';
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<button type="button" class="ws-btn" data-act="play"' + (S.playing ? ' disabled' : '') + '>' + (S.playing ? d('playing') : S.done ? d('replay') : d('play')) + '</button></div>' +
        '<div class="ws-pad" style="align-items:stretch"><div class="ws-side" style="flex:0 1 260px">' +
        '<div class="wave" id="wave" aria-hidden="true">' + bars + '</div>' +
        '<div class="kpis"><div><b>' + (S.done ? d('intent') : '…') + '</b><span>' + d('kIntent') + '</span></div><div><b>' + (S.done ? '0:58' : '…') + '</b><span>' + d('kTime') + '</span></div><div><b>' + (S.done ? d('none') : '…') + '</b><span>' + d('kHuman') + '</span></div></div></div>' +
        '<div class="chat" aria-live="polite">' + lines + '<div class="booked' + (S.done ? ' on' : '') + '">' + d('booked') + '</div></div></div></div>';
    }
    function wave(on) {
      clearInterval(waveT);
      var w = document.getElementById('wave');
      if (!w) return;
      var bars = w.children;
      if (!on) { for (var i = 0; i < bars.length; i++) bars[i].style.height = '20%'; return; }
      waveT = setInterval(function () {
        var el = document.getElementById('wave'); if (!el) return;
        for (var i = 0; i < el.children.length; i++) el.children[i].style.height = (15 + Math.random() * 85).toFixed(0) + '%';
      }, 120);
    }
    return {
      render: render,
      after: function () { wave(S.playing); },
      act: function (a, el, redraw) {
        if (a !== 'play' || S.playing) return;
        S.shown = 0; S.done = false; S.playing = true; redraw();
        clearInterval(timer);
        timer = setInterval(function () {
          S.shown++;
          if (S.shown >= d('lines').length) { S.playing = false; S.done = true; clearInterval(timer); }
          redraw();
        }, 1100);
      }
    };
  })();

  // Shrimp counter — tray simulation
  DEMOS['shrimp-counter'] = (function () {
    var d = D('shrimp-counter');
    var S = { n: 800, counted: 0, running: false, result: null };
    var anim;
    function tray() {
      var out = '';
      for (var i = 0; i < S.n; i++) {
        var a = rnd(i + 3) * Math.PI * 2, r = Math.sqrt(rnd(i + 901)) * 168, x = 190 + Math.cos(a) * r, y = 190 + Math.sin(a) * r, rot = (rnd(i + 77) * 360).toFixed(0);
        var hit = i < S.counted;
        out += '<path d="M-4 0 q4 -4 8 0" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot + ')" stroke="' + (hit ? '#7FD49B' : '#EAF0F6') + '" stroke-width="1.3" fill="none" stroke-linecap="round"/>';
      }
      return '<svg class="tray" viewBox="0 0 380 380" role="img" aria-label="' + I.tx('sol.shrimp-counter.demo.trayAria') + '"><circle cx="190" cy="190" r="182" fill="#0B1520" stroke="#FFFFFF" stroke-width="2.4"/><circle cx="190" cy="190" r="174" fill="none" stroke="#5E86C9" stroke-dasharray="3 5"/>' + out + '</svg>';
    }
    function render() {
      var r = S.result;
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<button type="button" class="ws-btn" data-act="count"' + (S.running ? ' disabled' : '') + '>' + (S.running ? d('running') : d('run')) + '</button></div>' +
        '<div class="ws-pad"><div class="ws-side"><label>' + d('density') + ' <strong id="n-v">' + S.n + '</strong><input class="rng" type="range" min="200" max="2000" step="100" value="' + S.n + '" data-act-input="n"></label>' +
        '<div class="kpis"><div><b id="k-ai">' + (r ? r.ai.toLocaleString(LOC()) : S.running ? S.counted : '—') + '</b><span>' + d('kAi') + '</span></div>' +
        '<div><b>' + (r ? r.time + ' s' : '—') + '</b><span>' + d('kTime') + '</span></div>' +
        '<div><b>' + (r ? r.manual.toLocaleString(LOC()) : '—') + '</b><span>' + d('kManual') + '</span></div>' +
        '<div><b style="color:#F5C66E">' + (r ? r.err + '%' : '—') + '</b><span>' + d('kErr') + '</span></div></div></div>' +
        '<figure class="ws-fig" style="max-width:420px" id="tray">' + tray() + '</figure></div></div>';
    }
    return {
      render: render,
      input: function (a, el, redraw) {
        if (a !== 'n' || S.running) return;
        S.n = +el.value; S.counted = 0; S.result = null;
        document.getElementById('n-v').textContent = S.n;
        document.getElementById('tray').innerHTML = tray();
      },
      act: function (a, el, redraw) {
        if (a !== 'count' || S.running) return;
        S.running = true; S.counted = 0; S.result = null; redraw();
        var t0 = performance.now(), dur = 1600, painted = 0;
        cancelAnimationFrame(anim);
        (function step(now) {
          var p = Math.min(1, (now - t0) / dur);
          S.counted = Math.round(S.n * p);
          var tr = document.getElementById('tray'), k = document.getElementById('k-ai');
          if (tr) {
            var paths = tr.querySelectorAll('path');
            for (; painted < S.counted && painted < paths.length; painted++) paths[painted].setAttribute('stroke', '#7FD49B');
          }
          if (k) k.textContent = S.counted;
          if (p < 1) { anim = requestAnimationFrame(step); return; }
          var seed = S.n / 100;
          var ai = Math.round(S.n * (1 - (0.004 + rnd(seed) * 0.012) * (rnd(seed + 1) > 0.5 ? 1 : -1)));
          var manErr = 0.08 + rnd(seed + 2) * 0.12, man = Math.round(S.n * (1 + (rnd(seed + 3) > 0.5 ? manErr : -manErr)) / 50) * 50;
          S.result = { ai: ai, manual: man, err: '±' + Math.round(Math.abs(man - S.n) / S.n * 100), time: (5.8 + S.n / 1000 * 1.9).toFixed(1) };
          S.running = false; redraw();
        })(t0);
      }
    };
  })();

  // Predictive analytics — forecast chart
  DEMOS['predictive-analytics'] = (function () {
    var d = D('predictive-analytics');
    var S = { h: 12, sc: 0 };
    var HIST = [];
    for (var i = 0; i < 78; i++) HIST.push(100 + i * 0.35 + Math.sin((i / 52) * Math.PI * 2) * 14 + (rnd(i + 5) - 0.5) * 10);
    function forecast() {
      var out = [], n = HIST.length;
      for (var h = 1; h <= S.h; h++) {
        var w = n + h, base = 100 + w * 0.35 + Math.sin((w / 52) * Math.PI * 2) * 14 * (S.sc === 2 ? 1.5 : 1);
        if (S.sc === 1 && h <= 4) base *= 1.12;
        if (S.sc === 1 && h > 4 && h <= 6) base *= 0.96;
        var band = 3 + Math.sqrt(h) * 3.2;
        out.push({ v: base, lo: base - band, hi: base + band });
      }
      return out;
    }
    function render() {
      var F = forecast(), all = HIST.length + S.h, W = 640, H = 300, pl = 36, pr = 12, pt = 16, pb = 30;
      var min = 70, max = 160;
      var X = function (i) { return pl + i / (all - 1) * (W - pl - pr); }, Y = function (v) { return pt + (1 - (v - min) / (max - min)) * (H - pt - pb); };
      var hist = HIST.map(function (v, i) { return X(i).toFixed(1) + ',' + Y(v).toFixed(1); }).join(' ');
      var n = HIST.length;
      var fc = [X(n - 1).toFixed(1) + ',' + Y(HIST[n - 1]).toFixed(1)].concat(F.map(function (f, i) { return X(n + i).toFixed(1) + ',' + Y(f.v).toFixed(1); })).join(' ');
      var band = F.map(function (f, i) { return X(n + i).toFixed(1) + ',' + Y(f.hi).toFixed(1); }).concat(F.slice().reverse().map(function (f, i) { return X(n + F.length - 1 - i).toFixed(1) + ',' + Y(f.lo).toFixed(1); })).join(' ');
      var grid = [80, 100, 120, 140].map(function (v) { return '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="rgba(140,175,220,.15)"/><text x="' + (pl - 6) + '" y="' + (Y(v) + 4) + '" fill="#7F93A8" font-size="10" text-anchor="end" font-family="JetBrains Mono, monospace">' + v + '</text>'; }).join('');
      var next = F[0], lastYear = HIST[n - 52] || HIST[0];
      var trend = ((next.v / lastYear - 1) * 100).toFixed(1);
      var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + I.tx('sol.predictive-analytics.demo.chartAria') + '">' + grid +
        '<polygon points="' + band + '" style="fill:var(--accent)" opacity=".25"/>' +
        '<polyline points="' + hist + '" fill="none" stroke="#FFFFFF" stroke-width="2"/>' +
        '<polyline points="' + fc + '" fill="none" stroke="#F5B13D" stroke-width="2.4" stroke-dasharray="6 4"/>' +
        '<line x1="' + X(n - 1) + '" x2="' + X(n - 1) + '" y1="' + pt + '" y2="' + (H - pb) + '" style="stroke:var(--accent)" stroke-dasharray="4 4"/>' +
        '<text x="' + (pl + 4) + '" y="' + (H - 10) + '" fill="#EAF0F6" font-size="11" font-family="JetBrains Mono, monospace">— ' + d('actual') + '</text>' +
        '<text x="' + (pl + 110) + '" y="' + (H - 10) + '" fill="#F5B13D" font-size="11" font-family="JetBrains Mono, monospace">- - ' + d('forecast') + '</text></svg>';
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<div class="seg" role="group" aria-label="' + I.tx('sol.predictive-analytics.demo.scenario') + '">' + d('sc').map(function (l, i) { return '<button type="button" data-act="sc" data-v="' + i + '" aria-pressed="' + (S.sc === i) + '">' + l + '</button>'; }).join('') + '</div></div>' +
        '<div class="ws-pad"><div class="ws-side"><label>' + d('horizon') + ' <strong>' + d('weeks', { n: S.h }) + '</strong><input class="rng" type="range" min="4" max="26" step="1" value="' + S.h + '" data-act-input="h"></label>' +
        '<div class="kpis"><div><b>' + next.v.toFixed(0) + '</b><span>' + d('kNext') + '</span></div><div><b>±' + ((next.hi - next.v)).toFixed(0) + '</b><span>' + d('kBand') + '</span></div><div><b>' + (trend > 0 ? '+' : '') + trend + '%</b><span>' + d('kTrend') + '</span></div></div></div>' +
        '<figure class="ws-fig" id="fc-fig">' + svg + '</figure></div></div>';
    }
    return {
      render: render,
      act: function (a, el, redraw) { if (a === 'sc') { S.sc = +el.getAttribute('data-v'); redraw(); } },
      input: function (a, el, redraw) { if (a === 'h') { S.h = +el.value; redraw(); } }
    };
  })();

  // GenAI tech docs — C4 generator
  DEMOS['genai-tech-docs'] = (function () {
    var d = D('genai-tech-docs');
    var S = { lvl: 1, gen: false, running: false, reveal: 0 };
    var KEYS = ['ctx', 'con', 'cmp'];
    var EDGES = [[0, 1], [1, 2], [1, 3]];
    var timer;
    function diagram() {
      var nodes = d('nodes')[KEYS[S.lvl]];
      var pos = [[230, 30], [230, 150], [70, 270], [390, 270]];
      var edges = EDGES.map(function (e, i) {
        var a = pos[e[0]], b = pos[e[1]];
        return '<path d="M' + (a[0] + 90) + ' ' + (a[1] + 60) + ' C' + (a[0] + 90) + ' ' + (a[1] + 100) + ' ' + (b[0] + 90) + ' ' + (b[1] - 40) + ' ' + (b[0] + 90) + ' ' + b[1] + '" stroke="#7FA2EE" stroke-width="1.6" fill="none" opacity="' + (S.reveal > i + 1 ? 1 : 0) + '" style="transition:opacity .4s"/>';
      }).join('');
      var boxes = nodes.map(function (n, i) {
        var on = S.reveal > i, x = pos[i][0], y = pos[i][1], ext = n[1] === 'external', person = n[1] === 'person';
        return '<g style="transition:opacity .4s, transform .5s cubic-bezier(.2,.7,.2,1);transform:translateY(' + (on ? 0 : 18) + 'px);opacity:' + (on ? 1 : 0) + '">' +
          '<rect x="' + x + '" y="' + y + '" width="180" height="60" rx="' + (person ? 30 : 8) + '" fill="' + (ext ? 'rgba(255,255,255,.04)' : i === 1 ? 'rgba(61,99,255,.25)' : '#13202E') + '" stroke="' + (ext ? '#7F93A8' : '#FFFFFF') + '" stroke-width="1.6"' + (ext ? ' stroke-dasharray="5 4"' : '') + '/>' +
          '<text x="' + (x + 90) + '" y="' + (y + 27) + '" fill="#FFFFFF" font-size="14" font-weight="700" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif">' + esc(n[0]) + '</text>' +
          '<text x="' + (x + 90) + '" y="' + (y + 45) + '" fill="#A7B6C6" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">[' + esc(n[1]) + ']</text></g>';
      }).join('');
      return '<svg viewBox="0 0 640 350" role="img" aria-label="' + I.tx('sol.genai-tech-docs.demo.diagAria') + '">' + edges + boxes + '</svg>';
    }
    function render() {
      var st = S.gen && !S.running ? d('st', { n: 4, e: 3, f: [412, 412, 87][S.lvl] }) : '';
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<div class="row" style="gap:10px"><div class="seg" role="group">' + d('levels').map(function (l, i) { return '<button type="button" data-act="lvl" data-v="' + i + '" aria-pressed="' + (S.lvl === i) + '">' + l + '</button>'; }).join('') + '</div>' +
        '<button type="button" class="ws-btn" data-act="gen"' + (S.running ? ' disabled' : '') + '>' + (S.running ? d('running') : d('run')) + '</button></div></div>' +
        '<div class="ws-pad"><figure class="ws-fig" id="c4-fig">' + diagram() + '</figure></div>' +
        '<div class="ws-foot"><span aria-live="polite">' + st + '</span><span class="mono" style="font-size:12px;color:var(--bp-m3)">C4 · ' + d('levels')[S.lvl].toUpperCase() + '</span></div></div>';
    }
    function run(redraw) {
      S.running = true; S.reveal = 0; redraw();
      clearInterval(timer);
      timer = setInterval(function () {
        S.reveal++;
        var fig = document.getElementById('c4-fig');
        if (fig) fig.innerHTML = diagram();
        if (S.reveal >= 5) { clearInterval(timer); S.running = false; S.gen = true; redraw(); }
      }, 380);
    }
    return {
      render: render,
      act: function (a, el, redraw) {
        if (a === 'gen' && !S.running) run(redraw);
        if (a === 'lvl' && !S.running) { S.lvl = +el.getAttribute('data-v'); if (S.gen) run(redraw); else redraw(); }
      }
    };
  })();

  // AI agents — workflow run
  DEMOS['ai-agents'] = (function () {
    var d = D('ai-agents');
    var S = { i: -1, step: -1, running: false, log: [], done: false };
    var timer;
    function render() {
      var steps = d('steps').map(function (s, k) {
        var cls = S.running && S.step === k ? (S.i === 4 && k === 2 ? 'warn' : 'on') : '';
        return '<div class="' + cls + '"><b>' + s[0] + '</b><span>' + s[1] + '</span></div>';
      }).join('');
      var reqs = d('reqs');
      var log = S.log.map(function (l) {
        return '<div class="' + (l.w ? 'w' : 'k') + '">' + (l.w ? '⚑ ' : '✓ ') + esc(reqs[l.i]) + ' — ' + (l.w ? d('warn') : d('ok')) + '</div>';
      }).join('');
      var handled = S.log.filter(function (l) { return !l.w; }).length, human = S.log.length - handled;
      return '<div class="ws"><div class="ws-head"><div style="display:flex;flex-direction:column;gap:2px"><span class="ws-title">' + d('wsTitle') + '</span><span class="ws-sub">' + d('wsSub') + '</span></div>' +
        '<button type="button" class="ws-btn" data-act="run"' + (S.running ? ' disabled' : '') + '>' + (S.running ? d('running') : d('run')) + '</button></div>' +
        '<div class="ws-pad"><div class="flow">' + steps + '</div>' +
        '<div class="log" aria-live="polite">' + (S.running && S.i >= 0 ? '<div>› ' + esc(reqs[S.i]) + '</div>' : '') + log + '</div></div>' +
        '<div class="ws-foot"><span>' + (S.done ? d('st', { d: handled, h: human }) : '') + '</span></div></div>';
    }
    return {
      render: render,
      act: function (a, el, redraw) {
        if (a !== 'run' || S.running) return;
        S.i = 0; S.step = 0; S.log = []; S.running = true; S.done = false; redraw();
        clearInterval(timer);
        timer = setInterval(function () {
          var stepsN = d('steps').length;
          if (S.i === 4 && S.step === 2) { S.log.unshift({ i: S.i, w: true }); S.i++; S.step = 0; }
          else if (S.step < stepsN - 1) S.step++;
          else { S.log.unshift({ i: S.i, w: false }); S.i++; S.step = 0; }
          if (S.i >= d('reqs').length) { clearInterval(timer); S.running = false; S.done = true; S.i = -1; S.step = -1; }
          redraw();
        }, 170);
      }
    };
  })();

  window.IFD_DETAIL = { HERO: HERO, DEMOS: DEMOS, iso: iso, building: building };
})();
