/* ─────────────────────────────────────────────────────────
   nq-quiz.js — نقوة النخيل — Product Recommendation Quiz
   Self-contained: injects its own CSS, creates its own DOM.
   Drop a <script src="...nq-quiz.js"></script> anywhere.
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     CONFIG — update URLs/prices when products change
  ══════════════════════════════════════════════ */
  var STORE = 'https://naquatalnakhil.com';
  var CURRENCY = 'ريال';

  var PRODUCTS = [
    {
      key:   'sukari',
      emoji: '🌴',
      badge: 'الأكثر طلباً',
      name:  'سكري مفتل',
      sub:   'درجة أولى',
      desc:  'التمر الأكثر طلباً — حلو وطري بملمس مميز، مثالي للضيافة اليومية والتذوق.',
      price: 90,
      url:   STORE + '/category/OlBOmK',
      s: { gift: 1, hosting: 3, personal: 3, cheap: 3, mid: 2, premium: 0 }
    },
    {
      key:   'tamriya',
      emoji: '🎁',
      badge: 'هدية مثالية',
      name:  'تمرية بحشوات',
      sub:   'هدية راقية',
      desc:  'تمور محشوة بالمكسرات والفواكه في علب أنيقة — هدية تليق بكل مناسبة.',
      price: 150,
      url:   STORE,
      s: { gift: 3, hosting: 2, personal: 1, cheap: 1, mid: 3, premium: 1 }
    },
    {
      key:   'taj',
      emoji: '👑',
      badge: 'الأفخر',
      name:  'تاج الملوك',
      sub:   'تشكيلة ملكية',
      desc:  'أرقى تشكيلة تمور سعودية مختارة بعناية في تغليف ملكي — لأصحاب الذوق الرفيع.',
      price: 250,
      url:   STORE,
      s: { gift: 2, hosting: 1, personal: 0, cheap: 0, mid: 1, premium: 3 }
    }
  ];

  var QUESTIONS = [
    {
      step:  '١ من ٢',
      text:  'ما الغرض من طلبك؟',
      opts: [
        { label: 'هدية راقية',    icon: '🎁', tags: ['gift']     },
        { label: 'ضيافة الزوار', icon: '☕', tags: ['hosting']  },
        { label: 'تذوق شخصي',   icon: '✨', tags: ['personal'] }
      ]
    },
    {
      step:  '٢ من ٢',
      text:  'ما ميزانيتك التقريبية؟',
      opts: [
        { label: 'حتى 100 ريال',     note: 'توفيري ومميز',  tags: ['cheap']   },
        { label: '100 – 200 ريال',   note: 'خيار راقي',     tags: ['mid']     },
        { label: '200 ريال فأكثر',   note: 'الأفخر والأرقى', tags: ['premium'] }
      ]
    }
  ];

  /* ══════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════ */
  var step  = 0;
  var tags  = [];
  var nodes = {};   // {backdrop, modal, trigger}

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
     CSS
  ══════════════════════════════════════════════ */
  var CSS = [
    /* ── Trigger ── */
    '#nqz-trigger{position:fixed;bottom:32px;right:32px;z-index:9990;display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 22px 0 18px;background:#2D1B12;color:#F8F6F2;border:none;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;font-family:"IBM Plex Sans Arabic","Cairo",system-ui,sans-serif;direction:rtl;white-space:nowrap;box-shadow:0 8px 32px rgba(45,27,18,.25);transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease;}',
    '#nqz-trigger:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 14px 40px rgba(45,27,18,.32);}',
    '#nqz-trigger .icon{font-size:16px;line-height:1;}',

    /* ── Backdrop ── */
    '#nqz-bd{position:fixed;inset:0;background:rgba(20,14,10,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:9991;opacity:0;pointer-events:none;transition:opacity .3s ease;}',
    '#nqz-bd.open{opacity:1;pointer-events:auto;}',

    /* ── Modal ── */
    '#nqz-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.95);z-index:9992;width:min(540px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow-y:auto;background:#F8F6F2;border-radius:32px;box-shadow:0 40px 100px rgba(20,14,10,.22),0 0 0 1px rgba(239,234,227,.8);direction:rtl;font-family:"IBM Plex Sans Arabic","Cairo",system-ui,sans-serif;-webkit-font-smoothing:antialiased;opacity:0;pointer-events:none;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .3s ease;}',
    '#nqz-modal.open{transform:translate(-50%,-50%) scale(1);opacity:1;pointer-events:auto;}',
    '#nqz-modal *{box-sizing:border-box;margin:0;padding:0;}',

    /* ── Inner ── */
    '.nqz-in{padding:28px;}',

    /* ── Header ── */
    '.nqz-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}',
    '.nqz-brand{font-size:11px;font-weight:700;color:#8D6E46;letter-spacing:.12em;text-transform:uppercase;}',
    '.nqz-x{width:32px;height:32px;border-radius:50%;background:#EFEAE3;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#2D1B12;transition:background .2s;flex-shrink:0;}',
    '.nqz-x:hover{background:#E0D8CE;}',

    /* ── Progress ── */
    '.nqz-prog{height:3px;background:#EFEAE3;border-radius:999px;margin-bottom:28px;overflow:hidden;}',
    '.nqz-prog-fill{height:100%;background:#2D1B12;border-radius:999px;transition:width .5s cubic-bezier(.22,1,.36,1);}',

    /* ── Question ── */
    '.nqz-step{font-size:11px;font-weight:700;color:#8D6E46;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:6px;}',
    '.nqz-q{font-size:clamp(20px,3.5vw,26px);font-weight:800;color:#1E1B18;line-height:1.25;margin-bottom:20px;letter-spacing:-.02em;}',

    /* ── Options — occasion (3-col icon tiles) ── */
    '.nqz-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:4px;}',
    '.nqz-opt{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:20px 10px;background:#fff;border:1.5px solid #EFEAE3;border-radius:18px;cursor:pointer;text-align:center;font-family:inherit;transition:all .25s cubic-bezier(.34,1.56,.64,1);-webkit-tap-highlight-color:transparent;user-select:none;}',
    '.nqz-opt:hover{border-color:#2D1B12;transform:translateY(-3px);box-shadow:0 8px 24px rgba(45,27,18,.08);}',
    '.nqz-opt.sel{background:#2D1B12;border-color:#2D1B12;transform:translateY(-3px);box-shadow:0 8px 24px rgba(45,27,18,.18);}',
    '.nqz-opt .ic{font-size:24px;line-height:1;}',
    '.nqz-opt .lb{font-size:13px;font-weight:700;color:#1E1B18;line-height:1.3;}',
    '.nqz-opt.sel .lb{color:#F8F6F2;}',

    /* ── Options — budget (list style) ── */
    '.nqz-opts.budget{grid-template-columns:1fr;}',
    '.nqz-opts.budget .nqz-opt{flex-direction:row;justify-content:flex-start;padding:16px 20px;gap:14px;text-align:right;}',
    '.nqz-opt .p{font-size:16px;font-weight:800;color:#2D1B12;display:block;}',
    '.nqz-opt.sel .p{color:#F8F6F2;}',
    '.nqz-opt .nt{font-size:11px;color:#8D6E46;font-weight:600;}',
    '.nqz-opt.sel .nt{color:rgba(248,246,242,.65);}',

    /* ── Result: headline ── */
    '.nqz-r-ey{font-size:11px;font-weight:700;color:#8D6E46;letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:6px;}',
    '.nqz-r-tt{font-size:clamp(18px,2.8vw,22px);font-weight:800;color:#1E1B18;margin-bottom:16px;line-height:1.3;letter-spacing:-.02em;}',

    /* ── Featured card ── */
    '.nqz-feat{display:flex;align-items:flex-start;gap:18px;background:#fff;border:1.5px solid #EFEAE3;border-radius:22px;padding:22px;margin-bottom:10px;text-decoration:none;transition:transform .3s ease,box-shadow .3s ease;position:relative;}',
    '.nqz-feat:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(45,27,18,.09);}',
    '.nqz-feat-art{width:76px;height:76px;border-radius:16px;background:#F7F2EA;display:flex;align-items:center;justify-content:center;font-size:34px;flex-shrink:0;}',
    '.nqz-feat-body{flex:1;min-width:0;}',
    '.nqz-feat-top{display:flex;align-items:center;gap:8px;margin-bottom:8px;}',
    '.nqz-recbadge{font-size:10px;font-weight:700;color:#F8F6F2;background:#2D1B12;padding:3px 10px;border-radius:999px;white-space:nowrap;}',
    '.nqz-feat-badge{font-size:10px;font-weight:700;color:#8D6E46;background:rgba(141,110,70,.1);padding:3px 10px;border-radius:999px;}',
    '.nqz-feat-name{font-size:17px;font-weight:800;color:#1E1B18;line-height:1.2;margin-bottom:2px;}',
    '.nqz-feat-sub{font-size:12px;font-weight:600;color:#8D6E46;margin-bottom:8px;}',
    '.nqz-feat-desc{font-size:13px;color:#766B5F;line-height:1.75;margin-bottom:14px;}',
    '.nqz-feat-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;}',
    '.nqz-price{font-size:20px;font-weight:800;color:#2D1B12;}',
    '.nqz-price em{font-size:13px;font-weight:400;font-style:normal;color:#8D6E46;}',
    '.nqz-btn{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 18px;background:#2D1B12;color:#F8F6F2;border-radius:999px;font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap;flex-shrink:0;transition:background .2s,transform .2s;}',
    '.nqz-btn:hover{background:#3D2B22;transform:translateY(-2px);}',

    /* ── Alt cards ── */
    '.nqz-alts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}',
    '.nqz-alt{background:#fff;border:1px solid #EFEAE3;border-radius:18px;padding:16px;text-decoration:none;display:flex;flex-direction:column;gap:5px;transition:transform .25s ease,box-shadow .25s ease;}',
    '.nqz-alt:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(45,27,18,.07);}',
    '.nqz-alt-art{font-size:22px;margin-bottom:2px;}',
    '.nqz-alt-badge{font-size:10px;font-weight:700;color:#8D6E46;}',
    '.nqz-alt-name{font-size:13px;font-weight:800;color:#1E1B18;line-height:1.3;}',
    '.nqz-alt-sub{font-size:11px;color:#8D6E46;font-weight:500;}',
    '.nqz-alt-price{font-size:14px;font-weight:800;color:#2D1B12;margin-top:auto;}',
    '.nqz-alt-price em{font-size:11px;font-weight:400;font-style:normal;color:#8D6E46;}',

    /* ── Restart ── */
    '.nqz-restart{display:block;width:100%;text-align:center;font-size:12px;color:#A39484;background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline;text-underline-offset:2px;padding:4px;}',
    '.nqz-restart:hover{color:#766B5F;}',

    /* ── Screen transitions ── */
    '.nqz-screen{transition:opacity .22s ease,transform .22s ease;}',
    '.nqz-screen.out{opacity:0;transform:translateX(16px);pointer-events:none;}',

    /* ── Mobile ── */
    '@media(max-width:480px){',
    '#nqz-trigger{right:50%;transform:translateX(50%);bottom:24px;}',
    '#nqz-trigger:hover{transform:translateX(50%) translateY(-3px) scale(1.02);}',
    '.nqz-in{padding:20px;}',
    '.nqz-opts{grid-template-columns:1fr 1fr;gap:9px;}',
    '.nqz-opts.budget{grid-template-columns:1fr;}',
    '.nqz-feat{flex-direction:column;}',
    '.nqz-feat-art{width:56px;height:56px;font-size:26px;border-radius:12px;}',
    '}'
  ].join('');

  /* ══════════════════════════════════════════════
     DOM HELPERS
  ══════════════════════════════════════════════ */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function closeX() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  /* ══════════════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════════════ */
  function open() {
    step = 0; tags = [];
    render();
    requestAnimationFrame(function () {
      nodes.bd.classList.add('open');
      nodes.modal.classList.add('open');
    });
  }

  function close() {
    nodes.bd.classList.remove('open');
    nodes.modal.classList.remove('open');
  }

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  function render() {
    step < QUESTIONS.length ? renderQ(step) : renderResult();
  }

  function header(progress) {
    return (
      '<div class="nqz-in">' +
      '<div class="nqz-hd">' +
        '<span class="nqz-brand">نقوة النخيل</span>' +
        '<button class="nqz-x" type="button" aria-label="إغلاق">' + closeX() + '</button>' +
      '</div>' +
      '<div class="nqz-prog"><div class="nqz-prog-fill" style="width:' + progress + '%"></div></div>'
    );
  }

  function renderQ(qi) {
    var q   = QUESTIONS[qi];
    var pct = (qi / QUESTIONS.length) * 100;
    var isBudget = qi === 1;

    var optsHtml = q.opts.map(function (o, oi) {
      if (isBudget) {
        return (
          '<button class="nqz-opt" data-qi="' + qi + '" data-oi="' + oi + '" type="button">' +
            '<div><span class="p">' + o.label + '</span><span class="nt">' + (o.note || '') + '</span></div>' +
          '</button>'
        );
      }
      return (
        '<button class="nqz-opt" data-qi="' + qi + '" data-oi="' + oi + '" type="button">' +
          '<span class="ic">' + o.icon + '</span>' +
          '<span class="lb">' + o.label + '</span>' +
        '</button>'
      );
    }).join('');

    nodes.modal.innerHTML =
      header(pct) +
      '<div class="nqz-screen">' +
        '<span class="nqz-step">' + q.step + '</span>' +
        '<p class="nqz-q">' + q.text + '</p>' +
        '<div class="nqz-opts' + (isBudget ? ' budget' : '') + '">' + optsHtml + '</div>' +
      '</div>' +
      '</div>';

    /* Animate progress */
    requestAnimationFrame(function () {
      var fill = nodes.modal.querySelector('.nqz-prog-fill');
      if (fill) fill.style.width = pct + '%';
    });

    nodes.modal.querySelector('.nqz-x').onclick = close;

    nodes.modal.querySelectorAll('.nqz-opt').forEach(function (btn) {
      btn.onclick = function () {
        var oi  = parseInt(btn.getAttribute('data-oi'));
        var opt = QUESTIONS[qi].opts[oi];
        btn.classList.add('sel');
        tags = tags.concat(opt.tags);
        var screen = nodes.modal.querySelector('.nqz-screen');
        if (screen) screen.classList.add('out');
        setTimeout(function () { step++; render(); }, 360);
      };
    });
  }

  function renderResult() {
    var list = ranked();
    var top  = list[0];
    var alt1 = list[1];
    var alt2 = list[2];

    nodes.modal.innerHTML =
      header(100) +
      '<div class="nqz-screen">' +
        '<span class="nqz-r-ey">توصيتنا لك ✦</span>' +
        '<h2 class="nqz-r-tt">اخترنا هذا خصيصاً لك</h2>' +

        /* Featured */
        '<a class="nqz-feat" href="' + top.url + '">' +
          '<div class="nqz-feat-art">' + top.emoji + '</div>' +
          '<div class="nqz-feat-body">' +
            '<div class="nqz-feat-top">' +
              '<span class="nqz-recbadge">الأنسب لك ✓</span>' +
              '<span class="nqz-feat-badge">' + top.badge + '</span>' +
            '</div>' +
            '<div class="nqz-feat-name">' + top.name + '</div>' +
            '<div class="nqz-feat-sub">' + top.sub + '</div>' +
            '<div class="nqz-feat-desc">' + top.desc + '</div>' +
            '<div class="nqz-feat-foot">' +
              '<span class="nqz-price">' + top.price + ' <em>' + CURRENCY + '</em></span>' +
              '<span class="nqz-btn">اكتشف المنتج</span>' +
            '</div>' +
          '</div>' +
        '</a>' +

        /* Alternatives */
        '<div class="nqz-alts">' +
          altCard(alt1) +
          altCard(alt2) +
        '</div>' +

        '<button class="nqz-restart" type="button">إعادة الاختيار</button>' +
      '</div>' +
      '</div>';

    nodes.modal.querySelector('.nqz-x').onclick = close;
    nodes.modal.querySelector('.nqz-restart').onclick = function () {
      step = 0; tags = [];
      var screen = nodes.modal.querySelector('.nqz-screen');
      if (screen) screen.classList.add('out');
      setTimeout(render, 260);
    };
  }

  function altCard(p) {
    return (
      '<a class="nqz-alt" href="' + p.url + '">' +
        '<div class="nqz-alt-art">' + p.emoji + '</div>' +
        '<div class="nqz-alt-badge">' + p.badge + '</div>' +
        '<div class="nqz-alt-name">' + p.name + '</div>' +
        '<div class="nqz-alt-sub">' + p.sub + '</div>' +
        '<div class="nqz-alt-price">' + p.price + ' <em>' + CURRENCY + '</em></div>' +
      '</a>'
    );
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    /* Inject CSS */
    if (!document.getElementById('nqz-css')) {
      var s = document.createElement('style');
      s.id  = 'nqz-css';
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    /* Backdrop */
    nodes.bd = document.createElement('div');
    nodes.bd.id = 'nqz-bd';
    nodes.bd.onclick = close;
    document.body.appendChild(nodes.bd);

    /* Modal */
    nodes.modal = document.createElement('div');
    nodes.modal.id = 'nqz-modal';
    nodes.modal.setAttribute('dir', 'rtl');
    nodes.modal.setAttribute('role', 'dialog');
    nodes.modal.setAttribute('aria-modal', 'true');
    document.body.appendChild(nodes.modal);

    /* Trigger */
    nodes.trigger = document.createElement('button');
    nodes.trigger.id   = 'nqz-trigger';
    nodes.trigger.type = 'button';
    nodes.trigger.setAttribute('aria-label', 'اكتشف التمر المناسب لك');
    nodes.trigger.innerHTML = '<span class="icon">🌴</span><span>اكتشف تمرك</span>';
    nodes.trigger.onclick = open;
    document.body.appendChild(nodes.trigger);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
