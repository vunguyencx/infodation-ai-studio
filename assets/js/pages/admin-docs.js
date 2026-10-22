/* Admin → tabs (Settings / Documents) and per-language document uploads.
 * Uploads go to serve.js (PUT /api/docs/<key>/<lang>, admin key = ADMIN_TOKEN). The server rewrites
 * assets/js/docs.js, which every page reads to pick the PDF for the visitor's language (English fallback).
 */
(function () {
  var I = window.IFD_I18N, U = window.IFD_UI;
  var t = I.t, esc = U.esc;
  var $ = function (id) { return document.getElementById(id); };
  var KEY_STORE = 'ifd.admin.key';
  var GROUPS = [
    { key: 'company-profile', title: function () { return t('admin.company'); }, sub: function () { return t('admin.companySub'); } },
    { key: 'intellicad', title: function () { return t('sol.intellicad.name'); }, sub: function () { return t('admin.solSub'); } },
    { key: 'document-ai', title: function () { return t('sol.document-ai.name'); }, sub: function () { return t('admin.solSub'); } },
    { key: 'voice-bot', title: function () { return t('sol.voice-bot.name'); }, sub: function () { return t('admin.solSub'); } }
  ];
  var LANG_NAMES = { en: 'English', vi: 'Tiếng Việt', nl: 'Nederlands' };
  var server = { checked: false, up: false, uploads: false };
  var busy = {}; // "key/lang" → progress 0..1

  function getKey() { try { return sessionStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; } }
  function setKey(v) { try { sessionStorage.setItem(KEY_STORE, v); } catch (e) { /* private mode */ } }
  function toast(msg) {
    var el = $('toast'); if (!el) return;
    el.textContent = msg; el.classList.add('on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('on'); }, 2200);
  }
  function fmtSize(b) { var mb = b / 1048576; return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleString({ en: 'en-GB', vi: 'vi-VN', nl: 'nl-NL' }[I.lang], { dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { return iso; }
  }

  /* ---------- tabs ---------- */
  function showTab(name) {
    document.querySelectorAll('[data-tab]').forEach(function (b) {
      var on = b.getAttribute('data-tab') === name;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      $('panel-' + b.getAttribute('data-tab')).hidden = !on;
    });
    if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
    window.IFD_MOTION.refresh();
  }

  /* ---------- server status ---------- */
  function status() {
    var el = $('srv-status'); if (!el) return;
    el.className = 'key-status ' + (server.uploads ? 'ok' : server.checked ? 'off' : '');
    el.textContent = !server.checked ? '…' : server.uploads ? t('admin.srvOk') : server.up ? t('admin.srvNoKey') : t('admin.srvOff');
  }
  function check() {
    fetch(U.url('api/status'), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function (j) {
      server = { checked: true, up: true, uploads: !!j.uploads };
      window.IFD_DOCS = j.docs || {};
      renderDocs(); U.docs(document);
    }, function () { server = { checked: true, up: false, uploads: false }; renderDocs(); });
  }

  /* ---------- documents ---------- */
  var PDF_IC = '<svg width="34" height="40" viewBox="0 0 34 40" aria-hidden="true"><path d="M3 1h20l10 10v26a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" fill="#FFFFFF" stroke="var(--ink)" stroke-width="1.6"/><path d="M23 1v10h10" fill="none" stroke="var(--ink)" stroke-width="1.6"/><rect x="5" y="22" width="22" height="10" rx="2" style="fill:var(--note)"/><text x="16" y="29.6" text-anchor="middle" font-size="7" font-weight="700" fill="#FFFFFF" font-family="JetBrains Mono, monospace">PDF</text></svg>';
  function slot(g, lang) {
    var d = (window.IFD_DOCS[g.key] || {})[lang], id = g.key + '/' + lang, prog = busy[id];
    var off = !server.uploads ? ' disabled' : '';
    var en = (window.IFD_DOCS[g.key] || {}).en;
    var body = d
      ? '<div class="doc-file">' + PDF_IC + '<div><b>' + esc(d.name) + '</b><small>' + fmtSize(d.size) + ' · ' + t('admin.updated') + ' ' + esc(fmtDate(d.updated)) + '</small></div></div>'
      : '<p class="doc-empty">' + (lang === 'en' ? t('admin.noEn') : en ? t('admin.fallback') : t('admin.noEn')) + '</p>';
    return '<div class="doc-slot' + (d ? ' has' : '') + '" data-slot="' + id + '">' +
      '<div class="doc-slot-top"><span class="doc-lang">' + lang.toUpperCase() + '</span><span class="doc-tag">' + (lang === 'en' ? t('admin.default') : LANG_NAMES[lang]) + '</span></div>' +
      body +
      (prog != null ? '<div class="doc-progress"><i style="width:' + Math.round(prog * 100) + '%"></i></div>' : '') +
      '<div class="doc-actions">' +
      '<button type="button" class="up" data-up="' + id + '"' + off + '>' + (d ? t('admin.replace') : t('admin.upload')) + '</button>' +
      (d ? '<a href="' + U.url(d.path) + '?v=' + Date.parse(d.updated) + '" target="_blank" rel="noopener">' + t('admin.view') + '</a>' +
        '<button type="button" data-rm="' + id + '"' + off + '>' + t('admin.remove') + '</button>' : '') +
      '</div>' +
      (server.uploads ? '<span class="doc-empty" style="font-size:12px">' + t('admin.drop') + '</span>' : '') +
      '</div>';
  }
  function renderDocs() {
    var host = $('doc-groups'); if (!host) return;
    host.innerHTML = GROUPS.map(function (g) {
      return '<div class="doc-group"><div class="doc-group-h"><b>' + g.title() + '</b><span>' + g.sub() + '</span></div>' +
        '<div class="doc-slots">' + I.langs.map(function (l) { return slot(g, l); }).join('') + '</div></div>';
    }).join('');
    status();
  }

  function errorText(code) {
    return { not_pdf: t('admin.errPdf'), too_large: t('admin.errSize'), bad_key: t('admin.errKey'), uploads_disabled: t('admin.srvNoKey') }[code] || t('admin.errNet');
  }
  function upload(id, file) {
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') { toast(t('admin.errPdf')); return; }
    if (file.size > 25 * 1048576) { toast(t('admin.errSize')); return; }
    var xhr = new XMLHttpRequest();
    busy[id] = 0; renderDocs();
    xhr.open('PUT', U.url('api/docs/' + id));
    xhr.setRequestHeader('Authorization', 'Bearer ' + getKey());
    xhr.setRequestHeader('Content-Type', 'application/pdf');
    xhr.setRequestHeader('X-Filename', encodeURIComponent(file.name));
    xhr.upload.onprogress = function (e) {
      if (!e.lengthComputable) return;
      busy[id] = e.loaded / e.total;
      var bar = document.querySelector('[data-slot="' + id + '"] .doc-progress i');
      if (bar) bar.style.width = Math.round(busy[id] * 100) + '%';
    };
    xhr.onload = function () {
      delete busy[id];
      var j = {}; try { j = JSON.parse(xhr.responseText); } catch (e) { /* not json */ }
      if (xhr.status === 200) { window.IFD_DOCS = j.docs; toast(t('admin.uploaded')); U.docs(document); }
      else toast(errorText(j.error));
      renderDocs();
    };
    xhr.onerror = function () { delete busy[id]; toast(t('admin.errNet')); renderDocs(); };
    xhr.send(file);
  }
  function remove(id) {
    if (!confirm(I.tx('admin.confirmRemove'))) return;
    fetch(U.url('api/docs/' + id), { method: 'DELETE', headers: { Authorization: 'Bearer ' + getKey() } })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (r) {
        if (r.ok) { window.IFD_DOCS = r.j.docs; toast(t('admin.removed')); U.docs(document); }
        else toast(errorText(r.j.error));
        renderDocs();
      }, function () { toast(t('admin.errNet')); });
  }

  /* ---------- events ---------- */
  var picker = document.createElement('input');
  picker.type = 'file'; picker.accept = 'application/pdf,.pdf'; picker.hidden = true;
  document.body.appendChild(picker);
  picker.addEventListener('change', function () { upload(picker._id, picker.files[0]); picker.value = ''; });

  document.addEventListener('click', function (e) {
    var tb = e.target.closest('[data-tab]');
    if (tb) { showTab(tb.getAttribute('data-tab')); return; }
    var up = e.target.closest('[data-up]');
    if (up && !up.disabled) { picker._id = up.getAttribute('data-up'); picker.click(); return; }
    var rm = e.target.closest('[data-rm]');
    if (rm && !rm.disabled) remove(rm.getAttribute('data-rm'));
  });
  document.addEventListener('keydown', function (e) {
    var tb = e.target.closest && e.target.closest('[data-tab]');
    if (!tb || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
    var next = tabs[(tabs.indexOf(tb) + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    next.focus(); showTab(next.getAttribute('data-tab'));
  });
  ['dragover', 'dragleave', 'drop'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var s = e.target.closest && e.target.closest('[data-slot]');
      if (!s || !server.uploads) return;
      e.preventDefault();
      s.classList.toggle('drag', type === 'dragover');
      if (type === 'drop') upload(s.getAttribute('data-slot'), e.dataTransfer.files[0]);
    });
  });
  var keyInput = $('admin-key');
  keyInput.value = getKey();
  keyInput.addEventListener('input', function () { setKey(keyInput.value.trim()); });

  showTab(location.hash === '#documents' ? 'documents' : 'settings');
  (window.IFD_RENDERS = window.IFD_RENDERS || []).push(renderDocs);
  check();
})();
