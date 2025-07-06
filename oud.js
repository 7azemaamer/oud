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
