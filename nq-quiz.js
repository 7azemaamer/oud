/* ─────────────────────────────────────────────────────────
   nq-quiz.js  v2.1.0 — hamtaro.sa
   Product concierge — auto-shows 5s, once per session
   Centered modal · staggered rows · spring micro-interactions
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
      desc : 'بوكس شامل يضم طعاماً ومكافآت ورملاً عالي الامتصاص — الاختيار المجرب من آلاف العملاء.',
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
      desc : '16 ظرف طعام رطب مخصص للقطط الصغيرة — غني بالطاقة والبروتين لنمو صحي سليم.',
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
      desc : 'تركيبة متخصصة تساعد على التحكم في الوزن ودعم صحة المسالك البولية بعد التعقيم.',
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
    '#hmqz-bd{position:fixed;inset:0;background:rgba(10,10,10,.46);',
    'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);',
    'z-index:9990;opacity:0;pointer-events:none;transition:opacity .3s ease;}',
    '#hmqz-bd.open{opacity:1;pointer-events:auto;}',

    /* Modal — ALWAYS CENTERED */
    '#hmqz-m{',
    'position:fixed;z-index:9991;',
    'top:50%;left:50%;',
    'transform:translate(-50%,-50%) scale(.93);opacity:0;',
    'width:min(500px,92vw);',
    'max-height:88dvh;overflow-y:auto;-webkit-overflow-scrolling:touch;',
    'background:#FFFFFF;border-radius:20px;',
    'box-shadow:0 32px 100px rgba(0,0,0,.18),0 2px 8px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.9);',
    'direction:rtl;',
    'font-family:"Tajawal",system-ui,sans-serif;',
    '-webkit-font-smoothing:antialiased;',
    'transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .28s ease;',
    '}',
    '#hmqz-m.open{transform:translate(-50%,-50%) scale(1);opacity:1;}',
    '#hmqz-m *{box-sizing:border-box;margin:0;padding:0;}',
    '#hmqz-m a{text-decoration:none;color:inherit;}',

    /* Header */
    '.hmqz-hdr{padding:24px 22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}',
    '.hmqz-hdr-inner{flex:1;min-width:0;}',
    '.hmqz-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9CA3AF;display:block;margin-bottom:5px;}',
    '.hmqz-title{font-size:20px;font-weight:900;color:#0D0D0D;letter-spacing:-.022em;line-height:1.2;}',
    '.hmqz-hsub{font-size:13px;color:#6B7280;margin-top:5px;line-height:1.5;}',
    '.hmqz-x{width:32px;height:32px;border-radius:50%;background:#F3F4F6;border:none;cursor:pointer;',
    'display:flex;align-items:center;justify-content:center;color:#4B5563;flex-shrink:0;',
    'transition:background .2s,transform .2s;margin-top:2px;}',
    '.hmqz-x:hover{background:#E5E7EB;transform:scale(1.08);}',

    /* Divider under header */
    '.hmqz-hd{border:none;border-top:1px solid #F3F4F6;margin:18px 0 0;}',

    /* Body */
    '.hmqz-body{padding:0 22px 26px;}',

    /* Option rows */
    '.hmqz-row{display:flex;align-items:center;gap:13px;padding:14px 15px;',
    'border:1.5px solid #EAECEE;border-radius:14px;cursor:pointer;',
    'transition:border-color .18s ease,background .18s ease;',
    'background:#fff;width:100%;font-family:inherit;text-align:right;',
    '-webkit-tap-highlight-color:transparent;user-select:none;margin-top:10px;}',
    '.hmqz-row:first-child{margin-top:0;}',
    '.hmqz-row:hover{border-color:#C4CAD1;background:#FAFAFA;}',
    '.hmqz-row.sel{border-color:#1A6B3A;background:#EDF7F1;}',

    /* Icon box */
    '.hmqz-row-icon{width:46px;height:46px;border-radius:12px;background:#F3F4F6;',
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#374151;',
    'transition:background .18s,color .18s;}',
    '.hmqz-row.sel .hmqz-row-icon{background:#D1FAE5;color:#1A6B3A;}',

    /* Row text */
    '.hmqz-row-text{flex:1;min-width:0;}',
    '.hmqz-row-label{font-size:15px;font-weight:700;color:#0D0D0D;display:block;line-height:1.3;}',
    '.hmqz-row-note{font-size:12px;color:#9CA3AF;display:block;margin-top:2px;}',

    /* Radio dot */
    '.hmqz-row-radio{width:22px;height:22px;border-radius:50%;border:2px solid #D1D5DB;flex-shrink:0;',
    'display:flex;align-items:center;justify-content:center;',
    'transition:border-color .18s,background .18s;}',
    '.hmqz-row.sel .hmqz-row-radio{border-color:#1A6B3A;background:#1A6B3A;}',
    '.hmqz-row-radio svg{display:none;color:#fff;}',
    '.hmqz-row.sel .hmqz-row-radio svg{display:block;}',

    /* Screen fade */
    '.hmqz-screen{transition:opacity .2s ease,transform .2s ease;}',
    '.hmqz-screen.out{opacity:0;transform:translateX(8px);pointer-events:none;}',

    /* ── Result ── */
    '.hmqz-rec-label{font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;',
    'color:#1A6B3A;display:block;margin-bottom:12px;padding-top:4px;}',

    /* Primary card */
    '.hmqz-primary{display:flex;gap:15px;align-items:center;',
    'border:1.5px solid #1A6B3A;border-radius:16px;background:#F0FAF4;',
    'padding:16px;margin-bottom:14px;transition:background .2s,box-shadow .2s;}',
    '.hmqz-primary:hover{background:#E6F7EE;box-shadow:0 4px 18px rgba(26,107,58,.12);}',
    '.hmqz-primary-img{width:82px;height:82px;border-radius:12px;overflow:hidden;flex-shrink:0;background:#D1FAE5;}',
    '.hmqz-primary-img img{width:100%;height:100%;object-fit:cover;display:block;}',
    '.hmqz-primary-info{flex:1;min-width:0;}',
    '.hmqz-rec-pill{display:inline-flex;align-items:center;gap:4px;',
    'font-size:10px;font-weight:800;color:#fff;background:#1A6B3A;',
    'padding:3px 9px 3px 7px;border-radius:999px;margin-bottom:7px;letter-spacing:.04em;}',
    '.hmqz-primary-name{font-size:16px;font-weight:800;color:#0D0D0D;line-height:1.25;margin-bottom:2px;}',
    '.hmqz-primary-sub{font-size:12px;color:#6B7280;margin-bottom:8px;}',
    '.hmqz-primary-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;}',
    '.hmqz-price{font-size:17px;font-weight:900;color:#0D0D0D;direction:ltr;display:inline-block;}',
    '.hmqz-price em{font-size:11px;font-weight:400;font-style:normal;color:#9CA3AF;margin-right:2px;}',
    '.hmqz-cta{display:inline-flex;align-items:center;gap:5px;',
    'height:34px;padding:0 14px;background:#1A6B3A;color:#fff;',
    'border-radius:999px;font-size:12px;font-weight:700;font-family:inherit;',
    'white-space:nowrap;transition:background .2s,transform .15s;}',
    '.hmqz-primary:hover .hmqz-cta{background:#155E32;transform:translateX(-2px);}',

    /* Divider */
    '.hmqz-divider{border:none;border-top:1px solid #F3F4F6;margin:0 0 14px;}',

    /* Alt rows */
    '.hmqz-alt{display:flex;align-items:center;gap:12px;padding:12px 14px;',
    'border:1.5px solid #EAECEE;border-radius:14px;background:#fff;margin-bottom:10px;',
    'transition:border-color .18s,background .18s,transform .2s;}',
    '.hmqz-alt:last-of-type{margin-bottom:0;}',
    '.hmqz-alt:hover{border-color:#C4CAD1;background:#FAFAFA;transform:translateX(-2px);}',
    '.hmqz-alt-img{width:54px;height:54px;border-radius:10px;overflow:hidden;flex-shrink:0;background:#F3F4F6;}',
    '.hmqz-alt-img img{width:100%;height:100%;object-fit:cover;display:block;}',
    '.hmqz-alt-text{flex:1;min-width:0;}',
    '.hmqz-alt-badge{font-size:10px;font-weight:700;color:#1A6B3A;display:block;margin-bottom:2px;}',
    '.hmqz-alt-name{font-size:13.5px;font-weight:700;color:#0D0D0D;line-height:1.25;}',
    '.hmqz-alt-sub{font-size:11px;color:#9CA3AF;margin-top:1px;}',
    '.hmqz-alt-price{font-size:14px;font-weight:800;color:#0D0D0D;white-space:nowrap;flex-shrink:0;}',
    '.hmqz-alt-price em{font-size:10px;font-weight:400;font-style:normal;color:#9CA3AF;margin-right:1px;}',
    '.hmqz-alt-arr{width:28px;height:28px;border-radius:50%;background:#F3F4F6;',
    'display:flex;align-items:center;justify-content:center;color:#6B7280;flex-shrink:0;',
    'transition:background .18s,color .18s;}',
    '.hmqz-alt:hover .hmqz-alt-arr{background:#1A6B3A;color:#fff;}',

    /* Restart */
    '.hmqz-restart{display:block;width:100%;text-align:center;',
    'font-size:12px;color:#9CA3AF;background:none;border:none;',
    'cursor:pointer;font-family:inherit;padding:14px 0 0;transition:color .2s;}',
    '.hmqz-restart:hover{color:#6B7280;}',
    '.hmqz-restart u{text-underline-offset:3px;}',

    /* ── Motion Layer ── */

    /* Modal backdrop pulse in */
    '@keyframes hmqzBdIn{from{opacity:0}to{opacity:1}}',

    /* Header slides down */
    '@keyframes hmqzHdrIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}',
    '.hmqz-hdr{animation:hmqzHdrIn .38s cubic-bezier(.16,1,.3,1) both;}',

    /* Staggered row entrance — each row sets --hmqz-i via JS */
    '@keyframes hmqzRowIn{',
    'from{opacity:0;transform:translateY(14px)}',
    'to{opacity:1;transform:translateY(0)}',
    '}',
    '.hmqz-row{',
    'animation:hmqzRowIn .42s cubic-bezier(.16,1,.3,1) both;',
    'animation-delay:calc(var(--hmqz-i,0) * 70ms);',
    '}',

    /* Tactile press — physical push feedback */
    '.hmqz-row:active{transform:scale(.982)!important;transition:transform .1s ease!important;}',

    /* Icon box spring bounce on select */
    '@keyframes hmqzIconBounce{',
    '0%{transform:scale(1)}',
    '35%{transform:scale(.84)}',
    '65%{transform:scale(1.14)}',
    '82%{transform:scale(.96)}',
    '100%{transform:scale(1)}',
    '}',
    '.hmqz-row.sel .hmqz-row-icon{animation:hmqzIconBounce .4s cubic-bezier(.34,1.56,.64,1);}',

    /* Check mark pops in */
    '@keyframes hmqzCheckIn{',
    'from{transform:scale(0) rotate(-30deg);opacity:0}',
    '60%{transform:scale(1.25) rotate(6deg);opacity:1}',
    'to{transform:scale(1) rotate(0deg);opacity:1}',
    '}',
    '.hmqz-row.sel .hmqz-row-radio svg{animation:hmqzCheckIn .3s cubic-bezier(.34,1.56,.64,1) both;}',

    /* Row border pulse on select */
    '@keyframes hmqzSelPulse{',
    '0%{box-shadow:0 0 0 0 rgba(26,107,58,.28)}',
    '100%{box-shadow:0 0 0 6px rgba(26,107,58,0)}',
    '}',
    '.hmqz-row.sel{animation:hmqzSelPulse .55s ease-out,hmqzRowIn .42s cubic-bezier(.16,1,.3,1) both;}',

    /* Result stagger entrance */
    '@keyframes hmqzResultIn{',
    'from{opacity:0;transform:translateY(18px)}',
    'to{opacity:1;transform:translateY(0)}',
    '}',
    '.hmqz-rec-label{animation:hmqzResultIn .36s cubic-bezier(.16,1,.3,1) both;}',
    '.hmqz-primary{animation:hmqzResultIn .44s cubic-bezier(.16,1,.3,1) .06s both;}',
    '.hmqz-divider{animation:hmqzResultIn .3s ease .18s both;}',
    '.hmqz-alt:nth-child(1){animation:hmqzResultIn .4s cubic-bezier(.16,1,.3,1) .16s both;}',
    '.hmqz-alt:nth-child(2){animation:hmqzResultIn .4s cubic-bezier(.16,1,.3,1) .24s both;}',
    '.hmqz-restart{animation:hmqzResultIn .35s ease .32s both;}',

    /* CTA shimmer sweep on result hover */
    '@keyframes hmqzShimmer{',
    'from{background-position:200% center}',
    'to{background-position:-200% center}',
    '}',
    '.hmqz-cta{',
    'background-image:linear-gradient(90deg,#1A6B3A 0%,#1A6B3A 40%,#226B3E 50%,#1A6B3A 60%,#1A6B3A 100%);',
    'background-size:200% auto;',
    '}',
    '.hmqz-primary:hover .hmqz-cta{',
    'animation:hmqzShimmer 1.4s linear infinite;',
    'background-size:200% auto;',
    '}',

    /* Alt row arrow slide on hover */
    '.hmqz-alt:hover .hmqz-alt-arr svg{transform:translateX(-3px);transition:transform .25s cubic-bezier(.16,1,.3,1);}',
    '.hmqz-alt-arr svg{transition:transform .2s ease;}',

    /* Reduce motion — respect OS preference */
    '@media(prefers-reduced-motion:reduce){',
    '.hmqz-row,.hmqz-hdr,.hmqz-primary,.hmqz-alt,.hmqz-rec-label,.hmqz-divider,.hmqz-restart{animation:none!important;}',
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
      '<hr class="hmqz-hd">'
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
        var t = row.getAttribute('data-tags').split(',');
        tags = tags.concat(t);
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

          '<a class="hmqz-primary" href="' + top.url + '">' +
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
          '</a>' +

          '<hr class="hmqz-divider">' +
          altRow(alt1) +
          altRow(alt2) +

          '<button class="hmqz-restart" type="button"><u>إعادة الاختيار</u></button>' +
        '</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x').onclick = close;
    el.m.querySelector('.hmqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = el.m.querySelector('.hmqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(render, 250);
    };
  }

  function altRow(p) {
    return (
      '<a class="hmqz-alt" href="' + p.url + '">' +
        '<div class="hmqz-alt-img"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
        '<div class="hmqz-alt-text">' +
          '<span class="hmqz-alt-badge">' + p.badge + '</span>' +
          '<div class="hmqz-alt-name">' + p.name + '</div>' +
          '<div class="hmqz-alt-sub">' + p.sub + '</div>' +
        '</div>' +
        '<span class="hmqz-alt-price">' + p.price + ' <em>' + p.cur + '</em></span>' +
        '<span class="hmqz-alt-arr">' + IC_ARR + '</span>' +
      '</a>'
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
    el.m.setAttribute('aria-label', 'ترشيح المنتج');
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
