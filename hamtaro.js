/* ─────────────────────────────────────────────
   hamtaro.js — Hamtaro store enhancements
   Each feature is a self-contained IIFE with
   its own page guard via isPage().
───────────────────────────────────────────── */

/* Shared page-match helper (available to all features below) */
function isPage(patterns) {
  var path = window.location.pathname;
  return patterns.some(function (p) {
    return typeof p === 'string'
      ? path === p || path.startsWith(p + '/')
      : p.test(path);
  });
}

/* ─── Feature: Free-shipping milestone progress bar ───
   Pages: /cart  /ar/cart  /en/cart
─────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (!isPage(['/cart', '/ar/cart', '/en/cart'])) return;

  var THRESHOLD_SHIPPING = 299;
  var THRESHOLD_GIFT     = 399;
  var CURRENCY           = 'ر.س';
  var COLOR              = '#059b54';
  var RECS_URL           = 'https://hamtaro.sa/ar/category/DYEAZy?filters%5Bcategory_id%5D=484303284&sort=topRated';

  /* ── Styles ── */
  if (!document.getElementById('cfm-style')) {
    var s = document.createElement('style');
    s.id = 'cfm-style';
    s.textContent = `
      #cfm-wrap {
        padding: 14px 16px 12px;
        background: #f0faf4;
        border: 1px solid #c9e2d6;
        border-radius: 12px;
        margin: 8px 0;
        direction: rtl;
        font-family: Cairo, Tajawal, Almarai, sans-serif;
      }

      /* ── Phase row ── */
      .cfm-phase { padding: 10px 0 6px; transition: opacity .3s; }
      .cfm-phase.cfm-locked { opacity: .42; pointer-events: none; }
      .cfm-phase.cfm-done .cfm-track-wrap { display: none; }

      /* ── Phase header ── */
      .cfm-phase-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
      }
      .cfm-phase-icon { font-size: 1rem; line-height: 1; flex-shrink: 0; }
      .cfm-phase-label { font-size: .82rem; font-weight: 800; color: #14532d; flex: 1; }
      .cfm-phase-note {
        font-size: .66rem;
        font-weight: 700;
        color: #6b7280;
        background: #e5e7eb;
        border-radius: 20px;
        padding: 2px 8px;
        white-space: nowrap;
      }

      /* ── Track ── */
      .cfm-track-wrap { padding: 0 4px; margin-bottom: 5px; }
      .cfm-track {
        height: 7px;
        background: #cce8d8;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
      }
      .cfm-fill {
        height: 100%;
        border-radius: 20px;
        background: linear-gradient(270deg, #4ade80, ${COLOR});
        transition: width .6s cubic-bezier(.22,1,.36,1);
        position: absolute;
        right: 0; top: 0;
        max-width: 100%;
      }

      /* ── Status line ── */
      .cfm-phase-status {
        font-size: .75rem;
        color: #4a6558;
        font-weight: 600;
        line-height: 1.35;
        min-height: 16px;
      }
      .cfm-phase-status.cfm-status-done { color: ${COLOR}; font-weight: 800; }

      /* ── Divider ── */
      .cfm-divider { height: 1px; background: #c9e2d6; margin: 4px 0; }

      /* ── Recs row ── */
      #cfm-recs-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        direction: rtl;
      }
      #cfm-recs-row.hidden { display: none; }
      #cfm-recs-hint { font-size: .72rem; color: #4a6558; font-weight: 600; line-height: 1.35; flex: 1; }
      #cfm-recs-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
        padding: 6px 14px;
        background: ${COLOR};
        color: #fff;
        border-radius: 20px;
        font-size: .74rem;
        font-weight: 700;
        text-decoration: none;
        transition: opacity .2s;
        font-family: inherit;
      }
      #cfm-recs-btn:hover { opacity: .85; }
      @media (max-width: 480px) { #cfm-wrap { padding: 12px; } }
    `;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ── Update UI ── */
  function updateWidget(total) {
    var phase1   = document.getElementById('cfm-phase1');
    var phase2   = document.getElementById('cfm-phase2');
    var p1Fill   = document.getElementById('cfm-p1-fill');
    var p2Fill   = document.getElementById('cfm-p2-fill');
    var p1Status = document.getElementById('cfm-p1-status');
    var p2Status = document.getElementById('cfm-p2-status');
    var p1Icon   = document.getElementById('cfm-p1-icon');
    var p2Icon   = document.getElementById('cfm-p2-icon');
    var recsRow  = document.getElementById('cfm-recs-row');
    var recsHint = document.getElementById('cfm-recs-hint');
    if (!phase1 || !phase2) return;

    var shippingDone = total >= THRESHOLD_SHIPPING;
    var giftDone     = total >= THRESHOLD_GIFT;

    /* Show Phase 1 until 299 is reached, then switch to Phase 2 */
    phase1.style.display = shippingDone ? 'none' : '';
    phase2.style.display = shippingDone ? '' : 'none';

    /* ── Phase 1: Free Shipping ── */
    if (!shippingDone) {
      var p1Rem = (THRESHOLD_SHIPPING - total).toFixed(2);
      if (p1Fill)   p1Fill.style.width = Math.min(100, (total / THRESHOLD_SHIPPING) * 100).toFixed(2) + '%';
      if (p1Icon)   p1Icon.textContent = '🚚';
      if (p1Status) { p1Status.innerHTML = 'باقي <strong>' + p1Rem + ' ' + CURRENCY + '</strong> للشحن المجاني'; }
    }

    /* ── Phase 2: Free Gift ── */
    if (shippingDone) {
      if (p2Fill) p2Fill.style.width = Math.min(100, (total / THRESHOLD_GIFT) * 100).toFixed(2) + '%';
      if (giftDone) {
        if (p2Icon)   p2Icon.textContent = '✅';
        if (p2Status) { p2Status.className = 'cfm-phase-status cfm-status-done'; p2Status.textContent = '🎉 هديتك جاهزة وستُضاف لطلبك تلقائياً!'; }
      } else {
        var p2Rem = (THRESHOLD_GIFT - total).toFixed(2);
        if (p2Icon)   p2Icon.textContent = '🎁';
        if (p2Status) { p2Status.className = 'cfm-phase-status'; p2Status.innerHTML = 'باقي <strong>' + p2Rem + ' ' + CURRENCY + '</strong> للهدية المجانية'; }
      }
    }

    /* ── Recs row ── */
    if (recsRow) recsRow.classList.toggle('hidden', giftDone);
    if (recsHint) {
      recsHint.textContent = shippingDone
        ? 'باقي ' + (THRESHOLD_GIFT - total).toFixed(2) + ' ' + CURRENCY + ' للهدية! تسوّق الأكثر مبيعاً 🎁'
        : 'باقي ' + (THRESHOLD_SHIPPING - total).toFixed(2) + ' ' + CURRENCY + ' للشحن المجاني والهدية 🎁';
    }
  }

  /* ── Extract cart total + detect city ── */
  function extractTotal(res) {
    var d    = (res && res.data) || res || {};
    var cart = d.cart || d;
    var raw  = cart.sub_total || cart.total || cart.total_amount || 0;
    var n    = typeof raw === 'number' ? raw : parseFloat(String(raw).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  /* ── Fetch cart total ── */
  function refresh() {
    var sdk = window.salla || window.Salla;
    if (!sdk || !sdk.cart) return;
    try {
      var p = (typeof sdk.cart.details === 'function') ? sdk.cart.details()
            : (typeof sdk.cart.latest  === 'function') ? sdk.cart.latest()
            : null;
      if (p && typeof p.then === 'function') {
        p.then(function (res) { updateWidget(extractTotal(res)); }).catch(function () {});
      }
    } catch (e) {}
  }

  /* ── Build widget node ── */
  function buildWrap() {
    var w = document.createElement('div');
    w.id = 'cfm-wrap';
    w.innerHTML =
      '<div id="cfm-phase1" class="cfm-phase">' +
        '<div class="cfm-phase-header">' +
          '<span class="cfm-phase-icon" id="cfm-p1-icon">🚚</span>' +
          '<span class="cfm-phase-label">شحن مجاني</span>' +
          '<span class="cfm-phase-note">لعملاء الرياض فقط</span>' +
        '</div>' +
        '<div class="cfm-track-wrap"><div class="cfm-track">' +
          '<div class="cfm-fill" id="cfm-p1-fill" style="width:0%"></div>' +
        '</div></div>' +
        '<div class="cfm-phase-status" id="cfm-p1-status"></div>' +
      '</div>' +
      '<div id="cfm-phase2" class="cfm-phase" style="display:none">' +
        '<div class="cfm-phase-header">' +
          '<span class="cfm-phase-icon" id="cfm-p2-icon">🎁</span>' +
          '<span class="cfm-phase-label">هدية مجانية</span>' +
        '</div>' +
        '<div class="cfm-track-wrap"><div class="cfm-track">' +
          '<div class="cfm-fill" id="cfm-p2-fill" style="width:0%"></div>' +
        '</div></div>' +
        '<div class="cfm-phase-status" id="cfm-p2-status"></div>' +
      '</div>' +
      '<div id="cfm-recs-row">' +
        '<a id="cfm-recs-btn" href="' + RECS_URL + '" target="_blank">' +
          '<i class="sicon-fire"></i> تسوّق الآن!' +
        '</a>' +
        '<span id="cfm-recs-hint"></span>' +
      '</div>';
    return w;
  }

  /* ── Replace salla-conditional-offer when it appears ── */
  function doInject(target) {
    if (document.getElementById('cfm-wrap')) return;
    target.parentNode.replaceChild(buildWrap(), target);
    refresh();
  }

  function watchForTarget() {
    var existing = document.querySelector('salla-conditional-offer');
    if (existing) { doInject(existing); return; }
    var obs = new MutationObserver(function (muts, o) {
      var t = document.querySelector('salla-conditional-offer');
      if (t) { o.disconnect(); doInject(t); }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ── Boot ── */
  function boot() {
    watchForTarget();
    refresh();

    document.addEventListener('change', function (e) {
      var form = e.target && e.target.closest ? e.target.closest('[onchange*="cart.updateItem"]') : null;
      if (form) setTimeout(refresh, 600);
    });

    var sdk = window.salla || window.Salla;
    if (sdk && sdk.cart) {
      try {
        if (sdk.cart.event && typeof sdk.cart.event.onUpdated === 'function')
          sdk.cart.event.onUpdated(function (res) { updateWidget(extractTotal(res)); });
        if (sdk.cart.event && typeof sdk.cart.event.onAdded === 'function')
          sdk.cart.event.onAdded(function () { setTimeout(refresh, 500); });
      } catch (e) {}
    }

    if ('MutationObserver' in window) {
      new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          if (muts[i].removedNodes.length) { setTimeout(refresh, 400); return; }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/* ─── Add more features below, each in its own IIFE ───
  Example structure:

(function () {
  'use strict';
  if (!isPage(['/'])) return;   // home only
  // ... feature code
})();

──────────────────────────────────────────────────────── */
