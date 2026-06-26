/* cross-sell.js — hamtaro.sa cross-sell popup | v1.17.0 */
(function () {
  'use strict';

  if (document.getElementById('cs-styles')) return;
  var s = document.createElement('style');
  s.id = 'cs-styles';
  s.textContent = [
    ':root{--cs-red:#D92B2B;--cs-save:#16A34A;--cs-save-bg:#DCFCE7;--cs-text:#111;--cs-muted:#888;--cs-border:#EBEBEB;--cs-ease:cubic-bezier(.32,0,.15,1)}',
    '#cs-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;opacity:0;transition:opacity .3s var(--cs-ease);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}',
    '#cs-backdrop.cs-open{opacity:1}',
    '#cs-sheet{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -4px 32px rgba(0,0,0,.12);transform:translateY(100%);transition:transform .4s var(--cs-ease);direction:rtl;font-family:Cairo,Tajawal,Almarai,sans-serif;max-height:88vh;display:flex;flex-direction:column;overflow:hidden}',
    '#cs-sheet.cs-open{transform:translateY(0)}',
    '#cs-sheet::before{content:"";display:block;width:36px;height:4px;background:#DDD;border-radius:99px;margin:12px auto 0;flex-shrink:0}',
    '#cs-header{padding:14px 18px 14px;flex-shrink:0;border-bottom:1px solid var(--cs-border);background:#fff;position:relative;text-align:center}',
    '#cs-discount-badge{position:absolute;top:14px;left:14px;background:var(--cs-red);color:#fff;font-size:12px;font-weight:900;padding:5px 10px;border-radius:20px;line-height:1;letter-spacing:.01em}',
    '#cs-title{font-size:16px;font-weight:800;color:var(--cs-text);margin:0 0 3px;line-height:1.3}',
    '#cs-subtitle{font-size:12px;color:var(--cs-muted);margin:0;line-height:1.3;font-weight:400}',
    '#cs-close{position:absolute;top:14px;right:14px;background:#F2F2F2;border:none;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;color:#555;padding:0;line-height:1;transition:background .15s}',
    '#cs-close:hover{background:#E5E5E5}',
    '#cs-products{display:flex;gap:10px;overflow-x:auto;padding:14px 16px 12px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;flex-shrink:0}',
    '#cs-products::-webkit-scrollbar{display:none}',
    '.cs-skeleton{flex-shrink:0;width:148px;scroll-snap-align:start;background:#fff;border-radius:14px;border:1px solid var(--cs-border);overflow:hidden}',
    '.cs-skel-img{width:100%;height:132px;background:linear-gradient(90deg,#F0F0F0 25%,#F8F8F8 50%,#F0F0F0 75%);background-size:200% 100%;animation:cs-shimmer 1.4s infinite}',
    '.cs-skel-line{height:10px;border-radius:6px;background:linear-gradient(90deg,#F0F0F0 25%,#F8F8F8 50%,#F0F0F0 75%);background-size:200% 100%;animation:cs-shimmer 1.4s infinite;margin:10px 10px 6px}',
    '.cs-skel-line.short{width:50%;margin-top:4px}',
    '.cs-skel-btn{height:34px;border-radius:9px;background:linear-gradient(90deg,#F0F0F0 25%,#F8F8F8 50%,#F0F0F0 75%);background-size:200% 100%;animation:cs-shimmer 1.4s infinite;margin:8px 10px 10px}',
    '@keyframes cs-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}',
    '.cs-card{flex-shrink:0;width:148px;scroll-snap-align:start;background:#fff;border-radius:14px;border:1px solid var(--cs-border);overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}',
    '.cs-card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.08)}',
    '.cs-card-img-wrap{width:100%;aspect-ratio:1;overflow:hidden;background:#F7F7F7;position:relative}',
    '.cs-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s ease}',
    '.cs-card:hover .cs-card-img{transform:scale(1.04)}',
    '.cs-off-pill{position:absolute;top:7px;left:7px;background:var(--cs-red);color:#fff;font-size:10px;font-weight:800;padding:3px 7px;border-radius:20px;z-index:1;line-height:1.3}',
    '.cs-card-body{padding:9px 10px 11px;display:flex;flex-direction:column;gap:5px;flex:1}',
    '.cs-card-name{font-size:12px;font-weight:700;color:var(--cs-text);line-height:1.4;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.cs-price-row{display:flex;align-items:baseline;gap:4px;flex-wrap:wrap}',
    '.cs-card-price{font-size:18px;font-weight:900;color:var(--cs-text);line-height:1}',
    '.cs-card-price .cs-sar{font-size:11px;color:var(--cs-muted);font-style:normal;font-weight:500}',
    '.cs-card-original{font-size:11px;color:var(--cs-muted);text-decoration:line-through;line-height:1}',
    '.cs-save-tag{font-size:10px;font-weight:700;color:var(--cs-save);background:var(--cs-save-bg);border-radius:6px;padding:2px 7px;display:inline-block;width:fit-content;line-height:1.5}',
    '.cs-add-btn{width:100%;background:#111;color:#fff;border:none;border-radius:10px;padding:9px 10px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s;margin-top:auto;line-height:1}',
    '.cs-add-btn:hover{background:#000}',
    '.cs-add-btn:active{transform:scale(.97)}',
    '.cs-add-btn:disabled{opacity:.5;cursor:default;transform:none}',
    '.cs-add-btn.cs-added{background:#16A34A;color:#fff}',
    '#cs-footer{text-align:center;font-size:11px;color:var(--cs-muted);padding:8px 18px 18px;margin:0;flex-shrink:0;border-top:1px solid var(--cs-border)}',
    '@supports (padding-bottom:env(safe-area-inset-bottom)){#cs-footer{padding-bottom:calc(14px + env(safe-area-inset-bottom))}}'
  ].join('');
  (document.head || document.documentElement).appendChild(s);

  var CROSS_SELL = [
    {
      triggerCategories: ['2073773743', '4760844'],
      upsellCategory:    '1471205605',
      discount:          15,
      title:             'أضفها معها وفّر',
      subtitle:          'منتجات يطلبها العملاء معها دائماً'
    },
    {
      triggerCategories: ['1090483385'],
      upsellCategory:    '1822601915',
      discount:          10,
      title:             'أكمل أدوات قطتك وفّر 10%',
      subtitle:          'ليتربوكس بخصم خاص مع كل طلب رمل'
    },
    {
      triggerCategories: ['4760862'],
      upsellCategory:    '269929068',
      discount:          15,
      title:             'تخلص من رائحة الرمل وفّر 15%',
      subtitle:          'تخلص من رائحة الرمل المزعجة مع خصم لفترة محدودة'
    },
    {
      triggerCategories: ['983530912', '4760837'],
      upsellCategory:    '1801049823',
      discount:          15,
      title:             'أضف ألعاب القطط وفّر',
      subtitle:          'منتجات يطلبها العملاء معها دائماً'
    }
  ];

  var API_BASE = 'https://api.salla.dev/store/v1';
  var API_HDRS = {
    'accept':           '*/*',
    'accept-language':  'ar',
    'currency':         'SAR',
    's-country':        'SA',
    's-infinite-scroll':'true',
    's-ray':            '50',
    's-source':         'twilight',
    's-user-id':        'Qtc81mVCn4bcG4HpHHkhPwpd4kh7THDbVkc2xdIg',
    's-version-id':     '1013714434',
    'store-identifier': '1278867981',
  };

  var activeConfig   = null;
  var productsCache  = {};
  var popupTriggered = false;

  function extractIdsFromDetailEntry(entry) {
    var ids = [];
    var prods = (entry.ecommerce && entry.ecommerce.detail && entry.ecommerce.detail.products) || [];
    if (prods.length && prods[0].categories) {
      ids = prods[0].categories.map(function (c) { return String(c.id); });
    }
    var referrer = (entry.page && entry.page.referrer) || document.referrer;
    var m = referrer.match(/[?&]filters(?:%5B|\[)category_id(?:%5D|\])=(\d+)/);
    if (m && ids.indexOf(m[1]) === -1) ids.push(m[1]);
    return { ids: ids, productId: prods.length && prods[0].id };
  }

  function resolveCategories(entry) {
    var parsed = extractIdsFromDetailEntry(entry);
    var ids    = parsed.ids;
    console.log('[cs] category ids:', ids);
    onCategoryIds(ids);
  }

  function matchConfig(catIds) {
    for (var i = 0; i < CROSS_SELL.length; i++) {
      var triggers = CROSS_SELL[i].triggerCategories;
      for (var j = 0; j < triggers.length; j++) {
        if (catIds.indexOf(triggers[j]) !== -1) return CROSS_SELL[i];
      }
    }
    return null;
  }

  function fetchProducts(catId) {
    if (productsCache[catId]) return Promise.resolve(productsCache[catId]);
    var url = API_BASE + '/products?source=categories&filterable=1' +
              '&filters[category_id]=' + catId +
              '&source_value[0]=' + catId;
    return fetch(url, { method: 'GET', headers: API_HDRS })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        var items = (Array.isArray(res.data) ? res.data : (res.data && res.data.data)) || [];
        productsCache[catId] = items.slice(0, 8);
        return productsCache[catId];
      });
  }

  function buildSkeletons(n) {
    var html = '';
    for (var i = 0; i < n; i++) {
      html += '<div class="cs-skeleton"><div class="cs-skel-img"></div><div class="cs-skel-line"></div><div class="cs-skel-line short"></div><div class="cs-skel-btn"></div></div>';
    }
    return html;
  }

  function buildCard(p, discount) {
    var price      = parseFloat(p.price) || 0;
    var discounted = (price * (1 - discount / 100)).toFixed(2);
    var saved      = (price - parseFloat(discounted)).toFixed(2);
    var img        = (p.image && p.image.url) || p.thumbnail || '';
    var name       = (p.name || '').replace(/</g, '&lt;');
    return '<div class="cs-card">' +
      '<div class="cs-card-img-wrap">' +
        '<span class="cs-off-pill">&minus;' + discount + '%</span>' +
        '<img class="cs-card-img" src="' + img + '" alt="' + name + '" loading="lazy">' +
      '</div>' +
      '<div class="cs-card-body">' +
        '<p class="cs-card-name">' + name + '</p>' +
        '<div class="cs-price-row">' +
          '<span class="cs-card-price">' + discounted + '\u00a0<i class="sicon-sar cs-sar"></i></span>' +
          (price > 0 ? '<span class="cs-card-original">' + price.toFixed(2) + '</span>' : '') +
        '</div>' +
        (parseFloat(saved) > 0 ? '<span class="cs-save-tag">\u0648\u0641\u0651\u0631 ' + saved + ' \u0631.\u0633</span>' : '') +
        '<button class="cs-add-btn" data-id="' + p.id + '">\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629</button>' +
      '</div>' +
    '</div>';
  }

  function openPopup(config) {
    if (document.getElementById('cs-backdrop')) return;
    var backdrop = document.createElement('div');
    backdrop.id  = 'cs-backdrop';
    var sheet = document.createElement('div');
    sheet.id  = 'cs-sheet';
    sheet.setAttribute('dir', 'rtl');
    sheet.innerHTML =
      '<div id="cs-header">' +
        '<span id="cs-discount-badge">&minus;' + config.discount + '%</span>' +
        '<p id="cs-title">' + config.title + '</p>' +
        '<p id="cs-subtitle">' + config.subtitle + '</p>' +
        '<button id="cs-close" aria-label="\u0625\u063a\u0644\u0627\u0642">&#x2715;</button>' +
      '</div>' +
      '<div id="cs-products">' + buildSkeletons(4) + '</div>' +
      '<p id="cs-footer">\u062e\u0635\u0645 ' + config.discount + '% \u064a\u064f\u0637\u0628\u0651\u064e\u0642 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u0639\u0646\u062f \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629</p>';
    document.body.appendChild(backdrop);
    document.body.appendChild(sheet);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        backdrop.classList.add('cs-open');
        sheet.classList.add('cs-open');
      });
    });
    document.getElementById('cs-close').addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
    var startY = 0;
    sheet.addEventListener('touchstart', function (e) { startY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchend', function (e) { if (e.changedTouches[0].clientY - startY > 80) closePopup(); }, { passive: true });
    fetchProducts(config.upsellCategory)
      .then(function (products) {
        var container = document.getElementById('cs-products');
        if (!container) return;
        if (!products.length) { closePopup(); return; }
        container.innerHTML = products.map(function (p) { return buildCard(p, config.discount); }).join('');
        container.addEventListener('click', function (e) {
          var btn = e.target.closest('.cs-add-btn');
          if (btn) handleAdd(btn);
        });
      })
      .catch(closePopup);
  }

  function closePopup() {
    var sheet    = document.getElementById('cs-sheet');
    var backdrop = document.getElementById('cs-backdrop');
    if (!sheet) return;
    sheet.classList.remove('cs-open');
    backdrop.classList.remove('cs-open');
    setTimeout(function () {
      if (sheet    && sheet.parentNode)    sheet.parentNode.removeChild(sheet);
      if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    }, 420);
  }

  function handleAdd(btn) {
    var productId = parseInt(btn.getAttribute('data-id'), 10);
    btn.disabled    = true;
    btn.textContent = '...';
    salla.cart.addItem({ id: productId, quantity: 1 })
      .then(function () {
        btn.textContent = '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u2713';
        btn.classList.add('cs-added');
        btn.disabled = true;
      })
      .catch(function () {
        btn.disabled    = false;
        btn.textContent = '\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629';
      });
  }

  function onCartAdded() {
    if (!activeConfig) return;
    if (document.getElementById('cs-backdrop')) return; // add came from inside our popup — skip
    openPopup(activeConfig);
  }

  function isProductPage() {
    if (document.body.classList.contains('product-single')) return true;
    var dl = window.dataLayer || [];
    for (var i = 0; i < dl.length; i++) {
      if (dl[i].page && dl[i].page.pageName === 'productShow') return true;
      if (dl[i].event === 'detail') return true;
    }
    return false;
  }

  function interceptCartAdd() {
    var origOpen = XMLHttpRequest.prototype.open;
    var origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
      this._csMethod = method;
      this._csUrl    = url;
      return origOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
      var xhr = this;
      if (xhr._csMethod === 'POST' && /\/store\/v1\/cart\/[^/]+\/item\/[^/]+\/add/.test(xhr._csUrl)) {
        xhr.addEventListener('load', function () {
          if (popupTriggered || !activeConfig) return;
          try {
            var resp = JSON.parse(xhr.responseText);
            if (!resp.success) return;
            console.log('[cs] cart add confirmed, showing popup');
            onCartAdded();
          } catch (e) { /* non-JSON response, ignore */ }
        });
      }
      return origSend.apply(this, arguments);
    };

    console.log('[cs] XHR cart-add interceptor attached');
  }

  function suppressSallaNativeOffer() {
    if (document.getElementById('cs-salla-block')) return;
    var st = document.createElement('style');
    st.id = 'cs-salla-block';
    st.textContent = 'salla-modal.s-offer-modal-type-categories,' +
                     'salla-modal.s-offer-modal-type-products{display:none!important;}';
    (document.head || document.documentElement).insertBefore(st, (document.head || document.documentElement).firstChild);

    // Swap modal-is-open → modal-is-closed so Salla re-enables page buttons
    new MutationObserver(function () {
      if (document.body.classList.contains('modal-is-open')) {
        document.body.classList.remove('modal-is-open');
        document.body.classList.add('modal-is-closed');
      }
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  function onCategoryIds(catIds) {
    activeConfig = matchConfig(catIds);
    console.log('[cs] matched config:', activeConfig);
    if (!activeConfig) { console.log('[cs] no matching cross-sell config — bailing'); return; }
    suppressSallaNativeOffer();
    fetchProducts(activeConfig.upsellCategory)
      .then(function (p) {
        console.log('[cs] pre-fetched', p.length, 'products');
        if (!p.length) { console.log('[cs] upsell category empty — disabling'); activeConfig = null; }
      })
      .catch(function (e) { console.warn('[cs] pre-fetch failed:', e); });
    interceptCartAdd();
  }

  function findDetailEntry() {
    var dl = window.dataLayer || [];
    for (var i = 0; i < dl.length; i++) {
      if (dl[i].event === 'detail' && dl[i].ecommerce && dl[i].ecommerce.detail) return dl[i];
    }
    return null;
  }

  function waitForDetailEvent() {
    var entry = findDetailEntry();
    if (entry) { console.log('[cs] detail entry found immediately'); resolveCategories(entry); return; }

    console.log('[cs] detail event not yet in dataLayer — intercepting push');
    var dl = window.dataLayer = window.dataLayer || [];
    var origPush = dl.push.bind(dl);
    var giveUpTimer = setTimeout(function () {
      dl.push = origPush;
      console.log('[cs] detail event never arrived — bailing');
    }, 10000);
    dl.push = function () {
      var result = origPush.apply(dl, arguments);
      var found = findDetailEntry();
      if (found) {
        clearTimeout(giveUpTimer);
        dl.push = origPush;
        console.log('[cs] detail entry captured via push intercept');
        resolveCategories(found);
      }
      return result;
    };
  }

  function init() {
    console.log('[cs] init fired, readyState:', document.readyState);
    if (!isProductPage()) { console.log('[cs] not a product page — bailing'); return; }
    console.log('[cs] product page confirmed');
    waitForDetailEvent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
