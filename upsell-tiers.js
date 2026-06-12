/* upsell-tiers.js — hamtaro.sa quantity upsell tiers | v1.0.0 */
(function () {
  if (document.getElementById('pe-upsell-styles')) return;
  var s = document.createElement('style');
  s.id = 'pe-upsell-styles';
  s.textContent = `/* ============================================================
   UPSELL QUANTITY TIERS — hamtaro.sa  |  Mobile-first s
   ============================================================ */
:root {
  --pe-green:        #4CD964;
  --pe-green-dim:    rgba(76,217,100,.10);
  --pe-green-glow:   rgba(76,217,100,.18);
  --pe-text:         #0f1113;
  --pe-border:       #dde1f0;
  --pe-card-bg:      rgba(230,234,255,.45);
  --pe-r:            14px;
  --pe-ease:         cubic-bezier(.4,0,.2,1);
  --pe-dur:          .2s;
}

.pe-upsell-wrap {
  margin: 18px 0;
  direction: rtl;
  font-family: Cairo, Tajawal, Almarai, sans-serif;
}

.pe-upsell-label {
  font-size: 20px;
  font-weight: bold;
  color: var(--pe-text);
  margin-bottom: 12px;
  letter-spacing: -.02em;
  direction: rtl;
  unicode-bidi: embed;
}

.pe-upsell-tiers {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pe-upsell-tier {
  position: relative;
  background: var(--pe-card-bg);
  border: 1.5px solid var(--pe-border);
  border-radius: var(--pe-r);
  padding: 13px 14px;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  transition: border-color var(--pe-dur) var(--pe-ease),
              box-shadow    var(--pe-dur) var(--pe-ease),
              transform     var(--pe-dur) var(--pe-ease);
}

.pe-upsell-tier:active {
  transform: scale(.985);
}

.pe-upsell-tier.pe-selected {
  background: #fff;
  border: 2px solid var(--pe-green);
  box-shadow: 0 4px 20px var(--pe-green-glow);
}

.pe-tier-corner-badge {
  position: absolute !important;
  top: -12px !important;
  left: 14px !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  padding: 3px 12px !important;
  border-radius: 999px !important;
  background: linear-gradient(135deg, #ff4e42 0%, #c0392b 100%) !important;
  color: #fff !important;
  letter-spacing: .04em !important;
  white-space: nowrap !important;
  box-shadow: 0 3px 10px rgba(192,57,43,.45), inset 0 1px 0 rgba(255,255,255,.20) !important;
  border: 1.5px solid rgba(255,255,255,.85) !important;
  text-shadow: 0 1px 2px rgba(0,0,0,.20) !important;
  display: inline-block !important;
  line-height: 1.5 !important;
}

.pe-tier-price-col {
  display: flex;
  flex-direction: column;
      align-items: flex-end;
  gap: 2px;
  min-width: 0;
}

.pe-tier-price {
    font-size: 23px !important;
    font-weight: bold !important;
  color: var(--pe-text);
  line-height: 1;
  letter-spacing: -.02em;
  white-space: nowrap;
}

.pe-tier-original {
  font-size: 12px;
  font-weight: 400;
  color: #aaa;
  text-decoration: line-through;
  line-height: 1;
}

.pe-tier-qty-col {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.pe-tier-qty-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.pe-tier-qty-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}

.pe-tier-qty {
    font-size: 19px !important;
    font-weight: bold !important;
  color: var(--pe-text);
  line-height: 1;
  white-space: nowrap;
}

.pe-tier-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 100px;
  line-height: 1.5;
  flex-shrink: 0;
  border: 1px solid;
  white-space: nowrap;
}

.pe-tier-badge--orange {
  background: rgba(245,128,33,.10);
  border-color: rgba(245,128,33,.30);
  color: #d06010;
}

.pe-tier-badge--green {
  background: rgba(76,217,100,.12);
  border-color: rgba(76,217,100,.35);
  color: #1e9a3a;
}

.pe-tier-badge--purple {
  background: rgba(110,90,220,.10);
  border-color: rgba(110,90,220,.25);
  color: #5b3fc8;
}

.pe-tier-save {
  font-size: 11px;
  font-weight: 600;
  color: #2b392d;
  line-height: 1;
}

.pe-tier-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  color: transparent;
  flex-shrink: 0;
  transition: background var(--pe-dur) var(--pe-ease),
              border-color var(--pe-dur) var(--pe-ease),
              color var(--pe-dur) var(--pe-ease);
}

.pe-upsell-tier.pe-selected .pe-tier-check {
  background: var(--pe-green);
  border-color: var(--pe-green);
  color: #fff;
}

@media (min-width: 768px) {
  .pe-tier-price { font-size: 24px; }
  .pe-tier-qty   { font-size: 15px; }
  .pe-upsell-tier { padding: 14px 18px; }
}`;
  (document.head || document.documentElement).appendChild(s);
})();

