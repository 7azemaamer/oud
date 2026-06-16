/* ─────────────────────────────────────────────────────────
   nq-quiz.js  v2.2.1 — hamtaro.sa
   Product concierge — auto-shows 5s, once per session
   Centered modal · list-row layout · !important CSS guards
   · div+onclick product cards (no Salla hover injection)
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SK = 'hmqz_seen';
  if (sessionStorage.getItem(SK)) return;

  /* ══ Store ══ */
  var CDN   = 'https://cdn.salla.sa/zvoeKA/';
  var STORE = 'https://hamtaro.sa';

  /* ══ Products ══ */
  var PRODUCTS = [
    {
      key  : 'mostRequested',
      name : 'بوكس الأكثر طلباً',
      sub  : 'أكثر من 30 قطعة',
      badge: 'الأكثر طلباً',
      price: '195',
      cur  : 'ر.س',
      url  : STORE + '/بوكس-الأكثر-طلباً/p1577619451',
      img  : CDN + 'e26fa770-6410-4605-9d03-51bc0d37a414-400x500-k1W3eSM6MMYUwUMgHfkkHUd0PRKeohemmnHNv6CJ.png',
      s    : { adult:3, variety:3, value:2, kitten:0, sterilised:0, health:1 }
    },
    {
      key  : 'kittenEcon',
      name : 'بوكس الكيتن الاقتصادي',
      sub  : '16 قطعة طعام رطب',
      badge: 'للكيتن',
      price: '95',
      cur  : 'ر.س',
      url  : STORE + '/بوكس-الكيتن-الاقتصادي/p1450244745',
      img  : CDN + '450d1e57-c845-4929-96ac-561960452fe4-400x500-5fMdzTFSUV0PQrLgGSKqyuDdLdDz1D7LJLo83RkG.jpg',
      s    : { kitten:3, value:3, variety:2, adult:0, sterilised:0, health:1 }
    },
    {
      key  : 'sterilised',
      name : 'البوكس التوفيري للمعقمة',
      sub  : '30 قطعة جاف ورطب',
      badge: 'للمعقمة',
      price: '222',
      cur  : 'ر.س',
      url  : STORE + '/البوكس-التوفيري-للقطط-المعقمة/p1546392188',
      img  : CDN + 'f66a5472-1c91-4426-bf28-80b23d09d7fd-400x500-J5GqSz35qBjMXJucacQLz73phNleEZFAOD7mheYN.jpg',
      s    : { sterilised:3, health:3, value:1, kitten:0, adult:1, variety:1 }
    }
  ];

  /* ══ Icons ══ */
  var IC_PAW =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<ellipse cx="12" cy="15.5" rx="4.5" ry="3.5"/>' +
    '<circle cx="8.5" cy="9" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="15.5" cy="9" r="1.5"/>' +
    '<circle cx="6.5" cy="12.5" r="1.1"/><circle cx="17.5" cy="12.5" r="1.1"/>' +
    '</svg>';

  var IC_CAT =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
    '<path d="M5 8.5v5C5 17.6 8.1 20 12 20s7-2.4 7-6.5v-5L16.2 5 15 8.2C14.1 8 13.1 7.8 12 7.8c-1.1 0-2.1.2-3 .4L7.8 5z"/>' +
    '<circle cx="9.5" cy="13.5" r=".7" fill="currentColor" stroke="none"/>' +
    '<circle cx="14.5" cy="13.5" r=".7" fill="currentColor" stroke="none"/>' +
    '<path d="M10.5 16q1.5 1 3 0"/>' +
    '</svg>';

  var IC_SHIELD =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 3L4 7v6c0 4.4 3.4 7.7 8 9 4.6-1.3 8-4.6 8-9V7z"/>' +
    '<path d="M9 12h6M12 9v6"/>' +
    '</svg>';

  var IC_COIN =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="12" cy="12" r="8"/>' +
    '<path d="M12 7v10M9.5 9.5h3.5a2 2 0 010 4H9.5M9.5 13.5H14"/>' +
    '</svg>';

  var IC_GRID =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>' +
    '<rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>' +
    '</svg>';

  var IC_HEART =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>' +
    '</svg>';

  var IC_X =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
    '</svg>';

  var IC_CHECK =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="20 6 9 17 4 12"/>' +
    '</svg>';

  var IC_ARR =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
    '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>' +
    '</svg>';

  /* ══ Questions ══ */
  var QUESTIONS = [
    {
      id  : 'type',
      text: 'قطتك...',
      note: 'اختر ما يناسب قطتك لنرشح لك الأنسب',
      opts: [
        { key:'kitten',     label:'كيتن',  note:'من شهرين فأكثر', icon:IC_PAW,    tags:['kitten']     },
        { key:'adult',      label:'بالغة', note:'فوق السنة',        icon:IC_CAT,    tags:['adult']      },
        { key:'sterilised', label:'معقمة', note:'بعد التعقيم',      icon:IC_SHIELD, tags:['sterilised'] }
      ]
    },
    {
      id  : 'priority',
      text: 'أهم شيء بالنسبة لك؟',
      note: 'يساعدنا على اختيار البوكس المثالي',
      opts: [
        { key:'value',   label:'قيمة وسعر',  note:'أفضل صفقة بسعر مناسب',  icon:IC_COIN,  tags:['value']   },
        { key:'variety', label:'تنوع ونكهات', note:'خيارات أكثر لقطتك',     icon:IC_GRID,  tags:['variety'] },
        { key:'health',  label:'صحة وتخصص', note:'تغذية مدروسة ومتوازنة',  icon:IC_HEART, tags:['health']  }
      ]
    }
  ];

  /* ══ State ══ */
  var step = 0;
  var tags = [];
  var el   = {};

  /* ══ Scoring ══ */
  function ranked() {
    return PRODUCTS.slice().sort(function (a, b) {
      var sa = tags.reduce(function (n, t) { return n + (a.s[t] || 0); }, 0);
      var sb = tags.reduce(function (n, t) { return n + (b.s[t] || 0); }, 0);
      return sb - sa;
    });
  }

  /* ══ CSS ══ */
  var CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap");',

    /* Backdrop */
    '#hmqz-bd{position:fixed!important;inset:0!important;',
    'background:rgba(10,10,10,.46)!important;',
    'backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;',
    'z-index:9990!important;opacity:0!important;pointer-events:none!important;',
    'transition:opacity .3s ease!important;}',
    '#hmqz-bd.open{opacity:1!important;pointer-events:auto!important;}',

    /* Modal */
    '#hmqz-m{',
    'position:fixed!important;z-index:9991!important;',
    'top:50%!important;left:50%!important;',
    'transform:translate(-50%,-50%) scale(.93)!important;opacity:0!important;',
    'width:min(500px,92vw)!important;',
    'max-height:88dvh!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;',
    'background:#FFFFFF!important;border-radius:20px!important;',
    'box-shadow:0 32px 100px rgba(0,0,0,.18),0 2px 8px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.9)!important;',
    'direction:rtl!important;',
    'font-family:"Tajawal",system-ui,sans-serif!important;',
    '-webkit-font-smoothing:antialiased!important;',
    'transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .28s ease!important;',
    '}',
    '#hmqz-m.open{transform:translate(-50%,-50%) scale(1)!important;opacity:1!important;}',
    '#hmqz-m *{box-sizing:border-box!important;margin:0!important;padding:0!important;}',

    /* Header */
    '.hmqz-hdr{padding:24px 22px 0!important;display:flex!important;align-items:flex-start!important;',
    'justify-content:space-between!important;gap:12px!important;}',
    '.hmqz-hdr-inner{flex:1!important;min-width:0!important;}',
    '.hmqz-eyebrow{font-size:10.5px!important;font-weight:bold!important;letter-spacing:.14em!important;',
    'text-transform:uppercase!important;color:#9CA3AF!important;display:block!important;margin-bottom:5px!important;}',
    '.hmqz-title{font-size:20px!important;font-weight:900!important;color:#0D0D0D!important;',
    'letter-spacing:-.022em!important;line-height:1.2!important;}',
    '.hmqz-hsub{font-size:13px!important;color:#6B7280!important;margin-top:5px!important;line-height:1.5!important;}',
    '.hmqz-x{width:32px!important;height:32px!important;border-radius:50%!important;',
    'background:#F3F4F6!important;border:none!important;cursor:pointer!important;',
    'display:flex!important;align-items:center!important;justify-content:center!important;',
    'color:#4B5563!important;flex-shrink:0!important;',
    'transition:background .2s,transform .2s;margin-top:2px!important;}',
    '.hmqz-x:hover{background:#E5E7EB!important;transform:scale(1.08)!important;}',

    /* Divider under header */
    '.hmqz-hd{display:block!important;height:1px!important;',
    'border:none!important;background:#F3F4F6!important;margin:18px 0 0!important;}',

    /* Body */
    '.hmqz-body{padding:16px 22px 26px!important;}',

    /* ── Option rows — full !important shield vs store resets ── */
    '.hmqz-row{',
    'display:flex!important;align-items:center!important;gap:13px!important;',
    'padding:14px 15px!important;',
    'border:1.5px solid #EAECEE!important;border-radius:14px!important;',
    'cursor:pointer!important;',
    'background:#FFFFFF!important;',
    'width:100%!important;',
    'font-family:"Tajawal",system-ui,sans-serif!important;',
    'font-size:15px!important;',
    'text-align:right!important;',
    '-webkit-tap-highlight-color:transparent!important;',
    'user-select:none!important;',
    'margin-top:10px!important;',
    'box-shadow:none!important;',
    'outline:none!important;',
    'appearance:none!important;-webkit-appearance:none!important;',
    'transition:border-color .18s ease,background .18s ease!important;',
    '}',
    '.hmqz-row:first-child{margin-top:0!important;}',
    '.hmqz-row:hover{border-color:#C4CAD1!important;background:#FAFAFA!important;}',
    '.hmqz-row.sel{border-color:#1A6B3A!important;background:#EDF7F1!important;}',
    '.hmqz-row:active{transform:scale(.982)!important;}',

    /* Icon box */
    '.hmqz-row-icon{',
    'width:46px!important;height:46px!important;border-radius:12px!important;',
    'background:#F3F4F6!important;',
    'display:flex!important;align-items:center!important;justify-content:center!important;',
    'flex-shrink:0!important;color:#374151!important;',
    'transition:background .18s,color .18s;',
    '}',
    '.hmqz-row.sel .hmqz-row-icon{background:#D1FAE5!important;color:#1A6B3A!important;}',

    /* Row text */
    '.hmqz-row-text{flex:1!important;min-width:0!important;}',
    '.hmqz-row-label{font-size:15px!important;font-weight:bold!important;color:#0D0D0D!important;',
    'display:block!important;line-height:1.3!important;}',
    '.hmqz-row-note{font-size:12px!important;color:#9CA3AF!important;',
    'display:block!important;margin-top:2px!important;}',

    /* Radio dot */
    '.hmqz-row-radio{',
    'width:22px!important;height:22px!important;border-radius:50%!important;',
    'border:2px solid #D1D5DB!important;',
    'flex-shrink:0!important;',
    'display:flex!important;align-items:center!important;justify-content:center!important;',
    'background:transparent!important;',
    'transition:border-color .18s,background .18s;',
    '}',
    '.hmqz-row.sel .hmqz-row-radio{border-color:#1A6B3A!important;background:#1A6B3A!important;}',
    '.hmqz-row-radio svg{display:none!important;color:#fff!important;}',
    '.hmqz-row.sel .hmqz-row-radio svg{display:block!important;}',

    /* Screen fade */
    '.hmqz-screen{transition:opacity .2s ease,transform .2s ease;}',
    '.hmqz-screen.out{opacity:0!important;transform:translateX(8px)!important;pointer-events:none!important;}',

    /* ── Result ── */
    '.hmqz-rec-label{font-size:10px!important;font-weight:800!important;letter-spacing:.18em!important;',
    'text-transform:uppercase!important;color:#1A6B3A!important;',
    'display:block!important;margin-bottom:12px!important;padding-top:4px!important;}',

    /* Primary card — div not <a> to avoid Salla hover injection */
    '.hmqz-primary{',
    'display:flex!important;gap:15px!important;align-items:center!important;',
    'border:1.5px solid #1A6B3A!important;border-radius:16px!important;',
    'background:#F0FAF4!important;',
    'padding:16px!important;margin-bottom:14px!important;',
    'cursor:pointer!important;',
    'transition:background .2s,box-shadow .2s;',
    '}',
    '.hmqz-primary:hover{background:#E6F7EE!important;',
    'box-shadow:0 4px 18px rgba(26,107,58,.12)!important;}',
    '.hmqz-primary-img{width:82px!important;height:82px!important;border-radius:12px!important;',
    'overflow:hidden!important;flex-shrink:0!important;background:#D1FAE5!important;}',
    '.hmqz-primary-img img{width:100%!important;height:100%!important;',
    'object-fit:cover!important;display:block!important;}',
    '.hmqz-primary-info{flex:1!important;min-width:0!important;}',
    '.hmqz-rec-pill{display:inline-flex!important;align-items:center!important;gap:4px!important;',
    'font-size:10px!important;font-weight:800!important;color:#fff!important;',
    'background:#1A6B3A!important;',
    'padding:3px 9px 3px 7px!important;border-radius:999px!important;',
    'margin-bottom:7px!important;letter-spacing:.04em!important;}',
    '.hmqz-primary-name{font-size:16px!important;font-weight:800!important;color:#0D0D0D!important;',
    'line-height:1.25!important;margin-bottom:2px!important;}',
    '.hmqz-primary-sub{font-size:12px!important;color:#6B7280!important;margin-bottom:8px!important;}',
    '.hmqz-primary-foot{display:flex!important;align-items:center!important;',
    'justify-content:space-between!important;gap:8px!important;}',
    '.hmqz-price{font-size:17px!important;font-weight:900!important;color:#0D0D0D!important;',
    'direction:ltr!important;display:inline-block!important;}',
    '.hmqz-price em{font-size:11px!important;font-weight:normal!important;font-style:normal!important;',
    'color:#9CA3AF!important;margin-right:2px!important;}',
    '.hmqz-cta{display:inline-flex!important;align-items:center!important;gap:5px!important;',
    'height:34px!important;padding:0 14px!important;',
    'background:#1A6B3A!important;color:#fff!important;',
    'border-radius:999px!important;font-size:12px!important;font-weight:bold!important;',
    'font-family:"Tajawal",system-ui,sans-serif!important;',
    'white-space:nowrap!important;',
    'transition:background .2s,transform .15s;',
    '}',
    '.hmqz-primary:hover .hmqz-cta{background:#155E32!important;transform:translateX(-2px)!important;}',

    /* Divider */
    '.hmqz-divider{display:block!important;height:1px!important;',
    'border:none!important;background:#F3F4F6!important;margin:0 0 14px!important;}',

    /* Alt rows — div not <a> to avoid Salla hover injection */
    '.hmqz-alt{',
    'display:flex!important;align-items:center!important;gap:12px!important;',
    'padding:12px 14px!important;',
    'border:1.5px solid #EAECEE!important;border-radius:14px!important;',
    'background:#FFFFFF!important;margin-bottom:10px!important;',
    'cursor:pointer!important;',
    'transition:border-color .18s,background .18s,transform .2s;',
    '}',
    '.hmqz-alt:last-of-type{margin-bottom:0!important;}',
    '.hmqz-alt:hover{border-color:#C4CAD1!important;background:#FAFAFA!important;',
    'transform:translateX(-2px)!important;}',
    '.hmqz-alt-img{width:54px!important;height:54px!important;border-radius:10px!important;',
    'overflow:hidden!important;flex-shrink:0!important;background:#F3F4F6!important;}',
    '.hmqz-alt-img img{width:100%!important;height:100%!important;',
    'object-fit:cover!important;display:block!important;}',
    '.hmqz-alt-text{flex:1!important;min-width:0!important;}',
    '.hmqz-alt-badge{font-size:10px!important;font-weight:bold!important;',
    'color:#1A6B3A!important;display:block!important;margin-bottom:2px!important;}',
    '.hmqz-alt-name{font-size:13.5px!important;font-weight:bold!important;',
    'color:#0D0D0D!important;line-height:1.25!important;}',
    '.hmqz-alt-sub{font-size:11px!important;color:#9CA3AF!important;margin-top:1px!important;}',
    '.hmqz-alt-price{font-size:14px!important;font-weight:800!important;',
    'color:#0D0D0D!important;white-space:nowrap!important;flex-shrink:0!important;}',
    '.hmqz-alt-price em{font-size:10px!important;font-weight:normal!important;',
    'font-style:normal!important;color:#9CA3AF!important;margin-right:1px!important;}',
    '.hmqz-alt-arr{width:28px!important;height:28px!important;border-radius:50%!important;',
    'background:#F3F4F6!important;',
    'display:flex!important;align-items:center!important;justify-content:center!important;',
    'color:#6B7280!important;flex-shrink:0!important;',
    'transition:background .18s,color .18s;',
    '}',
    '.hmqz-alt:hover .hmqz-alt-arr{background:#1A6B3A!important;color:#fff!important;}',

    /* Restart */
    '.hmqz-restart{display:block!important;width:100%!important;text-align:center!important;',
    'font-size:12px!important;color:#9CA3AF!important;',
    'background:none!important;border:none!important;',
    'cursor:pointer!important;',
    'font-family:"Tajawal",system-ui,sans-serif!important;',
    'padding:14px 0 0!important;transition:color .2s;}',
    '.hmqz-restart:hover{color:#6B7280!important;}',
    '.hmqz-restart u{text-underline-offset:3px!important;}',

    /* ── Motion ── */
    '@keyframes hmqzHdrIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}',
    '.hmqz-hdr{animation:hmqzHdrIn .35s cubic-bezier(.16,1,.3,1) both;}',

    '@keyframes hmqzRowIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
    '.hmqz-row{animation:hmqzRowIn .4s cubic-bezier(.16,1,.3,1) both;',
    'animation-delay:calc(var(--hmqz-i,0)*70ms);}',

    '@keyframes hmqzIconBounce{',
    '0%{transform:scale(1)}35%{transform:scale(.86)}65%{transform:scale(1.12)}100%{transform:scale(1)}}',
    '.hmqz-row.sel .hmqz-row-icon{animation:hmqzIconBounce .38s cubic-bezier(.34,1.56,.64,1);}',

    '@keyframes hmqzCheckIn{',
    'from{transform:scale(0) rotate(-30deg)}60%{transform:scale(1.2) rotate(5deg)}to{transform:scale(1) rotate(0)}}',
    '.hmqz-row.sel .hmqz-row-radio svg{animation:hmqzCheckIn .28s cubic-bezier(.34,1.56,.64,1) both;}',

    '@keyframes hmqzSelRing{0%{box-shadow:0 0 0 0 rgba(26,107,58,.25)}100%{box-shadow:0 0 0 6px rgba(26,107,58,0)}}',
    '.hmqz-row.sel{animation:hmqzRowIn .4s cubic-bezier(.16,1,.3,1) both,hmqzSelRing .5s ease-out;}',

    '@keyframes hmqzIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}',
    '.hmqz-rec-label{animation:hmqzIn .35s cubic-bezier(.16,1,.3,1) both;}',
    '.hmqz-primary{animation:hmqzIn .42s cubic-bezier(.16,1,.3,1) .05s both;}',
    '.hmqz-divider{animation:hmqzIn .3s ease .15s both;}',
    '.hmqz-alt:nth-of-type(1){animation:hmqzIn .38s cubic-bezier(.16,1,.3,1) .14s both;}',
    '.hmqz-alt:nth-of-type(2){animation:hmqzIn .38s cubic-bezier(.16,1,.3,1) .22s both;}',
    '.hmqz-restart{animation:hmqzIn .32s ease .3s both;}',

    '@media(prefers-reduced-motion:reduce){',
    '#hmqz-m *{animation:none!important;transition:none!important;}',
    '}'
  ].join('');

  /* ══ Open / Close ══ */
  function open() {
    requestAnimationFrame(function () {
      el.bd.classList.add('open');
      el.m.classList.add('open');
    });
  }

  function close() {
    sessionStorage.setItem(SK, '1');
    el.bd.classList.remove('open');
    el.m.classList.remove('open');
  }

  /* ══ Render ══ */
  function render() {
    step < QUESTIONS.length ? renderQ(step) : renderResult();
  }

  function hdr(eyebrow, title, sub) {
    return (
      '<div class="hmqz-hdr">' +
        '<div class="hmqz-hdr-inner">' +
          '<span class="hmqz-eyebrow">' + eyebrow + '</span>' +
          '<div class="hmqz-title">' + title + '</div>' +
          (sub ? '<div class="hmqz-hsub">' + sub + '</div>' : '') +
        '</div>' +
        '<button class="hmqz-x" type="button" aria-label="إغلاق">' + IC_X + '</button>' +
      '</div>' +
      '<div class="hmqz-hd"></div>'
    );
  }

  function renderQ(qi) {
    var q = QUESTIONS[qi];

    var rowsHtml = q.opts.map(function (o) {
      return (
        '<button class="hmqz-row" data-key="' + o.key + '" data-tags="' + o.tags.join(',') + '" type="button">' +
          '<div class="hmqz-row-icon">' + o.icon + '</div>' +
          '<div class="hmqz-row-text">' +
            '<span class="hmqz-row-label">' + o.label + '</span>' +
            '<span class="hmqz-row-note">' + o.note + '</span>' +
          '</div>' +
          '<div class="hmqz-row-radio">' + IC_CHECK + '</div>' +
        '</button>'
      );
    }).join('');

    el.m.innerHTML =
      hdr('hamtaro · ' + (qi + 1) + ' / ' + QUESTIONS.length, q.text, q.note) +
      '<div class="hmqz-body">' +
        '<div class="hmqz-screen">' + rowsHtml + '</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x').onclick = close;

    el.m.querySelectorAll('.hmqz-row').forEach(function (row, i) {
      row.style.setProperty('--hmqz-i', i);
      row.onclick = function () {
        el.m.querySelectorAll('.hmqz-row').forEach(function (r) { r.classList.remove('sel'); });
        row.classList.add('sel');
        tags = tags.concat(row.getAttribute('data-tags').split(','));
        var screen = el.m.querySelector('.hmqz-screen');
        if (screen) screen.classList.add('out');
        setTimeout(function () { step++; render(); }, 280);
      };
    });
  }

  function renderResult() {
    var list = ranked();
    var top  = list[0];
    var alt1 = list[1];
    var alt2 = list[2];

    el.m.innerHTML =
      hdr('اخترنا لك بعناية', 'البوكس الأنسب لقطتك', null) +
      '<div class="hmqz-body">' +
        '<div class="hmqz-screen">' +
          '<span class="hmqz-rec-label">الأنسب لك</span>' +

          /* div instead of <a> — prevents Salla hover-add injection */
          '<div class="hmqz-primary" role="link" tabindex="0" data-url="' + top.url + '">' +
            '<div class="hmqz-primary-img">' +
              '<img src="' + top.img + '" alt="' + top.name + '" loading="eager">' +
            '</div>' +
            '<div class="hmqz-primary-info">' +
              '<span class="hmqz-rec-pill">' + IC_CHECK + ' الأنسب لك</span>' +
              '<div class="hmqz-primary-name">' + top.name + '</div>' +
              '<div class="hmqz-primary-sub">' + top.sub + '</div>' +
              '<div class="hmqz-primary-foot">' +
                '<span class="hmqz-price">' + top.price + ' <em>' + top.cur + '</em></span>' +
                '<span class="hmqz-cta">اكتشف ' + IC_ARR + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="hmqz-divider"></div>' +
          altCard(alt1) +
          altCard(alt2) +

          '<button class="hmqz-restart" type="button"><u>إعادة الاختيار</u></button>' +
        '</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x').onclick = close;

    /* Navigate on click — no Salla event delegation */
    el.m.querySelector('.hmqz-primary').onclick = function () {
      window.location.href = top.url;
    };

    el.m.querySelectorAll('.hmqz-alt').forEach(function (card) {
      card.onclick = function () {
        window.location.href = card.getAttribute('data-url');
      };
    });

    el.m.querySelector('.hmqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = el.m.querySelector('.hmqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(render, 250);
    };
  }

  function altCard(p) {
    return (
      '<div class="hmqz-alt" role="link" tabindex="0" data-url="' + p.url + '">' +
        '<div class="hmqz-alt-img"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
        '<div class="hmqz-alt-text">' +
          '<span class="hmqz-alt-badge">' + p.badge + '</span>' +
          '<div class="hmqz-alt-name">' + p.name + '</div>' +
          '<div class="hmqz-alt-sub">' + p.sub + '</div>' +
        '</div>' +
        '<span class="hmqz-alt-price">' + p.price + ' <em>' + p.cur + '</em></span>' +
        '<span class="hmqz-alt-arr">' + IC_ARR + '</span>' +
      '</div>'
    );
  }

  /* ══ Init ══ */
  function init() {
    if (document.getElementById('hmqz-css')) return;

    var s = document.createElement('style');
    s.id = 'hmqz-css'; s.textContent = CSS;
    document.head.appendChild(s);

    el.bd = document.createElement('div');
    el.bd.id = 'hmqz-bd';
    el.bd.onclick = close;
    document.body.appendChild(el.bd);

    el.m = document.createElement('div');
    el.m.id = 'hmqz-m';
    el.m.setAttribute('dir', 'rtl');
    el.m.setAttribute('role', 'dialog');
    el.m.setAttribute('aria-modal', 'true');
    el.m.setAttribute('aria-label', 'ترشيح البوكس');
    document.body.appendChild(el.m);

    render();
    setTimeout(open, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(init); });
  }

})();
