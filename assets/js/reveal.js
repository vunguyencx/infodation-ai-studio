/* Design v2 scroll reveal (from "Redesign (2)"):
 *  data-reveal                 fade/rise/de-blur when scrolled into view (stagger with --i)
 *  data-reveal="clip|lines|…"  variants; page CSS styles the `.in` state of custom variants
 *  data-count="8373" data-suffix=" giờ" data-fmt="vi"   count up when visible
 * Also toggles body.scrolled (header shadow). Call IFD_REVEAL.scan() after rendering new content.
 */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onScroll() { document.body.classList.toggle('scrolled', window.scrollY > 8); }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var LOCALE = { en: 'en-GB', vi: 'vi-VN', nl: 'nl-NL' };
  function countUp(el) {
    var to = Number(el.getAttribute('data-count')), suf = el.getAttribute('data-suffix') || '', pre = el.getAttribute('data-prefix') || '';
    var loc = el.getAttribute('data-fmt') ? LOCALE[(window.IFD_I18N || {}).lang] || 'en-GB' : null;
    var fmt = function (n) { return loc ? n.toLocaleString(loc) : String(n); };
    var final = el.innerHTML, t0, dur = 1600;
    el.textContent = pre + '0' + suf;
    setTimeout(function () {
      t0 = performance.now();
      (function step(t) {
        var k = Math.min(1, (t - t0) / dur);
        el.textContent = pre + fmt(Math.round(to * (1 - Math.pow(1 - k, 3)))) + suf;
        if (k < 1) requestAnimationFrame(step); else el.innerHTML = final;
      })(t0);
    }, 450);
    // safety net when animation frames are paused (background tab)
    setTimeout(function () { el.innerHTML = final; }, 450 + dur + 400);
  }

  var io = null;
  if (!reduce && 'IntersectionObserver' in window) {
    document.body.classList.add('fx');
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.hasAttribute('data-count')) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }

  // highlighted phrases: paint the highlight in from left to right once the phrase is well inside the viewport
  var HL = '.hl, .idc-hlbg';
  var pending = [];
  function checkHl() {
    var limit = innerHeight * 0.72;
    pending = pending.filter(function (el) {
      if (!el.isConnected) return false;
      var r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) { el.classList.add('on'); return false; }
      return true;
    });
  }
  addEventListener('scroll', checkHl, { passive: true });
  addEventListener('resize', checkHl);

  function scan(root) {
    (root || document).querySelectorAll(HL).forEach(function (el) {
      if (el._hl) return;
      el._hl = true;
      if (reduce) return;
      el.classList.add('hl-sweep');
      pending.push(el);
    });
    requestAnimationFrame(checkHl);
    setTimeout(checkHl, 120);
    (root || document).querySelectorAll('[data-reveal], [data-count]').forEach(function (el) {
      if (el._rv) return;
      el._rv = true;
      if (io) io.observe(el); else el.classList.add('in');
    });
  }

  window.IFD_REVEAL = { scan: scan, countUp: countUp };
})();
