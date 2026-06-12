/* product-page-refinement.js — hamtaro.sa product page enhancements | v1.0.0 */
(function () {
  if (document.getElementById('pe-refinement-styles')) return;
  var s = document.createElement('style');
  s.id = 'pe-refinement-styles';
  s.textContent = `:root {
  --pe-green:        #4CD964;
  --pe-green-dim:    rgba(76,217,100,.12);
  --pe-green-glow:   rgba(76,217,100,.22);
  --pe-green-border: rgba(76,217,100,.38);
  --pe-glass:        rgba(0,0,0,.03);
  --pe-glass-hover:  rgba(0,0,0,.06);
  --pe-border:       rgba(0,0,0,.08);
  --pe-border-hi:    rgba(0,0,0,.14);
  --pe-text:         #0f1113;
  --pe-text-dim:     rgba(15,17,19,.60);
  --pe-text-muted:   rgba(15,17,19,.38);
  --pe-bar-bg:       rgba(255,255,255,.92);
  --pe-bar-shadow:   rgba(0,0,0,.10);
  --pe-r-sm:  12px;
  --pe-r-md:  16px;
  --pe-r-lg:  24px;
  --pe-r-xl:  32px;
  --pe-ease:  cubic-bezier(.4,0,.2,1);
  --pe-dur:   .3s;
}

html.dark {
  --pe-green-border: rgba(76,217,100,.28);
  --pe-glass:        rgba(255,255,255,.03);
  --pe-glass-hover:  rgba(255,255,255,.055);
  --pe-border:       rgba(255,255,255,.07);
  --pe-border-hi:    rgba(255,255,255,.13);
  --pe-text:         #ffffff;
  --pe-text-dim:     rgba(255,255,255,.52);
  --pe-text-muted:   rgba(255,255,255,.32);
  --pe-bar-bg:       rgba(17,17,17,.88);
  --pe-bar-shadow:   rgba(0,0,0,.45);
}

[id^="product-"].flex {
  display:        flex !important;
  flex-direction: row !important;
  align-items:    flex-start !important;
  gap:            48px !important;
  padding:        24px 0 !important;
}

[id^="product-"] .sidebar {
  width:      45% !important;
  min-width:  45% !important;
  max-width:  45% !important;
  position:   sticky !important;
  top:        88px !important;
  background: var(--pe-glass) !important;
  border:     1px solid var(--pe-border) !important;
  border-radius: var(--pe-r-lg) !important;
  overflow:   hidden !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  padding:    0 !important;
  padding-bottom: 0 !important;
}

[id^="product-"] .main-content {
  width:     55% !important;
  max-width: 55% !important;
  padding:   4px 0 32px !important;
}

.main-content h1.da-tm,
.main-content > div > h1 {
  font-size:      clamp(26px, 3.2vw, 46px) !important;
  font-weight:    800 !important;
  line-height:    1.2 !important;
  letter-spacing: -.025em !important;
  color:          var(--pe-text) !important;
  margin-bottom:  12px !important;
  margin-top:     0 !important;
}

.main-content .price {
  margin: 8px 0 4px !important;
}

.main-content .price h2.total-price {
  font-size:      clamp(34px, 4.5vw, 54px) !important;
  font-weight:    800 !important;
  color:          var(--pe-text) !important;
  letter-spacing: -.035em !important;
  line-height:    1 !important;
  display:        inline-flex !important;
  align-items:    baseline !important;
  direction:      ltr !important;
  gap:            .1em !important;
}

.main-content .price h2.total-price i {
  font-size: .55em !important;
  vertical-align: .12em !important;
  opacity: .7 !important;
}

h2.total-price .pe-price-cents {
  font-size: .50em !important;
  vertical-align: .18em !important;
  opacity: .75;
}

.main-content .price h2.total-price.text-red-400 {
  color: #ff6b6b !important;
}

.main-content .price .before-price {
  font-size: 18px !important;
  opacity: .45 !important;
}

.main-content .price small.color-grey {
  display:     block !important;
  font-size:   11px !important;
  color:       var(--pe-text-muted) !important;
  margin-top:  4px !important;
  font-weight: 400 !important;
  letter-spacing: .01em !important;
}

.main-content a[href="#product-tabs"] salla-rating-stars .s-rating-stars-wrapper,
.main-content salla-rating-stars .s-rating-stars-wrapper {
  display:       inline-flex !important;
  align-items:   center !important;
  gap:           4px !important;
  background:    var(--pe-glass) !important;
  border:        1px solid var(--pe-border-hi) !important;
  border-radius: 100px !important;
  padding:       5px 12px !important;
  font-size:     12px !important;
}

.main-content salla-rating-stars .s-rating-stars-btn-star {
  width:  14px !important;
  height: 14px !important;
}

.main-content salla-rating-stars .s-rating-stars-btn-star svg {
  width:  14px !important;
  height: 14px !important;
  fill:   #FFD22F !important;
}

.main-content salla-rating-stars .s-rating-stars-reviews {
  color:       var(--pe-text-dim) !important;
  font-size:   11px !important;
  margin-right: 2px !important;
}

.main-content .product-availablity {
  display:       inline-flex !important;
  align-items:   center !important;
  gap:           7px !important;
  background:    var(--pe-green-dim) !important;
  border:        1px solid var(--pe-green-border) !important;
  border-radius: 100px !important;
  padding:       6px 14px !important;
  font-size:     13px !important;
  font-weight:   600 !important;
  color:         var(--pe-green) !important;
  margin:        12px 0 !important;
}

.main-content .product-availablity .product-available-dot {
  width:         7px !important;
  height:        7px !important;
  border-radius: 50% !important;
  background:    var(--pe-green) !important;
  flex-shrink:   0 !important;
  margin:        0 !important;
  animation:     pe-dot-pulse 2.2s ease-in-out infinite !important;
}

.main-content .product-availablity strong {
  color:       var(--pe-green) !important;
  font-weight: 600 !important;
}

@keyframes pe-dot-pulse {
  0%,100% { box-shadow: 0 0 0 0 var(--pe-green-glow); }
  50%     { box-shadow: 0 0 0 5px transparent; }
}

.pe-trust-pills {
  display:   flex !important;
  flex-wrap: wrap !important;
  gap:       7px !important;
  margin:    12px 0 !important;
}

.pe-trust-pill {
  display:       inline-flex !important;
  align-items:   center !important;
  gap:           6px !important;
  background:    var(--pe-glass) !important;
  border:        1px solid var(--pe-border-hi) !important;
  border-radius: 100px !important;
  padding:       6px 14px !important;
  font-size:     12px !important;
  font-weight:   600 !important;
  color:         var(--pe-text-dim) !important;
  transition:    background var(--pe-dur) var(--pe-ease),
                 border-color var(--pe-dur) var(--pe-ease),
                 color var(--pe-dur) var(--pe-ease) !important;
  cursor:        default !important;
}

.pe-trust-pill:hover {
  background:    var(--pe-green-dim) !important;
  border-color:  var(--pe-green-border) !important;
  color:         var(--pe-green) !important;
}

.pe-trust-pill-mark {
  color:       var(--pe-green) !important;
  font-size:   13px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
}

salla-installment {
  display: block !important;
}

.pe-payment-label {
  font-size:     11px !important;
  font-weight:   700 !important;
  letter-spacing: .08em !important;
  text-transform: uppercase !important;
  color:          var(--pe-text-muted) !important;
  margin-bottom:  10px !important;
  display:        block !important;
}

.tamara-product-widget,
#tabbyPromoWrapper,
.s-installment-emkan-wrapper,
.s-installment-madfu-wrapper,
.s-installment-mispay-wrapper,
.s-installment-rajehi-wrapper {
  background:    var(--pe-glass) !important;
  border:        1px solid var(--pe-border-hi) !important;
  border-radius: var(--pe-r-md) !important;
  margin-bottom: 8px !important;
  transition:    background var(--pe-dur) var(--pe-ease),
                 border-color var(--pe-dur) var(--pe-ease),
                 box-shadow var(--pe-dur) var(--pe-ease) !important;
}

.tamara-product-widget:hover,
#tabbyPromoWrapper:hover,
.s-installment-emkan-wrapper:hover,
.s-installment-madfu-wrapper:hover,
.s-installment-mispay-wrapper:hover,
.s-installment-rajehi-wrapper:hover {
  
  border-color: var(--pe-green-border) !important;
  box-shadow:   0 0 20px rgba(76,217,100,.09), inset 0 0 0 1px rgba(76,217,100,.1) !important;
}

section.weight.details,
section.is-sold.details,
section.is-remained.details {
  display: none !important;
}

.pe-stats-grid {
  display:               grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap:                   10px !important;
  margin:                16px 0 !important;
}

.pe-stat-card {
  background:    var(--pe-glass) !important;
  border:        1px solid var(--pe-border) !important;
  border-radius: var(--pe-r-md) !important;
  padding:       16px 12px !important;
  display:       flex !important;
  flex-direction: column !important;
  align-items:   center !important;
  gap:           6px !important;
  text-align:    center !important;
  transition:    transform var(--pe-dur) var(--pe-ease),
                 border-color var(--pe-dur) var(--pe-ease),
                 background var(--pe-dur) var(--pe-ease) !important;
}

.pe-stat-card:hover {
  transform:    translateY(-3px) !important;
  border-color: var(--pe-border-hi) !important;
  background:   var(--pe-glass-hover) !important;
}

.pe-stat-icon {
  font-size: 18px !important;
  color:     var(--pe-green) !important;
  line-height: 1 !important;
}

.pe-stat-value {
  font-size:   20px !important;
  font-weight: 800 !important;
  color:       var(--pe-text) !important;
  line-height: 1 !important;
}

.pe-stat-label {
  font-size:   11px !important;
  color:       var(--pe-text-muted) !important;
  font-weight: 500 !important;
  line-height: 1.3 !important;
}

salla-quantity-input .s-quantity-input-container {
  display:       flex !important;
  align-items:   center !important;
  height:        56px !important;
  border-radius: var(--pe-r-md) !important;
  border:        1px solid var(--pe-border-hi) !important;
  background:    var(--pe-glass) !important;
  overflow:      hidden !important;
  transition:    border-color var(--pe-dur) var(--pe-ease) !important;
}

salla-quantity-input .s-quantity-input-container:focus-within {
  border-color: var(--pe-green-border) !important;
}

salla-quantity-input .s-quantity-input-button {
  width:       52px !important;
  height:      100% !important;
  background:  transparent !important;
  border:      none !important;
  color:       var(--pe-text) !important;
  display:     flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor:      pointer !important;
  flex-shrink: 0 !important;
  transition:  background var(--pe-dur) var(--pe-ease),
               color var(--pe-dur) var(--pe-ease) !important;
}

salla-quantity-input .s-quantity-input-button:hover {
  background: var(--pe-green-dim) !important;
  color:      var(--pe-green) !important;
}

salla-quantity-input .s-quantity-input-button svg {
  width:  15px !important;
  height: 15px !important;
  fill:   currentColor !important;
}

salla-quantity-input .s-quantity-input-input {
  flex:       1 !important;
  height:     100% !important;
  background: transparent !important;
  border:     none !important;
  text-align: center !important;
  font-size:  17px !important;
  font-weight: 700 !important;
  color:      var(--pe-text) !important;
  min-width:  0 !important;
  outline:    none !important;
}

section.sticky-product-bar .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled),
form.product-form .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled) {
  height:        64px !important;
  border-radius: 18px !important;
  background:    linear-gradient(135deg, #4CD964 0%, #31c45a 100%) !important;
  color:         #000 !important;
  font-size:     16px !important;
  font-weight:   800 !important;
  border:        none !important;
  letter-spacing: .015em !important;
  box-shadow:    0 4px 28px rgba(76,217,100,.28) !important;
  transition:    transform var(--pe-dur) var(--pe-ease),
                 box-shadow var(--pe-dur) var(--pe-ease),
                 background var(--pe-dur) var(--pe-ease) !important;
}

section.sticky-product-bar .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled):hover,
form.product-form .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled):hover {
  transform:  translateY(-2px) !important;
  box-shadow: 0 8px 36px rgba(76,217,100,.42) !important;
  background: linear-gradient(135deg, #5cf076 0%, #3dd96b 100%) !important;
}

section.sticky-product-bar .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled):active,
form.product-form .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled):active {
  transform:  translateY(0) !important;
  box-shadow: 0 2px 14px rgba(76,217,100,.2) !important;
}

section.sticky-product-bar .s-fast-checkout-button {
  border-radius: 14px !important;
  border:        1px solid var(--pe-border-hi) !important;
  background:    var(--pe-glass) !important;
  color:         var(--pe-text-dim) !important;
  transition:    all var(--pe-dur) var(--pe-ease) !important;
}

section.sticky-product-bar .s-fast-checkout-button:hover {
  border-color: var(--pe-green-border) !important;
  background:   var(--pe-green-dim) !important;
  color:        var(--pe-green) !important;
}

.sidebar salla-slider .swiper-slide img {
  transition: transform .6s var(--pe-ease) !important;
  will-change: transform !important;
}

.sidebar salla-slider .swiper-slide:hover img {
  transform: scale(1.04) !important;
}

.sidebar .relative {
  overflow: visible !important;
}

.sidebar .relative::after {
  content:    '' !important;
  position:   absolute !important;
  bottom:     -32px !important;
  left:       50% !important;
  transform:  translateX(-50%) !important;
  width:      55% !important;
  height:     80px !important;
  background: radial-gradient(ellipse at center,
                rgba(76,217,100,.18) 0%,
                transparent 70%) !important;
  pointer-events: none !important;
  z-index:    0 !important;
  filter:     blur(18px) !important;
}

.s-product-tabs {
  margin-top: 32px !important;
}

.tabs.tabs__product {
  display:       flex !important;
  gap:           4px !important;
  background:    var(--pe-glass) !important;
  border-radius: 100px !important;
  padding:       4px !important;
  border:        1px solid var(--pe-border) !important;
  width:         fit-content !important;
  margin-bottom: 16px !important;
}

.tabs.tabs__product .tab-trigger {
  border-radius: 100px !important;
  padding:       8px 22px !important;
  font-size:     13px !important;
  font-weight:   600 !important;
  color:         var(--pe-text-dim) !important;
  border:        none !important;
  background:    transparent !important;
  text-decoration: none !important;
  white-space:   nowrap !important;
  transition:    background var(--pe-dur) var(--pe-ease),
                 color var(--pe-dur) var(--pe-ease) !important;
  display:       inline-flex !important;
  align-items:   center !important;
  gap:           6px !important;
}

.tabs.tabs__product .tab-trigger.is-active {
  background: var(--pe-green) !important;
  color:      #000 !important;
  font-weight: 700 !important;
}

.tabs.tabs__product .tab-trigger:not(.is-active):hover {
  background: var(--pe-glass-hover) !important;
  color:      var(--pe-text) !important;
}

.tabs-wrapper.tabs-wrapper__product {
  border:        1px solid var(--pe-border) !important;
  border-radius: 0 var(--pe-r-md) var(--pe-r-md) var(--pe-r-md) !important;
  background:    var(--pe-glass) !important;
}

.main-content .main-categoty {
  display: none !important;
}

section.sticky-product-bar {
  position:   fixed !important;
  bottom:     0 !important;
  left:       0 !important;
  right:      0 !important;
  z-index:    999 !important;
  background: var(--pe-bar-bg) !important;
  backdrop-filter:         blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-top: 1px solid var(--pe-border-hi) !important;
  border-radius: 0 !important;
  margin:     0 !important;
  padding:    12px 24px max(12px, env(safe-area-inset-bottom)) !important;
  transform:  translateY(110%) !important;
  transition: transform .38s var(--pe-ease) !important;
  box-shadow: 0 -8px 40px var(--pe-bar-shadow) !important;
}

section.sticky-product-bar.pe-bar-active {
  transform: translateY(0) !important;
}

section.sticky-product-bar .s-add-product-button-main button.s-button-element.s-button-primary:not(.s-button-disabled) {
  height:        52px !important;
  border-radius: 14px !important;
}

@keyframes pe-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.main-content > div > h1            { animation: pe-fade-up .5s var(--pe-ease) .05s both !important; }
.main-content .price                { animation: pe-fade-up .5s var(--pe-ease) .10s both !important; }
.main-content .product-availablity  { animation: pe-fade-up .5s var(--pe-ease) .15s both !important; }
.pe-trust-pills                     { animation: pe-fade-up .5s var(--pe-ease) .20s both !important; }
.pe-stats-grid                      { animation: pe-fade-up .5s var(--pe-ease) .25s both !important; }
.main-content salla-installment     { animation: pe-fade-up .5s var(--pe-ease) .30s both !important; }
.main-content salla-quantity-input  { animation: pe-fade-up .5s var(--pe-ease) .34s both !important; }
.main-content salla-add-product-button { animation: pe-fade-up .5s var(--pe-ease) .38s both !important; }

salla-offer {
  display: none !important;
}

#launcher {
  bottom: 80px !important;
}

section.sticky-product-bar salla-mini-checkout-widget,
section.sticky-product-bar .s-mini-checkout {
  display:     inline-flex !important;
  align-items: center !important;
  height:      52px !important;
  min-width:   120px !important;
  flex-shrink: 0 !important;
  border:      none !important;
  background:  transparent !important;
  overflow:    visible !important;
  cursor:      pointer !important;
}

.s-add-product-button-mini-checkout-content {
  display:         inline-flex !important;
  align-items:     center !important;
  justify-content: center !important;
  gap:             8px !important;
  padding:         0 16px !important;
  height:          100% !important;
  color:           var(--pe-text-dim) !important;
  font-size:       13px !important;
  font-weight:     600 !important;
  white-space:     nowrap !important;
  pointer-events:  none !important;
}

.s-add-product-button-mini-checkout-content svg {
  width:       16px !important;
  height:      16px !important;
  fill:        currentColor !important;
  opacity:     .7 !important;
  flex-shrink: 0 !important;
}

section.sticky-product-bar salla-mini-checkout-widget:hover .s-add-product-button-mini-checkout-content {
  color: var(--pe-green) !important;
}

section.sticky-product-bar salla-mini-checkout-widget:hover .s-add-product-button-mini-checkout-content svg {
  opacity: 1 !important;
}

salla-loyalty-points-banner .s-loyalty-points-banner-container,
salla-cashback-banner .s-cashback-banner-container {
  background:    var(--pe-glass) !important;
  border:        1px solid var(--pe-border-hi) !important;
  border-radius: var(--pe-r-md) !important;
  padding:       12px 16px !important;
  margin:        8px 0 !important;
  display:       flex !important;
  align-items:   center !important;
  gap:           12px !important;
  transition:    border-color var(--pe-dur) var(--pe-ease) !important;
}

salla-loyalty-points-banner .s-loyalty-points-banner-container:hover,
salla-cashback-banner .s-cashback-banner-container:hover {
  border-color: var(--pe-green-border) !important;
}

salla-loyalty-points-banner .s-loyalty-points-banner-container p,
salla-cashback-banner .s-cashback-banner-container p {
  color:       var(--pe-text) !important;
  font-size:   13px !important;
  font-weight: 500 !important;
  line-height: 1.5 !important;
  margin:      0 !important;
}

.s-loyalty-points-banner-icon,
.s-cashback-banner-icon {
  width:         36px !important;
  min-width:     36px !important;
  height:        36px !important;
  border-radius: 50% !important;
  background:    var(--pe-green-dim) !important;
  border:        1px solid var(--pe-green-border) !important;
  display:       flex !important;
  align-items:   center !important;
  justify-content: center !important;
}

.s-loyalty-points-banner-inner-icon svg path,
.s-cashback-banner-inner-icon svg path,
.s-cashback-banner-inner-icon svg g path {
  fill: var(--pe-green) !important;
}

.s-loyalty-points-banner-label,
.s-cashback-banner-label {
  color: var(--pe-text-dim) !important;
}

.s-loyalty-points-banner-description,
.s-cashback-banner-description {
  color: var(--pe-text-muted) !important;
}

salla-loyalty-points-banner .s-loyalty-points-banner-label:nth-child(2),
.s-cashback-banner-value {
  color:       var(--pe-green) !important;
  font-weight: 700 !important;
}

@media (max-width: 767px) {

  [id^="product-"].flex {
    flex-direction: column !important;
    gap:            24px !important;
    padding:        0 !important;
  }

  [id^="product-"] .sidebar {
    width:         100% !important;
    min-width:     100% !important;
    max-width:     100% !important;
    position:      static !important;
    border-radius: 0 !important;
    border-left:   none !important;
    border-right:  none !important;
    border-top:    none !important;
  }

  [id^="product-"] .main-content {
    width:     100% !important;
    max-width: 100% !important;
    padding:   0 16px 80px !important;
  }

  .main-content h1.da-tm { font-size: 26px !important; }
  .main-content .price h2.total-price { font-size: 34px !important; }

  .pe-stats-grid {
    grid-template-columns: repeat(3,1fr) !important;
    gap: 8px !important;
  }

  .pe-stat-value  { font-size: 17px !important; }
  .pe-stat-label  { font-size: 10px !important; }

  .tabs.tabs__product { width: 100% !important; }
  .tabs.tabs__product .tab-trigger { padding: 8px 16px !important; flex: 1 !important; justify-content: center !important; }

  
  section.sticky-product-bar {
    display:        flex !important;
    flex-direction: column !important;
    gap:            8px !important;
    padding:        10px 16px max(10px, env(safe-area-inset-bottom)) !important;
  }

  
  .sticky-product-bar__quantity {
    display: flex !important;
    width:   100% !important;
  }

  .sticky-product-bar__quantity salla-quantity-input,
  section.sticky-product-bar salla-quantity-input {
    flex:  1 !important;
    width: 100% !important;
  }

  .sticky-product-bar__quantity salla-quantity-input .s-quantity-input-container,
  section.sticky-product-bar salla-quantity-input .s-quantity-input-container {
    width:  100% !important;
    height: 44px !important;
  }

  
  section.sticky-product-bar > div:not(.sticky-product-bar__quantity) {
    display:     flex !important;
    align-items: stretch !important;
    gap:         8px !important;
    width:       100% !important;
  }

  section.sticky-product-bar salla-mini-checkout-widget,
  section.sticky-product-bar .s-mini-checkout {
    flex:   1 !important;
    height: 48px !important;
    width:  auto !important;
  }

  section.sticky-product-bar salla-add-product-button {
    flex:           1.5 !important;
    min-width:      0 !important;
  }

  section.sticky-product-bar salla-add-product-button.s-add-product-button-with-apple-pay {
    flex-direction: column !important;
    gap:            8px !important;
  }

  section.sticky-product-bar .s-add-product-button-main {
    width:     100% !important;
    min-width: 0 !important;
  }

  section.sticky-product-bar .s-add-product-button-main button.s-button-element {
    height: 48px !important;
    width:  100% !important;
  }

  section.sticky-product-bar salla-quick-buy {
    width:   100% !important;
    display: block !important;
  }

  section.sticky-product-bar apple-pay-button,
  section.sticky-product-bar .s-quick-buy-apple-pay {
    width:   100% !important;
    display: block !important;
    height:  48px !important;
  }

  
  #launcher {
    bottom: 155px !important;
  }

  #ZN_Widget_Button_ZN_LV {
    bottom:    155px !important;
    top:       auto !important;
    transform: none !important;
  }
}

html:not(.dark) .main-content h1.da-tm,
html:not(.dark) .main-content > div > h1 {
  color: #0f1113 !important;
}

html:not(.dark) .main-content .price h2.total-price {
  color: #0f1113 !important;
}

html:not(.dark) .main-content .price h2.total-price.text-red-400 {
  color: #d94040 !important;
}

html:not(.dark) .main-content .price .before-price,
html:not(.dark) .main-content .price small.color-grey {
  color: rgba(15,17,19,.45) !important;
}

html:not(.dark) .main-content salla-rating-stars .s-rating-stars-reviews {
  color: rgba(15,17,19,.55) !important;
}

html:not(.dark) .main-content .product-availablity strong {
  color: #2ea84a !important;
}

html:not(.dark) .pe-trust-pill {
  color: rgba(15,17,19,.60) !important;
}

html:not(.dark) .pe-stat-value {
  color: #0f1113 !important;
}

html:not(.dark) .pe-stat-label {
  color: rgba(15,17,19,.45) !important;
}

html:not(.dark) .pe-stat-icon {
  color: #2ea84a !important;
}

html:not(.dark) .pe-payment-label {
  color: rgba(15,17,19,.45) !important;
}

html:not(.dark) .tabs.tabs__product .tab-trigger:not(.is-active) {
  color: rgba(15,17,19,.65) !important;
}

html:not(.dark) .s-add-product-button-mini-checkout-content {
  color: rgba(15,17,19,.65) !important;
}

html:not(.dark) salla-loyalty-points-banner .s-loyalty-points-banner-container p,
html:not(.dark) salla-cashback-banner .s-cashback-banner-container p {
  color: #0f1113 !important;
}

html:not(.dark) section.sticky-product-bar h2.da-tm,
html:not(.dark) section.sticky-product-bar .total-price {
  color: #0f1113 !important;
}

html:not(.dark) section.sticky-product-bar .before-price,
html:not(.dark) section.sticky-product-bar .text-gray-400 {
  color: rgba(15,17,19,.45) !important;
}

#launcher,
#wa-angel,
#ZN_Widget_Button_ZN_LV,
[data-testid="bcio__popupTeaser"] {
  opacity:        0 !important;
  pointer-events: none !important;
}

@keyframes pe-cluster-in {
  from { transform: translateY(-50%) translateX(72px); opacity: 0; }
  to   { transform: translateY(-50%) translateX(0);    opacity: 1; }
}
@keyframes pe-cluster-in-mob {
  from { transform: translateX(72px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes pe-cluster-shake {
  0%,70%,100% { transform: translateY(-50%) translateX(0); }
  73%  { transform: translateY(-50%) translateX(-5px); }
  77%  { transform: translateY(-50%) translateX(4px); }
  81%  { transform: translateY(-50%) translateX(-3px); }
  85%  { transform: translateY(-50%) translateX(0); }
}
@keyframes pe-cluster-shake-mob {
  0%,70%,100% { transform: translateX(0); }
  73%  { transform: translateX(-5px); }
  77%  { transform: translateX(4px); }
  81%  { transform: translateX(-3px); }
  85%  { transform: translateX(0); }
}
@keyframes pe-icon-pop {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.3); }
}

#pe-float-cluster {
  position:        fixed;
  right:           0;
  top:             50%;
  transform:       translateY(-50%);
  z-index:         990;
  display:         flex;
  flex-direction:  column;
  gap:             3px;
  padding:         8px 0 8px 8px;
  background:      var(--pe-bar-bg);
  border:          1px solid var(--pe-border-hi);
  border-right:    none;
  border-radius:   16px 0 0 16px;
  backdrop-filter:          blur(20px);
  -webkit-backdrop-filter:  blur(20px);
  box-shadow:      -3px 0 20px var(--pe-bar-shadow);
  animation:       pe-cluster-in .55s cubic-bezier(.4,0,.2,1) 1.2s both,
                   pe-cluster-shake 9s ease-in-out 6s infinite;
}

.pe-fc-btn {
  position:        relative;
  width:           40px;
  height:          40px;
  border-radius:   11px;
  border:          1px solid var(--pe-border);
  background:      transparent;
  display:         flex;
  align-items:     center;
  justify-content: center;
  cursor:          pointer;
  color:           var(--pe-text-dim);
  transition:      background .22s ease, color .22s ease,
                   border-color .22s ease, transform .22s ease;
  text-decoration: none;
  flex-shrink:     0;
  padding:         0;
}

.pe-fc-btn:hover { transform: scale(1.08); }

.pe-fc-btn svg { width: 17px; height: 17px; display: block; flex-shrink: 0; }
.pe-fc-btn i   { font-size: 18px; line-height: 1; }

.pe-fc-wa       { color: rgba(37,211,102,.85) !important; border-color: rgba(37,211,102,.2) !important; }
.pe-fc-wa:hover { background: rgba(37,211,102,.12) !important; border-color: rgba(37,211,102,.5) !important; color: #25D366 !important; }

.pe-fc-loyalty       { color: rgba(246,166,35,.85) !important; border-color: rgba(246,166,35,.2) !important; }
.pe-fc-loyalty:hover { background: rgba(246,166,35,.12) !important; border-color: rgba(246,166,35,.5) !important; color: #F6A623 !important; }

.pe-fc-discount       { color: rgba(245,128,33,.85) !important; border-color: rgba(245,128,33,.2) !important; }
.pe-fc-discount:hover { background: rgba(245,128,33,.12) !important; border-color: rgba(245,128,33,.5) !important; color: #F58021 !important; }

.pe-fc-bcio       { color: rgba(86,177,255,.85) !important; border-color: rgba(86,177,255,.2) !important; }
.pe-fc-bcio:hover { background: rgba(86,177,255,.12) !important; border-color: rgba(86,177,255,.5) !important; color: #56B1FF !important; }

.pe-fc-label {
  position:     absolute;
  right:        calc(100% + 10px);
  top:          50%;
  transform:    translateY(-50%) translateX(8px);
  white-space:  nowrap;
  background:   var(--pe-bar-bg);
  border:       1px solid var(--pe-border-hi);
  border-radius: 8px;
  padding:      5px 11px;
  font-size:    11px;
  font-weight:  700;
  color:        var(--pe-text-dim);
  pointer-events: none;
  opacity:      0;
  transition:   opacity .2s ease, transform .2s ease;
  backdrop-filter: blur(12px);
  direction:    rtl;
  box-shadow:   0 2px 12px var(--pe-bar-shadow);
}

.pe-fc-btn:hover .pe-fc-label {
  opacity:   1;
  transform: translateY(-50%) translateX(0);
}

.pe-fc-btn.pe-active {
  transform: scale(1.12) !important;
}

.pe-fc-btn.pe-active .pe-fc-label {
  opacity:   1 !important;
  transform: translateY(-50%) translateX(0) !important;
}

@media (max-width: 767px) {
  #pe-float-cluster {
    top:       auto;
    bottom:    200px;
    transform: none;
    animation: pe-cluster-in-mob .55s cubic-bezier(.4,0,.2,1) 1.2s both,
               pe-cluster-shake-mob 9s ease-in-out 6s infinite;
  }
}`;
  (document.head || document.documentElement).appendChild(s);
})();

