/* ─────────────────────────────────────────────────────────
   nq-quiz.js — نقوة النخيل — Product Recommendation Quiz
   Auto-shows after 5s (once per session). No trigger button.
   Self-contained IIFE — drop a <script src="..."> anywhere.
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Session guard: show once per session ── */
  var SESSION_KEY = 'nqz_seen';
  if (sessionStorage.getItem(SESSION_KEY)) return;

  /* ══════════════════════════════════════════════
     CONFIG
  ══════════════════════════════════════════════ */
  var STORE    = 'https://naquatalnakhil.com';
  var CURRENCY = 'ريال';
  var DELAY_MS = 5000;

  var PRODUCTS = [
    {
      key:   'sukari',
      badge: 'الأكثر طلباً',
      name:  'سكري مفتل',
      sub:   'درجة أولى — حلو وطري',
      desc:  'الخيار الأكثر طلباً في متجرنا. تمر سكري صافي بملمس ناعم وحلاوة طبيعية — مثالي للضيافة والتذوق اليومي.',
      price: 90,
      url:   STORE + '/category/OlBOmK',
      s: { gift: 1, hosting: 3, personal: 3, cheap: 3, mid: 2, premium: 0 }
    },
    {
      key:   'tamriya',
      badge: 'هدية راقية',
      name:  'تمرية بحشوات',
      sub:   'محشوة مكسرات وفواكه',
      desc:  'تمور مختارة محشوة بالمكسرات والفواكه المجففة في علب هدايا أنيقة — تليق بكل مناسبة.',
      price: 150,
      url:   STORE,
      s: { gift: 3, hosting: 2, personal: 1, cheap: 1, mid: 3, premium: 1 }
    },
    {
      key:   'taj',
      badge: 'الأفخر والأرقى',
      name:  'تاج الملوك',
      sub:   'تشكيلة ملكية مختارة',
      desc:  'أرقى تشكيلة تمور سعودية مختارة بعناية في تغليف ملكي فاخر — لأصحاب الذوق الرفيع.',
      price: 250,
      url:   STORE,
      s: { gift: 2, hosting: 1, personal: 0, cheap: 0, mid: 1, premium: 3 }
    }
  ];

  var QUESTIONS = [
    {
      step: 1,
      label: 'الغرض',
      text:  'ما الغرض من طلبك؟',
      opts: [
        { label: 'هدية لشخص عزيز',  note: 'مناسبات، تقديم، شكر', tags: ['gift']     },
        { label: 'ضيافة الزوار',     note: 'ضيافة منزلية أو عمل',  tags: ['hosting']  },
        { label: 'تذوق شخصي',        note: 'لنفسي أو للعائلة',     tags: ['personal'] }
      ]
    },
    {
      step: 2,
      label: 'الميزانية',
      text:  'ما ميزانيتك التقريبية؟',
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
     SVG ICONS
  ══════════════════════════════════════════════ */
  var ICON_CLOSE =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var ICON_ARROW =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';

  var ICON_CHECK =
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  var ICON_STAR =
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

  /* ══════════════════════════════════════════════
     CSS
  ══════════════════════════════════════════════ */
  var CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap");',

    '#nqz-bd{',
    '  position:fixed;inset:0;',
    '  background:rgba(15,12,9,.52);',
    '  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
    '  z-index:9990;',
    '  opacity:0;pointer-events:none;',
    '  transition:opacity .4s ease;',
    '}',
    '#nqz-bd.open{opacity:1;pointer-events:auto;}',

    '#nqz-sheet{',
    '  position:fixed;',
    '  z-index:9991;',
    '  background:#faf9f7;',
    '  direction:rtl;',
    '  font-family:"Tajawal",system-ui,sans-serif;',
    '  -webkit-font-smoothing:antialiased;',
    '  bottom:0;left:0;right:0;',
    '  border-radius:28px 28px 0 0;',
    '  max-height:93dvh;',
    '  overflow-y:auto;',
    '  -webkit-overflow-scrolling:touch;',
    '  transform:translateY(100%);',
    '  transition:transform .46s cubic-bezier(.32,0,.15,1);',
    '  box-shadow:0 -32px 80px rgba(15,12,9,.2);',
    '}',
    '#nqz-sheet.open{transform:translateY(0);}',
    '#nqz-sheet *{box-sizing:border-box;margin:0;padding:0;}',

    '#nqz-handle{',
    '  width:38px;height:4px;',
    '  background:#e4ddd5;border-radius:999px;',
    '  margin:14px auto 0;',
    '}',

    '.nqz-in{padding:22px 22px 44px;}',

    '.nqz-hd{',
    '  display:flex;align-items:center;justify-content:space-between;',
    '  margin-bottom:20px;',
    '}',
    '.nqz-brand{',
    '  font-size:10px;font-weight:700;',
    '  color:#9c8e82;letter-spacing:.16em;text-transform:uppercase;',
    '}',
    '.nqz-x{',
    '  width:32px;height:32px;border-radius:50%;',
    '  background:#f3f0eb;border:none;cursor:pointer;',
    '  display:flex;align-items:center;justify-content:center;',
    '  color:#5a5048;flex-shrink:0;',
    '  transition:background .2s,color .2s;',
    '}',
    '.nqz-x:hover{background:#e4ddd5;color:#1a1612;}',

    '.nqz-track{display:flex;gap:5px;margin-bottom:26px;}',
    '.nqz-seg{flex:1;height:2px;background:#e4ddd5;border-radius:999px;overflow:hidden;}',
    '.nqz-seg-fill{height:100%;width:0%;background:#1a1612;border-radius:999px;transition:width .5s cubic-bezier(.22,1,.36,1);}',

    '.nqz-qlabel{',
    '  display:block;font-size:10px;font-weight:700;',
    '  letter-spacing:.16em;text-transform:uppercase;',
    '  color:#9c8e82;margin-bottom:5px;',
    '}',
    '.nqz-q{',
    '  font-size:clamp(20px,5.5vw,26px);',
    '  font-weight:800;color:#1a1612;',
    '  line-height:1.2;letter-spacing:-.022em;',
    '  margin-bottom:20px;',
    '}',

    '.nqz-opts{display:flex;flex-direction:column;gap:9px;}',
    '.nqz-opt{',
    '  display:flex;align-items:center;gap:14px;',
    '  padding:15px 18px;',
    '  background:#fff;',
    '  border:1.5px solid #e4ddd5;',
    '  border-radius:16px;',
    '  cursor:pointer;font-family:inherit;',
    '  text-align:right;width:100%;',
    '  transition:border-color .2s,background .2s,transform .28s cubic-bezier(.34,1.56,.64,1);',
    '  -webkit-tap-highlight-color:transparent;',
    '}',
    '.nqz-opt:active{transform:scale(.99);}',
    '.nqz-opt.sel{border-color:#1a1612;background:#1a1612;transform:translateX(-2px);}',
    '.nqz-opt-dot{',
    '  width:22px;height:22px;border-radius:50%;',
    '  border:1.5px solid #e4ddd5;',
    '  display:flex;align-items:center;justify-content:center;',
    '  flex-shrink:0;color:transparent;',
    '  transition:all .22s;',
    '}',
    '.nqz-opt.sel .nqz-opt-dot{background:#faf9f7;border-color:#faf9f7;color:#1a1612;}',
    '.nqz-opt-text{flex:1;min-width:0;}',
    '.nqz-opt-label{display:block;font-size:15px;font-weight:700;color:#1a1612;margin-bottom:2px;}',
    '.nqz-opt.sel .nqz-opt-label{color:#faf9f7;}',
    '.nqz-opt-note{display:block;font-size:12px;font-weight:400;color:#9c8e82;}',
    '.nqz-opt.sel .nqz-opt-note{color:rgba(250,249,247,.5);}',

    '.nqz-screen{transition:opacity .22s ease,transform .22s ease;}',
    '.nqz-screen.out{opacity:0;transform:translateX(10px);pointer-events:none;}',

    /* Result */
    '.nqz-r-label{display:block;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6b3a2a;margin-bottom:5px;}',
    '.nqz-r-title{font-size:clamp(20px,5vw,24px);font-weight:800;color:#1a1612;letter-spacing:-.022em;line-height:1.2;margin-bottom:16px;}',

    '.nqz-feat{',
    '  background:#fff;border:1px solid #e4ddd5;',
    '  border-radius:20px;overflow:hidden;',
    '  margin-bottom:10px;text-decoration:none;display:block;',
    '  transition:transform .3s ease,box-shadow .3s ease;',
    '}',
    '.nqz-feat:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(15,12,9,.08);}',
    '.nqz-feat-top{padding:18px 18px 14px;}',
    '.nqz-feat-meta{display:flex;align-items:center;gap:7px;margin-bottom:11px;}',
    '.nqz-rec{',
    '  display:inline-flex;align-items:center;gap:5px;',
    '  font-size:10px;font-weight:700;color:#fff;background:#1a1612;',
    '  padding:3px 10px;border-radius:999px;letter-spacing:.04em;',
    '}',
    '.nqz-feat-badge{font-size:10px;font-weight:700;color:#6b3a2a;background:rgba(107,58,42,.09);padding:3px 10px;border-radius:999px;}',
    '.nqz-feat-name{font-size:20px;font-weight:800;color:#1a1612;letter-spacing:-.025em;line-height:1.15;margin-bottom:3px;}',
    '.nqz-feat-sub{font-size:12px;font-weight:400;color:#9c8e82;margin-bottom:9px;}',
    '.nqz-feat-desc{font-size:13px;font-weight:400;color:#5a5048;line-height:1.72;}',
    '.nqz-feat-foot{',
    '  padding:13px 18px;background:#f3f0eb;',
    '  display:flex;align-items:center;justify-content:space-between;gap:10px;',
    '}',
    '.nqz-feat-price{font-size:22px;font-weight:800;color:#1a1612;letter-spacing:-.03em;direction:ltr;display:inline-block;}',
    '.nqz-feat-price em{font-size:12px;font-weight:400;font-style:normal;color:#9c8e82;margin-right:2px;}',
    '.nqz-cta{',
    '  display:inline-flex;align-items:center;gap:7px;',
    '  height:38px;padding:0 18px;',
    '  background:#1a1612;color:#faf9f7;',
    '  border-radius:999px;font-size:13px;font-weight:700;',
    '  font-family:inherit;text-decoration:none;white-space:nowrap;flex-shrink:0;',
    '  transition:background .2s,transform .2s;',
    '}',
    '.nqz-cta:hover{background:#2d2520;transform:translateY(-1px);}',

    '.nqz-alts{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px;}',
    '.nqz-alt{',
    '  background:#fff;border:1px solid #e4ddd5;',
    '  border-radius:15px;padding:14px;',
    '  text-decoration:none;display:flex;flex-direction:column;gap:3px;',
    '  transition:border-color .2s,transform .25s ease;',
    '}',
    '.nqz-alt:hover{border-color:#6b3a2a;transform:translateY(-2px);}',
    '.nqz-alt-badge{font-size:10px;font-weight:700;color:#9c8e82;text-transform:uppercase;letter-spacing:.06em;}',
    '.nqz-alt-name{font-size:13px;font-weight:800;color:#1a1612;line-height:1.3;}',
    '.nqz-alt-sub{font-size:11px;color:#9c8e82;font-weight:400;}',
    '.nqz-alt-row{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:9px;}',
    '.nqz-alt-price{font-size:14px;font-weight:800;color:#1a1612;}',
    '.nqz-alt-price em{font-size:10px;font-weight:400;font-style:normal;color:#9c8e82;}',
    '.nqz-alt-arr{width:26px;height:26px;border-radius:50%;background:#f3f0eb;display:flex;align-items:center;justify-content:center;color:#5a5048;flex-shrink:0;transition:background .2s,color .2s;}',
    '.nqz-alt:hover .nqz-alt-arr{background:#1a1612;color:#faf9f7;}',

    '.nqz-restart{display:block;width:100%;text-align:center;font-size:12px;color:#9c8e82;background:none;border:none;cursor:pointer;font-family:inherit;padding:4px;transition:color .2s;}',
    '.nqz-restart:hover{color:#5a5048;}',
    '.nqz-restart u{text-underline-offset:3px;}',

    /* Desktop */
    '@media(min-width:600px){',
    '  #nqz-sheet{',
    '    bottom:auto;top:50%;left:50%;right:auto;',
    '    transform:translate(-50%,-44%) scale(.96);',
    '    border-radius:28px;',
    '    width:min(460px,calc(100vw - 40px));',
    '    max-height:calc(100dvh - 60px);',
    '    opacity:0;',
    '    transition:transform .42s cubic-bezier(.32,0,.15,1),opacity .35s ease;',
    '  }',
    '  #nqz-sheet.open{transform:translate(-50%,-50%) scale(1);opacity:1;}',
    '  #nqz-handle{display:none;}',
    '  .nqz-in{padding:26px 26px 38px;}',
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
  function render() {
    step < QUESTIONS.length ? renderQ(step) : renderResult();
  }

  function headerHTML() {
    var segs = QUESTIONS.map(function (_, i) {
      return '<div class="nqz-seg"><div class="nqz-seg-fill" id="nqz-fill-' + i + '"></div></div>';
    }).join('');
    return (
      '<div class="nqz-hd">' +
        '<span class="nqz-brand">نقوة النخيل</span>' +
        '<button class="nqz-x" type="button" aria-label="إغلاق">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="nqz-track">' + segs + '</div>'
    );
  }

  function fillProgress(upTo) {
    requestAnimationFrame(function () {
      for (var i = 0; i < QUESTIONS.length; i++) {
        var f = document.getElementById('nqz-fill-' + i);
        if (f) f.style.width = i < upTo ? '100%' : '0%';
      }
    });
  }

  function renderQ(qi) {
    var q = QUESTIONS[qi];
    var optsHtml = q.opts.map(function (o, oi) {
      return (
        '<button class="nqz-opt" data-oi="' + oi + '" type="button">' +
          '<div class="nqz-opt-dot">' + ICON_CHECK + '</div>' +
          '<div class="nqz-opt-text">' +
            '<span class="nqz-opt-label">' + o.label + '</span>' +
            '<span class="nqz-opt-note">' + o.note + '</span>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    els.body.innerHTML =
      headerHTML() +
      '<div class="nqz-screen">' +
        '<span class="nqz-qlabel">' + q.label + ' · ' + q.step + ' من ' + QUESTIONS.length + '</span>' +
        '<p class="nqz-q">' + q.text + '</p>' +
        '<div class="nqz-opts">' + optsHtml + '</div>' +
      '</div>';

    fillProgress(qi);

    els.body.querySelector('.nqz-x').onclick = close;
    els.body.querySelectorAll('.nqz-opt').forEach(function (btn) {
      btn.onclick = function () {
        var oi = parseInt(btn.getAttribute('data-oi'));
        btn.classList.add('sel');
        tags = tags.concat(QUESTIONS[qi].opts[oi].tags);
        fillProgress(qi + 1);
        var screen = els.body.querySelector('.nqz-screen');
        if (screen) screen.classList.add('out');
        setTimeout(function () { step++; render(); }, 340);
      };
    });
  }

  function renderResult() {
    var list = ranked();
    var top  = list[0];
    var alt1 = list[1];
    var alt2 = list[2];

    els.body.innerHTML =
      headerHTML() +
      '<div class="nqz-screen">' +
        '<span class="nqz-r-label">توصيتنا لك</span>' +
        '<p class="nqz-r-title">اخترنا هذا خصيصاً لك</p>' +
        '<a class="nqz-feat" href="' + top.url + '">' +
          '<div class="nqz-feat-top">' +
            '<div class="nqz-feat-meta">' +
              '<span class="nqz-rec">' + ICON_STAR + ' الأنسب لك</span>' +
              '<span class="nqz-feat-badge">' + top.badge + '</span>' +
            '</div>' +
            '<div class="nqz-feat-name">' + top.name + '</div>' +
            '<div class="nqz-feat-sub">' + top.sub + '</div>' +
            '<div class="nqz-feat-desc">' + top.desc + '</div>' +
          '</div>' +
          '<div class="nqz-feat-foot">' +
            '<span class="nqz-feat-price">' + top.price + ' <em>' + CURRENCY + '</em></span>' +
            '<span class="nqz-cta">اكتشف المنتج ' + ICON_ARROW + '</span>' +
          '</div>' +
        '</a>' +
        '<div class="nqz-alts">' + altCard(alt1) + altCard(alt2) + '</div>' +
        '<button class="nqz-restart" type="button"><u>إعادة الاختيار</u></button>' +
      '</div>';

    fillProgress(QUESTIONS.length);
    els.body.querySelector('.nqz-x').onclick = close;
    els.body.querySelector('.nqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = els.body.querySelector('.nqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(render, 280);
    };
  }

  function altCard(p) {
    return (
      '<a class="nqz-alt" href="' + p.url + '">' +
        '<span class="nqz-alt-badge">' + p.badge + '</span>' +
        '<span class="nqz-alt-name">' + p.name + '</span>' +
        '<span class="nqz-alt-sub">' + p.sub + '</span>' +
        '<div class="nqz-alt-row">' +
          '<span class="nqz-alt-price">' + p.price + ' <em>' + CURRENCY + '</em></span>' +
          '<span class="nqz-alt-arr">' + ICON_ARROW + '</span>' +
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
      s.id = 'nqz-css';
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    els.bd = document.createElement('div');
    els.bd.id = 'nqz-bd';
    els.bd.onclick = close;
    document.body.appendChild(els.bd);

    els.sheet = document.createElement('div');
    els.sheet.id = 'nqz-sheet';
    els.sheet.setAttribute('dir', 'rtl');
    els.sheet.setAttribute('role', 'dialog');
    els.sheet.setAttribute('aria-modal', 'true');
    els.sheet.setAttribute('aria-label', 'اختر التمر المناسب لك');
    els.sheet.innerHTML = '<div id="nqz-handle"></div><div class="nqz-in" id="nqz-body"></div>';
    document.body.appendChild(els.sheet);

    els.body = document.getElementById('nqz-body');

    render();
    setTimeout(open, DELAY_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(init); });
  }

})();