(function () {
  'use strict';

  var PRODUCTS = {

    'OqRgBgR': {
      unitPrice: 69,
      singular: 'حبل', 
      plural:   'أحبال',
      tiers: [
        { qty: 1,  discount: 0,  badge: null,          badgeColor: null,     cornerBadge: null },
        { qty: 2,  discount: 10, badge: null,          badgeColor: null,     cornerBadge: null },
        { qty: 4,  discount: 20, badge: 'أفضل سعراً', badgeColor: 'purple', cornerBadge: null },
        { qty: 6,  discount: 30, badge: 'أفضل قيمة',  badgeColor: 'green',  cornerBadge: 'الأكثر طلباً' }
      ]
    }

  };

  var CURRENCY_ICON = '<i class="sicon-sar" style="font-size:.65em;vertical-align:.1em;opacity:.8;"></i>';

  var slug = window.location.pathname.split('/').filter(Boolean).pop() || '';
  var UPSELL_CONFIG = PRODUCTS[slug] || null;

  function readUnitPrice() {
    if (UPSELL_CONFIG.unitPrice) return UPSELL_CONFIG.unitPrice;
    var el = document.querySelector('.main-content .price h2.total-price') ||
             document.querySelector('h2.total-price') ||
             document.querySelector('[class*="total-price"]');
    if (!el) return null;
    var n = parseFloat((el.textContent || el.innerText || '').replace(/[^\d.]/g, ''));
    return isNaN(n) ? null : n;
  }

  function setQuantity(qty) {
    var input = document.querySelector('salla-quantity-input input') ||
                document.querySelector('salla-quantity-input .s-quantity-input-input');
    if (!input) return;
    var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, qty);
    input.dispatchEvent(new Event('input',  { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function injectUpsellTiers() {
    if (document.querySelector('.pe-upsell-wrap')) return;
    if (!UPSELL_CONFIG) return;

    var unitPrice = UPSELL_CONFIG.unitPrice || readUnitPrice();
    if (unitPrice === null) return;

    var anchor = document.querySelector('section.sku.details') ||
                 document.querySelector('section.sku') ||
                 document.querySelector('.main-content salla-quantity-input') ||
                 document.querySelector('.main-content salla-add-product-button') ||
                 document.querySelector('.main-content .price');
    if (!anchor) return;

    var wrap = document.createElement('div');
    wrap.className = 'pe-upsell-wrap';

    var labelEl = document.createElement('div');
    labelEl.className = 'pe-upsell-label';
    labelEl.setAttribute('dir', 'rtl');
    labelEl.textContent = 'اختر الكمية';
    wrap.appendChild(labelEl);

    var list = document.createElement('div');
    list.className = 'pe-upsell-tiers';

    var selectedTier = null;

    UPSELL_CONFIG.tiers.forEach(function (tier, idx) {
      var totalBefore = parseFloat((unitPrice * tier.qty).toFixed(2));
      var totalAfter  = tier.discount > 0
        ? parseFloat((totalBefore * (1 - tier.discount / 100)).toFixed(2))
        : totalBefore;
      var saved       = parseFloat((totalBefore - totalAfter).toFixed(2));
      var qtyLabel    = tier.qty === 1
        ? (UPSELL_CONFIG.singular || 'علبة')
        : (UPSELL_CONFIG.plural   || 'علب');

      var card = document.createElement('div');
      card.className = 'pe-upsell-tier' + (idx === 0 ? ' pe-selected' : '');
      if (idx === 0) selectedTier = card; 

      if (tier.cornerBadge) {
        var corner = document.createElement('span');
        corner.className = 'pe-tier-corner-badge';
        corner.textContent = tier.cornerBadge;
        card.appendChild(corner);
      }

      var priceCol = document.createElement('div');
      priceCol.className = 'pe-tier-price-col';

      var priceEl = document.createElement('div');
      priceEl.className = 'pe-tier-price';
      priceEl.innerHTML = totalAfter + ' ' + CURRENCY_ICON;
      priceCol.appendChild(priceEl);

      if (tier.discount > 0) {
        var origEl = document.createElement('div');
        origEl.className = 'pe-tier-original';
        origEl.innerHTML = totalBefore + ' ' + CURRENCY_ICON;
        priceCol.appendChild(origEl);
      }

      var qtyCol = document.createElement('div');
      qtyCol.className = 'pe-tier-qty-col';

      var qtyInfo = document.createElement('div');
      qtyInfo.className = 'pe-tier-qty-info';

      var qtyRow = document.createElement('div');
      qtyRow.className = 'pe-tier-qty-row';

      var qtyEl = document.createElement('span');
      qtyEl.className = 'pe-tier-qty';
      qtyEl.textContent = tier.qty + ' ' + qtyLabel;
      qtyRow.appendChild(qtyEl);

      if (tier.badge) {
        var badgeEl = document.createElement('span');
        badgeEl.className = 'pe-tier-badge' + (tier.badgeColor ? ' pe-tier-badge--' + tier.badgeColor : '');
        badgeEl.textContent = tier.badge;
        qtyRow.appendChild(badgeEl);
      }

      qtyInfo.appendChild(qtyRow);

      if (tier.discount > 0) {
        var saveEl = document.createElement('div');
        saveEl.className = 'pe-tier-save';
        saveEl.innerHTML = 'وفّر ' + tier.discount + '% (' + saved + ' ' + CURRENCY_ICON + ')';
        qtyInfo.appendChild(saveEl);
      }

      var check = document.createElement('span');
      check.className = 'pe-tier-check';
      check.textContent = '✓';
      qtyCol.appendChild(check);

      qtyCol.appendChild(qtyInfo);

      card.appendChild(qtyCol);
      card.appendChild(priceCol); 

      card.addEventListener('click', function () {
        if (selectedTier) selectedTier.classList.remove('pe-selected');
        card.classList.add('pe-selected');
        selectedTier = card;
        setQuantity(tier.qty);
        var input = document.querySelector('salla-quantity-input input, salla-quantity-input .s-quantity-input-input');
        if (input) input.setAttribute('max', tier.qty);
      });

      list.appendChild(card);
    });

    wrap.appendChild(list);
    anchor.insertAdjacentElement('afterend', wrap);

    setQuantity(UPSELL_CONFIG.tiers[0].qty);
  }

  function findAnchor() {
    return document.querySelector('section.sku.details') ||
           document.querySelector('section.sku') ||
           document.querySelector('.main-content salla-quantity-input') ||
           document.querySelector('.main-content salla-add-product-button') ||
           document.querySelector('.main-content .price');
  }

  function run() {
    if (!UPSELL_CONFIG) return;
    if (document.querySelector('.pe-upsell-wrap')) return;
    if (findAnchor()) { injectUpsellTiers(); return; }
    var obs = new MutationObserver(function (muts, o) {
      if (document.querySelector('.pe-upsell-wrap')) { o.disconnect(); return; }
      if (findAnchor()) { o.disconnect(); injectUpsellTiers(); }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