(function () {
  'use strict';

  
  function injectTrustPills() {
    const price = document.querySelector('.main-content .price');
    if (!price || document.querySelector('.pe-trust-pills')) return;

    const pills = [
      { icon: '✓', label: 'دفع آمن' },
      { icon: '✓', label: 'شحن سريع' },
      { icon: '✓', label: 'منتج أصلي' },
    ];

    const wrap = document.createElement('div');
    wrap.className = 'pe-trust-pills';

    pills.forEach(function (p) {
      const el = document.createElement('span');
      el.className = 'pe-trust-pill';
      el.innerHTML = '<span class="pe-trust-pill-mark">' + p.icon + '</span>' + p.label;
      wrap.appendChild(el);
    });

    price.insertAdjacentElement('afterend', wrap);
  }

  
  function injectPaymentLabel() {
    const inst = document.querySelector('.main-content salla-installment');
    if (!inst || inst.previousElementSibling && inst.previousElementSibling.classList.contains('pe-payment-label')) return;

    const lbl = document.createElement('span');
    lbl.className = 'pe-payment-label';
    lbl.textContent = 'خيارات الدفع بالتقسيط';
    inst.insertAdjacentElement('beforebegin', lbl);
  }

  
  function injectStatsGrid() {
    if (document.querySelector('.pe-stats-grid')) return;

    const soldSec     = document.querySelector('section.is-sold.details');
    const weightSec   = document.querySelector('section.weight.details');
    const remainedSec = document.querySelector('section.is-remained.details');

    
    if (!soldSec && !weightSec && !remainedSec) return;

    const stats = [];

    if (soldSec) {
      const val = soldSec.querySelector('.sold-count');
      if (val) stats.push({ icon: 'sicon-fire',         value: val.textContent.trim() + '+', label: 'عملية شراء' });
    }
    if (weightSec) {
      const val = weightSec.querySelector('.product-weight');
      if (val) stats.push({ icon: 'sicon-luggage-cart', value: val.textContent.trim(),        label: 'الوزن' });
    }
    if (remainedSec) {
      const val = remainedSec.querySelector('.details__action span');
      if (val) stats.push({ icon: 'sicon-box-bankers',  value: val.textContent.trim(),        label: 'الكمية المتبقية' });
    }

    if (!stats.length) return;

    const grid = document.createElement('div');
    grid.className = 'pe-stats-grid';

    stats.forEach(function (s) {
      const card = document.createElement('div');
      card.className = 'pe-stat-card';
      card.innerHTML =
        '<i class="pe-stat-icon ' + s.icon + '"></i>' +
        '<span class="pe-stat-value">'  + s.value + '</span>' +
        '<span class="pe-stat-label">'  + s.label + '</span>';
      grid.appendChild(card);
    });

    
    const anchor =
      document.querySelector('.pe-trust-pills') ||
      document.querySelector('.main-content .product-availablity') ||
      document.querySelector('.main-content salla-installment');

    if (anchor) anchor.insertAdjacentElement('afterend', grid);
  }

  
  function initStickyBar() {
    var bar = document.querySelector('section.sticky-product-bar');
    if (!bar) return;

    
    bar.classList.add('pe-bar-active');
  }

  
  function initGalleryFade() {
    const slides = document.querySelectorAll('.sidebar salla-slider .swiper-slide');
    if (!slides.length) return;

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    slides.forEach(function (s, i) {
      s.style.opacity = '0';
      s.style.transform = 'translateY(12px)';
      s.style.transition = 'opacity .5s ease ' + (i * 0.08) + 's, transform .5s ease ' + (i * 0.08) + 's';
      io.observe(s);
    });
  }

  
  function styleMinicheckoutShadow() {
    var widget = document.querySelector('section.sticky-product-bar salla-mini-checkout-widget');
    if (!widget) return;

    function tryInject() {
      if (!widget.shadowRoot) { setTimeout(tryInject, 120); return; }
      if (widget.shadowRoot.querySelector('.pe-mc-style')) return;

      var s = document.createElement('style');
      s.className = 'pe-mc-style';
      s.textContent = 'button.s-fast-checkout-button { all: unset; border-radius: 14px !important; width: 100%; height: 100% !improtant; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 16px; height: 52px; min-width: 120px; border-radius: 14px; border: 1px solid var(--pe-border-hi); background: var(--pe-glass); color: var(--pe-text-dim); font-size: 14px; font-weight: 600; font-family: inherit; white-space: nowrap; cursor: pointer; transition: border-color .3s ease, background .3s ease, color .3s ease; } button.s-fast-checkout-button:hover { border-color: var(--pe-green-border); background: var(--pe-green-dim); color: var(--pe-green); }';
      widget.shadowRoot.appendChild(s);
    }

    tryInject();
  }

  
  function injectFloatWidgets() {
    if (document.getElementById('pe-float-cluster')) return;

    var waEl   = document.querySelector('#wa-angel a');
    var waHref = waEl ? waEl.getAttribute('href') : null;

    var svgMedal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>';
    var svgTag   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>';
    var svgBell  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';

    var html = '';

    if (waHref) {
      html += '<a class="pe-fc-btn pe-fc-wa" href="' + waHref + '" target="_blank" rel="noopener">' +
              '<i class="sicon-whatsapp2"></i>' +
              '<span class="pe-fc-label">تواصل واتساب</span></a>';
    }

    html += '<button class="pe-fc-btn pe-fc-loyalty" type="button">' +
            svgMedal + '<span class="pe-fc-label">نقاط الولاء</span></button>';

    html += '<button class="pe-fc-btn pe-fc-discount" type="button">' +
            svgTag + '<span class="pe-fc-label">خصم خاص لك</span></button>';

    html += '<button class="pe-fc-btn pe-fc-bcio" type="button">' +
            svgBell + '<span class="pe-fc-label">لا يفوتك</span></button>';

    var cluster = document.createElement('div');
    cluster.id = 'pe-float-cluster';
    cluster.innerHTML = html;
    document.body.appendChild(cluster);

    
    var fcBtns = cluster.querySelectorAll('.pe-fc-btn');
    var cycleIdx = 0;
    var cycleTimer = setInterval(function () {
      fcBtns.forEach(function (b) { b.classList.remove('pe-active'); });
      fcBtns[cycleIdx].classList.add('pe-active');
      cycleIdx = (cycleIdx + 1) % fcBtns.length;
    }, 1400);
    setTimeout(function () {
      clearInterval(cycleTimer);
      fcBtns.forEach(function (b) { b.classList.remove('pe-active'); });
    }, 1400 * fcBtns.length * 2 + 300);

    function triggerOriginal(el, clickTarget) {
      if (!el) return;
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('pointer-events', 'auto', 'important');
      (clickTarget || el).click();
      setTimeout(function () {
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
      }, 400);
    }

    cluster.querySelector('.pe-fc-loyalty').addEventListener('click', function () {
      var el = document.getElementById('launcher');
      triggerOriginal(el, el && el.querySelector('.lfy-cursor-pointer'));
    });

    cluster.querySelector('.pe-fc-discount').addEventListener('click', function () {
      var el = document.getElementById('ZN_Widget_Button_ZN_LV');
      triggerOriginal(el, el && el.querySelector('.ZN_Widget_Button_Inner_ZN_LV'));
    });

    cluster.querySelector('.pe-fc-bcio').addEventListener('click', function () {
      var el = document.querySelector('[data-testid="bcio__popupTeaser"]');
      triggerOriginal(el, el);
    });
  }

  function shrinkPriceDecimals() {
    document.querySelectorAll('h2.total-price, .sticky-product-bar .total-price').forEach(function (el) {
      if (el.querySelector('.pe-price-cents')) return;
      var node = Array.from(el.childNodes).find(function (n) {
        return n.nodeType === 3 && n.textContent.trim();
      });
      if (!node) return;
      var text   = node.textContent.trim();
      var dotIdx = text.indexOf('.');
      var icon   = el.querySelector('i[class*="sicon"]');
      var frag   = document.createDocumentFragment();

      
      var numWrap = document.createElement('span');
      numWrap.setAttribute('dir', 'ltr');
      numWrap.style.display = 'inline-flex';
      numWrap.style.alignItems = 'baseline';

      if (dotIdx !== -1) {
        numWrap.appendChild(document.createTextNode(text.slice(0, dotIdx)));
        var sup = document.createElement('span');
        sup.className = 'pe-price-cents';
        sup.textContent = text.slice(dotIdx);
        numWrap.appendChild(sup);
      } else {
        numWrap.appendChild(document.createTextNode(text));
      }

      if (icon) frag.appendChild(icon);
      frag.appendChild(numWrap);

      node.replaceWith(frag);
    });
  }

  function run() {
    if (!document.body.classList.contains('product-single')) return;
    injectTrustPills();
    injectPaymentLabel();
    injectStatsGrid();
    initStickyBar();
    initGalleryFade();
    styleMinicheckoutShadow();
    injectFloatWidgets();
    shrinkPriceDecimals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(run); });
  }
})();
