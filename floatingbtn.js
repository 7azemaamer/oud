class FloatingCartSidebar {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createFloatingSidebar();
    this.bindEvents();
    this.loadCartContent();
  }

  createFloatingSidebar() {
    // Create the floating sidebar container
    const sidebar = document.createElement("div");
    sidebar.id = "floating-cart-sidebar";
    sidebar.style.cssText = `
      position: fixed;
      top: 0;
      right: -100%;
      width: 90%;
      max-width: 600px;
      height: 100vh;
      background: white;
      box-shadow: -10px 0 30px rgba(0,0,0,0.3);
      z-index: 9999;
      transition: right 0.3s ease;
      overflow-y: auto;
      font-family: 'DINNextLTArabic-Regular', sans-serif;
      direction: rtl;
    `;

    // Create header
    const header = document.createElement("div");
    header.style.cssText = `
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
      background: white;
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

    header.innerHTML = `
      <h2 style="margin: 0; font-size: 20px; font-weight: bold;">سلة المشتريات</h2>
      <button id="close-floating-cart" style="
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.2s;
      " onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='none'">
        <i class="sicon-close"></i>
      </button>
    `;

    // Create content container
    const content = document.createElement("div");
    content.id = "floating-cart-content";
    content.style.cssText = `
      padding: 20px;
      min-height: calc(100vh - 80px);
    `;

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    document.body.appendChild(sidebar);

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "floating-cart-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 9998;
      display: none;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
  }

  bindEvents() {
    // Cart button click
    const cartButton = document.getElementById("cart-button");
    if (cartButton) {
      cartButton.addEventListener("click", () => this.toggleSidebar());
    }

    // Close button click
    document.addEventListener("click", (e) => {
      if (e.target.id === "close-floating-cart") {
        this.closeSidebar();
      }
    });

    // Overlay click
    const overlay = document.getElementById("floating-cart-overlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.closeSidebar());
    }

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    const sidebar = document.getElementById("floating-cart-sidebar");
    const overlay = document.getElementById("floating-cart-overlay");

    if (sidebar && overlay) {
      this.isOpen = true;
      overlay.style.display = "block";
      setTimeout(() => {
        overlay.style.opacity = "1";
        sidebar.style.right = "0";
      }, 10);

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Refresh cart content
      this.loadCartContent();
    }
  }

  closeSidebar() {
    const sidebar = document.getElementById("floating-cart-sidebar");
    const overlay = document.getElementById("floating-cart-overlay");

    if (sidebar && overlay) {
      this.isOpen = false;
      overlay.style.opacity = "0";
      sidebar.style.right = "-100%";

      setTimeout(() => {
        overlay.style.display = "none";
      }, 300);

      // Restore body scroll
      document.body.style.overflow = "";
    }
  }

  loadCartContent() {
    const content = document.getElementById("floating-cart-content");
    if (!content) return;

    // Extract cart data from the main cart page structure
    const cartData = this.extractCartData();

    if (cartData.items.length === 0) {
      content.innerHTML = this.getEmptyCartHTML();
      this.updateCartCount(0);
      return;
    }

    content.innerHTML = this.getCartHTML(cartData);
    this.updateCartCount(cartData.totalQuantity);
    this.bindCartEvents();
  }

  extractCartData() {
    const cartForms = document.querySelectorAll('form[id^="item-"]');
    const items = [];
    let totalQuantity = 0;
    let totalPrice = 0;

    cartForms.forEach((form) => {
      try {
        const cartItemId = form.id.replace("item-", "");
        const hiddenInput = form.querySelector('input[name="id"]');

        if (!hiddenInput || hiddenInput.value !== cartItemId) return;

        // Extract item data
        const img = form.querySelector("img");
        const titleLink = form.querySelector("h1 a");
        const priceSpan = form.querySelector(".item-price");
        const totalSpan = form.querySelector(".item-total");
        const quantityInput = form.querySelector("salla-quantity-input");

        if (!quantityInput || !priceSpan) return;

        const quantity = parseInt(quantityInput.getAttribute("value")) || 1;
        const price = this.extractPrice(priceSpan.textContent);
        const total = this.extractPrice(
          totalSpan?.textContent || priceSpan.textContent
        );

        items.push({
          id: cartItemId,
          title: titleLink?.textContent?.trim() || "",
          image: img?.src || img?.getAttribute("data-src") || "",
          link: titleLink?.href || "#",
          quantity: quantity,
          price: price,
          total: total,
        });

        totalQuantity += quantity;
        totalPrice += total;
      } catch (error) {
        console.error("Error extracting cart item:", error);
      }
    });

    return {
      items,
      totalQuantity,
      totalPrice,
    };
  }

  getCartHTML(cartData) {
    const itemsHTML = cartData.items
      .map(
        (item) => `
      <form onchange="salla.form.onChange('cart.updateItem', event)" id="floating-item-${
        item.id
      }">
        <section class="cart-item bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative border border-primary">
          <input type="hidden" name="id" value="${item.id}">

          <!-- product -->
          <div class="md:flex rtl:space-x-reverse md:space-x-12 items-start justify-between mb-8 last:mb-0">
            <div class="flex flex-1 rtl:space-x-reverse space-x-4">
              <a href="${item.link}" class="shrink-0">
                <img
                  src="${item.image}"
                  alt="${item.title}"
                  class="flex-none w-24 h-20 border border-gray-200 bg-gray-100 rounded-md object-center object-cover"
                  loading="lazy"
                  onerror="this.style.display='none'"
                />
              </a>

              <div class="space-y-1">
                <h1 class="text-store-text-primary leading-6 text-lg">
                  <a href="${item.link}" class="text-base">${item.title}</a>
                </h1>
                <span class="item-price text-sm text-store-text-secondary">${this.formatPrice(
                  item.price
                )} <i class="sicon-sar"></i></span>
                <p class="text-sm text-store-text-secondary">
                  الوزن
                  <span>٠٫١١ كجم</span>
                </p>
              </div>
            </div>

            <div class="flex-1 border-t border-b border-gray-200 py-3 md:p-0 md:border-none mt-5 md:mt-0 flex justify-between items-center md:items-start">
              <salla-quantity-input
                cart-item-id="${item.id}"
                max=""
                class="transition transition-color duration-300"
                value="${item.quantity}"
                name="quantity"
                aria-label="Quantity">
              </salla-quantity-input>
              
              <p class="text-primary flex-none font-bold text-sm rtl:md:pl-12 ltr:md:pr-12">
                <span>المجموع:</span>
                <span class="inline-block item-total">${this.formatPrice(
                  item.total
                )} <i class="sicon-sar"></i></span>
              </p>
            </div>
          </div>

          <span class="absolute top-1.5 rtl:left-1.5 ltr:right-1.5 rtl:xs:left-5 ltr:xs:right-5 xs:top-5">
            <salla-button
              type="button"
              shape="icon"
              size="small"
              color="danger"
              class="btn--delete"
              onclick="salla.cart.deleteItem(${
                item.id
              }).then(() => { document.querySelector('#floating-item-${
          item.id
        }').remove(); floatingCartSidebar.loadCartContent(); })"
              aria-label="Remove from the cart">
              <i class="sicon-cancel"></i>
            </salla-button>
          </span>
        </section>
      </form>
    `
      )
      .join("");

    return `
      <div class="flex flex-col items-start lg:flex-row pb-6 lg:pb-20">
        <div class="main-content flex-1 w-full">
          ${itemsHTML}
        </div>
        
        <!-- sidebar -->
        <div class="sticky top-24 w-full lg:w-96 rtl:lg:mr-8 ltr:lg:ml-8">
          <div class="shadow-default bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative transition-height duration-1000">
            <h4 class="font-bold text-sm mb-5 text-store-text-primary">ملخص الطلب</h4>

            <div class="flex justify-between text-sm mb-5">
              <span class="text-store-text-secondary">مجموع المنتجات</span>
              <b id="floating-sub-total" class="text-store-text-primary">${this.formatPrice(
                cartData.totalPrice
              )} <i class="sicon-sar"></i></b>
            </div>
            
            <div class="flex justify-between text-lg mb-5">
              <span class="text-store-text-secondary">الإجمالي</span>
              <b class="text-store-text-primary" id="floating-cart-total">${this.formatPrice(
                cartData.totalPrice
              )} <i class="sicon-sar"></i></b>
            </div>

            <div class="cart-submit-wrap">
              <salla-button id="floating-cart-submit" loader-position="center" width="wide" onclick="window.location.href='https://oudnna.com/ar/cart'">
                عرض السلة الكاملة
              </salla-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getEmptyCartHTML() {
    return `
      <div style="text-align: center; padding: 60px 20px; color: #666;">
        <div style="
          width: 80px;
          height: 80px;
          background-color: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        ">
          <i class="sicon-cart" style="font-size: 32px; color: #9ca3af;"></i>
        </div>
        <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 10px 0; color: #111827;">
          سلة المشتريات فارغة
        </h3>
        <p style="margin: 0 0 20px 0; font-size: 14px;">
          ابدأ بإضافة بعض المنتجات إلى سلتك
        </p>
        <button onclick="floatingCartSidebar.closeSidebar()" style="
          background-color: #000000;
          color: #ffffff;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        " onmouseover="this.style.backgroundColor='#333'" onmouseout="this.style.backgroundColor='#000'">
          متابعة التسوق
        </button>
      </div>
    `;
  }

  bindCartEvents() {
    // Listen for quantity changes
    document.addEventListener("change", (e) => {
      if (
        e.target.closest("salla-quantity-input") &&
        e.target.closest("#floating-cart-sidebar")
      ) {
        setTimeout(() => {
          this.loadCartContent();
        }, 1000);
      }
    });

    // Listen for Salla cart events
    if (typeof salla !== "undefined") {
      salla.event.on("cart::updated", () => {
        setTimeout(() => this.loadCartContent(), 500);
      });

      salla.event.on("cart::item.deleted", () => {
        setTimeout(() => this.loadCartContent(), 500);
      });
    }
  }

  updateCartCount(count) {
    const countElement = document.getElementById("cart-count");
    if (countElement) {
      countElement.textContent = count;
      countElement.style.display = count > 0 ? "flex" : "none";
    }
  }

  extractPrice(priceText) {
    if (!priceText) return 0;
    const cleanPrice = priceText.replace(/[^\d\u0660-\u0669,.-]/g, "");
    const arabicToEnglish = cleanPrice.replace(/[\u0660-\u0669]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 1584)
    );
    return parseFloat(arabicToEnglish.replace(/,/g, "")) || 0;
  }

  formatPrice(price) {
    return new Intl.NumberFormat("ar-SA").format(price);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.floatingCartSidebar = new FloatingCartSidebar();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.floatingCartSidebar) {
      window.floatingCartSidebar = new FloatingCartSidebar();
    }
  });
} else {
  window.floatingCartSidebar = new FloatingCartSidebar();
}
