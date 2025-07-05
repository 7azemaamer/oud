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

    // Close on escape key
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

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Refresh cart data when opening
    this.loadCartData();
  }

  closeCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");

    this.isOpen = false;
    drawer.style.transform = "translateX(100%)";
    overlay.style.display = "none";
    drawer.classList.remove("floating-cart-slide-in");

    // Restore body scroll
    document.body.style.overflow = "";
  }

  async loadCartData() {
    try {
      // Show loading state
      this.showLoading();

      // Extract cart items from DOM (similar to how main cart works)
      const cartItems = this.extractCartItemsFromDOM();

      if (cartItems.length === 0) {
        this.showEmptyCart();
        this.updateCartCount(0);
        return;
      }

      // Extract product IDs from cart items
      const productIds = cartItems.map((item) =>
        this.extractProductIdFromCartItem(item)
      );

      // Fetch product data from Salla API
      const productsData = await this.fetchProductsFromAPI(productIds);

      // Merge cart data with product data
      this.cartData = this.mergeCartAndProductData(cartItems, productsData);

      // Update UI
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
    const cartForms = document.querySelectorAll('form[id^="item-"]');

    cartForms.forEach((form) => {
      const cartItemId = form.id.replace("item-", "");
      const quantityInput = form.querySelector('input[name="quantity"]');
      const priceElement = form.querySelector(".item-price");
      const totalElement = form.querySelector(".item-total");
      const titleElement = form.querySelector("h1 a, .product-card__title a");
      const imageElement = form.querySelector("img");
      const linkElement = form.querySelector('a[href*="/ar/"]');

      if (quantityInput && priceElement) {
        // Extract product ID from link or form attributes
        let productId = null;
        if (linkElement) {
          // Extract from URL patterns like /ar/PdvYWyr or /ar/product-slug
          const urlMatch = linkElement.href.match(/\/ar\/([^\/]+)$/);
          if (urlMatch) {
            productId = this.getProductIdFromSlug(urlMatch[1]);
          }
        }

        cartItems.push({
          cartItemId,
          productId,
          quantity: parseInt(quantityInput.value) || 1,
          price: this.extractPrice(priceElement.textContent),
          total: this.extractPrice(totalElement?.textContent || "0"),
          title: titleElement?.textContent?.trim() || "",
          image: imageElement?.src || "",
          link: linkElement?.href || "",
        });
      }
    });

    return cartItems;
  }

  getProductIdFromSlug(slug) {
    // Map common slugs to product IDs based on the API response
    const slugToIdMap = {
      PdvYWyr: "29587259",
      onDxBPZ: "1045891903",
      NKynRrK: "1821043774",
      NKynXlr: "1449428756",
    };

    return slugToIdMap[slug] || slug;
  }

  extractProductIdFromCartItem(cartItem) {
    // Try to get product ID from various sources
    if (cartItem.productId) {
      return cartItem.productId;
    }

    // Fallback: extract from cart item ID or other attributes
    return cartItem.cartItemId;
  }

  async fetchProductsFromAPI(productIds) {
    try {
      // Create API URL similar to the one you provided
      const validIds = productIds.filter((id) => id && id !== "");
      if (validIds.length === 0) return [];

      const sourceValues = validIds
        .map((id) => `source_value[]=${id}`)
        .join("&");
      const apiUrl = `https://api.salla.dev/store/v1/products?source=selected&${sourceValues}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      return data.success ? data.data : [];
    } catch (error) {
      console.error("Error fetching products from API:", error);
      return [];
    }
  }

  mergeCartAndProductData(cartItems, productsData) {
    return cartItems.map((cartItem) => {
      const productData = productsData.find(
        (p) =>
          p.id === cartItem.productId ||
          p.id === cartItem.cartItemId ||
          this.normalizeArabicName(p.name) ===
            this.normalizeArabicName(cartItem.title)
      );

      return {
        ...cartItem,
        productData: productData || {
          id: cartItem.productId || cartItem.cartItemId,
          name: cartItem.title,
          image: { url: cartItem.image },
          price: cartItem.price,
          currency: "SAR",
        },
      };
    });
  }

  normalizeArabicName(name) {
    return name?.replace(/[\u064B-\u065F\u0670\u0640]/g, "").trim() || "";
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
      <section class="cart-item bg-storeBG p-5 xs:p-7 rounded-md mb-5 relative border border-primary">
        <input type="hidden" name="id" value="${item.cartItemId}">

        <!-- product -->
        <div class="md:flex rtl:space-x-reverse md:space-x-12 items-start justify-between mb-8 last:mb-0">
          <div class="flex flex-1 rtl:space-x-reverse space-x-4">
            <a href="${item.link}" class="shrink-0">
              <img 
                src="${product.image?.url || item.image || ""}" 
                alt="${product.name || item.title}"
                class="lazy flex-none w-24 h-20 border border-gray-200 bg-gray-100 rounded-md object-center object-cover"
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
            <div class="s-quantity-input-container">
              <button 
                class="s-quantity-input-increase-button s-quantity-input-button" 
                type="button"
                onclick="floatingCart.updateQuantity('${item.cartItemId}', ${
      item.quantity + 1
    })"
              >
                <span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M26.667 14.667h-9.333v-9.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333v9.333h-9.333c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h9.333v9.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-9.333h9.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333z"></path>
                  </svg>
                </span>
              </button>
              <input 
                class="s-quantity-input-input" 
                cart-item-id="${item.cartItemId}" 
                name="quantity" 
                aria-label="Quantity" 
                min="1"
                value="${item.quantity}"
                readonly
              />
              <button 
                class="s-quantity-input-decrease-button s-quantity-input-button" 
                type="button"
                onclick="floatingCart.updateQuantity('${item.cartItemId}', ${
      item.quantity - 1
    })"
                ${
                  item.quantity <= 1
                    ? 'disabled style="opacity: 0.5; cursor: not-allowed;"'
                    : ""
                }
              >
                <span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M26.667 14.667h-21.333c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h21.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333z"></path>
                  </svg>
                </span>
              </button>
            </div>
            
            <p class="text-primary flex-none font-bold text-sm rtl:md:pl-12 ltr:md:pr-12">
              <span>المجموع:</span>
              <span class="inline-block item-total">${this.formatPrice(
                item.total
              )} <i class="sicon-sar"></i></span>
            </p>
          </div>
        </div>

        <span class="absolute top-1.5 rtl:left-1.5 ltr:right-1.5 rtl:xs:left-5 ltr:xs:right-5 xs:top-5">
          <button 
            type="button" 
            class="btn--delete s-button-element s-button-icon s-button-solid s-button-small s-button-danger s-button-loader-center" 
            onclick="floatingCart.removeItem('${item.cartItemId}')" 
            aria-label="Remove from the cart"
          >
            <span class="s-button-text">
              <i class="sicon-cancel"></i>
            </span>
          </button>
        </span>
      </section>
    `;
  }

  async updateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) return;

    try {
      // Update quantity using Salla's cart API
      const cartItemElement = document.querySelector(`#item-${cartItemId}`);
      if (cartItemElement) {
        const quantityInput = cartItemElement.querySelector(
          'input[name="quantity"]'
        );
        if (quantityInput) {
          quantityInput.value = newQuantity;

          // Trigger change event to update via Salla's system
          const changeEvent = new Event("change", { bubbles: true });
          quantityInput.dispatchEvent(changeEvent);

          // Trigger Salla's form onChange if available
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
      }, 500);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  async removeItem(cartItemId) {
    try {
      // Use Salla's cart delete function if available
      if (typeof salla !== "undefined" && salla.cart && salla.cart.deleteItem) {
        await salla.cart.deleteItem(cartItemId);

        // Remove the element from DOM
        const cartItemElement = document.querySelector(`#item-${cartItemId}`);
        if (cartItemElement) {
          cartItemElement.remove();
        }
      }

      // Refresh cart data
      setTimeout(() => {
        this.loadCartData();
        this.showPulseAnimation();
      }, 300);
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
    if (totalElement) {
      totalElement.textContent = `${this.formatPrice(
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
    // Watch for DOM changes in cart area
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
          setTimeout(() => this.loadCartData(), 300);
        }
      });

      observer.observe(cartContainer, {
        childList: true,
        subtree: true,
      });
    }

    // Watch for quantity input changes
    document.addEventListener("input", (e) => {
      if (
        e.target.matches('input[name="quantity"]') &&
        e.target.closest('form[id^="item-"]')
      ) {
        setTimeout(() => this.loadCartData(), 500);
      }
    });

    // Watch for cart delete operations
    document.addEventListener("click", (e) => {
      if (
        e.target.closest(".btn--delete") &&
        e.target.closest('form[id^="item-"]')
      ) {
        setTimeout(() => this.loadCartData(), 1000);
      }
    });
  }
}

// Initialize floating cart when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.floatingCart = new FloatingCart();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.floatingCart) {
      window.floatingCart = new FloatingCart();
    }
  });
} else {
  window.floatingCart = new FloatingCart();
}
