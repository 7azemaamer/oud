/* ─────────────────────────────────────────────────────────
   nq-quiz.js  v1.3.0 — نقوة النخيل
   Premium product concierge — auto-shows 5s, once per session
   No green SaaS / no progress bars / no radio buttons
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SK = 'nqz_seen';
  if (sessionStorage.getItem(SK)) return;

  /* ══════════════════════════════════════════════
     TOKENS
  ══════════════════════════════════════════════ */
  var C = {
    white  : '#FFFFFF',
    cream  : '#F8F6F2',
    cream2 : '#FFF9F1',
    bg     : '#F3EEE7',
    ink    : '#1A1612',
    ink2   : '#5A5048',
    ink3   : '#9C8E82',
    accent : '#2D1B12',
    gold   : '#C4922A',
    border : '#E4DDD5',
    selBd  : '#D7C8B3',
    shadow : '0 40px 120px rgba(45,27,18,0.14)'
  };

  /* ══════════════════════════════════════════════
     PRODUCTS — real CDN images from naquatalnakhil
  ══════════════════════════════════════════════ */
  var CDN = 'https://cdn.salla.sa/AzvOOZ/';
  var STORE = 'https://naquatalnakhil.com';

  var PRODUCTS = [
    {
      key  : 'sukari',
      name : 'سكري مفتل',
      sub  : 'درجة أولى من القصيم',
      badge: 'الأكثر طلباً',
      desc : 'تمر سكري صافي طري بحلاوة طبيعية — أكثر منتجاتنا مبيعاً للضيافة والتذوق اليومي.',
      price: 90,
      cur  : 'ريال',
      url  : STORE + '/category/OlBOmK',
      img  : CDN + '6e8e1b9d-244f-435d-a154-19bb184aa57e-500x333.33333333333-Emm0WEkiJ5AXpzHmvmT3DoJAmQYG2deMhW6x1inA.jpg',
      s    : { gift:1, hosting:3, personal:3, cheap:3, mid:2, premium:0 }
    },
    {
      key  : 'tamriya',
      name : 'تمرية',
      sub  : 'تمور محشوة بالمكسرات',
      badge: 'هدية راقية',
      desc : 'تمور مختارة محشوة بالمكسرات والفواكه في علب هدايا أنيقة — تليق بكل مناسبة.',
      price: 150,
      cur  : 'ريال',
      url  : STORE,
      img  : CDN + '7ebc281e-ec15-4532-bd78-41318a6632a1-500x500-0FYNiNh0GaigEWHqu4OWKrVtedvqZU8vvTEDYxb8.jpg',
      s    : { gift:3, hosting:2, personal:1, cheap:1, mid:3, premium:1 }
    },
    {
      key  : 'bestseller',
      name : 'الأكثر طلباً',
      sub  : 'تشكيلة مختارة بعناية',
      badge: 'الأفخر والأرقى',
      desc : 'أرقى تشكيلة تمور سعودية مختارة بعناية في تغليف ملكي فاخر — لأصحاب الذوق الرفيع.',
      price: 250,
      cur  : 'ريال',
      url  : STORE,
      img  : CDN + 'bda66ea4-7de1-4e04-bf8d-1683c97c4493-500x333.251953125-cGp8etEu9pjABDsXj7igjjvgueUbkHU1PvfmRk0E.jpg',
      s    : { gift:2, hosting:1, personal:0, cheap:0, mid:1, premium:3 }
    }
  ];

  /* ══════════════════════════════════════════════
     QUESTIONS
  ══════════════════════════════════════════════ */
  var QUESTIONS = [
    {
      id   : 'purpose',
      text : 'ما الغرض من طلبك؟',
      cols : 3,
      opts : [
        {
          key  : 'gift',
          label: 'هدية',
          note : 'مناسبات وتقديم',
          icon : '<svg viewBox="0 0 40 40" fill="none"><rect x="8" y="18" width="24" height="16" rx="3" stroke="#2D1B12" stroke-width="1.8"/><path d="M8 22h24" stroke="#2D1B12" stroke-width="1.8"/><path d="M20 18v16" stroke="#2D1B12" stroke-width="1.8"/><path d="M20 18c0 0-4-6 0-8 2-1 4 1 4 4" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/><path d="M20 18c0 0 4-6 0-8-2-1-4 1-4 4" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/></svg>',
          tags : ['gift']
        },
        {
          key  : 'hosting',
          label: 'ضيافة',
          note : 'ضيافة منزل أو عمل',
          icon : '<svg viewBox="0 0 40 40" fill="none"><path d="M12 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/><path d="M8 28h24" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/><path d="M20 20V14" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/><circle cx="20" cy="12" r="2.5" stroke="#2D1B12" stroke-width="1.8"/><path d="M15 16c1 1 3 2 5 2s4-1 5-2" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/></svg>',
          tags : ['hosting']
        },
        {
          key  : 'personal',
          label: 'شخصي',
          note : 'لنفسي أو للعائلة',
          icon : '<svg viewBox="0 0 40 40" fill="none"><path d="M20 30s-10-6-10-13a7 7 0 0 1 10-6.32A7 7 0 0 1 30 17c0 7-10 13-10 13z" stroke="#2D1B12" stroke-width="1.8" stroke-linejoin="round"/></svg>',
          tags : ['personal']
        }
      ]
    },
    {
      id   : 'budget',
      text : 'ما ميزانيتك التقريبية؟',
      cols : 3,
      opts : [
        {
          key  : 'cheap',
          label: 'حتى 100',
          note : 'ريال سعودي',
          icon : '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="11" stroke="#2D1B12" stroke-width="1.8"/><path d="M20 14v12M17 17h4.5a2.5 2.5 0 0 1 0 5H17" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/></svg>',
          tags : ['cheap']
        },
        {
          key  : 'mid',
          label: '100 – 200',
          note : 'ريال سعودي',
          icon : '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="11" stroke="#2D1B12" stroke-width="1.8"/><path d="M16 25l8-10M16 15h8M16 25h8" stroke="#2D1B12" stroke-width="1.8" stroke-linecap="round"/></svg>',
          tags : ['mid']
        },
        {
          key  : 'premium',
          label: '200+',
          note : 'ريال سعودي',
          icon : '<svg viewBox="0 0 40 40" fill="none"><path d="M20 10l2.4 7.3H30l-6.2 4.5 2.4 7.2L20 24.5l-6.2 4.5 2.4-7.2L10 17.3h7.6z" stroke="#2D1B12" stroke-width="1.8" stroke-linejoin="round"/></svg>',
          tags : ['premium']
        }
      ]
    }
  ];

  /* ══════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════ */
  var step = 0;
  var tags = [];
  var el   = {};

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
     ICONS
  ══════════════════════════════════════════════ */
  var IC_X =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var IC_CHECK =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  var IC_ARROW_LTR =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  /* ══════════════════════════════════════════════
     CSS
  ══════════════════════════════════════════════ */
  var CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap");',

    /* ── Backdrop ── */
    '#nqz-bd{position:fixed;inset:0;',
    'background:rgba(30,27,24,0.45);',
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);',
    'z-index:9990;opacity:0;pointer-events:none;transition:opacity .35s ease;}',
    '#nqz-bd.open{opacity:1;pointer-events:auto;}',

    /* ── Modal ── */
    '#nqz-modal{',
    'position:fixed;z-index:9991;',
    'background:#FFFFFF;',
    'direction:rtl;',
    'font-family:"Tajawal",system-ui,sans-serif;',
    '-webkit-font-smoothing:antialiased;',
    /* mobile: bottom sheet */
    'bottom:0;left:0;right:0;',
    'border-radius:32px 32px 0 0;',
    'max-height:96dvh;overflow-y:auto;-webkit-overflow-scrolling:touch;',
    'transform:translateY(100%);opacity:1;',
    'transition:transform .46s cubic-bezier(.22,1,.36,1);',
    'box-shadow:' + C.shadow + ';',
    '}',
    '#nqz-modal.open{transform:translateY(0);}',
    '#nqz-modal *{box-sizing:border-box;margin:0;padding:0;}',
    '#nqz-modal a{text-decoration:none;}',

    /* ── Handle ── */
    '.nqz-handle{width:36px;height:4px;background:#E4DDD5;border-radius:999px;margin:14px auto 0;}',

    /* ── Header ── */
    '.nqz-hdr{padding:20px 24px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}',
    '.nqz-hdr-text{}',
    '.nqz-eyebrow{display:block;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:' + C.ink3 + ';margin-bottom:4px;}',
    '.nqz-title{font-size:clamp(18px,4.5vw,22px);font-weight:900;color:' + C.ink + ';letter-spacing:-.025em;line-height:1.15;}',
    '.nqz-x{width:32px;height:32px;border-radius:50%;background:' + C.cream + ';border:none;cursor:pointer;',
    'display:flex;align-items:center;justify-content:center;color:' + C.ink2 + ';flex-shrink:0;',
    'transition:background .2s,transform .2s;margin-top:2px;}',
    '.nqz-x:hover{background:' + C.border + ';transform:scale(1.08);}',

    /* ── Body ── */
    '.nqz-body{padding:24px 24px 40px;}',

    /* ── Question screen ── */
    '.nqz-q-label{display:block;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:' + C.ink3 + ';margin-bottom:6px;}',
    '.nqz-q-text{font-size:clamp(17px,4vw,20px);font-weight:800;color:' + C.ink + ';line-height:1.25;letter-spacing:-.02em;margin-bottom:18px;}',

    /* ── Card grid (3-col) ── */
    '.nqz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}',

    /* ── Option card ── */
    '.nqz-card{',
    'display:flex;flex-direction:column;align-items:center;justify-content:center;',
    'gap:10px;padding:20px 12px;',
    'background:' + C.cream + ';',
    'border:1.5px solid transparent;',
    'border-radius:24px;cursor:pointer;',
    'font-family:inherit;text-align:center;',
    'position:relative;',
    'transition:background .22s ease,border-color .22s ease,transform .28s cubic-bezier(.34,1.56,.64,1),box-shadow .22s ease;',
    '-webkit-tap-highlight-color:transparent;user-select:none;',
    '}',
    '.nqz-card:hover{background:' + C.cream2 + ';border-color:' + C.selBd + ';transform:translateY(-3px);box-shadow:0 8px 28px rgba(45,27,18,.07);}',
    '.nqz-card.sel{background:' + C.cream2 + ';border-color:' + C.selBd + ';transform:translateY(-3px);box-shadow:0 10px 32px rgba(45,27,18,.09);}',

    /* check pip on selected */
    '.nqz-card-check{',
    'position:absolute;top:10px;left:10px;',
    'width:22px;height:22px;border-radius:50%;',
    'background:' + C.accent + ';color:#fff;',
    'display:flex;align-items:center;justify-content:center;',
    'opacity:0;transform:scale(.6);',
    'transition:opacity .2s,transform .25s cubic-bezier(.34,1.56,.64,1);',
    '}',
    '.nqz-card.sel .nqz-card-check{opacity:1;transform:scale(1);}',

    '.nqz-card-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;}',
    '.nqz-card-icon svg{width:40px;height:40px;}',
    '.nqz-card-label{font-size:14px;font-weight:800;color:' + C.ink + ';line-height:1.2;}',
    '.nqz-card-note{font-size:11px;color:' + C.ink3 + ';font-weight:400;}',

    /* screen transition */
    '.nqz-screen{transition:opacity .22s ease,transform .22s ease;}',
    '.nqz-screen.out{opacity:0;transform:translateX(10px);pointer-events:none;}',

    /* ── Result ── */
    '.nqz-r-label{display:block;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:' + C.gold + ';margin-bottom:6px;}',
    '.nqz-r-title{font-size:clamp(18px,4vw,21px);font-weight:900;color:' + C.ink + ';letter-spacing:-.02em;line-height:1.2;margin-bottom:18px;}',

    /* primary product card */
    '.nqz-primary{',
    'display:flex;gap:16px;align-items:stretch;',
    'background:' + C.cream + ';border-radius:24px;overflow:hidden;',
    'margin-bottom:12px;',
    '}',
    '.nqz-primary-img{',
    'width:42%;flex-shrink:0;',
    'background:' + C.bg + ';',
    'position:relative;overflow:hidden;',
    'min-height:200px;',
    '}',
    '.nqz-primary-img img{width:100%;height:100%;object-fit:cover;display:block;',
    'transition:transform .5s ease;}',
    '.nqz-primary:hover .nqz-primary-img img{transform:scale(1.04);}',
    '.nqz-primary-info{flex:1;padding:20px 16px 20px 0;display:flex;flex-direction:column;min-width:0;}',
    '.nqz-rec-pill{display:inline-flex;align-items:center;gap:5px;',
    'font-size:10px;font-weight:800;letter-spacing:.06em;',
    'color:#fff;background:' + C.accent + ';',
    'padding:3px 10px;border-radius:999px;',
    'margin-bottom:8px;width:fit-content;}',
    '.nqz-primary-badge{font-size:10px;font-weight:700;color:' + C.gold + ';',
    'background:rgba(196,146,42,.1);padding:2px 8px;border-radius:999px;',
    'margin-bottom:8px;display:block;width:fit-content;}',
    '.nqz-primary-name{font-size:clamp(18px,4vw,22px);font-weight:900;color:' + C.ink + ';',
    'letter-spacing:-.025em;line-height:1.15;margin-bottom:2px;}',
    '.nqz-primary-sub{font-size:12px;color:' + C.ink3 + ';margin-bottom:8px;}',
    '.nqz-primary-desc{font-size:12px;color:' + C.ink2 + ';line-height:1.7;flex:1;margin-bottom:12px;}',
    '.nqz-primary-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;}',
    '.nqz-price{font-size:20px;font-weight:900;color:' + C.ink + ';letter-spacing:-.02em;direction:ltr;display:inline-block;}',
    '.nqz-price em{font-size:11px;font-weight:400;font-style:normal;color:' + C.ink3 + ';margin-right:2px;}',
    '.nqz-cta{display:inline-flex;align-items:center;gap:6px;',
    'height:36px;padding:0 16px;',
    'background:' + C.accent + ';color:#F8F6F2;',
    'border-radius:999px;font-size:12px;font-weight:700;font-family:inherit;',
    'white-space:nowrap;flex-shrink:0;cursor:pointer;border:none;',
    'transition:background .2s,transform .2s;}',
    '.nqz-cta:hover{background:#1a0e08;transform:translateY(-1px);}',

    /* secondary products */
    '.nqz-alts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}',
    '.nqz-alt{',
    'display:flex;flex-direction:column;',
    'background:' + C.cream + ';border-radius:20px;overflow:hidden;',
    'transition:transform .25s ease,box-shadow .25s ease;',
    '}',
    '.nqz-alt:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(45,27,18,.08);}',
    '.nqz-alt-img{height:110px;background:' + C.bg + ';overflow:hidden;flex-shrink:0;}',
    '.nqz-alt-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;}',
    '.nqz-alt:hover .nqz-alt-img img{transform:scale(1.06);}',
    '.nqz-alt-body{padding:12px 12px 14px;flex:1;display:flex;flex-direction:column;gap:2px;}',
    '.nqz-alt-badge{font-size:9px;font-weight:700;color:' + C.gold + ';text-transform:uppercase;letter-spacing:.08em;}',
    '.nqz-alt-name{font-size:13px;font-weight:800;color:' + C.ink + ';line-height:1.25;}',
    '.nqz-alt-sub{font-size:10px;color:' + C.ink3 + ';}',
    '.nqz-alt-row{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:8px;}',
    '.nqz-alt-price{font-size:14px;font-weight:800;color:' + C.ink + ';}',
    '.nqz-alt-price em{font-size:10px;font-weight:400;font-style:normal;color:' + C.ink3 + ';}',
    '.nqz-alt-arr{width:26px;height:26px;border-radius:50%;background:' + C.border + ';',
    'display:flex;align-items:center;justify-content:center;color:' + C.ink2 + ';flex-shrink:0;',
    'transition:background .2s,color .2s;}',
    '.nqz-alt:hover .nqz-alt-arr{background:' + C.accent + ';color:#fff;}',

    /* restart */
    '.nqz-restart{display:block;width:100%;text-align:center;',
    'font-size:12px;color:' + C.ink3 + ';background:none;border:none;',
    'cursor:pointer;font-family:inherit;padding:4px;transition:color .2s;}',
    '.nqz-restart:hover{color:' + C.ink2 + ';}',
    '.nqz-restart u{text-underline-offset:3px;}',

    /* ── Desktop: centered modal ── */
    '@media(min-width:600px){',
    '#nqz-modal{',
    'bottom:auto;top:50%;left:50%;right:auto;',
    'width:min(760px,92vw);',
    'border-radius:40px;',
    'transform:translate(-50%,-46%) scale(.96);',
    'max-height:calc(100dvh - 40px);',
    'opacity:0;',
    'transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .32s ease;',
    '}',
    '#nqz-modal.open{transform:translate(-50%,-50%) scale(1);opacity:1;}',
    '.nqz-handle{display:none;}',
    '.nqz-hdr{padding:32px 36px 0;}',
    '.nqz-title{font-size:clamp(20px,2.5vw,26px);}',
    '.nqz-body{padding:28px 36px 44px;}',
    '.nqz-grid{gap:14px;}',
    '.nqz-card{padding:26px 16px;}',
    '.nqz-card-icon{width:52px;height:52px;}',
    '.nqz-card-icon svg{width:48px;height:48px;}',
    '.nqz-card-label{font-size:15px;}',
    '.nqz-primary{border-radius:28px;}',
    '.nqz-primary-img{width:38%;min-height:240px;}',
    '.nqz-primary-info{padding:24px 20px 24px 0;}',
    '.nqz-primary-name{font-size:clamp(20px,2.8vw,28px);}',
    '.nqz-price{font-size:24px;}',
    '}'
  ].join('');

  /* ══════════════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════════════ */
  function open() {
    requestAnimationFrame(function () {
      el.bd.classList.add('open');
      el.modal.classList.add('open');
    });
  }

  function close() {
    sessionStorage.setItem(SK, '1');
    el.bd.classList.remove('open');
    el.modal.classList.remove('open');
  }

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  function render() {
    step < QUESTIONS.length ? renderQ(step) : renderResult();
  }

  function hdrHTML(eyebrow, title) {
    return (
      '<div class="nqz-hdr">' +
        '<div class="nqz-hdr-text">' +
          '<span class="nqz-eyebrow">' + eyebrow + '</span>' +
          '<div class="nqz-title">' + title + '</div>' +
        '</div>' +
        '<button class="nqz-x" type="button" aria-label="إغلاق">' + IC_X + '</button>' +
      '</div>'
    );
  }

  function renderQ(qi) {
    var q = QUESTIONS[qi];

    var cardsHtml = q.opts.map(function (o) {
      return (
        '<button class="nqz-card" data-key="' + o.key + '" data-tags="' + o.tags.join(',') + '" type="button">' +
          '<div class="nqz-card-check">' + IC_CHECK + '</div>' +
          '<div class="nqz-card-icon">' + o.icon + '</div>' +
          '<span class="nqz-card-label">' + o.label + '</span>' +
          '<span class="nqz-card-note">' + o.note + '</span>' +
        '</button>'
      );
    }).join('');

    el.modal.innerHTML =
      '<div class="nqz-handle"></div>' +
      hdrHTML('نقوة النخيل · ' + (qi + 1) + ' / ' + QUESTIONS.length, q.text) +
      '<div class="nqz-body">' +
        '<div class="nqz-screen">' +
          '<div class="nqz-grid">' + cardsHtml + '</div>' +
        '</div>' +
      '</div>';

    el.modal.querySelector('.nqz-x').onclick = close;

    el.modal.querySelectorAll('.nqz-card').forEach(function (card) {
      card.onclick = function () {
        /* highlight */
        el.modal.querySelectorAll('.nqz-card').forEach(function (c) { c.classList.remove('sel'); });
        card.classList.add('sel');
        /* collect tags */
        var t = card.getAttribute('data-tags').split(',');
        tags = tags.concat(t);
        /* animate out then advance */
        var screen = el.modal.querySelector('.nqz-screen');
        if (screen) screen.classList.add('out');
        setTimeout(function () { step++; render(); }, 300);
      };
    });
  }

  function renderResult() {
    var list = ranked();
    var top  = list[0];
    var alt1 = list[1];
    var alt2 = list[2];

    el.modal.innerHTML =
      '<div class="nqz-handle"></div>' +
      hdrHTML('اخترنا لك بعناية', 'إليك أنسب التمور لك') +
      '<div class="nqz-body">' +
        '<div class="nqz-screen">' +

          /* Primary */
          '<a class="nqz-primary" href="' + top.url + '">' +
            '<div class="nqz-primary-img">' +
              '<img src="' + top.img + '" alt="' + top.name + '" loading="eager">' +
            '</div>' +
            '<div class="nqz-primary-info">' +
              '<span class="nqz-rec-pill">' + IC_CHECK + ' الأنسب لك</span>' +
              '<span class="nqz-primary-badge">' + top.badge + '</span>' +
              '<div class="nqz-primary-name">' + top.name + '</div>' +
              '<div class="nqz-primary-sub">' + top.sub + '</div>' +
              '<div class="nqz-primary-desc">' + top.desc + '</div>' +
              '<div class="nqz-primary-foot">' +
                '<span class="nqz-price">' + top.price + ' <em>' + top.cur + '</em></span>' +
                '<span class="nqz-cta">اكتشف ' + IC_ARROW_LTR + '</span>' +
              '</div>' +
            '</div>' +
          '</a>' +

          /* Alternatives */
          '<div class="nqz-alts">' +
            altCard(alt1) +
            altCard(alt2) +
          '</div>' +

          '<button class="nqz-restart" type="button"><u>إعادة الاختيار</u></button>' +

        '</div>' +
      '</div>';

    el.modal.querySelector('.nqz-x').onclick = close;
    el.modal.querySelector('.nqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = el.modal.querySelector('.nqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(render, 280);
    };
  }

  function altCard(p) {
    return (
      '<a class="nqz-alt" href="' + p.url + '">' +
        '<div class="nqz-alt-img"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
        '<div class="nqz-alt-body">' +
          '<span class="nqz-alt-badge">' + p.badge + '</span>' +
          '<div class="nqz-alt-name">' + p.name + '</div>' +
          '<div class="nqz-alt-sub">' + p.sub + '</div>' +
          '<div class="nqz-alt-row">' +
            '<span class="nqz-alt-price">' + p.price + ' <em>' + p.cur + '</em></span>' +
            '<span class="nqz-alt-arr">' + IC_ARROW_LTR + '</span>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    if (!document.getElementById('nqz-css')) {
      var s = document.createElement('style');
      s.id = 'nqz-css'; s.textContent = CSS;
      document.head.appendChild(s);
    }

    el.bd = document.createElement('div');
    el.bd.id = 'nqz-bd';
    el.bd.onclick = close;
    document.body.appendChild(el.bd);

    el.modal = document.createElement('div');
    el.modal.id = 'nqz-modal';
    el.modal.setAttribute('dir', 'rtl');
    el.modal.setAttribute('role', 'dialog');
    el.modal.setAttribute('aria-modal', 'true');
    document.body.appendChild(el.modal);

    render();
    setTimeout(open, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(init); });
  }

})();
