/* Boot: mount layout → page renderers → translate → start 3D motion. Re-runs renderers on language change. */
(function () {
  var renders = window.IFD_RENDERS || [];
  function renderAll() {
    renders.forEach(function (fn) { fn(); });
    window.IFD_UI.icons(document);
    window.IFD_UI.docs(document);
    window.IFD_I18N.apply();
  }
  window.IFD_UI.mount();
  renderAll();
  window.IFD_MOTION.init();
  // content is rendered by JS, so jump to #anchors once it exists
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(function () { target.scrollIntoView(); });
  }
  document.addEventListener('ifd:lang', function () {
    var y = window.scrollY;
    renderAll();
    window.scrollTo({ top: y, behavior: 'instant' });
    window.IFD_MOTION.refresh();
  });
})();
