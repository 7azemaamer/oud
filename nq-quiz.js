/* ─────────────────────────────────────────────────────────
   nq-quiz.js — نقوة النخيل — Product Recommendation Quiz
   Auto-shows 5s after load (once per session).
   Fetches real product images from Salla API at runtime.
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SESSION_KEY = 'nqz_seen';
  if (sessionStorage.getItem(SESSION_KEY)) return;

  /* ══════════════════════════════════════════════
     DESIGN TOKENS (green + white — matches store)
  ══════════════════════════════════════════════ */
  var G  = '#1FAB5E';   /* primary green          */
  var GL = '#E8F7EE';   /* green light bg         */
  var GB = 'rgba(31,171,94,.18)'; /* green glow   */
  var WH = '#ffffff';
  var BG = '#f7f8fc';   /* sheet background       */
  var BD = '#e8ebf4';   /* border                 */
  var TK = '#0f1113';   /* text dark               */
  var T2 = '#5a6275';   /* text secondary          */
  var T3 = '#9ba3b8';   /* text muted              */

  /* ══════════════════════════════════════════════
     CONFIG — product IDs matched against Salla API
  ══════════════════════════════════════════════ */
  var STORE    = 'https://naquatalnakhil.com';
  var CURRENCY = 'ريال';
  var DELAY_MS = 5000;

  /* Products — img filled by API fetch at runtime */
  var PRODUCTS = [
    {
      key:   'sukari',
      name:  'سكري مفتل',
      sub:   'درجة أولى — حلو وطري',
      badge: 'الأكثر طلباً',
      price: 90,
      url:   STORE + '/category/OlBOmK',
      img:   '',
      s: { gift: 1, hosting: 3, personal: 3, cheap: 3, mid: 2, premium: 0 }
    },
    {
      key:   'tamriya',
      name:  'تمرية بحشوات',
      sub:   'محشوة مكسرات وفواكه',
      badge: 'هدية راقية',
      price: 150,
      url:   STORE,
      img:   '',
      s: { gift: 3, hosting: 2, personal: 1, cheap: 1, mid: 3, premium: 1 }
    },
    {
      key:   'taj',
      name:  'تاج الملوك',
      sub:   'تشكيلة ملكية مختارة',
      badge: 'الأفخر والأرقى',
      price: 250,
      url:   STORE,
      img:   '',
      s: { gift: 2, hosting: 1, personal: 0, cheap: 0, mid: 1, premium: 3 }
    }
  ];

  var QUESTIONS = [
    {
      step: 1, label: 'الغرض',
      text: 'ما الغرض من طلبك؟',
      opts: [
        { label: 'هدية لشخص عزيز',  note: 'مناسبات وتقديم',       tags: ['gift']     },
        { label: 'ضيافة الزوار',     note: 'ضيافة منزلية أو عمل',  tags: ['hosting']  },
        { label: 'تذوق شخصي',        note: 'لنفسي أو للعائلة',     tags: ['personal'] }
      ]
    },
    {
      step: 2, label: 'الميزانية',
      text: 'ما ميزانيتك التقريبية؟',
      opts: [
        { label: 'حتى 100 ريال',    note: 'خيار عملي ومميز',       tags: ['cheap']   },
        { label: '100 – 200 ريال',  note: 'جودة عالية وقيمة راقية', tags: ['mid']     },
        { label: 'فوق 200 ريال',    note: 'الأفخر بلا تنازل',       tags: ['premium'] }
      ]
    }
  ];

  /* ══════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════ */
  var step = 0;
  var tags = [];
  var els  = {};
  var imgsReady = false;

  /* ══════════════════════════════════════════════
     SCORING
  ══════════════════════════════════════════════ */
  function ranked() {
    return PRODUCTS.slice().sort(function (a, b) {
      var sa = tags.reduce(function (n, t) { return n + (a.s[t] || 0); }, 0);
      var sb = tags.reduce(function (n, t) { return n + (b.s[t] || 0); }, 0);
      return sb - sa;
    });
  }

  /* ══════════════════════════════════════════════
     SALLA API — fetch real product images
  ══════════════════════════════════════════════ */
  function readStoreId() {
    var m = (document.body.className || '').match(/salla-(\d+)/);
    return m ? m[1] : null;
  }

  function tryFetchImages() {
    var storeId = readStoreId();
    if (!storeId) return;

    /* Fetch products from category OlBOmK (سكري مفتل) */
    var url = 'https://api.salla.dev/store/v1/products?source=categories&source_value[]=OlBOmK&limit=6';
    fetch(url, {
      headers: { 'store-identifier': storeId, 'accept': 'application/json' }
    })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (res) {
      if (!res || !res.data || !res.data.data) return;
      var prods = res.data.data;
      if (prods.length && prods[0].thumbnail && prods[0].thumbnail.url) {
        PRODUCTS[0].img = prods[0].thumbnail.url;
        /* patch img tags if already rendered */
        var el = document.getElementById('nqz-img-sukari');
        if (el) { el.src = PRODUCTS[0].img; el.style.display = ''; el.nextElementSibling && (el.nextElementSibling.style.display = 'none'); }
      }
      imgsReady = true;
    })
    .catch(function () {});

    /* Fetch all products to find tamriya and taj */
    var url2 = 'https://api.salla.dev/store/v1/products?limit=20';
    fetch(url2, {
      headers: { 'store-identifier': storeId, 'accept': 'application/json' }
    })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (res) {
      if (!res || !res.data || !res.data.data) return;
      res.data.data.forEach(function (p) {
        var n = (p.name || '').toLowerCase();
        var thumb = p.thumbnail && p.thumbnail.url;
        if (!thumb) return;
        if (n.indexOf('تمرية') > -1 || n.indexOf('حشو') > -1) {
          PRODUCTS[1].img = thumb;
          patchImg('nqz-img-tamriya', thumb);
        }
        if (n.indexOf('تاج') > -1 || n.indexOf('ملوك') > -1) {
          PRODUCTS[2].img = thumb;
          patchImg('nqz-img-taj', thumb);
        }
      });
    })
    .catch(function () {});
  }

  function patchImg(id, src) {
    var el = document.getElementById(id);
    if (!el) return;
    el.src = src;
    el.style.display = '';
    var fb = el.nextElementSibling;
    if (fb) fb.style.display = 'none';
  }

  /* ══════════════════════════════════════════════
     ICONS (SVG)
  ══════════════════════════════════════════════ */
  var IC_CLOSE =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var IC_CHECK =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  var IC_ARROW =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';

  var IC_STAR =
    '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

  /* ══════════════════════════════════════════════
     DATE ICON (SVG placeholder for product image)
  ══════════════════════════════════════════════ */
  function dateIconSVG(color) {
    color = color || G;
    return (
      '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">' +
        '<ellipse cx="24" cy="32" rx="7" ry="10" fill="' + color + '" opacity=".85"/>' +
        '<path d="M24 14 C24 14 18 20 18 28" stroke="' + color + '" stroke-width="2" stroke-linecap="round" opacity=".5"/>' +
        '<circle cx="24" cy="12" r="3" fill="' + color + '" opacity=".4"/>' +
      '</svg>'
    );
  }

  /* ══════════════════════════════════════════════
     CSS
  ══════════════════════════════════════════════ */
  var CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap");',

    /* Backdrop */
    '#nqz-bd{position:fixed;inset:0;background:rgba(10,14,20,.46);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:9990;opacity:0;pointer-events:none;transition:opacity .38s ease;}',
    '#nqz-bd.open{opacity:1;pointer-events:auto;}',

    /* Sheet */
    '#nqz-sheet{',
    '  position:fixed;z-index:9991;',
    '  background:' + BG + ';',
    '  direction:rtl;',
    '  font-family:"Tajawal","Cairo",system-ui,sans-serif;',
    '  -webkit-font-smoothing:antialiased;',
    '  bottom:0;left:0;right:0;',
    '  border-radius:24px 24px 0 0;',
    '  max-height:94dvh;overflow-y:auto;-webkit-overflow-scrolling:touch;',
    '  transform:translateY(100%);',
    '  transition:transform .44s cubic-bezier(.32,0,.15,1);',
    '  box-shadow:0 -20px 60px rgba(10,14,20,.16);',
    '}',
    '#nqz-sheet.open{transform:translateY(0);}',
    '#nqz-sheet *{box-sizing:border-box;margin:0;padding:0;}',

    /* Handle */
    '#nqz-handle{width:36px;height:4px;background:' + BD + ';border-radius:999px;margin:12px auto 0;}',

    /* Header */
    '#nqz-hdr{',
    '  background:' + WH + ';border-bottom:1px solid ' + BD + ';',
    '  padding:14px 18px 14px;',
    '  display:flex;align-items:center;gap:12px;',
    '  position:relative;',
    '}',
    '#nqz-hdr-left{display:flex;align-items:center;gap:10px;flex:1;}',
    '#nqz-hdr-icon{',
    '  width:36px;height:36px;border-radius:10px;',
    '  background:' + GL + ';',
    '  display:flex;align-items:center;justify-content:center;flex-shrink:0;',
    '}',
    '#nqz-hdr-icon svg{width:18px;height:18px;}',
    '#nqz-hdr-title{font-size:14px;font-weight:800;color:' + TK + ';line-height:1.3;margin-bottom:1px;}',
    '#nqz-hdr-sub{font-size:11px;color:' + T3 + ';font-weight:500;}',
    '#nqz-x{',
    '  width:30px;height:30px;border-radius:50%;',
    '  background:#eef0f7;border:none;cursor:pointer;',
    '  display:flex;align-items:center;justify-content:center;',
    '  color:#666;flex-shrink:0;transition:background .2s;',
    '}',
    '#nqz-x:hover{background:#e0e3f0;}',

    /* Progress bar */
    '#nqz-prog{height:3px;background:' + BD + ';overflow:hidden;}',
    '#nqz-prog-fill{height:100%;background:' + G + ';border-radius:999px;transition:width .5s cubic-bezier(.22,1,.36,1);width:0%;}',

    /* Body */
    '#nqz-body{padding:20px 18px 36px;}',

    /* Step label */
    '.nqz-step{display:block;font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:' + T3 + ';margin-bottom:4px;}',

    /* Question text */
    '.nqz-q{font-size:clamp(18px,5vw,22px);font-weight:800;color:' + TK + ';line-height:1.25;letter-spacing:-.02em;margin-bottom:18px;}',

    /* Options */
    '.nqz-opts{display:flex;flex-direction:column;gap:9px;}',
    '.nqz-opt{',
    '  display:flex;align-items:center;gap:12px;',
    '  padding:14px 16px;',
    '  background:' + WH + ';',
    '  border:1.5px solid ' + BD + ';',
    '  border-radius:14px;cursor:pointer;',
    '  font-family:inherit;text-align:right;width:100%;',
    '  transition:border-color .2s,background .2s,box-shadow .2s;',
    '  -webkit-tap-highlight-color:transparent;',
    '}',
    '.nqz-opt:hover{border-color:' + G + ';box-shadow:0 0 0 3px ' + GB + ';}',
    '.nqz-opt.sel{border-color:' + G + ';background:#f0fbf4;box-shadow:0 0 0 3px ' + GB + ';}',
    '.nqz-radio{',
    '  width:20px;height:20px;border-radius:50%;',
    '  border:1.5px solid ' + BD + ';',
    '  display:flex;align-items:center;justify-content:center;',
    '  flex-shrink:0;color:transparent;',
    '  transition:all .2s;',
    '}',
    '.nqz-opt.sel .nqz-radio{background:' + G + ';border-color:' + G + ';color:#fff;}',
    '.nqz-opt-text{flex:1;}',
    '.nqz-opt-label{display:block;font-size:14px;font-weight:700;color:' + TK + ';margin-bottom:1px;}',
    '.nqz-opt-note{display:block;font-size:12px;color:' + T3 + ';}',
    '.nqz-opt.sel .nqz-opt-label{color:#0e6636;}',
    '.nqz-opt.sel .nqz-opt-note{color:#3a9466;}',

    /* Screen anim */
    '.nqz-screen{transition:opacity .2s ease,transform .2s ease;}',
    '.nqz-screen.out{opacity:0;transform:translateX(8px);pointer-events:none;}',

    /* ── Result ── */
    '.nqz-r-eyebrow{display:block;font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:' + G + ';margin-bottom:4px;}',
    '.nqz-r-title{font-size:clamp(17px,4.5vw,20px);font-weight:800;color:' + TK + ';letter-spacing:-.02em;line-height:1.2;margin-bottom:16px;}',

    /* Product list */
    '.nqz-prod-list{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}',

    /* Product row card */
    '.nqz-prod{',
    '  display:flex;align-items:center;gap:14px;',
    '  background:' + WH + ';',
    '  border:1.5px solid ' + BD + ';',
    '  border-radius:16px;padding:14px 14px;',
    '  text-decoration:none;',
    '  transition:border-color .22s,box-shadow .22s,transform .25s ease;',
    '}',
    '.nqz-prod:hover{border-color:' + G + ';box-shadow:0 4px 18px ' + GB + ';transform:translateY(-2px);}',
    '.nqz-prod.top{border-color:' + G + ';background:#f0fbf4;}',

    /* Product image */
    '.nqz-prod-img{',
    '  width:64px;height:64px;border-radius:12px;',
    '  background:' + GL + ';',
    '  flex-shrink:0;overflow:hidden;',
    '  display:flex;align-items:center;justify-content:center;',
    '  position:relative;',
    '}',
    '.nqz-prod.top .nqz-prod-img{background:' + GL + ';}',
    '.nqz-prod-img img{width:100%;height:100%;object-fit:cover;display:block;}',
    '.nqz-prod-img .nqz-img-fb{display:flex;align-items:center;justify-content:center;width:100%;height:100%;}',

    /* Product info */
    '.nqz-prod-info{flex:1;min-width:0;}',
    '.nqz-prod-head{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px;}',
    '.nqz-rec-badge{display:inline-flex;align-items:center;gap:4px;font-size:9px;font-weight:700;color:#fff;background:' + G + ';padding:2px 8px;border-radius:999px;letter-spacing:.04em;}',
    '.nqz-cat-badge{font-size:10px;font-weight:700;color:' + G + ';background:' + GL + ';padding:2px 8px;border-radius:999px;}',
    '.nqz-prod-name{font-size:14px;font-weight:800;color:' + TK + ';line-height:1.2;margin-bottom:2px;}',
    '.nqz-prod-sub{font-size:11px;color:' + T3 + ';font-weight:400;}',
    '.nqz-prod-price{font-size:16px;font-weight:800;color:' + TK + ';margin-top:6px;letter-spacing:-.01em;direction:ltr;display:inline-block;}',
    '.nqz-prod-price em{font-size:11px;font-weight:400;font-style:normal;color:' + T3 + ';margin-right:2px;}',

    /* Arrow button */
    '.nqz-prod-arr{',
    '  width:34px;height:34px;border-radius:50%;',
    '  background:#f0f2f8;',
    '  display:flex;align-items:center;justify-content:center;',
    '  color:' + T2 + ';flex-shrink:0;',
    '  transition:background .2s,color .2s;',
    '}',
    '.nqz-prod.top .nqz-prod-arr{background:' + G + ';color:#fff;}',
    '.nqz-prod:hover .nqz-prod-arr{background:' + G + ';color:#fff;}',

    /* Footer */
    '#nqz-footer{',
    '  background:' + WH + ';border-top:1px solid ' + BD + ';',
    '  padding:12px 18px calc(16px + env(safe-area-inset-bottom,0px));',
    '  display:flex;align-items:center;justify-content:space-between;gap:10px;',
    '}',
    '.nqz-cancel{font-size:13px;font-weight:600;color:' + T3 + ';background:none;border:none;cursor:pointer;font-family:inherit;padding:4px 8px;}',
    '.nqz-cancel:hover{color:' + T2 + ';}',
    '.nqz-restart{font-size:13px;font-weight:600;color:' + T3 + ';background:none;border:none;cursor:pointer;font-family:inherit;padding:4px 8px;}',
    '.nqz-restart:hover{color:' + T2 + ';}',
    '.nqz-continue{',
    '  display:inline-flex;align-items:center;justify-content:center;gap:8px;',
    '  height:42px;padding:0 20px;',
    '  background:' + G + ';color:#fff;',
    '  border-radius:999px;border:none;',
    '  font-size:14px;font-weight:700;font-family:inherit;',
    '  cursor:pointer;flex-shrink:0;',
    '  transition:background .2s,transform .2s;',
    '  text-decoration:none;',
    '}',
    '.nqz-continue:hover{background:#18944e;transform:translateY(-1px);}',
    '.nqz-continue:disabled{opacity:.5;pointer-events:none;}',

    /* Desktop */
    '@media(min-width:600px){',
    '  #nqz-sheet{',
    '    bottom:auto;top:50%;left:50%;right:auto;',
    '    transform:translate(-50%,-44%) scale(.96);',
    '    border-radius:20px;',
    '    width:min(480px,calc(100vw - 40px));',
    '    max-height:calc(100dvh - 60px);',
    '    opacity:0;',
    '    transition:transform .4s cubic-bezier(.32,0,.15,1),opacity .32s ease;',
    '  }',
    '  #nqz-sheet.open{transform:translate(-50%,-50%) scale(1);opacity:1;}',
    '  #nqz-handle{display:none;}',
    '}'
  ].join('');

  /* ══════════════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════════════ */
  function open() {
    requestAnimationFrame(function () {
      els.bd.classList.add('open');
      els.sheet.classList.add('open');
    });
  }

  function close() {
    sessionStorage.setItem(SESSION_KEY, '1');
    els.bd.classList.remove('open');
    els.sheet.classList.remove('open');
  }

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  function setProgress(pct) {
    var f = document.getElementById('nqz-prog-fill');
    if (f) f.style.width = pct + '%';
  }

  function render() {
    step < QUESTIONS.length ? renderQ(step) : renderResult();
  }

  function headerHTML(title, sub, iconSvg) {
    return (
      '<div id="nqz-hdr">' +
        '<div id="nqz-hdr-left">' +
          '<div id="nqz-hdr-icon">' + iconSvg + '</div>' +
          '<div>' +
            '<div id="nqz-hdr-title">' + title + '</div>' +
            '<div id="nqz-hdr-sub">' + sub + '</div>' +
          '</div>' +
        '</div>' +
        '<button id="nqz-x" type="button" aria-label="إغلاق">' + IC_CLOSE + '</button>' +
      '</div>' +
      '<div id="nqz-prog"><div id="nqz-prog-fill"></div></div>'
    );
  }

  var QUIZ_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="' + G + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

  var RESULT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="' + G + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>';

  function renderQ(qi) {
    var q = QUESTIONS[qi];
    var pct = (qi / QUESTIONS.length) * 100;

    var optsHtml = q.opts.map(function (o, oi) {
      return (
        '<button class="nqz-opt" data-oi="' + oi + '" type="button">' +
          '<div class="nqz-opt-text">' +
            '<span class="nqz-opt-label">' + o.label + '</span>' +
            '<span class="nqz-opt-note">' + o.note + '</span>' +
          '</div>' +
          '<div class="nqz-radio">' + IC_CHECK + '</div>' +
        '</button>'
      );
    }).join('');

    els.sheet.innerHTML =
      '<div id="nqz-handle"></div>' +
      headerHTML('دليل اختيار التمر', 'نقوة النخيل', QUIZ_ICON) +
      '<div id="nqz-body">' +
        '<div class="nqz-screen">' +
          '<span class="nqz-step">' + q.label + ' · ' + q.step + ' من ' + QUESTIONS.length + '</span>' +
          '<p class="nqz-q">' + q.text + '</p>' +
          '<div class="nqz-opts">' + optsHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div id="nqz-footer">' +
        '<button class="nqz-cancel" type="button">إلغاء</button>' +
        '<button class="nqz-continue" type="button" disabled>التالي ' + IC_ARROW + '</button>' +
      '</div>';

    requestAnimationFrame(function () { setProgress(pct); });

    var nextBtn = els.sheet.querySelector('.nqz-continue');
    var selected = -1;

    els.sheet.querySelector('#nqz-x').onclick = close;
    els.sheet.querySelector('.nqz-cancel').onclick = close;

    els.sheet.querySelectorAll('.nqz-opt').forEach(function (btn) {
      btn.onclick = function () {
        els.sheet.querySelectorAll('.nqz-opt').forEach(function (b) { b.classList.remove('sel'); });
        btn.classList.add('sel');
        selected = parseInt(btn.getAttribute('data-oi'));
        nextBtn.disabled = false;
      };
    });

    nextBtn.onclick = function () {
      if (selected < 0) return;
      tags = tags.concat(QUESTIONS[qi].opts[selected].tags);
      setProgress((qi + 1) / QUESTIONS.length * 100);
      var screen = els.sheet.querySelector('.nqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(function () { step++; render(); }, 300);
    };
  }

  function productThumb(p, idSuffix) {
    var id = 'nqz-img-' + (idSuffix || p.key);
    if (p.img) {
      return (
        '<div class="nqz-prod-img">' +
          '<img id="' + id + '" src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
        '</div>'
      );
    }
    return (
      '<div class="nqz-prod-img">' +
        '<img id="' + id + '" src="" alt="' + p.name + '" loading="lazy" style="display:none">' +
        '<div class="nqz-img-fb">' + dateIconSVG() + '</div>' +
      '</div>'
    );
  }

  function renderResult() {
    var list = ranked();
    var top  = list[0];
    var alt1 = list[1];
    var alt2 = list[2];

    var prodsHtml =
      prodRow(top, true) +
      prodRow(alt1, false) +
      prodRow(alt2, false);

    els.sheet.innerHTML =
      '<div id="nqz-handle"></div>' +
      headerHTML('توصيتنا لك', 'بناءً على إجاباتك', RESULT_ICON) +
      '<div id="nqz-body">' +
        '<div class="nqz-screen">' +
          '<span class="nqz-r-eyebrow">اخترنا لك بعناية</span>' +
          '<p class="nqz-r-title">هذه أفضل خيارات التمر لك</p>' +
          '<div class="nqz-prod-list">' + prodsHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div id="nqz-footer">' +
        '<button class="nqz-restart" type="button">إعادة الاختيار</button>' +
        '<a class="nqz-continue" href="' + top.url + '">اكتشف المنتج ' + IC_ARROW + '</a>' +
      '</div>';

    setProgress(100);

    els.sheet.querySelector('#nqz-x').onclick = close;
    els.sheet.querySelector('.nqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = els.sheet.querySelector('.nqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(render, 260);
    };
  }

  function prodRow(p, isTop) {
    return (
      '<a class="nqz-prod' + (isTop ? ' top' : '') + '" href="' + p.url + '">' +
        productThumb(p) +
        '<div class="nqz-prod-info">' +
          '<div class="nqz-prod-head">' +
            (isTop ? '<span class="nqz-rec-badge">' + IC_STAR + ' الأنسب لك</span>' : '') +
            '<span class="nqz-cat-badge">' + p.badge + '</span>' +
          '</div>' +
          '<div class="nqz-prod-name">' + p.name + '</div>' +
          '<div class="nqz-prod-sub">' + p.sub + '</div>' +
          '<div class="nqz-prod-price">' + p.price + ' <em>' + CURRENCY + '</em></div>' +
        '</div>' +
        '<div class="nqz-prod-arr">' + IC_ARROW + '</div>' +
      '</a>'
    );
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    /* CSS */
    if (!document.getElementById('nqz-css')) {
      var s = document.createElement('style');
      s.id = 'nqz-css'; s.textContent = CSS;
      document.head.appendChild(s);
    }

    /* Backdrop */
    els.bd = document.createElement('div');
    els.bd.id = 'nqz-bd';
    els.bd.onclick = close;
    document.body.appendChild(els.bd);

    /* Sheet */
    els.sheet = document.createElement('div');
    els.sheet.id = 'nqz-sheet';
    els.sheet.setAttribute('dir', 'rtl');
    els.sheet.setAttribute('role', 'dialog');
    els.sheet.setAttribute('aria-modal', 'true');
    document.body.appendChild(els.sheet);

    /* Pre-render first question */
    render();

    /* Try to fetch real product images in background */
    tryFetchImages();

    /* Auto-open */
    setTimeout(open, DELAY_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(init); });
  }

})();
