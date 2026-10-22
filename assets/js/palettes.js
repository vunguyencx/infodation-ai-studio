/* Color combos. Each combo = 5 main colors:
 *   ink    — text, headings, dark blocks (navy in the original design)
 *   accent — primary buttons, mission band (always carries ink text)
 *   pop    — keyword highlight, tilted chips (always carries ink text)
 *   note   — small accents only: numbers 01–07, map pins, dots
 *   live   — industry band, step numbers, "running" dots, checkmarks
 * Every other tone (page background, footer, muted text…) is derived from these,
 * so a combo stays coherent. `exact` pins derived tones for the original design.
 */
(function () {
  var PALETTES = [
    {
      id: 'infodation-fresh',
      name: { en: 'Infodation Fresh', vi: 'Infodation Tươi', nl: 'Infodation Fris' },
      note: { en: 'Original design', vi: 'Thiết kế gốc', nl: 'Origineel ontwerp' },
      colors: { ink: '#002B4E', accent: '#FF6A3D', pop: '#B9F0EC', note: '#F74455', live: '#A1BD35' },
      exact: {
        bg: '#F3F5F7', inkDeep: '#001F38', text2: '#3D5263', text3: '#4A5B68', popText: '#24485F',
        onInk1: '#D5DEE4', onInk2: '#C9D3DA', onInk3: '#B9C6CF', chip: '#E6EBEF', client: '#5A6B78'
      }
    },
    {
      id: 'nordic-fjord',
      name: { en: 'Nordic Fjord', vi: 'Vịnh Bắc Âu', nl: 'Noordse Fjord' },
      note: { en: 'Cool & calm', vi: 'Mát, điềm tĩnh', nl: 'Koel & rustig' },
      colors: { ink: '#0B2545', accent: '#FFB703', pop: '#CDE7FF', note: '#E63946', live: '#2EC4B6' }
    },
    {
      id: 'dutch-tulip',
      name: { en: 'Dutch Tulip', vi: 'Tulip Hà Lan', nl: 'Hollandse Tulp' },
      note: { en: 'Warm & playful', vi: 'Ấm, vui tươi', nl: 'Warm & speels' },
      colors: { ink: '#2B1E3F', accent: '#FF8FAB', pop: '#FFE066', note: '#E5383B', live: '#7BD389' }
    },
    {
      id: 'mekong-green',
      name: { en: 'Mekong Green', vi: 'Xanh Mê Kông', nl: 'Mekong Groen' },
      note: { en: 'Natural & grounded', vi: 'Tự nhiên, vững chãi', nl: 'Natuurlijk & geaard' },
      colors: { ink: '#0F3D2E', accent: '#F4A259', pop: '#D8F3DC', note: '#E76F51', live: '#95D5B2' }
    },
    {
      id: 'electric-studio',
      name: { en: 'Electric Studio', vi: 'Studio Điện', nl: 'Elektrische Studio' },
      note: { en: 'Bold & techy', vi: 'Mạnh, công nghệ', nl: 'Gedurfd & technisch' },
      colors: { ink: '#1B1B3A', accent: '#C6FF4A', pop: '#E2D4FF', note: '#FF4D8D', live: '#5CE1E6' }
    },
    {
      id: 'saigon-sunset',
      name: { en: 'Saigon Sunset', vi: 'Hoàng hôn Sài Gòn', nl: 'Saigon Zonsondergang' },
      note: { en: 'Energetic & warm', vi: 'Năng lượng, ấm áp', nl: 'Energiek & warm' },
      colors: { ink: '#232F5C', accent: '#FF9F1C', pop: '#FFD6BA', note: '#F15BB5', live: '#9BC53D' }
    }
  ];

  function hexToRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r) {
    return '#' + r.map(function (v) { return Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'); }).join('').toUpperCase();
  }
  // t = share of `b` in the result
  function mix(a, b, t) {
    var A = hexToRgb(a), B = hexToRgb(b);
    return rgbToHex([0, 1, 2].map(function (i) { return A[i] + (B[i] - A[i]) * t; }));
  }

  // Derivation formulas were fitted to reproduce the original design's tones from its navy.
  function resolve(p) {
    var c = p.colors, ink = c.ink;
    var d = {
      bg: mix(ink, '#FFFFFF', 0.955),
      inkDeep: mix(ink, '#000000', 0.28),
      text2: mix(ink, '#808080', 0.477),
      text3: mix(ink, '#808080', 0.58),
      popText: mix(ink, '#808080', 0.28),
      onInk1: mix(ink, '#FFFFFF', 0.835),
      onInk2: mix(ink, '#FFFFFF', 0.788),
      onInk3: mix(ink, '#FFFFFF', 0.725),
      chip: mix(ink, '#FFFFFF', 0.902),
      client: mix(ink, '#808080', 0.703)
    };
    var e = p.exact || {};
    Object.keys(e).forEach(function (k) { d[k] = e[k]; });
    var rgb = hexToRgb(ink);
    return Object.assign({}, c, d, { inkRgb: rgb.join(',') });
  }

  window.IFD_PALETTES = { list: PALETTES, resolve: resolve, mix: mix, hexToRgb: hexToRgb };
})();
