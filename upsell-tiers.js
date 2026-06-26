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

  /* ── Shared tiers: خصم كميات البوكسات ── */
  var BOX_TIERS = [
    { qty: 1, discount: 0, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 2, discount: 2, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 3, discount: 5, badge: 'أفضل قيمة', badgeColor: 'green', cornerBadge: null }
  ];

  /* ── Shared tiers: خصومات الطعام الرطب ── */
  var WET_FOOD_TIERS = [
    { qty: 1, discount: 0, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 2, discount: 2, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 3, discount: 3, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 4, discount: 5, badge: 'أفضل قيمة', badgeColor: 'green', cornerBadge: null }
  ];


  /* ── Shared tiers: خصم الرمل ── */
  var SAND_TIERS = [
    { qty: 1, discount: 0,  badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 2, discount: 2,  badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 3, discount: 5,  badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 4, discount: 10, badge: 'أفضل قيمة', badgeColor: 'green', cornerBadge: null }
  ];


  /* ── Shared tiers: خصومات المكافئات ── */
  var TREATS_TIERS = [
    { qty: 1, discount: 0, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 3, discount: 3, badge: null,          badgeColor: null,    cornerBadge: null },
    { qty: 5, discount: 6, badge: 'أفضل قيمة', badgeColor: 'green', cornerBadge: null }
  ];

  var PRODUCTS = {

    /* ── حبال ── */
    'OqRgBgR': {
      unitPrice: 69,
      singular: 'حبل',
      plural:   'أحبال',
      tiers: [
        { qty: 1, discount: 0,  badge: null,          badgeColor: null,     cornerBadge: null },
        { qty: 2, discount: 10, badge: null,          badgeColor: null,     cornerBadge: null },
        { qty: 4, discount: 20, badge: 'أفضل سعراً', badgeColor: 'purple', cornerBadge: null },
        { qty: 6, discount: 30, badge: 'أفضل قيمة',  badgeColor: 'green',  cornerBadge: 'الأكثر طلباً' }
      ]
    },

    /* ── خصم كميات البوكسات ── */
    'dbDWPDo': { unitPrice: 199,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس الصيف المنعش */
    'XegzlBb': { unitPrice: 195.01, singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس الاكثر طلبا */
    'vAxVQxn': { unitPrice: 122,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس التميز لقطط البالغة */
    'bwrovdW': { unitPrice: 222,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* البوكس المتكامل */
    'EXGAPeV': { unitPrice: 299,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* باي باي رائحة */
    'dbmjpKz': { unitPrice: 23,     singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس رون رون 4 نكهات */
    'lvxKPyW': { unitPrice: 149.01, singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* مناعه VIP */
    'WzABxQR': { unitPrice: 95,     singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس الكتين الاقتصادي */
    'ngPglpz': { unitPrice: 135,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس طعام القطط البالغة 25 قطعة */
    'VDjWKdl': { unitPrice: 398.99, singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس السعادة والتدليل الفاخر */
    'OyDxqqa': { unitPrice: 249,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* نافوره ستيل مع فلتر */
    'jZVbEeV': { unitPrice: 299,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس الكيتن المتكامل */
    'zvgrzVP': { unitPrice: 299,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس طعام القطط الشامل */
    'dPQjKOy': { unitPrice: 249,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس العناية بصحة ووزن القطط المعقمة */
    'mZwQRKo': { unitPrice: 199,    singular: 'بوكس', plural: 'بوكسات', tiers: BOX_TIERS }, /* بوكس الخير الشامل */

    /* ── خصومات الطعام الرطب ── */
    'QdPrePv': { unitPrice: 70,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي معقمة 12ظرف مشكل */
    'DpmPzOY': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كيت كات تونة روبيان 6×50 */
    'KRryDlK': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات دجاج 6×50 */
    'qGyWeqZ': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات تونة سمك صغار */
    'vAOrwZv': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات دجاج لحم بقري */
    'ABGXvxG': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات سلمون تونه 5×60 */
    'oZrPeZr': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات تونه دجاج 6×50 */
    'yKRovdO': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات تونه كلاسيك */
    'xvgydAo': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات دجاج للكتين */
    'oZrPEmb': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات تونة للكتين */
    'PDKyrBN': { unitPrice: 32,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات دجاج وسلمون */
    'ABRnnXQ': { unitPrice: 86,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* دولمه 12 حبه 3 نكهات */
    'EXKNaAB': { unitPrice: 135.7,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مكس بيسو 24 تونه مرق */
    'BpyKdEO': { unitPrice: 135.7,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مكس بيسو 24 دجاج مرق */
    'gygBRxO': { unitPrice: 135.7,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مكس بيسو 24 جيلي */
    'ngqmKdW': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان دجاج موس */
    'ngqmKDe': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان تونة موس كتين */
    'rRYmgYr': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان تونة دجاج جيلي */
    'BpBONxV': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان دجاج خضار جيلي */
    'pAbmOEP': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان تونة جيلي */
    'yKeYQoK': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان تونة جمبري */
    'wAnmxEX': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان ماكريل سلمون */
    'azPEDQK': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان ماكريل */
    'QzEBjEv': { unitPrice: 50,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* شيرمان تونة سلمون */
    'eQxOOov': { unitPrice: 101.43, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* هيلز سلمون مرقط معقمة */
    'ABXnQdE': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رون رون كبد دجاج بط */
    'rRqrwYl': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رون رون سلمون افوكادو */
    'vArvKXn': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رون رون تونه سمك ابيض */
    'ngWAKKq': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رون رون دجاج سلمون */
    'oZOAYER': { unitPrice: 113.48, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رويال كانين فرو بشرة */
    'mZgmaxj': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة حبار */
    'RvKrRBn': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا اندور تونا دجاج جيلي */
    'oZqoAbZ': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا اندور تونا دجاج مرق */
    'QzlBgxY': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا اندور دجاج جيلي */
    'YzDOjQQ': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونا شيراسو */
    'ZqPbBll': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونه كاتسوبوشي */
    'VDPvBpq': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة ضأن */
    'rRxmXdp': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة اسكالوب */
    'WzGKrQa': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة سلمون */
    'PDljgEg': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة سلمون مرق */
    'xvWmwyv': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة ضأن مرق */
    'DpYgepY': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونا دجاج جيلي */
    'jgoDojm': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي دجاج بط 24×80 */
    'ABPZYqQ': { unitPrice: 71.9,   singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي بالغه 12ظرف */
    'ngQdVAE': { unitPrice: 71.9,   singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي صغيرة وبالغة */
    'PDqzbVN': { unitPrice: 71.9,   singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي سينيور كبيرة */
    'bwzPKlK': { unitPrice: 71.9,   singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي صغيرة */
    'wAEnByK': { unitPrice: 101.43, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* هيلز كيتن سمك محيط */
    'RApbQwE': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي مشكل 24 */
    'QdPoOOz': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي دجاج يقطين */
    'PdAzarG': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي دجاج سبانخ */
    'mQVoWKN': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي دجاج جيلي معقمة 840 */
    'gZqPOBV': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي تونا جيلي معقمة 840 */
    'rAroNvr': { unitPrice: 57.75,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* فليكس بورينا تونة سالمون ساردين */
    'YgKeoaO': { unitPrice: 57.75,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* بورينا فليكس دجاج بط ضاني تركي */
    'mQVWABj': { unitPrice: 57.75,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* بورينا فليكس دجاج لحم امب */
    'qQBoNdv': { unitPrice: 57.75,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كارتون فليكسي متعدد */
    'aepOgeb': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي تونة دجاج كرات شعر */
    'vXWEQoa': { unitPrice: 101.43, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* هيلز معقمة دجاج */
    'zvQqGNl': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي كيتن موس تونة */
    'mQdajzN': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي موس سلمون صغيرة */
    'DGlomgb': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي كيتن موس دجاج */
    'PdpxjqG': { unitPrice: 113.48, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رويال كانين كيتن */
    'xAxYVYz': { unitPrice: 138.99, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لقمة دجاج تونه مرق 24 */
    'wWDZVwx': { unitPrice: 138.99, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لقمه دجاج مرق 24 */
    'zvQxVZG': { unitPrice: 138.99, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لقمه دجاج ماكريل مرق 24 */
    'jZrBDrK': { unitPrice: 138.99, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لقمه دجاج جيلي 24 */
    'XepYDVy': { unitPrice: 138.99, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لقمه دجاج تونه جيلي 24 */
    'AzVrbNA': { unitPrice: 92,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مستر كات سمك محيط جيلي */
    'ePpdNZP': { unitPrice: 92,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مستر كات سالمون محيط */
    'rAbDlen': { unitPrice: 92,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مستر كات سمك ابيض */
    'RAGaNKw': { unitPrice: 92,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مستر كات سمك محيط رنجة */
    'rAlxpAd': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي تونة مرق 840 */
    'xAnrRRY': { unitPrice: 113.48, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* رويال كانين جهاز بولي هضمي */
    'KjxwdGg': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي سينيور بالانس */
    'nEyrqov': { unitPrice: 57.75,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* فليكسي صغيرة 85×12 */
    'dPKeWpv': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي دجاج جزر */
    'rAavobZ': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي دجاج مرق */
    'BrlRxYq': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي تونة ساردين */
    'lGrjRyG': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي تونة انشوجه */
    'wWjlyGX': { unitPrice: 129.29, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ناتشورال كيتي تونة بالغة */
    'PdZNEaG': { unitPrice: 5.75,   singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كت كات تونا منزوع عظم دجاج 80ج */
    /* ── خصومات الطعام الرطب (out of stock) ── */
    'ngamORe': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة روبيان جيلي */
    'eQvqRxP': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونة لوبستر */
    'YzDOxVa': { unitPrice: 67.51,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كانيفا تونا دجاج مرق */
    'QzqdZQz': { unitPrice: 92,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مستر كات مشكل 24 */
    'DGqplRB': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا مأكولات بحرية */
    'RAwvGoY': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا سالمون */
    'bRewpWA': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات دجاج */
    'vXKAWPZ': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا مرق */
    'VqGDpvQ': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا انشوفه */
    'wWaADQy': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا روبيان */
    'vXKAWgx': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا سلطعون */
    'bRewpjN': { unitPrice: 31.29,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* لايف كات تونا لحم بقري */
    'KjWnzGn': { unitPrice: 147,    singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كيت كات موس التونة للكتين 24 */
    'BrdyXml': { unitPrice: 147,    singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كيت كات دجاج مهروس بالتونة 24 */
    'DGKvGVE': { unitPrice: 163.46, singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* كيت كات تونا بيضاء جبن حليب ماعز */
    'bRpExjx': { unitPrice: 70.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* ريقالوس طعام رطب بالغة */
    'xAxrlra': { unitPrice: 92,     singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* مستر كات سمك محيط دجاج 24 */
    'KjXyRdg': { unitPrice: 69.45,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* برامي تونا سالمون جلد وفرو */
    'pQvyqYz': { unitPrice: 99.41,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS }, /* هيلز ساينس بلان كبيرة لحم بقري */
    'aeylwQW': { unitPrice: 99.99,  singular: 'كرتون', plural: 'كراتين', tiers: WET_FOOD_TIERS },  /* هيلز ساينس بلان كبيرة دجاج مرق */


    /* ── خصم الرمل ── */
    'oZNyrzG': { unitPrice: 75,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كول اند كلين بيبي باودر */
    'bwGvKaa': { unitPrice: 75,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كول اند كلين لافندر */
    'zvpRVZE': { unitPrice: 75,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كول اند كلين غير معطر */
    'EXjzYxQ': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كلير كات الصبار 10 لتر */
    'EXKVqqr': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كويك بالكربون */
    'KRnVyRy': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كويك الصابون */
    'gygpVQK': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كويك بودرة الاطفال */
    'VDOpadW': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كويك اللافندر */
    'RvzAyOE': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بينتي ساندي صابون 5لتر */
    'NAxKjeq': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بينتي ساندي بيبي باودر 5لتر */
    'zopvApR': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بينتي ساندي لافندر 5لتر */
    'EXrVady': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل دريم كات الصبار 20 لتر */
    'lvryqGy': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل دريم كات الفانليا 20 لتر */
    'ngygGYb': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات الصابون 20 لتر */
    'xvBvjDK': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات بيبي باودر 10 لتر */
    'eQaQZAY': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات الكربون 10 لتر */
    'PDZDnQQ': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات الصابون 10لتر */
    'gybyPON': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات الصابون 5 لتر */
    'WzZznBw': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات بدون رائحة 5 لتر */
    'rRaRzqX': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات بدون رائحة 10 لتر */
    'xvBvjQa': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات الافندر 10 لتر */
    'lvrvPGr': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سوفت كات الافندر 5 لتر */
    'yKxxPDz': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتس واي الصبار 10 لتر */
    'YzXXdYE': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتس واي البيبي باودر 10 لتر */
    'XzYYyeN': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتس واي الافندر 10 لتر */
    'OyWWNZe': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتس واي الصابون 10 لتر */
    'XzYYYqD': { unitPrice: 52,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كلير كات بالكربون النشط 10 لتر */
    'WzXXXly': { unitPrice: 52,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كلير كات البيبي باودر */
    'mZyyDvz': { unitPrice: 52,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كلير كات الافندر */
    'ngddDeK': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كلير كات الصبار */
    'yKxxedD': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل رويال كات بالكربون النشط */
    'YzXXwyQ': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل رويال كات بدون رائحة */
    'mZyyney': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل رويال كات الصابون */
    'bwPPjQa': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل رويال كات لافندر */
    'YzXXYWw': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل رويال كات بيبي باودر */
    'YzXYVlW': { unitPrice: 129,    singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* انتر ساند بدون عطر 14 كيلو */
    'KRmRndj': { unitPrice: 69,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* حبيبات التوفو مكس كاتشر 2.8 ك */
    'zoxojdG': { unitPrice: 69,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* حبيبات التوفو كاتشر 2.8 ك */
    'VDEEmOm': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 20ك بدون رائحة */
    'YzQQjdp': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 5 لتر الصابون */
    'xvrrVPY': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 5 لتر بيبي باودر */
    'WzxxEvX': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 5 لتر اللافندر */
    'QzKKgpR': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 5 لتر بدون رائحة */
    'qGDDVwn': { unitPrice: 30,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 5 لتر بالكربون النشط */
    'BpwwDZB': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 10 لتر الصابون */
    'QzKKgbN': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 10 لتر بيبي باودر */
    'mZDDpgE': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 10 لتر اللافندر */
    'eQddRPP': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيسو 10 لتر بدون رائحة */
    'OydBBXo': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيبو 20 لتر البيبي بودر */
    'VDEAAbx': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيبو 20 لتر الكربون */
    'VDEAAAx': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيبو 20 لتر لافندر */
    'bwrXXjj': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيبو 20 لتر الياسمين */
    'GqaKKYw': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل بيبو 20 لتر الزهور */
    'BpwKXja': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتمنيا 10لتر الصابون */
    'WzxAGVa': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتمنيا 10 لتر البيبي بودر */
    'OydBqNq': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتمينا 10 لتر اللافندر */
    'rRzdvbG': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل دريم كات البيبي باودر 20 لتر */
    'ngGBrvW': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل دريم كات اللافندر 20 لتر */
    'PDnKoNW': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل دريم كات الكاربون النشط 20 لتر */
    'DpamWod': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل دريم كات الصابون 20 لتر */
    'YzYjeoD': { unitPrice: 115,    singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل ليندو كات ادفانس كربون فريش */
    'oZqyaKl': { unitPrice: 33.01,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل وندر وايت البيبي باودر 5 ك */
    'yKZnxjO': { unitPrice: 80.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل سيجنور غاتو الغسيل 15لتر */
    'QzqgBvv': { unitPrice: 33.01,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل وندر وايت صابون مارسليا 5 ك */
    'bReomxY': { unitPrice: 55,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل واندر وايت اللافندر */
    'DGqEPDP': { unitPrice: 29.35,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل جينغو البيبي باودر 5لتر */
    'zvgVayd': { unitPrice: 29.35,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* جينغو الياسمين 5لتر */
    'ePeAXER': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل روياليست الصابون 10لتر */
    'NKoQGZb': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* روياليست بودرة الاطفال 10لتر */
    'xAayQxg': { unitPrice: 35.7,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات برستيج بودرة الأطفال 5 لتر */
    'dPxlvyz': { unitPrice: 35.7,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات الافندر 5 لتر */
    'bROXAjW': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كاتمانيا تركى بدون رائحه 10 لتر */
    'DGvrZmB': { unitPrice: 63.25,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* سينيور غاتو الورد النقي 10 لتر */
    'aedOBeg': { unitPrice: 63.25,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل غاتو الازرق الناعم 10لتر */
    'ePOKBao': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كيت كات كلاسيك 10 لتر */
    'GYQmVwV': { unitPrice: 46,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كات بلس البيبي بودر 10 لتر */
    'aeGOaVR': { unitPrice: 129,    singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل انتر ساند عالي التكتل بدون رائحه 12 ك */
    'mQYqpoE': { unitPrice: 129,    singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل انترساند بودرة الأطفال 12 ك */
    'ydrmjXB': { unitPrice: 54,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كات بلس الاكتيف كربون 10 لتر */
    'gZbvArE': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كت كات الخوخ 10لتر */
    'vXRqoEZ': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كت كات فاكهة القهوة 10لتر */
    'ydrmNqK': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كت كات الورد 10لتر */
    'gZbvOjp': { unitPrice: 69,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كاتشر رمل الخشب الطبيعي المتكتل 2.4 كجم */
    'ZYZOeab': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل كت كات الشاي الاخضر 10لتر */
    'gZblOPp': { unitPrice: 69,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كاتشر رمل الخشب الطبيعي للتكتل 2.4 كجم */
    'ePaNDDP': { unitPrice: 103.5,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات ادفانس بودرة الاطفال */
    'WlZKwyV': { unitPrice: 55,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* وندر وايت 10ك صابون مارسليا */
    'nEymoYV': { unitPrice: 33.01,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل واندر وايت اللافندر 5 لتر */
    /* ── خصم الرمل (out of stock) ── */
    'XzdeAQw': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بينتي ساندي بدون ريحه 20 لتر */
    'GqQYKrP': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بينتي ساندي بيبي باودر 20 لتر */
    'rRpAjKQ': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بينتي ساندي لافندر 20 لتر */
    'ZqZqjKQ': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* سوفت كات بيبي باودر 20 لتر */
    'VDZDYwq': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* سوفت كات الافندر 20 لتر */
    'KRaRNan': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* سوفت كات بدون رائحة 20 لتر */
    'YzXzRmm': { unitPrice: 69,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* حبيبات التوفو مكس بونتونيت كاتشر 2.8 ك */
    'eQdOald': { unitPrice: 54.05,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو سوبر بريميوم معطر 10 لتر */
    'oZDyddb': { unitPrice: 54.05,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو سوبر بريميوم بدون رائحه 10 لتر */
    'zoyjwxd': { unitPrice: 54.05,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو سوبر بريميوم مالتي كات 10 لتر */
    'bwrrmEW': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بيسو 20 ك الصابون */
    'EXGGgDY': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بيسو 20 ك بيبي باودر */
    'NAyyXPB': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بيسو 20ك اللافندر */
    'VDEEmEv': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بيسو 20 ك بالكربون النشط */
    'vAjjOda': { unitPrice: 44,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بيسو 10 لتر بالكربون النشط */
    'PDvYnEV': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كات بلس البيبي بودر 5 لتر */
    'EXOmDgG': { unitPrice: 74.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* دريم كات بدون رائحه 20 لتر */
    'bRlDAwY': { unitPrice: 33.01,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* وندر وايت بدون رائحه 5 كيلو */
    'XeOQrYd': { unitPrice: 29.35,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* جينغو بالكربون 5لتر */
    'zvbAeBx': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كات بلس ر القهوة 5 لتر */
    'KjKyqDb': { unitPrice: 35.7,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات الصابون المنعش 5لتر */
    'mQdYmoG': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بايو ساند زهر العسل 5كيلو */
    'rAlyYWo': { unitPrice: 49.94,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل جونيور الصابون 10لتر */
    'OqPnYve': { unitPrice: 49.94,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* رمل جونيور الياسمين 10لتر */
    'BrgpPpA': { unitPrice: 24.99,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كات بلس ر الافندر 5 لتر */
    'nEOppgn': { unitPrice: 69,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* جينغو الياسمين 20لتر */
    'NKaWdKG': { unitPrice: 103.5,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات ابيض طبيعي بدون رائحة 15L */
    'vXVxNDx': { unitPrice: 103.5,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو ادفانس كلامبينغ 10 لتر */
    'BrmYrWa': { unitPrice: 55.56,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كت كات رمل نباتي بذور القهوة 2.5كيلو */
    'YgRBXeg': { unitPrice: 52.9,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات برستيج بودرة الأطفال 10 لتر */
    'mQrqyEP': { unitPrice: 52.9,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات الصابون المنعش 10 لتر */
    'DGQqlKw': { unitPrice: 28.75,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كات بلس الصابون 5 لتر */
    'KjxOdDG': { unitPrice: 129,    singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* انترساند النسيم 12كج */
    'RAZWEVY': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كت كات التفاح 10لتر */
    'aeyjWVg': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كيت كات التوت والفراولة 10 لتر */
    'wWjzoQW': { unitPrice: 50,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* كت كات الليمون 10لتر */
    'PdZonOD': { unitPrice: 69.01,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بايو ساند مطهر ومعطر 7.5 كيلو */
    'YgZaWRR': { unitPrice: 34.5,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* LONG FENG كريستال باللافندر 3.8 لتر */
    'YgZaWZo': { unitPrice: 103.5,  singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* ليندو كات ادفانس ملتي كات 12 لتر */
    'NKgZQAX': { unitPrice: 55,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* وندر وايت البيبي باودر 10 ك */
    'ydrlvWp': { unitPrice: 120.75, singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* بيوساند رمل ايطالي ناعم 15 لتر */
    'EZrRnPR': { unitPrice: 55,     singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }, /* وندر وايت بدون رائحه 10 كيلو */
    'qQvwaqd': { unitPrice: 52.9,   singular: 'كيس', plural: 'أكياس', tiers: SAND_TIERS }  /* ليندو كات الافندر 10 لتر */,

    /* ── خصومات المكافئات ── */
    'WzZaeKa': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات مكافآت سلمون والياف لمحاربه كرات الشعر 5*15 جرام */
    'XzZOXjq': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات مكافآت سلمون وحليب الماعز */
    'bwdeBKx': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات مكافآت تونة وصفار البيض 5*15 جرام */
    'mZwPRGy': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات مكافآت سمك السلمون وصفار البيض 5*5 جرام */
    'WzZaerz': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات مكافآت تونا وحليب الماعز 5*15 جرام */
    'jgBqPQB': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* ايس كريم مكافئات للقطط ريفوانا 12 جرام */
    'eQmZqAD': { unitPrice: 69.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاة لوليبوب متنوعه 15 حبه */
    'zoxrRbG': { unitPrice: 9.97   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاة لوليبوب دجاج مع التوت الاحمر */
    'azAKOjZ': { unitPrice: 9.97   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاة لوليبوب دجاج مع اليقطين */
    'dbEmRpd': { unitPrice: 9.97   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاة لوليبوب دجاج مع حليب الماعز */
    'NAWNRqV': { unitPrice: 9.97   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاة لوليبوب دجاج مع اعشاب الشعير */
    'qGazwwn': { unitPrice: 9.97   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاة لوليبوب دجاج مع التوت */
    'VDlvgme': { unitPrice: 13.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات شيرمان كريمي بالسلطعون 60 جرام (5×12 جرام ) */
    'ZqWbREn': { unitPrice: 13.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات شيرمان كريمي بالسلمون60 جرام (5×12 جرام ) */
    'azPEXRX': { unitPrice: 13.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات شيرمان كريمي بالتونه 60 جرام (5×12 جرام ) */
    'bwDQzyA': { unitPrice: 13.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات شيرمان كريمي بالتونه 60 جرام (5×12 جرام ) */
    'YzWBnaD': { unitPrice: 13.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات شيرمان كريمي بالجبنه والترافيل 60 جرام (5×12 جرام ) */
    'eQKvPmO': { unitPrice: 9.99   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سباركليز مكافأة للقطط بالدجاج للتحكم في كرات الشعر بالمعدة 4×15 جم */
    'KRybjgy': { unitPrice: 9.99   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سباركليز مكافأة للقطط بالتونة و السلمون لصحة الجهاز الهضمي 4×15 جرام */
    'EXqYZpx': { unitPrice: 9.99   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سباركليز مكافأة للقطط بالتونة والاسكالوب لصحة الجهاز البولي 4×15 جم */
    'ZqPvQvY': { unitPrice: 2.5    , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* فيلاين قو مكافات للقطط بقطع الدجاح الطرية مع صفار البيض 10 جم */
    'Qzljprq': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كانيفا مكافأة كريمية للقطط بالتونة واللوبستر وقطع الدجاج 4×15 جم */
    'gydzpjz': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كانيفا مكافأة كريمية للقطط بالتونة والمحار وقطع الدجاج 4×15 جم */
    'YzDaONq': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كانيفا مكافأة كريمية للقطط بقطع الدجاج المجمدة 4×15 جم */
    'lvWjXwj': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كانيفا مكافأة كريمية للقطط بالتونة والضأن مع قطع الدجاج 4×15 جم */
    'dbddoqA': { unitPrice: 84.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* عصار جيم كات ملتي فيتامين للقطط 100 جرام */
    'EXYYNvV': { unitPrice: 17.25  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات سنال توب مكس دجاج سلمون لحم 50 جرام */
    'rRRpXyX': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأت للقطط الصغيرة ام بت m-pet kitten بالتونة والدجاج */
    'jggYXQY': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأت للقطط ام بت m-pet لصحه الجلد والفرو بالسالمون والتونة */
    'WzzyrWd': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأت للقطط ام بت m-pet لصحة الجهاز الهضمي - ضأن وسلمون وتونة */
    'ABzwvDb': { unitPrice: 11.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافات للقطط مونيلو لتعزيز صحة الفم - دجاج والتفاح 80جم */
    'qGQveEN': { unitPrice: 11.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافات للقطط مونيلو لتعزيز المناعة باللحم والتوت 80جم */
    'RvAdlPE': { unitPrice: 11.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافات للقطط مونيلو لكرات الشعر - سلمون و موز 80جم */
    'ZqYnlqB': { unitPrice: 11.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافات للقطط المعقمه مونيلو للتحكم بالوزن - رومي و شوفان 80جم */
    'RAbBAEP': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* فيتاكرافت مكافآت للقطط بسمك السلمون + اوميجا 3 40جم */
    'AznAonE': { unitPrice: 19.55  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* بريت كير سناك للقطط الصغيرة سوبرفروت بالدجاج */
    'dPOEnvp': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات فيتا كرافت للقطط مع الدجاج 60جرام */
    'vXOxGnv': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافات قطط فيتاكرافت vitakraft بنكهة الدجاج والديك الرومي 5×15جم */
    'dPoxrYr': { unitPrice: 11.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* برامي مكافات بنكهة السالمون 50 جرام */
    'rANGPOw': { unitPrice: 11.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* برامي مكافات بنكهة الدجاج 50 جرام */
    'PdXmArG': { unitPrice: 11.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* برامي مكافات بنكهة البط والجبن 50 جرام */
    'nENolKV': { unitPrice: 11.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات برامي للقطط بنكهة التونا 50جرام */
    'GYQVbVz': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات القطط بالتونة والاسكالوب من ام بتس 4×15جم - M pets */
    'WlypOow': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات M-pets بالسلطعون 4×15جم */
    'aeGpYyl': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات M-pets بسمك القد واللحم البقري 4×15 جرام */
    'WlypOBz': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافآت للقطط ام بتس بالسالمون واللحم البقري 4×15 جم - M-pets */
    'ydpGwWO': { unitPrice: 34.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات اعشاب طريه للقطط */
    'lGrgaNW': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات كت كات ستيكس السالمون وسمك القد 3×5 جرام */
    'YgZqmog': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات ستيكس السالمون والسلطعون 3×5 جرام */
    'AzNoKRP': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات ستيكس السالمون الاطلاسي 3×5 جرام */
    'NKgbXOv': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات ستيكس السالمون بالتونه 3×5 جرام */
    'jZjORdV': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سانال كوب كرانبيري و دجاج بايتس */
    'lGrgRKg': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سانال كوب السلمون بايتس */
    'YgZqeVa': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سانال رعاية الأسنان */
    'NKgbQdV': { unitPrice: 16.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات قطط ميو me-O بسمك البينتو */
    'aeyjWvW': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* اينابا تشورو وصفة دجاج شورو بالجبن */
    'BrlVxmr': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* اينابا تشورو- دجاج مع وصفة المحار */
    'OqRNYWK': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سنال مكافئات قطط كريمي ستيكس دجاج 5×15 جرام */
    'AzNgjAY': { unitPrice: 14.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو للفرو والتونا 4×14 */
    'VqZdlRx': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو دجاج مع الجبنة 4×14غ */
    'ondwxRr': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو دجاج مع اللحم البقري 4×14غ */
    'gZbzEAd': { unitPrice: 69.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو دجاج مع اللحم البقري متنوع 20×14 */
    'bRdEDAw': { unitPrice: 69.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو دجاج متنوع 20×14 */
    'wWjgnyz': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو تونة مع جبنة 4×14غ */
    'DGBWwAw': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافات للقطط الصغيرة بالكاتنيب لتعزيز نشاطها 60 جم */
    'nEyrqxe': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافات للقطط الصغيرة لتعزيز نموها بشكل صحي 60 جم */
    'gZbzEGV': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافاءات بالسالمون 60جرام */
    'RAZBEdx': { unitPrice: 19.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات قطط سنال بايتس للعناية بالمفاصل 75غرام */
    'KjaqPPE': { unitPrice: 34.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* فيتامين جيم كات للقطط بالاعشاب مع عبير المرج الطازج */
    'ZYZNeqB': { unitPrice: 28.75  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات وجبة خفيفة مقرمشة للقطط بثلاث نكهات مختلفة 150 جرام */
    'OqRPXAa': { unitPrice: 69.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو تونا وماكولات بحريه متنوع 20×14 */
    'EZrWpnQ': { unitPrice: 17.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سنال مكافئات قطط بايتس بالجبنة 75غرام */
    'rAalevZ': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافئات 4×5جرام بلحم الخروف والدجاج */
    'AzNbvyQ': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافاءات باللحم البقري 60جرام */
    'ZYZNlwO': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* Jim Cat Multivitamin for Immune System Care for Cats – 50gلا */
    'RAZNlGn': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو تونه مع الجمبري4×14غ */
    'mQwlemV': { unitPrice: 69.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو تونا متنوع 20×14 */
    'ZYZNlbz': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو تونه مع نكهة السمك 4×14غ */
    'zvwlDmP': { unitPrice: 18.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو للفرو والجلد دجاج مع محار 4×14 */
    'qQKlemd': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو تونه مع الحم البقري 4×14غ */
    'EZrWpRR': { unitPrice: 18.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو للفرو والجلد تونا مع المحار 4×14 */
    'EZrWpwR': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سنال مكافئات قطط كريمي ستيكس سالمون 5×15 جرام */
    'NKgZYXv': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات مكافأة دجاج وألياف لكرات الشعر 15غ×4 */
    'pQvlegE': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافآت للقطط بالنعناع البري 40جم */
    'ydrlvxy': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* إينابا تشورو تونا مع الدجاج وصفة القط علاج 56 جرام */
    'EZrWppv': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* إينابا تشورو تونة مع سكالوب */
    'WlZNYYd': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* اينابا تشورو دجاج بنكهة الروبيان */
    'nEypeen': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* اينابا تشورو دجاج بوصفة السلطعون */
    'Brlgzzn': { unitPrice: 13.8   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة كت كات للقطط بالتونة والسالمون */
    'EZrWpNv': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سانال كوب تريو السمك */
    'xABldzG': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سانال كوب فيش بايتس سالمون */
    'EZrWpXY': { unitPrice: 54.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* عصار جيم كات صحي للقطط الصغيرة لتعزيز نمو العظام 50 جم */
    'NKgZQwq': { unitPrice: 14.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* بريت كير مكافأة للقطط للعنايه بالشعر 50 جم */
    'QdZAbaX': { unitPrice: 11.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* زولكس سناك ميني تشيكن ساندوتش 50 جم */
    'yKWnzZR': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات جنغل كرانشي سالمون */
    'eQOXvyy': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات جنغل كرانشي للجلد والشعر */
    'ngwrazr': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات جنغل كرانشي للجلد والشعر */
    'KRBqZEK': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات كيت كات بوريه بالدجاج 5*15جرام */
    'DpdWxEP': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات كيت كات بوريه بالسالمون 5*15جرام */
    'rRqxADQ': { unitPrice: 9.99   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سباركليز مكافأة للقطط بالدجاج لدعم الجهاز المناعي 4×15 جم */
    'dbbYDxa': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأت للقطط ام بت m-pet مضاد لكرات الشعر بالدجاج والتونة */
    'pAApXrK': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأت للقطط ام بت m-pet لصحة المسالك البولية بالديك الرومي والدجاج */
    'WlaZmYA': { unitPrice: 189.0  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* انابا تشورو مكافئات للقطط متنوعة بالتونه 60ظرف× 14جم */
    'vXvoqqP': { unitPrice: 19.55  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* بريت كير سناك للقطط سوبرفروت بسمك السالمون */
    'ZYzODrB': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة للقطط الصغيرة تورو بالدجاج والكاتسوبوبوشي 5×15جم */
    'wWvRjqV': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* فيتاكرافت مكافات للقطط بالسالمون والسمك 6×15جم */
    'RAmPnww': { unitPrice: 199.95 , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو تونا مع ماكولات بحريه متنوع 60×14 */
    'aeVeRQK': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات M-pets بالسالمون 4×15 جرام */
    'wWbjvGX': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة تورو كريمي للقطط بالدجاج و الخضروات 5×15جم */
    'lGErqmQ': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة تورو كريمي للقطط بالتونا و كاتسوبوشي (فيتامين E) 15×5جرام */
    'PdKZeoB': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة للقطط تورو كريمي بالتونا المجففة 15×5جم */
    'pQwvNNA': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة تورو كريمي للقطط بالتونا و الماكولات البحرية 15×5جرام */
    'xAgBKmb': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة تورو كريمي للقطط بالتونا و الماكولات البحرية 15×5جرام */
    'DGmBKbb': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة تورو بلس كريمي للقطط بالتونة والكاتسوبوشي مع الاكليل 5×15جرام */
    'aevybRv': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافات قطط تورو بلس كريمي لصحة الجهاز الهضمي بنكهة التونا مع المحار 5×15جم */
    'ZYEZwxP': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة القطط تورو بلس كريمي بالتونا مع السالمون لصحة العين 5×15جم */
    'ZYEZwWy': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافأة للقطط تورو بلس بالتونا لصحة الدماغ والجهاز العصبي 5×15جم */
    'NKxVmEm': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات M-pets بالتونة وجمبري 4×15 جرام */
    'jZYrWQq': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات M-pets بالدجاج 4×15 جرام */
    'aeGpYPb': { unitPrice: 14.82  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافآت القطط بالتونة من ام بتس 4×15جم - M pets */
    'qQplzwm': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات كت كات ستيكس الدجاج والتوت البري 3×5 جرام */
    'pQvDRGZ': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات كت كات ستيكس الدجاج والسالمون 3×5 جرام */
    'PdZRPXD': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات كت كات ستيكس السالمون والماكولات البحريه 3×5 جرام */
    'VqZQmBK': { unitPrice: 13.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كت كات ستيكس الدجاج والكرز 3×5 جرام */
    'KjaKPrD': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* اينابا تشورو تونة مع السلمون */
    'wWjzobX': { unitPrice: 15.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* اينابا تشورو مكافاة كريمية للقطط 4 قطع */
    'WlZvnER': { unitPrice: 12.65  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سنال اصابع صلصال حبش و كبدة 3*15 جرام */
    'OqRNEDr': { unitPrice: 11.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* زولكس شرائح البط 50 جم */
    'EZrDydG': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافاءات بالتاورين 60جرام */
    'WlZvQPR': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافاءات بالبط 60جرام */
    'RAZBgPy': { unitPrice: 28.75  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافاءات مكس ماكولات بحريه 150جرام */
    'bRdEDjj': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافئات رطبه قطط البط والتوت 60جرام */
    'OqRNYlD': { unitPrice: 19.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافاءات بحشوة الدجاج 60جرام */
    'dPKeldr': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافئات صحيه 3×5جرام الدجاج والتوت */
    'ydrneAb': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافئات صحيه 3×5جرام اللحم والتفاح */
    'GYyEvgE': { unitPrice: 17.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات قطط ميو me-O بالتونة مع حليب الماعز */
    'ZYZOeZY': { unitPrice: 125.35 , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافئات انابا تشورو متنوع دجاج 40 ظرف */
    'bRdNAzA': { unitPrice: 69.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافاءات انابا تشورو تونا مع ماكولات بحريه متنوع 20×14 */
    'qQKlebn': { unitPrice: 14.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كيت كات مكافأة للقطط يوغارت بصفار البيض 10جم */
    'xABldEw': { unitPrice: 14.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كيت كات مكافات للقطط يوغارت بالجبنة 10جم */
    'ydrlvnD': { unitPrice: 14.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات كيتن مكافات للقطط الصغيرة بالديك الرومي 3×3 جم */
    'NKgZYEb': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات فيتامين للقطط اقراص للعناية بالجهاز الهضمي 40 جم */
    'zvwlDOO': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مالتي فيتامين حبوب 40جرام */
    'ePaNDWq': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافآت للقطط للعناية بالأسنان 40 جم */
    'EZrWpag': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات فيتامين مكافآت للقطط للعناية بالفرو والجلد 40جرام */
    'DGBnzKE': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات كيتن اقراص للقطط الصغيرة لدعم نموها 40 جم */
    'DGBnzlE': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو تونة مع سلطعون 4×14غ */
    'nEypevN': { unitPrice: 15.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو دجاج مع سالمون 4×14غ */
    'XeZNEaB': { unitPrice: 18.99  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* مكافائات قطط انابا تشورو تونه للكتين 4×14غ */
    'jZjlAdR': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* جيم كات مكافآت للقطط اقراص غنية بالحليب 40 جم */
    'KjaXDdn': { unitPrice: 12.65  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* سنال اصابع صلصال السالمون للقطط 3*15غ */
    'ePaNDbX': { unitPrice: 11.5   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* زولكس سوشي كات دجاج 50 جرام */
    'OqRPaap': { unitPrice: 17.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كارنيلوف دجاج بالزعتر */
    'KjaXDDG': { unitPrice: 17.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كارنيلوف سلمون بالنعناع */
    'vXRlwwa': { unitPrice: 17.95  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كارنيلوف سناك شبه رطب بالسردين والبقدونس */
    'qQKleeY': { unitPrice: 23.0   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كانفيت التحكم في كرة الشعر فيتامين للقطط */
    'vXRlwrl': { unitPrice: 54.97  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* عصار جيم كات ملتي فيتامين للقطط 50 جرام */
    'QdZAbdv': { unitPrice: 14.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* بريت كير مكافأة للقطط للعناية بالاسنان -50 جرام */
    'ePaNDYR': { unitPrice: 14.98  , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }, /* كيت كات مكافات للقطط يوغارت اوجينال 10جم */
    'AzNgjDq': { unitPrice: 9.99   , singular: 'قطعة', plural: 'قطع', tiers: TREATS_TIERS }  /* مكافئات فيتا كرافت لقطط بالسمك 4*5 جرام */

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
        var comp  = document.querySelector('salla-quantity-input');
        var input = document.querySelector('salla-quantity-input input, salla-quantity-input .s-quantity-input-input');
        if (comp)  comp.setAttribute('max',  tier.qty);
        if (input) input.setAttribute('max', tier.qty);
        setQuantity(tier.qty);
      });

      list.appendChild(card);
    });

    wrap.appendChild(list);
    anchor.insertAdjacentElement('afterend', wrap);

    var initQty  = UPSELL_CONFIG.tiers[0].qty;
    var initComp = document.querySelector('salla-quantity-input');
    var initInp  = document.querySelector('salla-quantity-input input, salla-quantity-input .s-quantity-input-input');
    if (initComp) initComp.setAttribute('max', initQty);
    if (initInp)  initInp.setAttribute('max',  initQty);
    setQuantity(initQty);
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
