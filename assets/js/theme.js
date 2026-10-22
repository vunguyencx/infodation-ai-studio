/* Runs in <head> (after palettes.js + config.js) so the page paints in the right colors.
 * Priority: ?palette= in URL (admin preview) > localStorage (admin "apply on this browser") > config.js.
 */
(function () {
  var P = window.IFD_PALETTES, C = window.IFD_CONFIG || {};
  var KEY = 'ifd.palette';

  function store(get, val) {
    try { return get ? localStorage.getItem(KEY) : (val == null ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, val)); }
    catch (e) { return null; }
  }
  function find(id) {
    for (var i = 0; i < P.list.length; i++) if (P.list[i].id === id) return P.list[i];
    return null;
  }
  function apply(id) {
    var p = find(id) || find(C.palette) || P.list[0];
    var v = P.resolve(p), s = document.documentElement.style;
    s.setProperty('--ink', v.ink);
    s.setProperty('--ink-rgb', v.inkRgb);
    s.setProperty('--accent', v.accent);
    s.setProperty('--pop', v.pop);
    s.setProperty('--note', v.note);
    s.setProperty('--live', v.live);
    s.setProperty('--bg', v.bg);
    s.setProperty('--ink-deep', v.inkDeep);
    s.setProperty('--text-2', v.text2);
    s.setProperty('--text-3', v.text3);
    s.setProperty('--pop-text', v.popText);
    s.setProperty('--on-ink-1', v.onInk1);
    s.setProperty('--on-ink-2', v.onInk2);
    s.setProperty('--on-ink-3', v.onInk3);
    s.setProperty('--chip', v.chip);
    s.setProperty('--client', v.client);
    document.documentElement.setAttribute('data-palette', p.id);
    return p.id;
  }
  function current() {
    var q = new URLSearchParams(location.search).get('palette');
    return (q && find(q) && q) || store(true) || C.palette;
  }

  window.IFD_THEME = {
    apply: apply,
    current: current,
    save: function (id) { store(false, id); return apply(id); },
    clear: function () { store(false, null); return apply(C.palette); },
    stored: function () { return store(true); }
  };
  apply(current());
})();
