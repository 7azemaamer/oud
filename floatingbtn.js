class FloatingCart {
  constructor() {
    this.isOpen = false;
    this.cartData = [];
    this.productData = new Map();
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadCartData();
    this.observeCartChanges();
  }

  bindEvents() {
    const cartButton = document.getElementById("cart-button");
    const closeCart = document.getElementById("close-cart");
    const overlay = document.getElementById("cart-overlay");

    cartButton?.addEventListener("click", () => this.toggleCart());
    closeCart?.addEventListener("click", () => this.closeCart());
    overlay?.addEventListener("click", () => this.closeCart());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeCart();
      }
    });
  }

  toggleCart() {
    if (this.isOpen) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }

  openCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");

    this.isOpen = true;
    overlay.style.display = "block";
    drawer.style.transform = "translateX(0)";
    drawer.classList.add("floating-cart-slide-in");

    document.body.style.overflow = "hidden";

    this.loadCartData();
  }

  closeCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");

    this.isOpen = false;
    drawer.style.transform = "translateX(100%)";
    overlay.style.display = "none";
    drawer.classList.remove("floating-cart-slide-in");

    document.body.style.overflow = "";
  }

  async loadCartData() {
    try {
      this.showLoading();

      const cartItems = this.extractCartItemsFromDOM();
      console.log("Found cart items:", cartItems.length);

      if (cartItems.length === 0) {
        const sallaCartCount = this.getSallaCartCount();
        console.log("Salla cart count:", sallaCartCount);

        if (sallaCartCount === 0) {
          this.showEmptyCart();
          this.updateCartCount(0);
        } else {
          this.showCartLoadError();
          this.updateCartCount(sallaCartCount);
        }
        return;
      }

      this.cartData = cartItems.map((item) => ({
        ...item,
        productData: {
          id: item.productId || item.cartItemId,
          name: item.title,
          image: { url: item.image },
          price: item.price,
          currency: "SAR",
        },
      }));

      this.renderCartItems();
      this.updateCartCount(this.getTotalQuantity());
      this.updateCartTotal();
      this.showCartContent();
    } catch (error) {
      console.error("Error loading cart data:", error);
      this.showEmptyCart();
    }
  }

  extractCartItemsFromDOM() {
    const cartItems = [];

    // Look for cart forms like in cart.html: <form id="item-{cartItemId}">
    const cartForms = document.querySelectorAll('form[id^="item-"]');

    cartForms.forEach((form) => {
      try {
        const cartItemId = form.id.replace("item-", "");

        // Get hidden input with cart item ID
        const hiddenInput = form.querySelector('input[name="id"]');
        if (!hiddenInput || hiddenInput.value !== cartItemId) return;

        // Get product details exactly as shown in cart.html
        const imageElement = form.querySelector("img");
        const titleElement = form.querySelector("h1 a, .product-title a");
        const priceElement = form.querySelector(".item-price");
        const totalElement = form.querySelector(".item-total");
        const quantityInput = form.querySelector(
          'input[name="quantity"], salla-quantity-input'
        );
        const linkElement = form.querySelector('a[href*="/ar/"]');

        if (!quantityInput || !priceElement) return;

        // Extract quantity value
        let quantity = 1;
        if (quantityInput.tagName === "SALLA-QUANTITY-INPUT") {
          quantity = parseInt(quantityInput.getAttribute("value")) || 1;
        } else {
          quantity = parseInt(quantityInput.value) || 1;
        }

        // Extract product ID from URL
        let productId = null;
        if (linkElement) {
          const urlMatch = linkElement.href.match(/\/ar\/([^\/]+)$/);
          if (urlMatch) {
            productId = this.getProductIdFromSlug(urlMatch[1]);
          }
        }

        // Get image source (prefer data-src over src)
        let imageSrc = "";
        if (imageElement) {
          imageSrc =
            imageElement.getAttribute("data-src") || imageElement.src || "";
        }

        cartItems.push({
          cartItemId,
          productId,
          quantity: quantity,
          price: this.extractPrice(priceElement.textContent),
          total: this.extractPrice(
            totalElement?.textContent || priceElement.textContent
          ),
          title: titleElement?.textContent?.trim() || "",
          image: imageSrc,
          link: linkElement?.href || "",
        });
      } catch (error) {
        console.error("Error extracting cart item:", error);
      }
    });

    console.log("Extracted cart items:", cartItems);
    return cartItems;
  }

  getProductIdFromSlug(slug) {
    const slugToIdMap = {
      PdvYWyr: "29587259",
      onDxBPZ: "1045891903",
      NKynRrK: "1821043774",
      NKynXlr: "1449428756",
    };

    return slugToIdMap[slug] || slug;
  }

  renderCartItems() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    const itemsHTML = this.cartData
      .map((item) => this.createCartItemHTML(item))
      .join("");
    container.innerHTML = itemsHTML;
  }

  createCartItemHTML(item) {
    const product = item.productData;

    return `
      <form id="item-${item.cartItemId}">
        <section class="cart-item bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative border border-primary">
          <input type="hidden" name="id" value="${item.cartItemId}">

          <!-- product -->
          <div class="md:flex rtl:space-x-reverse md:space-x-12 items-start justify-between mb-8 last:mb-0">
            <div class="flex flex-1 rtl:space-x-reverse space-x-4">
              <a href="${item.link}" class="shrink-0">
                <img 
                  src="${product.image?.url || item.image || ""}" 
                  alt="${product.name || item.title}"
                  class="flex-none w-24 h-20 border border-gray-200 bg-gray-100 rounded-md object-center object-cover"
                  loading="lazy"
                  onerror="this.style.display='none'"
                />
              </a>

              <div class="space-y-1">
                <h1 class="text-store-text-primary leading-6 text-lg">
                  <a href="${item.link}" class="text-base">${
      product.name || item.title
    }</a>
                </h1>
                <span class="text-sm text-store-text-secondary line-through item-regular-price hidden">${this.formatPrice(
                  item.price
                )} <i class="sicon-sar"></i></span>
                <span class="item-price text-sm text-store-text-secondary">${this.formatPrice(
                  item.price
                )} <i class="sicon-sar"></i></span>
                <p class="text-sm text-store-text-secondary">
                  الوزن
                  <span>٠٫١١ كجم</span>
                </p>
                <i class="sicon-discount-calculator text-store-text-secondary offer-icon hidden"></i>
                <span class="text-sm text-store-text-secondary offer-name hidden"></span>
              </div>
            </div>

            <div class="flex-1 border-t border-b border-gray-200 py-3 md:p-0 md:border-none mt-5 md:mt-0 flex justify-between items-center md:items-start">
              <salla-quantity-input 
                cart-item-id="${item.cartItemId}" 
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
                item.cartItemId
              }).then(() => document.querySelector('#item-${
      item.cartItemId
    }').remove())" 
              aria-label="Remove from the cart"
            >
              <i class="sicon-cancel"></i>
            </salla-button>
          </span>
        </section>
      </form>
    `;
  }

  async updateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) return;

    try {
      // Find the form element
      const formElement = document.querySelector(`#item-${cartItemId}`);
      if (formElement) {
        // Look for salla-quantity-input component
        const quantityComponent = formElement.querySelector(
          `salla-quantity-input[cart-item-id="${cartItemId}"]`
        );
        if (quantityComponent) {
          quantityComponent.setAttribute("value", newQuantity);

          // Trigger Salla's form change event
          const changeEvent = new Event("change", { bubbles: true });
          if (
            typeof salla !== "undefined" &&
            salla.form &&
            salla.form.onChange
          ) {
            salla.form.onChange("cart.updateItem", changeEvent);
          }
        }
      }

      // Refresh cart data after a short delay
      setTimeout(() => {
        this.loadCartData();
        this.showPulseAnimation();
      }, 1000);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  async removeItem(cartItemId) {
    try {
      // Use Salla's cart delete function exactly as in cart.html
      if (typeof salla !== "undefined" && salla.cart && salla.cart.deleteItem) {
        await salla.cart.deleteItem(cartItemId).then(() => {
          const itemElement = document.querySelector(`#item-${cartItemId}`);
          if (itemElement) {
            itemElement.remove();
          }
        });
      }

      // Refresh cart data
      setTimeout(() => {
        this.loadCartData();
        this.showPulseAnimation();
      }, 500);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  getTotalQuantity() {
    return this.cartData.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartData.reduce((total, item) => total + item.total, 0);
  }

  updateCartCount(count) {
    const countElement = document.getElementById("cart-count");
    if (countElement) {
      countElement.textContent = count;
      countElement.style.display = count > 0 ? "flex" : "none";
    }
  }

  updateCartTotal() {
    const totalElement = document.getElementById("cart-total");
    const subtotalElement = document.getElementById("cart-subtotal");

    if (totalElement) {
      totalElement.textContent = `${this.formatPrice(
        this.getTotalPrice()
      )} ر.س`;
    }

    if (subtotalElement) {
      subtotalElement.textContent = `${this.formatPrice(
        this.getTotalPrice()
      )} ر.س`;
    }
  }

  showLoading() {
    const loading = document.getElementById("cart-loading");
    const empty = document.getElementById("cart-empty");
    const footer = document.getElementById("cart-footer");

    if (loading) loading.style.display = "flex";
    if (empty) empty.style.display = "none";
    if (footer) footer.style.display = "none";
  }

  showEmptyCart() {
    const loading = document.getElementById("cart-loading");
    const empty = document.getElementById("cart-empty");
    const footer = document.getElementById("cart-footer");
    const items = document.getElementById("cart-items");

    if (loading) loading.style.display = "none";
    if (empty) empty.style.display = "block";
    if (footer) footer.style.display = "none";
    if (items) items.innerHTML = "";
  }

  showCartContent() {
    const loading = document.getElementById("cart-loading");
    const empty = document.getElementById("cart-empty");
    const footer = document.getElementById("cart-footer");

    if (loading) loading.style.display = "none";
    if (empty) empty.style.display = "none";
    if (footer) footer.style.display = "block";
  }

  showCartLoadError() {
    const loading = document.getElementById("cart-loading");
    const empty = document.getElementById("cart-empty");
    const footer = document.getElementById("cart-footer");
    const items = document.getElementById("cart-items");

    if (loading) loading.style.display = "none";
    if (empty) empty.style.display = "none";
    if (footer) footer.style.display = "block";

    if (items) {
      items.innerHTML = `
        <div style="text-align: center; padding: 48px 24px; color: #6b7280;">
          <div style="
            width: 64px;
            height: 64px;
            background-color: #f3f4f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
          ">
            <i class="sicon-refresh" style="font-size: 24px; color: #9ca3af;"></i>
          </div>
          <h3 style="
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #111827;
          ">
            عذراً، لا يمكن تحميل تفاصيل السلة
          </h3>
          <p style="margin: 0 0 16px 0; font-size: 14px;">
            يرجى الانتقال إلى صفحة السلة لعرض المنتجات
          </p>
          <button 
            onclick="window.location.href='https://oudnna.com/ar/cart'"
            style="
              background-color: #000000;
              color: #ffffff;
              padding: 8px 16px;
              border: none;
              border-radius: 6px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s ease;
            "
          >
            عرض السلة
          </button>
        </div>
      `;
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

  showPulseAnimation() {
    const cartButton = document.getElementById("cart-button");
    const pulseRing = document.getElementById("pulse-ring");

    if (cartButton && pulseRing) {
      cartButton.classList.add("floating-cart-bounce");
      pulseRing.style.display = "block";
      pulseRing.classList.add("floating-cart-pulse");

      setTimeout(() => {
        cartButton.classList.remove("floating-cart-bounce");
        pulseRing.style.display = "none";
        pulseRing.classList.remove("floating-cart-pulse");
      }, 600);
    }
  }

  observeCartChanges() {
    const cartContainer = document.querySelector(".main-content");
    if (cartContainer) {
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (
                node.nodeType === Node.ELEMENT_NODE &&
                ((node.matches && node.matches('form[id^="item-"]')) ||
                  node.querySelector('form[id^="item-"]'))
              ) {
                shouldUpdate = true;
              }
            });

            mutation.removedNodes.forEach((node) => {
              if (
                node.nodeType === Node.ELEMENT_NODE &&
                ((node.matches && node.matches('form[id^="item-"]')) ||
                  node.querySelector('form[id^="item-"]'))
              ) {
                shouldUpdate = true;
              }
            });
          }
        });

        if (shouldUpdate) {
          setTimeout(() => this.loadCartData(), 500);
        }
      });

      observer.observe(cartContainer, {
        childList: true,
        subtree: true,
      });
    }

    // Listen for Salla form changes
    document.addEventListener("change", (e) => {
      if (
        e.target.closest("salla-quantity-input") ||
        e.target.matches('input[name="quantity"]')
      ) {
        setTimeout(() => this.loadCartData(), 1000);
      }
    });

    // Listen for Salla cart events
    if (typeof salla !== "undefined") {
      // Listen for cart update events
      salla.event.on("cart::quantity.updated", () => {
        setTimeout(() => this.loadCartData(), 500);
      });

      salla.event.on("cart::item.deleted", () => {
        setTimeout(() => this.loadCartData(), 500);
      });

      salla.event.on("cart::updated", () => {
        setTimeout(() => this.loadCartData(), 500);
      });
    }

    // Listen for clicks on delete buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.closest(".btn--delete") &&
        e.target.closest('form[id^="item-"]')
      ) {
        setTimeout(() => this.loadCartData(), 1500);
      }
    });
  }

  getSallaCartCount() {
    try {
      const cartSummary = document.querySelector("salla-cart-summary");
      if (cartSummary && cartSummary.getAttribute("count")) {
        return parseInt(cartSummary.getAttribute("count")) || 0;
      }

      const cartBadge = document.querySelector(
        ".cart-badge, [data-cart-count]"
      );
      if (cartBadge) {
        const count =
          cartBadge.textContent.trim() ||
          cartBadge.getAttribute("data-cart-count");
        return parseInt(count) || 0;
      }

      const headerCart = document.querySelector(
        ".header-cart .count, .cart-count"
      );
      if (headerCart) {
        return parseInt(headerCart.textContent) || 0;
      }

      return 0;
    } catch (error) {
      console.error("Error getting Salla cart count:", error);
      return 0;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.floatingCart = new FloatingCart();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.floatingCart) {
      window.floatingCart = new FloatingCart();
    }
  });
} else {
  window.floatingCart = new FloatingCart();
}
