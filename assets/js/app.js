/* Boot: mount layout → page renderers → translate → start 3D motion. Re-runs renderers on language change. */
(function () {
  var renders = window.IFD_RENDERS || [];
  function renderAll() {
    renders.forEach(function (fn) { fn(); });
    window.IFD_UI.icons(document);
    window.IFD_UI.docs(document);
    window.IFD_I18N.apply();
    window.IFD_UI.arrows(document);
    if (window.IFD_REVEAL) window.IFD_REVEAL.scan();
  }
  window.IFD_UI.mount();
  renderAll();
  window.IFD_MOTION.init();
  // content is rendered by JS, so jump to #anchors once it exists
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    // content above the anchor keeps growing while fonts and images load, so re-align until the page settles
    // (stops as soon as the visitor scrolls themselves)
    var userMoved = false, jump = function () {
      if (target && !userMoved) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    if (target) {
      ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { addEventListener(ev, function () { userMoved = true; }, { once: true, passive: true }); });
      setTimeout(jump, 0);
      addEventListener('load', jump);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(jump);
      setTimeout(jump, 600);
    }
  }
  document.addEventListener('ifd:lang', function () {
    var y = window.scrollY;
    renderAll();
    window.scrollTo({ top: y, behavior: 'instant' });
    window.IFD_MOTION.refresh();
  });
})();
