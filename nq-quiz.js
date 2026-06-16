/* ─────────────────────────────────────────────────────────
   nq-quiz.js  v2.3.0 — hamtaro.sa
   Product concierge — auto-shows 5s, once per session
   · Critical positioning via JS setProperty (beats any store CSS)
   · div[role=button] rows (bypasses store button resets)
   · Compact result — no scroll needed
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SK = 'hmqz_seen';
  if (sessionStorage.getItem(SK)) return;

  var CDN   = 'https://cdn.salla.sa/zvoeKA/';
  var STORE = 'https://hamtaro.sa';
  var G     = '#1A6B3A';   /* brand green */
  var GL    = '#EDF7F1';   /* green tint  */
  var GD    = '#155E32';   /* green dark  */

  /* ══ Products ══ */
  var PRODUCTS = [
    {
      key  : 'mostRequested',
      name : 'بوكس الأكثر طلباً',
      sub  : 'أكثر من 30 قطعة',
      badge: 'الأكثر طلباً',
      price: '195', cur: 'ر.س',
      url  : STORE + '/بوكس-الأكثر-طلباً/p1577619451',
      img  : CDN + 'e26fa770-6410-4605-9d03-51bc0d37a414-400x500-k1W3eSM6MMYUwUMgHfkkHUd0PRKeohemmnHNv6CJ.png',
      s    : { adult:3, variety:3, value:2, kitten:0, sterilised:0, health:1 }
    },
    {
      key  : 'kittenEcon',
      name : 'بوكس الكيتن الاقتصادي',
      sub  : '16 قطعة طعام رطب',
      badge: 'للكيتن',
      price: '95', cur: 'ر.س',
      url  : STORE + '/بوكس-الكيتن-الاقتصادي/p1450244745',
      img  : CDN + '450d1e57-c845-4929-96ac-561960452fe4-400x500-5fMdzTFSUV0PQrLgGSKqyuDdLdDz1D7LJLo83RkG.jpg',
      s    : { kitten:3, value:3, variety:2, adult:0, sterilised:0, health:1 }
    },
    {
      key  : 'sterilised',
      name : 'البوكس التوفيري للمعقمة',
      sub  : '30 قطعة جاف ورطب',
      badge: 'للمعقمة',
      price: '222', cur: 'ر.س',
      url  : STORE + '/البوكس-التوفيري-للقطط-المعقمة/p1546392188',
      img  : CDN + 'f66a5472-1c91-4426-bf28-80b23d09d7fd-400x500-J5GqSz35qBjMXJucacQLz73phNleEZFAOD7mheYN.jpg',
      s    : { sterilised:3, health:3, value:1, kitten:0, adult:1, variety:1 }
    }
  ];

  /* ══ Icons ══ */
  var IC_PAW =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<ellipse cx="12" cy="15.5" rx="4.5" ry="3.5"/>' +
    '<circle cx="8.5" cy="9" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="15.5" cy="9" r="1.5"/>' +
    '<circle cx="6.5" cy="12.5" r="1.1"/><circle cx="17.5" cy="12.5" r="1.1"/>' +
    '</svg>';
  var IC_CAT =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
    '<path d="M5 8.5v5C5 17.6 8.1 20 12 20s7-2.4 7-6.5v-5L16.2 5 15 8.2C14.1 8 13.1 7.8 12 7.8c-1.1 0-2.1.2-3 .4L7.8 5z"/>' +
    '<circle cx="9.5" cy="13.5" r=".7" fill="currentColor" stroke="none"/>' +
    '<circle cx="14.5" cy="13.5" r=".7" fill="currentColor" stroke="none"/>' +
    '<path d="M10.5 16q1.5 1 3 0"/></svg>';
  var IC_SHIELD =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 3L4 7v6c0 4.4 3.4 7.7 8 9 4.6-1.3 8-4.6 8-9V7z"/>' +
    '<path d="M9 12h6M12 9v6"/></svg>';
  var IC_COIN =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9.5 9.5h3.5a2 2 0 010 4H9.5M9.5 13.5H14"/></svg>';
  var IC_GRID =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>' +
    '<rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
  var IC_HEART =
    '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>';
  var IC_X =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var IC_CHECK =
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="20 6 9 17 4 12"/></svg>';
  var IC_ARR =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
    '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  /* ══ Questions ══ */
  var QUESTIONS = [
    {
      id: 'type', text: 'قطتك...', note: 'اختر ما يناسب قطتك لنرشح لك الأنسب',
      opts: [
        { key:'kitten',     label:'كيتن',  note:'من شهرين فأكثر', icon:IC_PAW,    tags:['kitten']     },
        { key:'adult',      label:'بالغة', note:'فوق السنة',        icon:IC_CAT,    tags:['adult']      },
        { key:'sterilised', label:'معقمة', note:'بعد التعقيم',      icon:IC_SHIELD, tags:['sterilised'] }
      ]
    },
    {
      id: 'priority', text: 'أهم شيء بالنسبة لك؟', note: 'يساعدنا على اختيار البوكس المثالي',
      opts: [
        { key:'value',   label:'قيمة وسعر',   note:'أفضل صفقة بسعر مناسب',  icon:IC_COIN,  tags:['value']   },
        { key:'variety', label:'تنوع ونكهات', note:'خيارات أكثر لقطتك',      icon:IC_GRID,  tags:['variety'] },
        { key:'health',  label:'صحة وتخصص',  note:'تغذية مدروسة ومتوازنة',  icon:IC_HEART, tags:['health']  }
      ]
    }
  ];

  var step = 0, tags = [], el = {};

  function ranked() {
    return PRODUCTS.slice().sort(function (a, b) {
      var sa = tags.reduce(function (n, t) { return n + (a.s[t] || 0); }, 0);
      var sb = tags.reduce(function (n, t) { return n + (b.s[t] || 0); }, 0);
      return sb - sa;
    });
  }

  /* ══════════════════════════════════════════
     CSS  — only for things that CAN'T be set
     inline (pseudo-selectors, animations, @keyframes)
     Everything position/layout-critical is set
     via JS setProperty() below.
  ══════════════════════════════════════════ */
  var CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap");',

    /* Backdrop */
    '#hmqz-bd{position:fixed;inset:0;',
    'background:rgba(10,10,10,.46);',
    'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);',
    'z-index:9990;opacity:0;pointer-events:none;',
    'transition:opacity .3s ease;}',
    '#hmqz-bd.open{opacity:1;pointer-events:auto;}',

    /* Modal — positioning/transform set via JS; only cosmetics here */
    '#hmqz-m{',
    'background:#FFFFFF;border-radius:20px;direction:rtl;',
    'font-family:"Tajawal",system-ui,sans-serif;',
    '-webkit-font-smoothing:antialiased;',
    'box-shadow:0 28px 90px rgba(0,0,0,.18),0 2px 8px rgba(0,0,0,.05),inset 0 1px 0 rgba(255,255,255,.9);',
    '}',
    /* Scrollbar — hide in webkit */
    '#hmqz-m::-webkit-scrollbar{display:none;}',

    /* Hover states (need :hover pseudo — can't do inline) */
    '#hmqz-m .hmqz-row:hover{border-color:#C4CAD1!important;background:#FAFAFA!important;}',
    '#hmqz-m .hmqz-row:active{transform:scale(.983)!important;}',
    '#hmqz-m .hmqz-row.sel:hover{border-color:' + G + '!important;background:' + GL + '!important;}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-icon{background:#D1FAE5!important;color:' + G + '!important;}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-radio{border-color:' + G + '!important;background:' + G + '!important;}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-radio svg{display:block!important;}',
    '#hmqz-m .hmqz-primary:hover{background:#E6F7EE!important;',
    'box-shadow:0 4px 18px rgba(26,107,58,.12)!important;}',
    '#hmqz-m .hmqz-primary:hover .hmqz-cta{background:' + GD + '!important;}',
    '#hmqz-m .hmqz-alt:hover{border-color:#C4CAD1!important;background:#FAFAFA!important;',
    'transform:translateX(-2px)!important;}',
    '#hmqz-m .hmqz-alt:hover .hmqz-alt-arr{background:' + G + '!important;color:#fff!important;}',
    '#hmqz-m .hmqz-x:hover{background:#E5E7EB!important;}',
    '#hmqz-m .hmqz-restart:hover{color:#6B7280!important;}',

    /* Animations */
    '@keyframes hmqzHdrIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes hmqzRowIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes hmqzIconBounce{0%{transform:scale(1)}35%{transform:scale(.86)}65%{transform:scale(1.12)}100%{transform:scale(1)}}',
    '@keyframes hmqzCheckIn{from{transform:scale(0) rotate(-30deg)}60%{transform:scale(1.2) rotate(5deg)}to{transform:scale(1) rotate(0)}}',
    '@keyframes hmqzSelRing{0%{box-shadow:0 0 0 0 rgba(26,107,58,.24)}100%{box-shadow:0 0 0 6px rgba(26,107,58,0)}}',
    '@keyframes hmqzIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}',

    '#hmqz-m .hmqz-hdr{animation:hmqzHdrIn .32s cubic-bezier(.16,1,.3,1) both;}',
    '#hmqz-m .hmqz-row{animation:hmqzRowIn .38s cubic-bezier(.16,1,.3,1) both;',
    'animation-delay:calc(var(--hmqz-i,0)*65ms);}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-icon{animation:hmqzIconBounce .36s cubic-bezier(.34,1.56,.64,1);}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-radio svg{animation:hmqzCheckIn .26s cubic-bezier(.34,1.56,.64,1) both;}',
    '#hmqz-m .hmqz-row.sel{animation:hmqzRowIn .38s cubic-bezier(.16,1,.3,1) both,hmqzSelRing .48s ease-out;}',
    '#hmqz-m .hmqz-rec-label{animation:hmqzIn .32s cubic-bezier(.16,1,.3,1) both;}',
    '#hmqz-m .hmqz-primary{animation:hmqzIn .40s cubic-bezier(.16,1,.3,1) .04s both;}',
    '#hmqz-m .hmqz-divider{animation:hmqzIn .28s ease .14s both;}',
    '#hmqz-m .hmqz-alt:nth-of-type(1){animation:hmqzIn .36s cubic-bezier(.16,1,.3,1) .12s both;}',
    '#hmqz-m .hmqz-alt:nth-of-type(2){animation:hmqzIn .36s cubic-bezier(.16,1,.3,1) .20s both;}',
    '#hmqz-m .hmqz-restart{animation:hmqzIn .30s ease .28s both;}',

    '@media(prefers-reduced-motion:reduce){#hmqz-m *{animation:none!important;transition:none!important;}}'
  ].join('');

  /* ══ JS helper: set property with !important inline ══ */
  function sp(node, prop, val) {
    node.style.setProperty(prop, val, 'important');
  }

  function applyBaseStyles(node, styles) {
    for (var k in styles) { sp(node, k, styles[k]); }
  }

  /* ══ Modal positioning — fully inline (beats any store CSS) ══ */
  function setModalClosed() {
    applyBaseStyles(el.m, {
      'position'         : 'fixed',
      'z-index'          : '9999',
      'top'              : '50%',
      'left'             : '50%',
      'width'            : 'min(480px, 92vw)',
      'max-height'       : '90dvh',
      'overflow-y'       : 'auto',
      'overflow-x'       : 'hidden',
      '-webkit-overflow-scrolling': 'touch',
      'scrollbar-width'  : 'none',
      'ms-overflow-style': 'none',
      'transform'        : 'translate(-50%,-50%) scale(.93)',
      'opacity'          : '0',
      'pointer-events'   : 'none',
      'transition'       : 'transform .42s cubic-bezier(.22,1,.36,1), opacity .28s ease'
    });
  }

  function setModalOpen() {
    sp(el.m, 'transform', 'translate(-50%,-50%) scale(1)');
    sp(el.m, 'opacity', '1');
    sp(el.m, 'pointer-events', 'auto');
  }

  /* ══ Open / Close ══ */
  function open() {
    requestAnimationFrame(function () {
      el.bd.classList.add('open');
      setModalOpen();
    });
  }

  function close() {
    sessionStorage.setItem(SK, '1');
    el.bd.classList.remove('open');
    setModalClosed();
  }

  /* ══ Render ══ */
  function render() {
    step < QUESTIONS.length ? renderQ(step) : renderResult();
  }

  function hdr(eyebrow, title, sub) {
    return (
      '<div class="hmqz-hdr" style="padding:20px 20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">' +
        '<div style="flex:1;min-width:0;">' +
          '<span style="font-size:10px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;color:#9CA3AF;display:block;margin-bottom:4px;font-family:Tajawal,system-ui,sans-serif;">' + eyebrow + '</span>' +
          '<div style="font-size:19px;font-weight:900;color:#0D0D0D;letter-spacing:-.02em;line-height:1.2;font-family:Tajawal,system-ui,sans-serif;">' + title + '</div>' +
          (sub ? '<div style="font-size:12px;color:#6B7280;margin-top:4px;line-height:1.5;font-family:Tajawal,system-ui,sans-serif;">' + sub + '</div>' : '') +
        '</div>' +
        '<button class="hmqz-x" type="button" aria-label="إغلاق" style="width:30px;height:30px;border-radius:50%;background:#F3F4F6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#4B5563;flex-shrink:0;margin-top:1px;transition:background .2s;">' + IC_X + '</button>' +
      '</div>' +
      '<div style="height:1px;background:#F3F4F6;margin:14px 0 0;"></div>'
    );
  }

  function renderQ(qi) {
    var q = QUESTIONS[qi];

    /* Rows as <div role=button> — avoids ALL store button resets */
    var rowsHtml = q.opts.map(function (o, i) {
      return (
        '<div class="hmqz-row" role="button" tabindex="0"' +
          ' data-key="' + o.key + '" data-tags="' + o.tags.join(',') + '"' +
          ' style="' +
            'display:flex;align-items:center;gap:12px;' +
            'padding:13px 14px;' +
            'border:1.5px solid #EAECEE;border-radius:13px;' +
            'cursor:pointer;background:#FFFFFF;' +
            'margin-top:' + (i === 0 ? '0' : '9px') + ';' +
            'box-sizing:border-box;' +
            'transition:border-color .16s ease,background .16s ease,transform .1s ease;' +
            '-webkit-tap-highlight-color:transparent;user-select:none;' +
          '">' +
          '<div class="hmqz-row-icon" style="' +
            'width:44px;height:44px;border-radius:11px;' +
            'background:#F3F4F6;' +
            'display:flex;align-items:center;justify-content:center;' +
            'flex-shrink:0;color:#374151;' +
            'transition:background .16s,color .16s;' +
            'box-sizing:border-box;' +
          '">' + o.icon + '</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<span style="font-size:15px;font-weight:bold;color:#0D0D0D;display:block;line-height:1.3;font-family:Tajawal,system-ui,sans-serif;">' + o.label + '</span>' +
            '<span style="font-size:11.5px;color:#9CA3AF;display:block;margin-top:2px;font-family:Tajawal,system-ui,sans-serif;">' + o.note + '</span>' +
          '</div>' +
          '<div class="hmqz-row-radio" style="' +
            'width:21px;height:21px;border-radius:50%;' +
            'border:2px solid #D1D5DB;flex-shrink:0;' +
            'display:flex;align-items:center;justify-content:center;' +
            'background:transparent;box-sizing:border-box;' +
            'transition:border-color .16s,background .16s;' +
          '">' +
            '<span style="display:none;color:#fff;">' + IC_CHECK + '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    el.m.innerHTML =
      hdr('hamtaro · ' + (qi + 1) + ' / ' + QUESTIONS.length, q.text, q.note) +
      '<div style="padding:14px 18px 22px;">' +
        '<div class="hmqz-screen">' + rowsHtml + '</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x').onclick = close;

    el.m.querySelectorAll('.hmqz-row').forEach(function (row, i) {
      row.style.setProperty('--hmqz-i', i);
      row.onclick = function () {
        /* deselect others */
        el.m.querySelectorAll('.hmqz-row').forEach(function (r) {
          r.classList.remove('sel');
          r.style.borderColor = '#EAECEE';
          r.style.background  = '#FFFFFF';
          var ri = r.querySelector('.hmqz-row-icon');
          if (ri) { ri.style.background = '#F3F4F6'; ri.style.color = '#374151'; }
          var rr = r.querySelector('.hmqz-row-radio');
          if (rr) {
            rr.style.borderColor = '#D1D5DB';
            rr.style.background  = 'transparent';
            var cs = rr.querySelector('span');
            if (cs) cs.style.display = 'none';
          }
        });
        /* select this */
        row.classList.add('sel');
        row.style.borderColor = G;
        row.style.background  = GL;
        var icon  = row.querySelector('.hmqz-row-icon');
        var radio = row.querySelector('.hmqz-row-radio');
        var check = radio && radio.querySelector('span');
        if (icon)  { icon.style.background = '#D1FAE5'; icon.style.color = G; }
        if (radio) { radio.style.borderColor = G; radio.style.background = G; }
        if (check) { check.style.display = 'flex'; }

        tags = tags.concat(row.getAttribute('data-tags').split(','));
        var screen = el.m.querySelector('.hmqz-screen');
        if (screen) { screen.style.opacity = '0'; screen.style.transform = 'translateX(8px)'; }
        setTimeout(function () { step++; render(); }, 260);
      };
    });
  }

  function renderResult() {
    var list = ranked(), top = list[0], alt1 = list[1], alt2 = list[2];

    el.m.innerHTML =
      hdr('اخترنا لك بعناية', 'البوكس الأنسب لقطتك', null) +
      '<div style="padding:14px 18px 20px;">' +
        '<div class="hmqz-screen">' +

          /* Rec label */
          '<span class="hmqz-rec-label" style="font-size:10px;font-weight:bold;letter-spacing:.18em;text-transform:uppercase;color:' + G + ';display:block;margin-bottom:10px;font-family:Tajawal,system-ui,sans-serif;">الأنسب لك</span>' +

          /* Primary card */
          '<div class="hmqz-primary" style="' +
            'display:flex;gap:13px;align-items:center;' +
            'border:1.5px solid ' + G + ';border-radius:15px;' +
            'background:' + GL + ';padding:14px;margin-bottom:12px;' +
            'cursor:pointer;box-sizing:border-box;' +
            'transition:background .2s,box-shadow .2s;' +
          '" data-url="' + top.url + '">' +
            '<div style="width:76px;height:76px;border-radius:11px;overflow:hidden;flex-shrink:0;background:#D1FAE5;">' +
              '<img src="' + top.img + '" alt="' + top.name + '" loading="eager" style="width:100%;height:100%;object-fit:cover;display:block;">' +
            '</div>' +
            '<div style="flex:1;min-width:0;">' +
              '<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:bold;color:#fff;background:' + G + ';padding:3px 8px 3px 6px;border-radius:999px;margin-bottom:6px;letter-spacing:.04em;font-family:Tajawal,system-ui,sans-serif;">' + IC_CHECK + ' الأنسب لك</span>' +
              '<div style="font-size:15px;font-weight:900;color:#0D0D0D;line-height:1.25;margin-bottom:2px;font-family:Tajawal,system-ui,sans-serif;">' + top.name + '</div>' +
              '<div style="font-size:11.5px;color:#6B7280;margin-bottom:8px;font-family:Tajawal,system-ui,sans-serif;">' + top.sub + '</div>' +
              '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
                '<span style="font-size:16px;font-weight:900;color:#0D0D0D;direction:ltr;display:inline-block;font-family:Tajawal,system-ui,sans-serif;">' + top.price + ' <span style="font-size:11px;font-weight:normal;color:#9CA3AF;">' + top.cur + '</span></span>' +
                '<span class="hmqz-cta" style="display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 13px;background:' + G + ';color:#fff;border-radius:999px;font-size:12px;font-weight:bold;font-family:Tajawal,system-ui,sans-serif;white-space:nowrap;transition:background .2s;">اكتشف ' + IC_ARR + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Divider */
          '<div class="hmqz-divider" style="height:1px;background:#F3F4F6;margin:0 0 12px;"></div>' +

          altCard(alt1) +
          altCard(alt2) +

          '<button class="hmqz-restart" type="button" style="display:block;width:100%;text-align:center;font-size:12px;color:#9CA3AF;background:none;border:none;cursor:pointer;font-family:Tajawal,system-ui,sans-serif;padding:12px 0 0;transition:color .2s;"><u style="text-underline-offset:3px;">إعادة الاختيار</u></button>' +

        '</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x').onclick = close;
    el.m.querySelector('.hmqz-primary').onclick = function () {
      window.location.href = top.url;
    };
    el.m.querySelectorAll('.hmqz-alt').forEach(function (c) {
      c.onclick = function () { window.location.href = c.getAttribute('data-url'); };
    });
    el.m.querySelector('.hmqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = el.m.querySelector('.hmqz-screen');
      if (screen) { screen.style.opacity = '0'; screen.style.transform = 'translateX(8px)'; }
      setTimeout(render, 240);
    };
  }

  function altCard(p) {
    return (
      '<div class="hmqz-alt" style="' +
        'display:flex;align-items:center;gap:11px;' +
        'padding:11px 13px;' +
        'border:1.5px solid #EAECEE;border-radius:13px;' +
        'background:#FFFFFF;margin-bottom:9px;' +
        'cursor:pointer;box-sizing:border-box;' +
        'transition:border-color .16s,background .16s,transform .18s;' +
      '" data-url="' + p.url + '">' +
        '<div style="width:52px;height:52px;border-radius:10px;overflow:hidden;flex-shrink:0;background:#F3F4F6;">' +
          '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">' +
        '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<span style="font-size:10px;font-weight:bold;color:' + G + ';display:block;margin-bottom:2px;font-family:Tajawal,system-ui,sans-serif;">' + p.badge + '</span>' +
          '<div style="font-size:13.5px;font-weight:bold;color:#0D0D0D;line-height:1.25;font-family:Tajawal,system-ui,sans-serif;">' + p.name + '</div>' +
          '<div style="font-size:11px;color:#9CA3AF;margin-top:1px;font-family:Tajawal,system-ui,sans-serif;">' + p.sub + '</div>' +
        '</div>' +
        '<span style="font-size:14px;font-weight:800;color:#0D0D0D;white-space:nowrap;flex-shrink:0;font-family:Tajawal,system-ui,sans-serif;">' + p.price + ' <span style="font-size:10px;font-weight:normal;color:#9CA3AF;">' + p.cur + '</span></span>' +
        '<div class="hmqz-alt-arr" style="width:27px;height:27px;border-radius:50%;background:#F3F4F6;display:flex;align-items:center;justify-content:center;color:#6B7280;flex-shrink:0;transition:background .16s,color .16s;">' + IC_ARR + '</div>' +
      '</div>'
    );
  }

  /* ══ Init ══ */
  function init() {
    if (document.getElementById('hmqz-css')) return;

    /* Inject CSS (only pseudo-selectors + animations) */
    var s = document.createElement('style');
    s.id = 'hmqz-css'; s.textContent = CSS;
    document.head.appendChild(s);

    /* Backdrop */
    el.bd = document.createElement('div');
    el.bd.id = 'hmqz-bd';
    el.bd.onclick = close;
    document.body.appendChild(el.bd);

    /* Modal — critical layout set inline via setProperty */
    el.m = document.createElement('div');
    el.m.id = 'hmqz-m';
    el.m.setAttribute('dir', 'rtl');
    el.m.setAttribute('role', 'dialog');
    el.m.setAttribute('aria-modal', 'true');
    el.m.setAttribute('aria-label', 'ترشيح البوكس');
    document.body.appendChild(el.m);
    setModalClosed();   /* apply inline positioning styles */

    render();
    setTimeout(open, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(init); });
  }

})();
