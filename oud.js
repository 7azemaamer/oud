(function () {
  const faqData = [
    {
      q: "هل هذا المنتج مناسب للأطفال؟",
      a: "يعتمد ذلك على نوع المنتج. في حال كان عطريًا مثل دهن العود، يُفضّل عدم استخدامه للأطفال مباشرة على البشرة لتجنّب الحساسية، ويمكن الاكتفاء بتعطير الملابس أو الغرف عند الحاجة. إذا أحببت، وضّح لنا المنتج بالتحديد لنؤكد مدى ملاءمته للأطفال."
    },
    {
      q: "هل هذا المنتج مضمون الجودة؟",
      a: "نعم، جميع منتجاتنا أصلية ومضمونة الجودة 100%. نحرص على اختيار أفضل الموردين الموثوقين ونقدّم منتجات مُختبرة ومعتمدة لضمان رضاك الكامل."
    },
    {
      q: "ما هي سياسة الاستبدال والاسترجاع؟",
      a: "تسعدنا خدمتك دائمًا. يمكنك طلب الاستبدال أو الاسترجاع خلال مدة محددة (عادةً 7 أيام من الاستلام) بشرط أن يكون المنتج بحالته الأصلية وغير مستخدم. لمعرفة التفاصيل الدقيقة حسب نوع المنتج ووجهة الشحن، تواصل معنا مباشرة."
    },
    {
      q: "كم مدة الشحن؟",
      a: `مدة الشحن تختلف حسب الوجهة:\n
• داخل المملكة العربية السعودية: من 3 إلى 10 أيام عمل من تاريخ الطلب.\n
• داخل الخليج العربي: من 10 إلى 25 يوم عمل.\n
• داخل الشرق الأوسط: من 15 إلى 30 يوم عمل.\n
• باقي دول العالم: من 30 إلى 45 يوم عمل.\n
بعد تأكيد الطلب، سنزوّدك برقم التتبع ونوافيك بحالة الشحنة خطوة بخطوة حتى وصولها إليك.`
    },
    {
      q: "هل هذا دهن عود أصلي؟ وهل يدوم طويلًا؟",
      a: "نعم، هذا دهن عود طبيعي أصلي 100%، ونؤكد أنه يتميز بثبات وفوحان عالٍ يدوم لساعات طويلة، سواء على البشرة أو الملابس."
    },
    {
      q: "ما الفرق بين العود الطبيعي والمُعالج؟",
      a: "العود الطبيعي يُستخرج مباشرة من قلب الشجرة دون أي إضافات أو معالجات كيميائية، ويتميز برائحة نقية عميقة تزداد جمالًا مع الوقت. أما العود المُعالج فيتم تعريضه لطرق معالجة لتعزيز رائحته أو لتسريع إنتاجه، وغالبًا يكون سعره أقل وثباته أضعف مقارنةً بالطبيعي."
    }
  ];

  const container = document.createElement('div');
  container.className = 'faq-container';

  const title = document.createElement('h2');
  title.className = 'faq-title';
  title.textContent = 'الأسئلة المتكررة';
  container.appendChild(title);

  faqData.forEach(({ q, a }) => {
    const item = document.createElement('div');
    item.className = 'faq-item';

    const question = document.createElement('div');
    question.className = 'faq-question';
    question.textContent = q;

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.textContent = a;

    question.addEventListener('click', () => {
      item.classList.toggle('open');
    });

    item.appendChild(question);
    item.appendChild(answer);
    container.appendChild(item);
  });

  let attempts = 0;
  const interval = setInterval(() => {
    const footer = document.querySelector('.store-footer');
    if (footer && !document.querySelector('.faq-container')) {
      footer.parentNode.insertBefore(container, footer);
      clearInterval(interval);
    }
    if (++attempts > 100) clearInterval(interval);
  }, 200);
})();

//==========================================================================
// Timer
//==========================================================================
(function () {
  const TIMER_KEY = 'daily_offer_timer_start';

  function getSaudiMidnightTimestamp() {
    const now = new Date();
    now.setUTCHours(21, 0, 0, 0);
    return now.getTime();
  }

  function getOrCreateTimerEndTime() {
    const now = Date.now();
    let start = localStorage.getItem(TIMER_KEY);
    if (!start || now - Number(start) > 86400000) {
      const todayStart = getSaudiMidnightTimestamp();
      localStorage.setItem(TIMER_KEY, todayStart);
      console.log('[Countdown] New start time set:', todayStart);
      return todayStart + 86400000;
    }
    return Number(start) + 86400000;
  }

  function createCountdownElement() {
    const container = document.createElement('div');
    container.className = 'countdown-timer';
    container.style = `
      background: #fff9ec;
      color: #b98d00;
      font-weight: bold;
      padding: 10px 14px;
      border: 1px solid #f1dab3;
      border-radius: 8px;
      margin-top: 10px;
      font-size: 1.1rem;
      text-align: center;
    `;
    container.innerHTML = `
      <div class="timer-label">العرض ينتهي خلال:</div>
      <div class="timer-values" style="font-size:1.3rem; margin-top: 5px;">
        <span class="hours">00</span> :
        <span class="minutes">00</span> :
        <span class="seconds">00</span>
      </div>
    `;
    return container;
  }

  function updateCountdown(endTime, element) {
    const now = Date.now();
    const diff = endTime - now;
    if (diff <= 0) return false;
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    element.querySelector('.hours').textContent = String(hours).padStart(2, '0');
    element.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
    element.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    return true;
  }

  let retry = 0;
  const waitForProduct = setInterval(() => {
    const container = document.querySelector('.product-single__inner');
    const promo = document.querySelector('.promotion-title');
    const priceBox = document.querySelector('.product-price');

    if (container && promo && priceBox && !document.querySelector('.countdown-timer')) {
      const timer = createCountdownElement();
      priceBox.insertAdjacentElement('afterend', timer);

      const endTime = getOrCreateTimerEndTime();
      const tick = () => {
        const active = updateCountdown(endTime, timer);
        if (!active) {
          timer.remove();
          localStorage.removeItem(TIMER_KEY);
          clearInterval(loop);
        }
      };
      tick();
      const loop = setInterval(tick, 1000);
      clearInterval(waitForProduct);
    }

    if (++retry > 200) {
      clearInterval(waitForProduct);
    }
  }, 500);
})();
