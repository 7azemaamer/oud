/* cross-sell.js — hamtaro.sa cross-sell popup | v1.0.0 */
(function () {
  'use strict';

  if (document.getElementById('cs-styles')) return;
  var s = document.createElement('style');
  s.id = 'cs-styles';
  s.textContent = [
    ':root{--cs-green:#4CD964;--cs-green-dim:rgba(76,217,100,.12);--cs-green-glow:rgba(76,217,100,.22);--cs-red:#ff3b30;--cs-text:#0f1113;--cs-muted:#8a8f9e;--cs-border:#e8ebf4;--cs-card-bg:#ffffff;--cs-sheet-bg:#f7f8fc;--cs-r:20px;--cs-ease:cubic-bezier(.32,0,.15,1)}',
    '#cs-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;opacity:0;transition:opacity .35s var(--cs-ease);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}',
    '#cs-backdrop.cs-open{opacity:1}',
    '#cs-sheet{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:var(--cs-sheet-bg);border-radius:var(--cs-r) var(--cs-r) 0 0;box-shadow:0 -8px 40px rgba(0,0,0,.18);transform:translateY(100%);transition:transform .42s var(--cs-ease);direction:rtl;font-family:Cairo,Tajawal,Almarai,sans-serif;max-height:88vh;display:flex;flex-direction:column;overflow:hidden}',
    '#cs-sheet.cs-open{transform:translateY(0)}',
    '#cs-sheet::before{content:"";display:block;width:40px;height:4px;background:#d0d5e8;border-radius:99px;margin:10px auto 0;flex-shrink:0}',
    '#cs-header{display:flex;align-items:flex-start;justify-content:space-between;padding:12px 18px 14px;flex-shrink:0;border-bottom:1px solid var(--cs-border);background:#fff;gap:12px}',
    '#cs-header-main{display:flex;align-items:center;gap:12px;flex:1;min-width:0}',
    '#cs-discount-badge{display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ff3b30 0%,#c0392b 100%);color:#fff;font-size:15px;font-weight:900;padding:8px 12px;border-radius:12px;letter-spacing:-.01em;flex-shrink:0;box-shadow:0 4px 14px rgba(255,59,48,.35);line-height:1}',
    '#cs-header-text{min-width:0}',
    '#cs-title{font-size:15px;font-weight:800;color:var(--cs-text);line-height:1.3;margin:0 0 2px}',
    '#cs-subtitle{font-size:12px;color:var(--cs-muted);font-weight:500;margin:0;line-height:1.3}',
    '#cs-close{background:#eef0f7;border:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;color:#666;flex-shrink:0;margin-top:2px;transition:background .15s;padding:0;line-height:1}',
    '#cs-close:hover{background:#e0e3f0}',
    '#cs-products{display:flex;flex-direction:row;gap:12px;overflow-x:auto;overflow-y:hidden;padding:16px 18px 8px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;flex-shrink:0}',
    '#cs-products::-webkit-scrollbar{display:none}',
    '.cs-skeleton{flex-shrink:0;width:148px;scroll-snap-align:start;background:#fff;border-radius:14px;border:1.5px solid var(--cs-border);overflow:hidden}',
    '.cs-skel-img{width:100%;height:120px;background:linear-gradient(90deg,#eef0f7 25%,#f7f8fc 50%,#eef0f7 75%);background-size:200% 100%;animation:cs-shimmer 1.4s infinite}',
    '.cs-skel-line{height:10px;border-radius:6px;background:linear-gradient(90deg,#eef0f7 25%,#f7f8fc 50%,#eef0f7 75%);background-size:200% 100%;animation:cs-shimmer 1.4s infinite;margin:10px 12px 6px}',
    '.cs-skel-line.short{width:55%;margin-top:4px}',
    '.cs-skel-btn{height:32px;border-radius:8px;background:linear-gradient(90deg,#eef0f7 25%,#f7f8fc 50%,#eef0f7 75%);background-size:200% 100%;animation:cs-shimmer 1.4s infinite;margin:8px 12px 12px}',
    '@keyframes cs-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}',
    '.cs-card{flex-shrink:0;width:148px;scroll-snap-align:start;background:var(--cs-card-bg);border-radius:14px;border:1.5px solid var(--cs-border);overflow:hidden;display:flex;flex-direction:column;transition:border-color .2s,box-shadow .2s}',
    '.cs-card:hover{border-color:var(--cs-green);box-shadow:0 4px 18px var(--cs-green-dim)}',
    '.cs-card-img-wrap{width:100%;aspect-ratio:1;overflow:hidden;background:#f3f4f8}',
    '.cs-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s ease}',
    '.cs-card:hover .cs-card-img{transform:scale(1.04)}',
    '.cs-card-body{padding:9px 10px 10px;display:flex;flex-direction:column;gap:6px;flex:1}',
    '.cs-card-name{font-size:12px;font-weight:700;color:var(--cs-text);line-height:1.4;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.cs-card-pricing{display:flex;flex-direction:column;gap:1px}',
    '.cs-card-price{font-size:16px;font-weight:900;color:var(--cs-text);line-height:1;display:flex;align-items:center;gap:3px}',
    '.cs-card-price .cs-sar{font-size:12px;color:var(--cs-muted);font-style:normal}',
    '.cs-card-original{font-size:11px;font-weight:500;color:var(--cs-muted);text-decoration:line-through;line-height:1;display:flex;align-items:center;gap:2px}',
    '.cs-card-original .cs-sar-sm{font-size:9px;font-style:normal}',
    '.cs-save-tag{font-size:10px;font-weight:700;color:#1a7a32;background:var(--cs-green-dim);border-radius:6px;padding:2px 6px;display:inline-block;width:fit-content}',
    '.cs-add-btn{width:100%;background:var(--cs-text);color:#fff;border:none;border-radius:9px;padding:8px 10px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .2s,transform .1s;margin-top:auto;line-height:1}',
    '.cs-add-btn:hover{background:#1f2228}',
    '.cs-add-btn:active{transform:scale(.97)}',
    '.cs-add-btn:disabled{opacity:.65;cursor:default;transform:none}',
    '.cs-add-btn.cs-added{background:var(--cs-green);color:#fff}',
    '#cs-footer{text-align:center;font-size:11px;color:var(--cs-muted);font-weight:500;padding:6px 18px 18px;margin:0;flex-shrink:0;border-top:1px solid var(--cs-border);background:#fff}',
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
      triggerCategories: ['1090483385', '4760862'],
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
    var url = API_BASE + '/products?' + new URLSearchParams({
      source: 'categories',
      filterable: '1',
      'filters[category_id]': catId,
      'source_value[0]':      catId,
    });
    return fetch(url, { method: 'GET', headers: API_HDRS })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        var items = (res.data && res.data.data) || [];
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
    var raw        = p.price && (p.price.amount !== undefined ? p.price.amount : p.price);
    var price      = parseFloat(raw) || 0;
    var discounted = (price * (1 - discount / 100)).toFixed(2);
    var saved      = (price - parseFloat(discounted)).toFixed(2);
    var img        = p.thumbnail || (p.images && p.images[0] && (p.images[0].url || p.images[0])) || '';
    var name       = (p.name || '').replace(/</g, '&lt;');
    return '<div class="cs-card"><div class="cs-card-img-wrap"><img class="cs-card-img" src="' + img + '" alt="' + name + '" loading="lazy"></div><div class="cs-card-body"><p class="cs-card-name">' + name + '</p><div class="cs-card-pricing"><span class="cs-card-price">' + discounted + ' <i class="sicon-sar cs-sar"></i></span>' + (price > 0 ? '<span class="cs-card-original">' + price.toFixed(2) + ' <i class="sicon-sar cs-sar-sm"></i></span>' : '') + '</div>' + (saved > 0 ? '<span class="cs-save-tag">\u0648\u0641\u0651\u0631 ' + saved + ' \u0631.\u0633</span>' : '') + '<button class="cs-add-btn" data-id="' + p.id + '">\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629</button></div></div>';
  }

  function openPopup(config) {
    if (document.getElementById('cs-backdrop')) return;
    var backdrop = document.createElement('div');
    backdrop.id  = 'cs-backdrop';
    var sheet = document.createElement('div');
    sheet.id  = 'cs-sheet';
    sheet.setAttribute('dir', 'rtl');
    sheet.innerHTML =
      '<div id="cs-header"><div id="cs-header-main"><span id="cs-discount-badge">&minus;' + config.discount + '%</span><div id="cs-header-text"><p id="cs-title">' + config.title + ' ' + config.discount + '%</p><p id="cs-subtitle">' + config.subtitle + '</p></div></div><button id="cs-close" aria-label="\u0625\u063a\u0644\u0627\u0642">&#x2715;</button></div>' +
      '<div id="cs-products">' + buildSkeletons(4) + '</div>' +
      '<p id="cs-footer">\u0627\u0644\u062e\u0635\u0645 \u064a\u064f\u0637\u0628\u0651\u064e\u0642 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u0639\u0646\u062f \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629</p>';
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
    var sdk = window.salla || window.Salla;
    var promise = null;
    if (sdk && sdk.cart) {
      if      (typeof sdk.cart.addProduct === 'function') promise = sdk.cart.addProduct({ id: productId, quantity: 1 });
      else if (typeof sdk.cart.add        === 'function') promise = sdk.cart.add({ product_id: productId, quantity: 1 });
    }
    if (promise && typeof promise.then === 'function') {
      promise
        .then(function () {
          btn.textContent = '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629';
          btn.classList.add('cs-added');
          setTimeout(closePopup, 1400);
        })
        .catch(function () {
          btn.disabled    = false;
          btn.textContent = '\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629';
        });
    } else {
      btn.disabled    = false;
      btn.textContent = '\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629';
    }
  }

  function onCartAdded() {
    if (popupTriggered || !activeConfig) return;
    popupTriggered = true;
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

  function setupListeners() {
    var sdk = window.salla || window.Salla;
    console.log('[cs] sdk:', sdk ? 'found' : 'NOT FOUND');
    if (sdk && sdk.cart && sdk.cart.event) {
      if (typeof sdk.cart.event.onAdded === 'function') {
        sdk.cart.event.onAdded(function () { console.log('[cs] salla cart.event.onAdded fired'); onCartAdded(); });
        console.log('[cs] hooked into sdk.cart.event.onAdded');
      } else {
        console.warn('[cs] sdk.cart.event.onAdded is not a function');
      }
    } else {
      console.warn('[cs] sdk.cart.event not available');
    }
    document.addEventListener('click', function (e) {
      if (popupTriggered) return;
      var el = e.target.closest('salla-button[quick-buy], button[quick-buy]');
      if (!el) return;
      console.log('[cs] add-to-cart click detected, waiting 900ms...');
      setTimeout(onCartAdded, 900);
    }, true);
    console.log('[cs] click fallback listener attached');
  }

  function onCategoryIds(catIds) {
    activeConfig = matchConfig(catIds);
    console.log('[cs] matched config:', activeConfig);
    if (!activeConfig) { console.log('[cs] no matching cross-sell config — bailing'); return; }
    fetchProducts(activeConfig.upsellCategory)
      .then(function (p) { console.log('[cs] pre-fetched', p.length, 'products'); })
      .catch(function (e) { console.warn('[cs] pre-fetch failed:', e); });
    setupListeners();
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
