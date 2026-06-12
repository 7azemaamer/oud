# Salla platform notes

Patterns and gotchas for writing scripts on Salla stores.

---

## dataLayer

Salla pushes two separate entries. They arrive at different times:

```js
// Entry 1 — page metadata (arrives first, sync)
{ page: { pageName: 'productShow', fingerprint: '...' }, store: {...}, customer: {...} }

// Entry 2 — product detail (arrives slightly later, pushed by analytics)
{ event: 'detail', ecommerce: { detail: { products: [{ id, name, categories: [{id, name}], price, ... }] } } }
```

**Never assume entry 2 is there on first read.** Retry with a timeout:

```js
function tryWithRetry(fn, attempts, delay) {
  var result = fn();
  if (result !== null) return;
  if (attempts > 0) setTimeout(function () { tryWithRetry(fn, attempts - 1, delay); }, delay);
}
```

---

## Reading product categories

```js
function getPageCategoryIds() {
  var dl = window.dataLayer || [];
  for (var i = 0; i < dl.length; i++) {
    var e = dl[i];
    if (e.event === 'detail' && e.ecommerce && e.ecommerce.detail) {
      var prods = e.ecommerce.detail.products || [];
      if (prods.length && prods[0].categories) {
        return prods[0].categories.map(function (c) { return String(c.id); });
      }
    }
  }
  return [];
}
```

Category IDs are numbers in the dataLayer — stringify them for `indexOf` comparisons.

---

## Detecting product pages

```js
function isProductPage() {
  if (document.body.classList.contains('product-single')) return true;
  var dl = window.dataLayer || [];
  for (var i = 0; i < dl.length; i++) {
    if (dl[i].page && dl[i].page.pageName === 'productShow') return true;
    if (dl[i].event === 'detail') return true;
  }
  return false;
}
```

---

## Salla SDK (cart events)

The SDK is available as `window.salla` or `window.Salla`.

```js
// Hook into add-to-cart
var sdk = window.salla || window.Salla;
if (sdk && sdk.cart && sdk.cart.event && typeof sdk.cart.event.onAdded === 'function') {
  sdk.cart.event.onAdded(function () {
    // fires when item added to cart
  });
}
```

The SDK may not be ready when your script first runs. Check before hooking, and if unavailable fall back to a click listener (see below).

---

## Add-to-cart click fallback

Salla's add-to-cart buttons are `<salla-button>` web components or plain `<button>` elements with a `quick-buy` attribute.

```js
document.addEventListener('click', function (e) {
  var el = e.target.closest('salla-button[quick-buy], button[quick-buy]');
  if (!el) return;
  // give Salla ~900ms to process the cart request before reacting
  setTimeout(doSomething, 900);
}, true);  // capture phase so it fires even if the button stops propagation
```

---

## Shadow DOM / web components

Salla uses web components (`salla-button`, `salla-cart`, `salla-product-card`, etc.). Their internals are in a shadow root — `querySelector` won't reach them from outside.

```js
// Wrong — returns null
document.querySelector('salla-button .some-inner-class');

// Right — pierce the shadow root
var host = document.querySelector('salla-button');
if (host && host.shadowRoot) {
  var inner = host.shadowRoot.querySelector('.some-inner-class');
}
```

For styling shadow internals, use CSS custom properties (they pierce the boundary) or `::part()` if the component exposes parts.

---

## Cart modal / slide-over

The cart panel is `<salla-cart>`. It opens/closes via:

```js
// Open
document.dispatchEvent(new CustomEvent('cart:open'));
// or
(window.salla || window.Salla).cart.open();

// Close
document.dispatchEvent(new CustomEvent('cart:close'));
```

Listen for cart state changes:

```js
document.addEventListener('cart:updated', function (e) {
  console.log('cart updated', e.detail);
});
```

---

## Fetching products from the Salla API

```js
var API_BASE = 'https://api.salla.dev/store/v1';
var API_HDRS = {
  'accept':            '*/*',
  'accept-language':   'ar',
  'currency':          'SAR',
  's-country':         'SA',
  's-infinite-scroll': 'true',
  's-ray':             '50',
  's-source':          'twilight',
  's-user-id':         '<store-user-id>',
  's-version-id':      '<theme-version-id>',
  'store-identifier':  '<store-id>',
};

// Fetch products by category
fetch(API_BASE + '/products?' + new URLSearchParams({
  source:                   'categories',
  filterable:               '1',
  'filters[category_id]':   categoryId,
  'source_value[0]':        categoryId,
}), { method: 'GET', headers: API_HDRS })
  .then(function (r) { return r.json(); })
  .then(function (res) {
    var products = (res.data && res.data.data) || [];
  });
```

The `s-user-id`, `s-version-id`, and `store-identifier` values come from the store's existing API calls — copy them from the Network tab.

Response shape: `{ data: { data: [ { id, name, price: { amount }, images: [{ url }], ... } ] } }`

---

## Triggering third-party widgets (hidden originals)

Some Salla apps (loyalty, discount widgets) render their own floating buttons but you want to hide them and proxy through your own UI. Pattern:

```js
function triggerWidget(host, clickTarget) {
  if (!host) return;
  host.style.setProperty('opacity', '1', 'important');
  host.style.setProperty('pointer-events', 'auto', 'important');
  (clickTarget || host).click();
  setTimeout(function () {
    host.style.setProperty('opacity', '0', 'important');
    host.style.setProperty('pointer-events', 'none', 'important');
  }, 400);
}

// Examples
triggerWidget(
  document.getElementById('launcher'),                          // Loyalty (Loyale app)
  document.querySelector('#launcher .lfy-cursor-pointer')
);
triggerWidget(
  document.getElementById('ZN_Widget_Button_ZN_LV'),            // Discount widget
  document.querySelector('#ZN_Widget_Button_ZN_LV .ZN_Widget_Button_Inner_ZN_LV')
);
triggerWidget(
  document.querySelector('[data-testid="bcio__popupTeaser"]')    // BCIO notification widget
);
```

Hide the original widget via CSS `opacity:0; pointer-events:none` rather than `display:none` so the widget's own JS still works.

---

## Script injection timing

Salla injects custom-code scripts after the page has loaded (readyState is already `interactive` or `complete`). Safe pattern:

```js
(function () {
  function main() {
    // your code
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    // already past DOMContentLoaded — run next frame to let other scripts settle
    requestAnimationFrame(function () { requestAnimationFrame(main); });
  }
})();
```
