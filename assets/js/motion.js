/* 3D motion engine — no dependencies.
 *
 *  data-asm="preset"        element flies in from a 3D offset and assembles into place, scrubbed by scroll
 *                           (scroll back up and it comes apart again). Presets below.
 *  data-asm-stagger="0.08"  on a parent: its [data-asm] children assemble one after another
 *  data-asm-delay="0.2"     extra progress offset (0..0.6)
 *  data-asm-start / -end    viewport fractions where assembly starts / completes (default .98 / .58)
 *  data-split               split text into words that assemble in 3D (headings)
 *  data-tilt="8"            3D tilt toward the pointer + glare (fine pointers only)
 *  data-stack               hero card stack: intro fly-in, pointer parallax, spreads apart on scroll
 *
 * The motion engine owns the inline `transform` of these elements. Static rotations use the CSS `rotate`
 * property and hover lifts use `translate`, so they compose instead of fighting.
 */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  var PRESETS = {
    rise:    { y: 110, z: -220, rx: 32 },
    left:    { x: -240, z: -180, ry: -38 },
    right:   { x: 240, z: -180, ry: 38 },
    drop:    { y: -140, z: 240, rx: -28 },
    flip:    { y: 30, rx: -96 },
    unfold:  { rx: 88, y: -10 },
    book:    { x: -80, z: 60, ry: -78 },
    zoom:    { z: -520, s: 0.72 },
    screen:  { y: 80, z: -120, rx: 34, s: 0.92 },
    word:    { y: 46, z: -60, rx: -88 },
    swing:   { x: 120, ry: 62, z: -80 },
    swingL:  { x: -120, ry: -62, z: -80 },
    piece:   null // random scatter, assigned per element
  };

  var items = [];
  var tilts = [];
  var vh = innerHeight, vw = innerWidth, k = 1;
  var dirty = true, running = false;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function rnd(seed) { var x = Math.sin(seed * 999.7) * 43758.5453; return x - Math.floor(x); }

  function fromFor(el, idx) {
    var name = el.getAttribute('data-asm') || 'rise';
    if (name === 'piece') {
      var a = rnd(idx + 1), b = rnd(idx + 7), c = rnd(idx + 13);
      return { x: (a - 0.5) * 420, y: 120 + b * 160, z: -200 - c * 300, rx: (b - 0.5) * 120, ry: (a - 0.5) * 140, rz: (c - 0.5) * 50 };
    }
    return PRESETS[name] || PRESETS.rise;
  }

  /* ---------- word splitting ---------- */
  function splitWords(el) {
    if (el.getAttribute('data-split-done') === el.innerHTML) return;
    var nodes = Array.prototype.slice.call(el.childNodes);
    var out = document.createDocumentFragment();
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { out.appendChild(document.createTextNode(' ')); return; }
          var s = document.createElement('span');
          s.className = 'w3'; s.setAttribute('data-asm', 'word'); s.textContent = part;
          out.appendChild(s);
        });
      } else if (n.nodeType === 1 && n.tagName === 'BR') {
        out.appendChild(n);
      } else if (n.nodeType === 1) {
        // highlighted phrase etc. — assembles as one unit
        if (getComputedStyle(n).display === 'inline') n.classList.add('w3-wrap');
        n.setAttribute('data-asm', 'word');
        out.appendChild(n);
      }
    });
    el.innerHTML = '';
    el.appendChild(out);
    el.classList.add('has-split');
    el.setAttribute('data-split-done', el.innerHTML);
  }

  /* ---------- collection & measuring ---------- */
  function collect() {
    if (reduce) return;
    document.querySelectorAll('[data-split]').forEach(splitWords);
    items.forEach(function (it) { it.el.style.transform = ''; it.el.style.opacity = ''; });
    items = [];
    var all = document.querySelectorAll('[data-asm]');
    all.forEach(function (el, idx) {
      if (el.closest('[data-stack]')) return;
      var parent = el.parentElement;
      var delay = parseFloat(el.getAttribute('data-asm-delay') || '0');
      var host = el.closest('[data-split]');
      if (host && host !== el) {
        var words = host.querySelectorAll(':scope > [data-asm]');
        var wi = Array.prototype.indexOf.call(words, el);
        delay += Math.min(0.55, wi * (0.5 / Math.max(words.length, 4)));
      } else if (parent && parent.hasAttribute('data-asm-stagger')) {
        var sib = Array.prototype.filter.call(parent.children, function (c) { return c.hasAttribute('data-asm'); });
        delay += sib.indexOf(el) * parseFloat(parent.getAttribute('data-asm-stagger') || '0.08');
      }
      var anchor = host || el;
      items.push({
        el: el, anchor: anchor, from: fromFor(el, idx), delay: Math.min(delay, 0.7),
        start: parseFloat(anchor.getAttribute('data-asm-start') || el.getAttribute('data-asm-start') || '0.98'),
        end: parseFloat(anchor.getAttribute('data-asm-end') || el.getAttribute('data-asm-end') || '0.58'),
        top: 0, last: -1, tilt: null
      });
    });
    measure();
  }

  function measure() {
    vh = innerHeight; vw = innerWidth;
    k = vw < 760 ? 0.45 : vw < 1100 ? 0.75 : 1;
    items.forEach(function (it) { it.el.style.transform = 'none'; });
    var sy = scrollY;
    items.forEach(function (it) {
      var r = it.anchor.getBoundingClientRect();
      it.top = r.top + sy;
      it.last = -1;
    });
    dirty = true;
    kick();
  }

  /* ---------- rendering ---------- */
  function asmTransform(f, e) {
    var r = 1 - e;
    if (r <= 0.0005) return '';
    return 'translate3d(' + ((f.x || 0) * k * r).toFixed(1) + 'px,' + ((f.y || 0) * k * r).toFixed(1) + 'px,' + ((f.z || 0) * k * r).toFixed(1) + 'px)' +
      ' rotateX(' + ((f.rx || 0) * r).toFixed(2) + 'deg) rotateY(' + ((f.ry || 0) * r).toFixed(2) + 'deg) rotateZ(' + ((f.rz || 0) * r).toFixed(2) + 'deg)' +
      ((f.s != null) ? ' scale(' + (1 - (1 - f.s) * r).toFixed(3) + ')' : '');
  }

  function render() {
    var sy = scrollY;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var topV = it.top - sy;
      var p = (vh * it.start - topV) / (vh * (it.start - it.end));
      p = clamp((clamp(p) - it.delay) / (1 - it.delay));
      var q = Math.round(p * 400) / 400;
      if (q === it.last && !it.tilt) continue;
      it.last = q;
      var e = ease(q);
      var t = asmTransform(it.from, e);
      var tt = it.tilt ? it.tilt.str : '';
      it.el.style.transform = (tt ? tt + ' ' : '') + t;
      it.el.style.opacity = q >= 1 ? '' : Math.min(1, e * 1.25).toFixed(3);
    }
    renderStacks(sy);
    renderTilts();
  }

  function loop() {
    if (dirty || tiltsActive() || stacksActive()) {
      dirty = false;
      render();
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

  /* ---------- tilt ---------- */
  function setupTilts() {
    if (reduce || !finePointer) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      if (el._tilt) return;
      var max = parseFloat(el.getAttribute('data-tilt') || '8');
      var st = { el: el, max: max, tx: 0, ty: 0, x: 0, y: 0, str: '', on: false };
      el._tilt = st;
      if (!el.querySelector(':scope > .glare')) {
        var g = document.createElement('span'); g.className = 'glare'; g.setAttribute('aria-hidden', 'true');
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.appendChild(g);
      }
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
        st.tx = (px - 0.5) * 2 * max; st.ty = -(py - 0.5) * 2 * max; st.on = true;
        el.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
        kick();
      });
      el.addEventListener('pointerleave', function () { st.tx = 0; st.ty = 0; kick(); });
      tilts.push(st);
    });
    // link tilt state to assembly item so both transforms compose
    items.forEach(function (it) { it.tilt = it.el._tilt || null; });
  }
  function tiltsActive() {
    for (var i = 0; i < tilts.length; i++) { var t = tilts[i]; if (Math.abs(t.x - t.tx) > 0.02 || Math.abs(t.y - t.ty) > 0.02) return true; }
    return false;
  }
  function renderTilts() {
    tilts.forEach(function (t) {
      t.x += (t.tx - t.x) * 0.14; t.y += (t.ty - t.y) * 0.14;
      var idle = Math.abs(t.x) < 0.02 && Math.abs(t.y) < 0.02 && t.tx === 0 && t.ty === 0;
      t.str = idle ? '' : 'perspective(1000px) rotateX(' + t.y.toFixed(2) + 'deg) rotateY(' + t.x.toFixed(2) + 'deg)';
      var owned = false;
      for (var i = 0; i < items.length; i++) if (items[i].el === t.el) { owned = true; items[i].last = -1; break; }
      if (!owned && !t.el.closest('[data-stack]')) t.el.style.transform = t.str;
    });
  }

  /* ---------- hero stack ---------- */
  var stacks = [];
  function setupStacks() {
    document.querySelectorAll('[data-stack]').forEach(function (el) {
      if (el._stack) return;
      var inner = el.querySelector('.stack-inner') || el;
      var cards = Array.prototype.slice.call(inner.children);
      var st = { el: el, inner: inner, cards: cards, t0: performance.now(), px: 0, py: 0, x: 0, y: 0, top: 0, done: reduce };
      el._stack = st;
      cards.forEach(function (c, i) {
        c._from = { x: (i % 2 ? -1 : 1) * (260 + i * 40), y: -120 + i * 90, z: -700 - i * 120, rx: 50 - i * 18, ry: (i % 2 ? 60 : -60), rz: (i % 2 ? -25 : 25) };
        c._depth = (i + 1) * 26;
      });
      if (finePointer && !reduce) {
        el.addEventListener('pointermove', function (ev) {
          var r = el.getBoundingClientRect();
          st.px = ((ev.clientX - r.left) / r.width - 0.5) * 2;
          st.py = ((ev.clientY - r.top) / r.height - 0.5) * 2;
          kick();
        });
        el.addEventListener('pointerleave', function () { st.px = 0; st.py = 0; kick(); });
      }
      stacks.push(st);
    });
  }
  function stacksActive() {
    for (var i = 0; i < stacks.length; i++) {
      var s = stacks[i];
      if (!s.done) return true;
      if (Math.abs(s.x - s.px) > 0.002 || Math.abs(s.y - s.py) > 0.002) return true;
    }
    return false;
  }
  function renderStacks(sy) {
    stacks.forEach(function (s) {
      if (reduce) return;
      var now = performance.now();
      s.x += (s.px - s.x) * 0.08; s.y += (s.py - s.y) * 0.08;
      // spread apart as the hero scrolls away
      // phones get the intro + parallax only; spreading the stack in depth crowds a narrow screen
      var spread = vw < 760 ? 0 : clamp(sy / (vh * 0.9));
      s.inner.style.transform = 'rotateX(' + (-s.y * 7 + spread * 18).toFixed(2) + 'deg) rotateY(' + (s.x * 9).toFixed(2) + 'deg)';
      var all = true;
      s.cards.forEach(function (c, i) {
        var t = clamp((now - s.t0 - 250 - i * 140) / 1100);
        if (t < 1) all = false;
        var e = ease(t), r = 1 - e, f = c._from;
        var z = c._depth * (1 + spread * 3) + (f.z * k * r);
        var y = (f.y * k * r) - spread * (i - 1.5) * 60 * k;
        var x = f.x * k * r + spread * (i % 2 ? -1 : 1) * 40 * k;
        c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,' + z.toFixed(1) + 'px) rotateX(' + (f.rx * r).toFixed(2) + 'deg) rotateY(' + (f.ry * r).toFixed(2) + 'deg) rotateZ(' + (f.rz * r).toFixed(2) + 'deg)';
        c.style.opacity = t >= 1 ? '' : Math.min(1, e * 1.4).toFixed(3);
      });
      s.done = all;
    });
  }

  /* ---------- wiring ---------- */
  var ro;
  function init() {
    collect();
    setupTilts();
    setupStacks();
    addEventListener('scroll', function () { dirty = true; kick(); }, { passive: true });
    addEventListener('resize', function () { measure(); });
    addEventListener('load', function () { measure(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if ('ResizeObserver' in window) {
      var lastH = 0, tmo;
      ro = new ResizeObserver(function () {
        var h = document.body.scrollHeight;
        if (Math.abs(h - lastH) > 2) { lastH = h; clearTimeout(tmo); tmo = setTimeout(measure, 60); }
      });
      ro.observe(document.body);
    }
    kick();
  }

  window.IFD_MOTION = {
    init: init,
    // call after content changes (language switch, filtering)
    refresh: function () { collect(); setupTilts(); kick(); },
    reduce: reduce
  };
})();
