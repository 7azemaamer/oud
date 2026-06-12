/* float-cluster.js — hamtaro.sa floating widget cluster | v1.0.0 */
(function () {
  'use strict';

  if (document.getElementById('pe-fc-styles')) return;
  var s = document.createElement('style');
  s.id = 'pe-fc-styles';
  s.textContent = [
    ':root{--pe-green:#4CD964;--pe-bar-bg:rgba(255,255,255,.92);--pe-bar-shadow:rgba(0,0,0,.10);--pe-border:rgba(0,0,0,.08);--pe-border-hi:rgba(0,0,0,.14);--pe-text-dim:rgba(15,17,19,.60)}',
    'html.dark{--pe-bar-bg:rgba(17,17,17,.88);--pe-bar-shadow:rgba(0,0,0,.45);--pe-border:rgba(255,255,255,.07);--pe-border-hi:rgba(255,255,255,.13);--pe-text-dim:rgba(255,255,255,.52)}',
    '@keyframes pe-cluster-in{from{transform:translateY(-50%) translateX(72px);opacity:0}to{transform:translateY(-50%) translateX(0);opacity:1}}',
    '@keyframes pe-cluster-in-mob{from{transform:translateX(72px);opacity:0}to{transform:translateX(0);opacity:1}}',
    '@keyframes pe-cluster-shake{0%,70%,100%{transform:translateY(-50%) translateX(0)}73%{transform:translateY(-50%) translateX(-5px)}77%{transform:translateY(-50%) translateX(4px)}81%{transform:translateY(-50%) translateX(-3px)}85%{transform:translateY(-50%) translateX(0)}}',
    '@keyframes pe-cluster-shake-mob{0%,70%,100%{transform:translateX(0)}73%{transform:translateX(-5px)}77%{transform:translateX(4px)}81%{transform:translateX(-3px)}85%{transform:translateX(0)}}',
    '@keyframes pe-icon-pop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}',
    '#pe-float-cluster{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:990;display:flex;flex-direction:column;gap:3px;padding:8px 0 8px 8px;background:var(--pe-bar-bg);border:1px solid var(--pe-border-hi);border-right:none;border-radius:16px 0 0 16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:-3px 0 20px var(--pe-bar-shadow);animation:pe-cluster-in .55s cubic-bezier(.4,0,.2,1) 1.2s both,pe-cluster-shake 9s ease-in-out 6s infinite}',
    '.pe-fc-btn{position:relative;width:40px;height:40px;border-radius:11px;border:1px solid var(--pe-border);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--pe-text-dim);transition:background .22s ease,color .22s ease,border-color .22s ease,transform .22s ease;text-decoration:none;flex-shrink:0;padding:0}',
    '.pe-fc-btn:hover{transform:scale(1.08)}',
    '.pe-fc-btn svg{width:17px;height:17px;display:block;flex-shrink:0}',
    '.pe-fc-btn i{font-size:18px;line-height:1}',
    '.pe-fc-wa{color:rgba(37,211,102,.85)!important;border-color:rgba(37,211,102,.2)!important}',
    '.pe-fc-wa:hover{background:rgba(37,211,102,.12)!important;border-color:rgba(37,211,102,.5)!important;color:#25D366!important}',
    '.pe-fc-loyalty{color:rgba(246,166,35,.85)!important;border-color:rgba(246,166,35,.2)!important}',
    '.pe-fc-loyalty:hover{background:rgba(246,166,35,.12)!important;border-color:rgba(246,166,35,.5)!important;color:#F6A623!important}',
    '.pe-fc-discount{color:rgba(245,128,33,.85)!important;border-color:rgba(245,128,33,.2)!important}',
    '.pe-fc-discount:hover{background:rgba(245,128,33,.12)!important;border-color:rgba(245,128,33,.5)!important;color:#F58021!important}',
    '.pe-fc-bcio{color:rgba(86,177,255,.85)!important;border-color:rgba(86,177,255,.2)!important}',
    '.pe-fc-bcio:hover{background:rgba(86,177,255,.12)!important;border-color:rgba(86,177,255,.5)!important;color:#56B1FF!important}',
    '.pe-fc-label{position:absolute;right:calc(100% + 10px);top:50%;transform:translateY(-50%) translateX(8px);white-space:nowrap;background:var(--pe-bar-bg);border:1px solid var(--pe-border-hi);border-radius:8px;padding:5px 11px;font-size:11px;font-weight:700;color:var(--pe-text-dim);pointer-events:none;opacity:0;transition:opacity .2s ease,transform .2s ease;backdrop-filter:blur(12px);direction:rtl;box-shadow:0 2px 12px var(--pe-bar-shadow)}',
    '.pe-fc-btn:hover .pe-fc-label{opacity:1;transform:translateY(-50%) translateX(0)}',
    '.pe-fc-btn.pe-active{transform:scale(1.12)!important}',
    '.pe-fc-btn.pe-active .pe-fc-label{opacity:1!important;transform:translateY(-50%) translateX(0)!important}',
    '@media(max-width:767px){#pe-float-cluster{top:auto;bottom:200px;transform:none;animation:pe-cluster-in-mob .55s cubic-bezier(.4,0,.2,1) 1.2s both,pe-cluster-shake-mob 9s ease-in-out 6s infinite}}'
  ].join('');
  (document.head || document.documentElement).appendChild(s);

  function injectFloatWidgets() {
    if (document.getElementById('pe-float-cluster')) return;

    var waEl   = document.querySelector('#wa-angel a');
    var waHref = waEl ? waEl.getAttribute('href') : null;

    var svgMedal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>';
    var svgTag   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>';
    var svgBell  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';

    var html = '';
    if (waHref) {
      html += '<a class="pe-fc-btn pe-fc-wa" href="' + waHref + '" target="_blank" rel="noopener"><i class="sicon-whatsapp2"></i><span class="pe-fc-label">\u062a\u0648\u0627\u0635\u0644 \u0648\u0627\u062a\u0633\u0627\u0628</span></a>';
    }
    html += '<button class="pe-fc-btn pe-fc-loyalty" type="button">' + svgMedal + '<span class="pe-fc-label">\u0646\u0642\u0627\u0637 \u0627\u0644\u0648\u0644\u0627\u0621</span></button>';
    html += '<button class="pe-fc-btn pe-fc-discount" type="button">' + svgTag + '<span class="pe-fc-label">\u062e\u0635\u0645 \u062e\u0627\u0635 \u0644\u0643</span></button>';
    html += '<button class="pe-fc-btn pe-fc-bcio" type="button">' + svgBell + '<span class="pe-fc-label">\u0644\u0627 \u064a\u0641\u0648\u062a\u0643</span></button>';

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
      triggerOriginal(document.getElementById('launcher'), document.querySelector('#launcher .lfy-cursor-pointer'));
    });
    cluster.querySelector('.pe-fc-discount').addEventListener('click', function () {
      triggerOriginal(document.getElementById('ZN_Widget_Button_ZN_LV'), document.querySelector('#ZN_Widget_Button_ZN_LV .ZN_Widget_Button_Inner_ZN_LV'));
    });
    cluster.querySelector('.pe-fc-bcio').addEventListener('click', function () {
      triggerOriginal(document.querySelector('[data-testid="bcio__popupTeaser"]'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFloatWidgets);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(injectFloatWidgets); });
  }

})();
