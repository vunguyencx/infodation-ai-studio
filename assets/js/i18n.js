/* i18n: EN (default), VI, NL.
 *  data-i18n="key.path"                 → innerHTML (strings may contain <br>, <span class="hl">…)
 *  data-i18n-attr="placeholder:key,aria-label:key" → attributes (HTML stripped)
 *  data-i18n-vars='{"n":7}'             → {n} placeholders
 * Language priority: ?lang= > localStorage > config.defaultLang.
 */
(function () {
  var D = window.IFD_I18N_DICT || {}, C = window.IFD_CONFIG || {};
  var KEY = 'ifd.lang';
  var LANGS = (C.languages || ['en', 'vi', 'nl']).filter(function (l) { return D[l]; });

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(l) { try { localStorage.setItem(KEY, l); } catch (e) { /* private mode */ } }
  function valid(l) { return l && LANGS.indexOf(l) !== -1 ? l : null; }

  var lang = valid(new URLSearchParams(location.search).get('lang')) || valid(stored()) || valid(C.defaultLang) || 'en';

  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function fill(v, vars) {
    if (typeof v !== 'string' || !vars) return v;
    return v.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  }
  function t(key, vars) {
    var v = get(D[lang], key);
    if (v === undefined) v = get(D.en, key);
    return fill(v, vars);
  }
  var deco = document.createElement('div');
  function plain(html) { deco.innerHTML = String(html == null ? '' : html); return deco.textContent; }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var vars = el.getAttribute('data-i18n-vars');
      var v = t(el.getAttribute('data-i18n'), vars ? JSON.parse(vars) : null);
      if (typeof v === 'string' && el.innerHTML !== v) {
        if (el.tagName === 'TITLE') document.title = plain(v); else el.innerHTML = v;
      }
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var i = pair.indexOf(':');
        var v = t(pair.slice(i + 1).trim());
        if (typeof v === 'string') el.setAttribute(pair.slice(0, i).trim(), plain(v));
      });
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function set(l) {
    if (!valid(l) || l === lang) return;
    lang = l;
    store(l);
    document.documentElement.lang = l;
    var u = new URL(location.href);
    if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(null, '', u); }
    document.dispatchEvent(new CustomEvent('ifd:lang', { detail: l }));
  }

  document.documentElement.lang = lang;
  window.IFD_I18N = {
    t: t, plain: plain, apply: apply, set: set, langs: LANGS,
    get lang() { return lang; },
    // plain-text version of t(), for attributes / mailto / option labels
    tx: function (key, vars) { return plain(t(key, vars)); }
  };
})();
