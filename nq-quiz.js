/* ─────────────────────────────────────────────────────────
   nq-quiz.js  v2.4.0 — hamtaro.sa
   · Colorful gradient cap header with animated orbs + shimmer
   · Per-option accent colors (orange / violet / sky / emerald / pink / red)
   · font-weight: bold everywhere (no 900) — promoted to !important via JS
   · Apple/Google-style result card: top info section + bottom price/CTA
   · Near-black pill CTA, tight badge pills
───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SK = 'hmqz_seen';
  if (localStorage.getItem(SK)) return;

  var CDN   = 'https://cdn.salla.sa/zvoeKA/';
  var STORE = 'https://hamtaro.sa';
  var G     = '#1A6B3A';
  var GD    = '#0B4D2A';

  /* ══ Option accent colors ══ */
  var OC = {
    kitten:     '#F97316',
    adult:      '#8B5CF6',
    sterilised: '#0EA5E9',
    value:      '#059669',
    variety:    '#EC4899',
    health:     '#EF4444'
  };
  function hexLight(hex) {
    var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return 'rgba('+r+','+g+','+b+',.08)';
  }
  function hexMid(hex) {
    var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return 'rgba('+r+','+g+','+b+',.15)';
  }

  /* ══ Products ══ */
  var PRODUCTS = [
    {
      key:'mostRequested', name:'بوكس الأكثر طلباً', sub:'أكثر من 30 قطعة',
      badge:'الأكثر طلباً', price:'195', cur:'ر.س',
      url: STORE+'/بوكس-الأكثر-طلباً/p1577619451',
      img: CDN+'e26fa770-6410-4605-9d03-51bc0d37a414-400x500-k1W3eSM6MMYUwUMgHfkkHUd0PRKeohemmnHNv6CJ.png',
      s:{ adult:3, variety:3, value:2, kitten:0, sterilised:0, health:1 }
    },
    {
      key:'kittenEcon', name:'بوكس الكيتن الاقتصادي', sub:'16 قطعة طعام رطب',
      badge:'للكيتن', price:'95', cur:'ر.س',
      url: STORE+'/بوكس-الكيتن-الاقتصادي/p1450244745',
      img: CDN+'450d1e57-c845-4929-96ac-561960452fe4-400x500-5fMdzTFSUV0PQrLgGSKqyuDdLdDz1D7LJLo83RkG.jpg',
      s:{ kitten:3, value:3, variety:2, adult:0, sterilised:0, health:1 }
    },
    {
      key:'sterilised', name:'البوكس التوفيري للمعقمة', sub:'30 قطعة جاف ورطب',
      badge:'للمعقمة', price:'222', cur:'ر.س',
      url: STORE+'/البوكس-التوفيري-للقطط-المعقمة/p1546392188',
      img: CDN+'f66a5472-1c91-4426-bf28-80b23d09d7fd-400x500-J5GqSz35qBjMXJucacQLz73phNleEZFAOD7mheYN.jpg',
      s:{ sterilised:3, health:3, value:1, kitten:0, adult:1, variety:1 }
    }
  ];

  /* ══ Icons ══ */
  var IC_PAW='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="15.5" rx="4.5" ry="3.5"/><circle cx="8.5" cy="9" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="15.5" cy="9" r="1.5"/><circle cx="6.5" cy="12.5" r="1.1"/><circle cx="17.5" cy="12.5" r="1.1"/></svg>';
  var IC_CAT='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 8.5v5C5 17.6 8.1 20 12 20s7-2.4 7-6.5v-5L16.2 5 15 8.2C14.1 8 13.1 7.8 12 7.8c-1.1 0-2.1.2-3 .4L7.8 5z"/><circle cx="9.5" cy="13.5" r=".7" fill="currentColor" stroke="none"/><circle cx="14.5" cy="13.5" r=".7" fill="currentColor" stroke="none"/><path d="M10.5 16q1.5 1 3 0"/></svg>';
  var IC_SHIELD='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L4 7v6c0 4.4 3.4 7.7 8 9 4.6-1.3 8-4.6 8-9V7z"/><path d="M9 12h6M12 9v6"/></svg>';
  var IC_COIN='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 7v10M9.5 9.5h3.5a2 2 0 010 4H9.5M9.5 13.5H14"/></svg>';
  var IC_GRID='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
  var IC_HEART='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>';
  var IC_X='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var IC_CHECK='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var IC_ARR='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  /* ══ Questions ══ */
  var QUESTIONS = [
    {
      id:'type', text:'قطتك...', note:'اختر ما يناسب قطتك لنرشح لك الأنسب',
      opts:[
        { key:'kitten',     label:'كيتن',  note:'من شهرين فأكثر', icon:IC_PAW,    tags:['kitten']     },
        { key:'adult',      label:'بالغة', note:'فوق السنة',        icon:IC_CAT,    tags:['adult']      },
        { key:'sterilised', label:'معقمة', note:'بعد التعقيم',      icon:IC_SHIELD, tags:['sterilised'] }
      ]
    },
    {
      id:'priority', text:'أهم شيء بالنسبة لك؟', note:'يساعدنا على اختيار البوكس المثالي',
      opts:[
        { key:'value',   label:'قيمة وسعر',   note:'أفضل صفقة بسعر مناسب',  icon:IC_COIN,  tags:['value']   },
        { key:'variety', label:'تنوع ونكهات', note:'خيارات أكثر لقطتك',      icon:IC_GRID,  tags:['variety'] },
        { key:'health',  label:'صحة وتخصص',  note:'تغذية مدروسة ومتوازنة',  icon:IC_HEART, tags:['health']  }
      ]
    }
  ];

  var step=0, tags=[], el={};

  function ranked() {
    return PRODUCTS.slice().sort(function(a,b){
      var sa=tags.reduce(function(n,t){return n+(a.s[t]||0);},0);
      var sb=tags.reduce(function(n,t){return n+(b.s[t]||0);},0);
      return sb-sa;
    });
  }

  /* ══ CSS — pseudo-selectors + keyframes only ══ */
  var CSS=[
    '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap");',

    /* Backdrop */
    '#hmqz-bd{position:fixed;inset:0;background:rgba(8,8,8,.5);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:9990;opacity:0;pointer-events:none;transition:opacity .3s ease;}',
    '#hmqz-bd.open{opacity:1;pointer-events:auto;}',

    /* Modal base */
    '#hmqz-m{background:#FFFFFF;border-radius:22px;direction:rtl;font-family:"Tajawal",system-ui,sans-serif;-webkit-font-smoothing:antialiased;box-shadow:0 32px 100px rgba(0,0,0,.22),0 2px 8px rgba(0,0,0,.04);}',
    '#hmqz-m::-webkit-scrollbar{display:none;}',

    /* Cap shimmer beam */
    '@keyframes hmqzBeam{0%{transform:translateX(150%) skewX(-20deg);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(-150%) skewX(-20deg);opacity:0}}',
    '.hmqz-beam{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.1) 50%,transparent 100%);width:45%;animation:hmqzBeam 4s ease infinite 1.5s;pointer-events:none;}',

    /* Floating orbs */
    '@keyframes hmqzOrb1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-9px) scale(1.08)}}',
    '@keyframes hmqzOrb2{0%,100%{transform:translateY(0) scale(1)}60%{transform:translateY(-6px) scale(.92)}}',
    '@keyframes hmqzOrb3{0%,100%{transform:translateY(-4px)}50%{transform:translateY(5px)}}',
    '.hmqz-orb{position:absolute;border-radius:50%;pointer-events:none;}',
    '.hmqz-orb-1{width:90px;height:90px;background:rgba(255,255,255,.06);top:-28px;left:-18px;animation:hmqzOrb1 4.2s ease infinite;}',
    '.hmqz-orb-2{width:55px;height:55px;background:rgba(255,255,255,.04);top:14px;left:62px;animation:hmqzOrb2 5.5s ease infinite 1s;}',
    '.hmqz-orb-3{width:130px;height:130px;background:rgba(255,255,255,.035);top:-52px;right:-28px;animation:hmqzOrb3 6.8s ease infinite .4s;}',
    '.hmqz-orb-4{width:36px;height:36px;background:rgba(255,255,255,.07);bottom:8px;left:38%;animation:hmqzOrb1 3.6s ease infinite .8s;}',

    /* Step dot active */
    '.hmqz-dot{height:6px;border-radius:999px;background:rgba(255,255,255,.28);transition:width .35s cubic-bezier(.16,1,.3,1),background .35s;}',
    '.hmqz-dot.on{background:#FFFFFF;}',

    /* Row hover/select — needs :hover pseudo */
    '#hmqz-m .hmqz-row:active{transform:scale(.982)!important;}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-radio span{display:flex!important;}',

    /* CTA hover */
    '#hmqz-m .hmqz-primary:hover .hmqz-cta{background:#1a1a1a!important;}',
    '#hmqz-m .hmqz-primary:hover{box-shadow:0 6px 24px rgba(0,0,0,.10)!important;transform:translateY(-1px)!important;}',
    '#hmqz-m .hmqz-alt:hover{border-color:#D1D5DB!important;background:#F9FAFB!important;}',
    '#hmqz-m .hmqz-alt:hover .hmqz-alt-arr{background:#0D0D0D!important;color:#fff!important;}',
    '#hmqz-m .hmqz-x-cap:hover{background:rgba(255,255,255,.3)!important;}',
    '#hmqz-m .hmqz-x-body:hover{background:#E5E7EB!important;}',
    '#hmqz-m .hmqz-restart:hover{color:#374151!important;}',

    /* Entrance animations */
    '@keyframes hmqzCapIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes hmqzRowIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes hmqzBounce{0%{transform:scale(1)}35%{transform:scale(.84)}65%{transform:scale(1.14)}100%{transform:scale(1)}}',
    '@keyframes hmqzCheckIn{from{transform:scale(0) rotate(-20deg)}60%{transform:scale(1.18) rotate(4deg)}to{transform:scale(1) rotate(0)}}',
    '@keyframes hmqzIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes hmqzPulseRing{0%{box-shadow:0 0 0 0 rgba(26,107,58,.3)}100%{box-shadow:0 0 0 7px rgba(26,107,58,0)}}',

    '#hmqz-m .hmqz-cap-content{animation:hmqzCapIn .3s cubic-bezier(.16,1,.3,1) both;}',
    '#hmqz-m .hmqz-row{animation:hmqzRowIn .4s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i,0)*70ms);}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-icon{animation:hmqzBounce .38s cubic-bezier(.34,1.56,.64,1);}',
    '#hmqz-m .hmqz-row.sel .hmqz-row-radio span{animation:hmqzCheckIn .28s cubic-bezier(.34,1.56,.64,1) both;}',
    '#hmqz-m .hmqz-row.sel{animation:hmqzPulseRing .5s ease-out;}',
    '#hmqz-m .hmqz-primary{animation:hmqzIn .42s cubic-bezier(.16,1,.3,1) .06s both;}',
    '#hmqz-m .hmqz-rec-lbl{animation:hmqzIn .3s cubic-bezier(.16,1,.3,1) both;}',
    '#hmqz-m .hmqz-alt:nth-of-type(1){animation:hmqzIn .38s cubic-bezier(.16,1,.3,1) .12s both;}',
    '#hmqz-m .hmqz-alt:nth-of-type(2){animation:hmqzIn .38s cubic-bezier(.16,1,.3,1) .22s both;}',
    '#hmqz-m .hmqz-restart{animation:hmqzIn .3s ease .3s both;}',

    '@media(prefers-reduced-motion:reduce){#hmqz-m *{animation:none!important;transition:none!important;}}'
  ].join('');

  /* ══ Inline style helpers ══ */
  function sp(node, prop, val) { node.style.setProperty(prop, val, 'important'); }

  /* After innerHTML render: upgrade every inline font-weight to !important */
  function fixFW(root) {
    root.querySelectorAll('[style*="font-weight"]').forEach(function(e) {
      var fw = e.style.fontWeight;
      if (fw) { e.style.removeProperty('font-weight'); e.style.setProperty('font-weight', fw, 'important'); }
    });
  }

  /* ══ Modal positioning — inline only, beats any store CSS ══ */
  function setModalClosed() {
    var p=el.m.style;
    [['position','fixed'],['z-index','9999'],['top','50%'],['left','50%'],
     ['width','min(480px, 92vw)'],['max-height','90dvh'],
     ['overflow-y','auto'],['overflow-x','hidden'],
     ['scrollbar-width','none'],['-webkit-overflow-scrolling','touch'],
     ['transform','translate(-50%,-50%) scale(.9)'],
     ['opacity','0'],['pointer-events','none'],
     ['transition','transform .44s cubic-bezier(.22,1,.36,1), opacity .3s ease']
    ].forEach(function(pair){ p.setProperty(pair[0],pair[1],'important'); });
  }
  function setModalOpen() {
    sp(el.m,'transform','translate(-50%,-50%) scale(1)');
    sp(el.m,'opacity','1');
    sp(el.m,'pointer-events','auto');
  }

  function open() {
    requestAnimationFrame(function(){
      el.bd.classList.add('open');
      setModalOpen();
    });
  }
  function close() {
    localStorage.setItem(SK,'1');
    el.bd.classList.remove('open');
    setModalClosed();
  }

  /* ══ Gradient cap for question screens ══ */
  function renderCap(qi) {
    var q=QUESTIONS[qi];
    var grads=[
      'linear-gradient(140deg,#093D20 0%,#1A6B3A 55%,#0D8A4E 100%)',
      'linear-gradient(140deg,#0C2D52 0%,#1D5FAA 55%,#0EA5E9 100%)'
    ];
    var grad=grads[qi%grads.length];
    var dots=QUESTIONS.map(function(_,i){
      var on=i===qi;
      return '<div class="hmqz-dot'+(on?' on':'')+'" style="width:'+(on?'22':'6')+'px;"></div>';
    }).join('');

    return (
      '<div class="hmqz-cap" style="background:'+grad+';border-radius:22px 22px 0 0;padding:18px 18px 22px;position:relative;overflow:hidden;">' +
        '<div class="hmqz-orb hmqz-orb-1"></div>' +
        '<div class="hmqz-orb hmqz-orb-2"></div>' +
        '<div class="hmqz-orb hmqz-orb-3"></div>' +
        '<div class="hmqz-orb hmqz-orb-4"></div>' +
        '<div style="position:absolute;inset:0;overflow:hidden;border-radius:22px 22px 0 0;pointer-events:none;"><div class="hmqz-beam"></div></div>' +
        '<div class="hmqz-cap-content" style="position:relative;z-index:1;">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">' +
            '<div style="display:flex;gap:5px;align-items:center;">' + dots + '</div>' +
            '<button class="hmqz-x hmqz-x-cap" type="button" aria-label="إغلاق" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;transition:background .2s;">' + IC_X + '</button>' +
          '</div>' +
          '<span style="font-size:10px;font-weight:bold;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.55);display:block;margin-bottom:6px;font-family:Tajawal,system-ui,sans-serif;">hamtaro · '+(qi+1)+' / '+QUESTIONS.length+'</span>' +
          '<div style="font-size:24px;font-weight:bold;color:#FFFFFF;letter-spacing:-.02em;line-height:1.2;font-family:Tajawal,system-ui,sans-serif;margin-bottom:5px;">'+q.text+'</div>' +
          '<div style="font-size:12.5px;color:rgba(255,255,255,.62);line-height:1.5;font-family:Tajawal,system-ui,sans-serif;">'+q.note+'</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ══ Question row ══ */
  function renderQ(qi) {
    var q=QUESTIONS[qi];
    var rowsHtml=q.opts.map(function(o,i){
      var ac=OC[o.key]||G;
      return (
        '<div class="hmqz-row" role="button" tabindex="0"' +
          ' data-key="'+o.key+'" data-tags="'+o.tags.join(',')+'" data-ac="'+ac+'"' +
          ' style="--i:'+i+';display:flex;align-items:center;gap:13px;padding:14px 15px;border:1.5px solid #EAECEE;border-radius:14px;cursor:pointer;background:#FFFFFF;'+(i?'margin-top:10px;':'')+
          'box-sizing:border-box;transition:border-color .18s,background .18s,box-shadow .18s,transform .1s;-webkit-tap-highlight-color:transparent;user-select:none;">' +
          '<div class="hmqz-row-icon" style="width:46px;height:46px;border-radius:12px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#374151;transition:background .18s,color .18s;box-sizing:border-box;">'+o.icon+'</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<span style="font-size:15px;font-weight:bold;color:#0D0D0D;display:block;line-height:1.3;font-family:Tajawal,system-ui,sans-serif;">'+o.label+'</span>' +
            '<span style="font-size:11.5px;color:#9CA3AF;display:block;margin-top:2px;font-family:Tajawal,system-ui,sans-serif;">'+o.note+'</span>' +
          '</div>' +
          '<div class="hmqz-row-radio" style="width:22px;height:22px;border-radius:50%;border:2px solid #D1D5DB;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:transparent;box-sizing:border-box;transition:border-color .18s,background .18s;">' +
            '<span style="display:none;color:#fff;">'+IC_CHECK+'</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    el.m.innerHTML=
      renderCap(qi)+
      '<div style="padding:16px 18px 24px;">' +
        '<div class="hmqz-screen">'+rowsHtml+'</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x-cap').onclick=close;
    fixFW(el.m);

    el.m.querySelectorAll('.hmqz-row').forEach(function(row){
      var ac=row.getAttribute('data-ac')||G;
      var lc=hexLight(ac), mc=hexMid(ac);

      row.addEventListener('mouseenter',function(){
        if(!row.classList.contains('sel')){
          row.style.borderColor=ac;
          row.style.background=lc;
          row.style.boxShadow='0 2px 12px '+mc;
        }
      });
      row.addEventListener('mouseleave',function(){
        if(!row.classList.contains('sel')){
          row.style.borderColor='#EAECEE';
          row.style.background='#FFFFFF';
          row.style.boxShadow='none';
        }
      });

      row.onclick=function(){
        el.m.querySelectorAll('.hmqz-row').forEach(function(r){
          r.classList.remove('sel');
          r.style.borderColor='#EAECEE';
          r.style.background='#FFFFFF';
          r.style.boxShadow='none';
          var ri=r.querySelector('.hmqz-row-icon');
          if(ri){ri.style.background='#F3F4F6';ri.style.color='#374151';}
          var rr=r.querySelector('.hmqz-row-radio');
          if(rr){rr.style.borderColor='#D1D5DB';rr.style.background='transparent';}
          var cs=rr&&rr.querySelector('span');
          if(cs)cs.style.display='none';
        });

        row.classList.add('sel');
        row.style.borderColor=ac;
        row.style.background=lc;
        row.style.boxShadow='0 0 0 3px '+mc;
        var icon=row.querySelector('.hmqz-row-icon');
        var radio=row.querySelector('.hmqz-row-radio');
        var check=radio&&radio.querySelector('span');
        if(icon){icon.style.background=mc;icon.style.color=ac;}
        if(radio){radio.style.borderColor=ac;radio.style.background=ac;}
        if(check){check.style.display='flex';}

        tags=tags.concat(row.getAttribute('data-tags').split(','));
        var screen=el.m.querySelector('.hmqz-screen');
        if(screen){sp(screen,'opacity','0');sp(screen,'transform','translateX(10px)');}
        setTimeout(function(){step++;render();},270);
      };
    });
  }

  /* ══ Result ══ */
  function renderResult() {
    var list=ranked(), top=list[0], alt1=list[1], alt2=list[2];

    el.m.innerHTML=
      /* Simple result header — no gradient cap */
      '<div style="padding:18px 18px 0;display:flex;align-items:center;justify-content:space-between;">' +
        '<div>' +
          '<div style="font-size:10.5px;color:#9CA3AF;margin-bottom:3px;font-family:Tajawal,system-ui,sans-serif;letter-spacing:.06em;">اخترنا لك بعناية</div>' +
          '<div class="hmqz-rec-lbl" style="font-size:21px;font-weight:bold;color:#0D0D0D;letter-spacing:-.025em;font-family:Tajawal,system-ui,sans-serif;">البوكس الأنسب لقطتك</div>' +
        '</div>' +
        '<button class="hmqz-x hmqz-x-body" type="button" aria-label="إغلاق" style="width:30px;height:30px;border-radius:50%;background:#F3F4F6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#4B5563;flex-shrink:0;transition:background .2s;">'+IC_X+'</button>' +
      '</div>' +
      '<div style="height:1px;background:#F3F4F6;margin:14px 0 0;"></div>' +
      '<div style="padding:14px 18px 20px;">' +
        '<div class="hmqz-screen">' +

          /* ── Primary card — Apple product style ── */
          '<div class="hmqz-primary" style="border-radius:18px;overflow:hidden;border:1.5px solid #E5E7EB;cursor:pointer;margin-bottom:10px;background:#FFFFFF;box-shadow:0 2px 16px rgba(0,0,0,.05);transition:box-shadow .2s,transform .18s;" data-url="'+top.url+'">' +

            /* top section: gradient bg, info + floating product image */
            '<div style="background:linear-gradient(135deg,#EDF7F1 0%,#F7FFFA 100%);padding:16px 16px 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:14px;">' +
              '<div style="flex:1;min-width:0;">' +
                /* Apple-style tight pill */
                '<span style="display:inline-flex;align-items:center;gap:4px;background:'+G+';color:#fff;font-size:10px;font-weight:bold;padding:4px 11px 4px 8px;border-radius:999px;margin-bottom:10px;letter-spacing:.015em;font-family:Tajawal,system-ui,sans-serif;">'+IC_CHECK+' الأنسب لك</span>' +
                '<div style="font-size:16px;font-weight:bold;color:#0D0D0D;line-height:1.25;margin-bottom:4px;font-family:Tajawal,system-ui,sans-serif;">'+top.name+'</div>' +
                '<div style="font-size:11.5px;color:#6B7280;font-family:Tajawal,system-ui,sans-serif;">'+top.sub+'</div>' +
              '</div>' +
              /* product image — floating card with shadow */
              '<div style="width:84px;height:84px;border-radius:14px;overflow:hidden;flex-shrink:0;background:#fff;box-shadow:0 4px 18px rgba(0,0,0,.12),0 1px 4px rgba(0,0,0,.06);">' +
                '<img src="'+top.img+'" alt="'+top.name+'" loading="eager" style="width:100%;height:100%;object-fit:cover;display:block;">' +
              '</div>' +
            '</div>' +

            /* bottom: price + CTA — separated by thin line */
            '<div style="padding:12px 16px;display:flex;align-items:center;justify-content:space-between;background:#fff;border-top:1px solid #F3F4F6;">' +
              '<div style="display:flex;align-items:baseline;gap:3px;">' +
                '<span style="font-size:22px;font-weight:bold;color:#0D0D0D;font-family:Tajawal,system-ui,sans-serif;">'+top.price+'</span>' +
                '<span style="font-size:12px;color:#9CA3AF;font-family:Tajawal,system-ui,sans-serif;"> '+top.cur+'</span>' +
              '</div>' +
              /* near-black Apple-style pill CTA */
              '<span class="hmqz-cta" style="display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 17px;background:#0D0D0D;color:#fff;border-radius:999px;font-size:13px;font-weight:bold;font-family:Tajawal,system-ui,sans-serif;white-space:nowrap;transition:background .15s;">اكتشف '+IC_ARR+'</span>' +
            '</div>' +
          '</div>' +

          /* ── Divider ── */
          '<div style="height:1px;background:#F3F4F6;margin:4px 0 10px;"></div>' +

          altCard(alt1)+altCard(alt2)+

          '<button class="hmqz-restart" type="button" style="display:block;width:100%;text-align:center;font-size:12px;color:#9CA3AF;background:none;border:none;cursor:pointer;font-family:Tajawal,system-ui,sans-serif;padding:10px 0 0;transition:color .2s;"><u style="text-underline-offset:3px;">إعادة الاختيار</u></button>' +
        '</div>' +
      '</div>';

    el.m.querySelector('.hmqz-x-body').onclick=close;
    el.m.querySelector('.hmqz-primary').onclick=function(){window.location.href=top.url;};
    el.m.querySelectorAll('.hmqz-alt').forEach(function(c){
      c.onclick=function(){window.location.href=c.getAttribute('data-url');};
    });
    el.m.querySelector('.hmqz-restart').onclick=function(){
      step=0;tags=[];
      var screen=el.m.querySelector('.hmqz-screen');
      if(screen){sp(screen,'opacity','0');sp(screen,'transform','translateX(10px)');}
      setTimeout(render,240);
    };
    fixFW(el.m);
  }

  /* ══ Alt card — premium minimal ══ */
  function altCard(p) {
    return (
      '<div class="hmqz-alt" style="display:flex;align-items:center;gap:12px;padding:11px 13px;border:1.5px solid #F0F0F0;border-radius:14px;background:#FAFAFA;margin-bottom:8px;cursor:pointer;box-sizing:border-box;transition:border-color .16s,background .16s,box-shadow .16s;" data-url="'+p.url+'">' +
        '<div style="width:50px;height:50px;border-radius:11px;overflow:hidden;flex-shrink:0;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.08);">' +
          '<img src="'+p.img+'" alt="'+p.name+'" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">' +
        '</div>' +
        '<div style="flex:1;min-width:0;">' +
          /* small Apple-style gray pill badge */
          '<span style="display:inline-block;font-size:9.5px;font-weight:bold;color:#6B7280;background:#ECECEC;padding:2.5px 8px;border-radius:999px;margin-bottom:4px;font-family:Tajawal,system-ui,sans-serif;letter-spacing:.025em;">'+p.badge+'</span>' +
          '<div style="font-size:13.5px;font-weight:bold;color:#0D0D0D;line-height:1.25;font-family:Tajawal,system-ui,sans-serif;">'+p.name+'</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0;">' +
          '<span style="font-size:14px;font-weight:bold;color:#0D0D0D;white-space:nowrap;font-family:Tajawal,system-ui,sans-serif;">'+p.price+' <span style="font-size:10px;font-weight:normal;color:#9CA3AF;">'+p.cur+'</span></span>' +
          '<div class="hmqz-alt-arr" style="width:26px;height:26px;border-radius:50%;background:#E5E7EB;display:flex;align-items:center;justify-content:center;color:#374151;transition:background .16s,color .16s;">'+IC_ARR+'</div>' +
        '</div>' +
      '</div>'
    );
  }

  function render() { step<QUESTIONS.length?renderQ(step):renderResult(); }

  /* ══ Init ══ */
  function init() {
    if(document.getElementById('hmqz-css')) return;

    var s=document.createElement('style');
    s.id='hmqz-css'; s.textContent=CSS;
    document.head.appendChild(s);

    el.bd=document.createElement('div');
    el.bd.id='hmqz-bd';
    el.bd.onclick=close;
    document.body.appendChild(el.bd);

    el.m=document.createElement('div');
    el.m.id='hmqz-m';
    el.m.setAttribute('dir','rtl');
    el.m.setAttribute('role','dialog');
    el.m.setAttribute('aria-modal','true');
    el.m.setAttribute('aria-label','ترشيح البوكس');
    document.body.appendChild(el.m);
    setModalClosed();

    render();
    setTimeout(open,5000);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else {
    requestAnimationFrame(function(){requestAnimationFrame(init);});
  }
})();
