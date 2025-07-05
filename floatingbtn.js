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
      max-width: 800px;
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
      position: sticky;
      top: 0;
      background: white;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    `;

    header.innerHTML = `
      <h2 style="margin: 0; font-size: 18px; font-weight: bold;">سلة المشتريات</h2>
      <button id="close-floating-cart" style="
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        color: #666;
      ">×</button>
    `;

    // Create content container
    const content = document.createElement("div");
    content.id = "floating-cart-content";
    content.style.cssText = `
      padding: 20px;
      min-height: calc(100vh - 80px);
    `;

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
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    `;

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    document.body.appendChild(overlay);
    document.body.appendChild(sidebar);
  }

  loadCartContent() {
    const content = document.getElementById("floating-cart-content");

    content.innerHTML = `
      <div class="flex flex-col items-start lg:flex-row pb-6 lg:pb-20">
        <div class="main-content flex-1 w-full">
          <form
            onchange="salla.form.onChange('cart.updateItem', event)"
            id="item-966338890"
          >
            <section
              class="cart-item bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative border border-primary"
            >
              <input type="hidden" name="id" value="966338890" />

              <!-- product -->
              <div
                class="md:flex rtl:space-x-reverse md:space-x-12 items-start justify-between mb-8 last:mb-0"
              >
                <div class="flex flex-1 rtl:space-x-reverse space-x-4">
                  <a href="https://oudnna.com/ar/PdvYWyr" class="shrink-0">
                    <img
                      src="https://cdn.salla.sa/nEaxyz/lEMFpdCbnTV97QRpkC4v9dt93IGI1l5eaCeXvMim.jpg"
                      data-src="https://cdn.salla.sa/nEaxyz/lEMFpdCbnTV97QRpkC4v9dt93IGI1l5eaCeXvMim.jpg"
                      alt="الدلفين الوردي مسك الرمان"
                      class="lazy flex-none w-24 h-20 border border-gray-200 bg-gray-100 rounded-md object-center object-cover loaded"
                      loading="lazy"
                      data-ll-status="loaded"
                    />
                  </a>

                  <div class="space-y-1">
                    <h1 class="text-store-text-primary leading-6 text-lg">
                      <a href="https://oudnna.com/ar/PdvYWyr" class="text-base"
                        >الدلفين الوردي مسك الرمان</a
                      >
                    </h1>
                    <span
                      class="text-sm text-store-text-secondary line-through item-regular-price hidden"
                      >٦٣ <i class="sicon-sar"></i
                    ></span>
                    <span class="item-price text-sm text-store-text-secondary"
                      >٦٣ <i class="sicon-sar"></i
                    ></span>
                    <p class="text-sm text-store-text-secondary">
                      الوزن
                      <span>٠٫٢٢ كجم</span>
                    </p>
                  </div>
                </div>

                <div
                  class="flex-1 border-t border-b border-gray-200 py-3 md:p-0 md:border-none mt-5 md:mt-0 flex justify-between items-center md:items-start"
                >
                  <salla-quantity-input
                    cart-item-id="966338890"
                    max=""
                    class="transtion transition-color duration-300 s-quantity-input hydrated"
                    value="2"
                    name="quantity"
                    aria-label="Quantity"
                  ></salla-quantity-input>

                  <p
                    class="text-primary flex-none font-bold text-sm rtl:md:pl-12 ltr:md:pr-12"
                  >
                    <span>المجموع:</span>
                    <span class="inline-block item-total"
                      >١٢٦ <i class="sicon-sar"></i
                    ></span>
                  </p>
                </div>
              </div>

              <span
                class="absolute top-1.5 rtl:left-1.5 ltr:right-1.5 rtl:xs:left-5 ltr:xs:right-5 xs:top-5"
              >
                <salla-button
                  type="button"
                  shape="icon"
                  size="small"
                  color="danger"
                  class="btn--delete s-button-wrap hydrated"
                  onclick="salla.cart.deleteItem(966338890).then(() => document.querySelector('#item-966338890').remove())"
                  aria-label="Remove from the cart"
                  fill="solid"
                  width="normal"
                ></salla-button>
              </span>
            </section>
          </form>

          <form
            onchange="salla.form.onChange('cart.updateItem', event)"
            id="item-1223983000"
          >
            <section
              class="cart-item bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative border border-primary"
            >
              <input type="hidden" name="id" value="1223983000" />

              <!-- product -->
              <div
                class="md:flex rtl:space-x-reverse md:space-x-12 items-start justify-between mb-8 last:mb-0"
              >
                <div class="flex flex-1 rtl:space-x-reverse space-x-4">
                  <a href="https://oudnna.com/ar/product-url" class="shrink-0">
                    <img
                      src="https://cdn.salla.sa/nEaxyz/placeholder.jpg"
                      alt="منتج آخر"
                      class="lazy flex-none w-24 h-20 border border-gray-200 bg-gray-100 rounded-md object-center object-cover loaded"
                    />
                  </a>

                  <div class="space-y-1">
                    <h1 class="text-store-text-primary leading-6 text-lg">
                      <a href="https://oudnna.com/ar/product-url" class="text-base"
                        >منتج آخر</a
                      >
                    </h1>
                    <span class="item-price text-sm text-store-text-secondary"
                      >٦٣ <i class="sicon-sar"></i
                    ></span>
                    <p class="text-sm text-store-text-secondary">
                      الوزن
                      <span>٠٫٢٢ كجم</span>
                    </p>
                  </div>
                </div>

                <div
                  class="flex-1 border-t border-b border-gray-200 py-3 md:p-0 md:border-none mt-5 md:mt-0 flex justify-between items-center md:items-start"
                >
                  <salla-quantity-input
                    cart-item-id="1223983000"
                    max=""
                    class="transtion transition-color duration-300 s-quantity-input hydrated"
                    value="1"
                    name="quantity"
                    aria-label="Quantity"
                  ></salla-quantity-input>

                  <p
                    class="text-primary flex-none font-bold text-sm rtl:md:pl-12 ltr:md:pr-12"
                  >
                    <span>المجموع:</span>
                    <span class="inline-block item-total"
                      >٦٣ <i class="sicon-sar"></i
                    ></span>
                  </p>
                </div>
              </div>

              <span
                class="absolute top-1.5 rtl:left-1.5 ltr:right-1.5 rtl:xs:left-5 ltr:xs:right-5 xs:top-5"
              >
                <salla-button
                  type="button"
                  shape="icon"
                  size="small"
                  color="danger"
                  class="btn--delete s-button-wrap hydrated"
                  onclick="salla.cart.deleteItem(1223983000).then(() => document.querySelector('#item-1223983000').remove())"
                  aria-label="Remove from the cart"
                  fill="solid"
                  width="normal"
                ></salla-button>
              </span>
            </section>
          </form>
        </div>

        <!-- sidebar -->
        <div class="sticky top-24 w-full lg:w-96 rtl:lg:mr-8 ltr:lg:ml-8">
          <div
            class="shadow-default bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative"
          >
            <h4 class="font-bold text-sm mb-5 text-store-text-primary">ملخص الطلب</h4>

            <div class="flex justify-between text-sm mb-5">
              <span class="text-store-text-secondary"> مجموع المنتجات </span>
              <b class="text-store-text-primary"
                >١٨٩ <i class="sicon-sar"></i
              ></b>
            </div>

            <div class="border-t border-gray-200 border-b py-5 mb-5">
              <label for="coupon" class="block text-sm text-store-text-primary"
                >هل لديك كود خصم</label
              >
              <div class="mt-2.5 relative">
                <input
                  placeholder="ادخل كود الخصم"
                  class="rtl:pl-24 ltr:pr-24 form-input"
                  value=""
                  id="coupon-input"
                  aria-label="Apply coupon"
                  name="coupon"
                  type="text"
                />
                <salla-button
                  class="btn--coupon has-not-coupon btn--default s-button-wrap hydrated"
                  loader-position="center"
                  id="coupon-btn"
                  shape="btn"
                  color="primary"
                  fill="solid"
                  size="medium"
                  width="normal"
                  type="button"
                ></salla-button>
              </div>
            </div>

            <div class="flex justify-between text-lg mb-5">
              <span class="text-store-text-secondary">الإجمالي</span>
              <b class="text-store-text-primary"
                >١٨٩ <i class="sicon-sar"></i
              ></b>
            </div>

            <div class="cart-submit-wrap">
              <salla-button
                id="cart-submit"
                loader-position="center"
                width="wide"
                class="s-button-wrap hydrated"
                shape="btn"
                color="primary"
                fill="solid"
                size="medium"
                type="button"
              ></salla-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Cart button click event
    document.addEventListener("click", (e) => {
      if (e.target.id === "cart-button" || e.target.closest("#cart-button")) {
        this.showSidebar();
      }
    });

    // Close button click
    document.addEventListener("click", (e) => {
      if (e.target.id === "close-floating-cart") {
        this.hideSidebar();
      }
    });

    // Overlay click
    document.addEventListener("click", (e) => {
      if (e.target.id === "floating-cart-overlay") {
        this.hideSidebar();
      }
    });

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.hideSidebar();
      }
    });
  }

  showSidebar() {
    const sidebar = document.getElementById("floating-cart-sidebar");
    const overlay = document.getElementById("floating-cart-overlay");

    if (sidebar && overlay) {
      sidebar.style.right = "0";
      overlay.style.opacity = "1";
      overlay.style.visibility = "visible";
      this.isOpen = true;
      document.body.style.overflow = "hidden";
    }
  }

  hideSidebar() {
    const sidebar = document.getElementById("floating-cart-sidebar");
    const overlay = document.getElementById("floating-cart-overlay");

    if (sidebar && overlay) {
      sidebar.style.right = "-100%";
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      this.isOpen = false;
      document.body.style.overflow = "";
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new FloatingCartSidebar();
});

// Also initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new FloatingCartSidebar();
  });
} else {
  new FloatingCartSidebar();
}
