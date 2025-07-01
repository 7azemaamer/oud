const FloatingCart = {
  cart: JSON.parse(localStorage.getItem("floatingCart")) || [],

  products: [],
  cartData: null,
  sallaConfig: null,

  elements: {
    cartButton: null,
    cartCount: null,
    cartOverlay: null,
    cartDrawer: null,
    closeCart: null,
    emptyCart: null,
    cartProducts: null,
    cartFooter: null,
    subtotal: null,
    total: null,
    pulseRing: null,
  },

  init() {
    this.elements = {
      cartButton: document.getElementById("cart-button"),
      cartCount: document.getElementById("cart-count"),
      cartOverlay: document.getElementById("cart-overlay"),
      cartDrawer: document.getElementById("cart-drawer"),
      closeCart: document.getElementById("close-cart"),
      emptyCart: document.getElementById("empty-cart"),
      cartProducts: document.getElementById("cart-products"),
      cartFooter: document.getElementById("cart-footer"),
      subtotal: document.getElementById("subtotal"),
      total: document.getElementById("total"),
      pulseRing: document.getElementById("pulse-ring"),
    };

    this.loadSallaData();
    this.bindEvents();
    this.updateCartUI();
    this.attachToProductButtons();
    this.hookIntoSallaEvents();
  },

  loadSallaData() {
    if (window.dataLayer && window.dataLayer.length > 0) {
      const sallaData = window.dataLayer.find((layer) => layer.ecommerce);
      if (sallaData && sallaData.ecommerce) {
        this.cartData = sallaData.ecommerce;
        console.log("FloatingCart: Loaded Salla ecommerce data", this.cartData);
      }
    }

    if (window.Salla) {
      window.Salla.onReady((config) => {
        this.sallaConfig = config;
        this.loadCartFromSalla();
        console.log("FloatingCart: Salla ready with config", config);
      });
    } else {
      window.addEventListener(
        "salla::created",
        () => {
          window.Salla.onReady((config) => {
            this.sallaConfig = config;
            this.loadCartFromSalla();
          });
        },
        { once: true }
      );
    }
  },

  loadCartFromSalla() {
    if (
      this.sallaConfig &&
      this.sallaConfig.events &&
      this.sallaConfig.events["Cart Viewed"]
    ) {
      const cartViewedEvents = this.sallaConfig.events["Cart Viewed"];
      if (cartViewedEvents.length > 0) {
        const cartEvent = cartViewedEvents[0];
        if (cartEvent.products && cartEvent.products.length > 0) {
          this.cart = cartEvent.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || product.image_url,
            quantity: product.quantity,
            variant: product.variant,
            sku: product.sku,
            url: product.url,
            category: product.category,
            brand: product.brand || "",
            discount: 0,
          }));

          this.saveCart();
          this.updateCartUI();
          console.log("FloatingCart: Loaded cart from Salla events", this.cart);
        }
      }
    }
  },

  hookIntoSallaEvents() {
    document.addEventListener("cart::updated", (event) => {
      console.log("FloatingCart: Cart updated event", event.detail);
      this.syncWithSallaCart();
    });

    document.addEventListener("product::added", (event) => {
      console.log("FloatingCart: Product added event", event.detail);
      this.handleProductAdded(event.detail);
    });

    if (window.salla && window.salla.event) {
      window.salla.event.on("cart.updated", (data) => {
        this.syncWithSallaCart(data);
      });
    }
  },

  syncWithSallaCart(cartData = null) {
    if (cartData) {
      if (cartData.items) {
        this.cart = cartData.items.map((item) => ({
          id: item.product_id,
          name: item.product_name,
          price: item.product_price,
          image: item.product_image,
          quantity: item.quantity,
          variant: item.variant_id,
          sku: item.sku,
          discount: item.discount || 0,
        }));

        this.saveCart();
        this.updateCartUI();
      }
    }
  },

  handleProductAdded(productData) {
    if (productData && productData.product) {
      const product = productData.product;
      const existingItem = this.cart.find((item) => item.id == product.id);

      if (existingItem) {
        existingItem.quantity += productData.quantity || 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: productData.quantity || 1,
          variant: productData.variant,
          sku: product.sku,
          discount: 0,
        });
      }

      this.saveCart();
      this.updateCartUI();
      this.showCartAnimation();
      this.openCart();
      this.showNotification(`تم إضافة ${product.name} إلى السلة`);
    }
  },

  getProduct(productId) {
    let product = this.products.find((product) => product.id == productId);

    if (!product && this.sallaConfig && this.sallaConfig.events) {
      const sliderData = document.querySelector("salla-products-slider");
      if (sliderData) {
        const sourceValue = sliderData.getAttribute("source-value");
        if (sourceValue) {
          const productIds = JSON.parse(sourceValue);
          if (productIds.includes(parseInt(productId))) {
            product = {
              id: productId,
              name: `منتج ${productId}`,
              price: 100,
              image:
                "https://via.placeholder.com/100x100/f3f4f6/9ca3af?text=صورة",
              inStock: true,
              discount: 0,
            };
          }
        }
      }
    }

    return product;
  },

  addToCart(productId, quantity = 1) {
    if (window.salla && window.salla.cart && window.salla.cart.addItem) {
      window.salla.cart
        .addItem(productId, quantity)
        .then((response) => {
          console.log("FloatingCart: Added to Salla cart", response);
          this.showCartAnimation();
          this.openCart();
        })
        .catch((error) => {
          console.error("FloatingCart: Error adding to Salla cart", error);
          this.addToLocalCart(productId, quantity);
        });
    } else {
      this.addToLocalCart(productId, quantity);
    }
  },

  addToLocalCart(productId, quantity = 1) {
    const product = this.getProduct(productId);
    if (!product) {
      console.error("Product not found:", productId);
      this.showNotification("المنتج غير موجود");
      return;
    }

    if (product.inStock === false) {
      this.showNotification("هذا المنتج غير متوفر حالياً");
      return;
    }

    const existingItem = this.cart.find((item) => item.id == productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        discount: product.discount || 0,
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showCartAnimation();
    this.openCart();
    this.showNotification(`تم إضافة ${product.name} إلى السلة`);
  },

  removeFromCart(productId) {
    if (window.salla && window.salla.cart && window.salla.cart.deleteItem) {
      window.salla.cart
        .deleteItem(productId)
        .then(() => {
          this.cart = this.cart.filter((item) => item.id != productId);
          this.saveCart();
          this.updateCartUI();
        })
        .catch(() => {
          this.cart = this.cart.filter((item) => item.id != productId);
          this.saveCart();
          this.updateCartUI();
        });
    } else {
      this.cart = this.cart.filter((item) => item.id != productId);
      this.saveCart();
      this.updateCartUI();
    }
  },

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    if (window.salla && window.salla.cart && window.salla.cart.updateItem) {
      window.salla.cart
        .updateItem(productId, newQuantity)
        .then(() => {
          const item = this.cart.find((item) => item.id == productId);
          if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
          }
        })
        .catch(() => {
          const item = this.cart.find((item) => item.id == productId);
          if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
          }
        });
    } else {
      const item = this.cart.find((item) => item.id == productId);
      if (item) {
        item.quantity = newQuantity;
        this.saveCart();
        this.updateCartUI();
      }
    }
  },

  clearCart() {
    if (window.salla && window.salla.cart && window.salla.cart.clear) {
      window.salla.cart
        .clear()
        .then(() => {
          this.cart = [];
          this.saveCart();
          this.updateCartUI();
          this.showNotification("تم إفراغ السلة");
        })
        .catch(() => {
          this.cart = [];
          this.saveCart();
          this.updateCartUI();
          this.showNotification("تم إفراغ السلة");
        });
    } else {
      this.cart = [];
      this.saveCart();
      this.updateCartUI();
      this.showNotification("تم إفراغ السلة");
    }
  },

  saveCart() {
    localStorage.setItem("floatingCart", JSON.stringify(this.cart));
  },

  updateCartUI() {
    const itemCount = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartTotal = this.cart.reduce((total, item) => {
      const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);

    if (itemCount > 0) {
      this.elements.cartCount.textContent = itemCount;
      this.elements.cartCount.style.display = "flex";
    } else {
      this.elements.cartCount.style.display = "none";
    }

    if (this.cart.length === 0) {
      this.elements.emptyCart.style.display = "block";
      this.elements.cartProducts.style.display = "none";
      this.elements.cartFooter.style.display = "none";
    } else {
      this.elements.emptyCart.style.display = "none";
      this.elements.cartProducts.style.display = "block";
      this.elements.cartFooter.style.display = "block";

      this.renderCartItems();

      this.elements.subtotal.textContent = `${cartTotal.toFixed(0)} ر.س`;
      this.elements.total.textContent = `${cartTotal.toFixed(0)} ر.س`;
    }
  },

  renderCartItems() {
    this.elements.cartProducts.innerHTML = "";

    this.cart.forEach((item) => {
      const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
      const cartItem = document.createElement("div");
      cartItem.style.cssText = `
          display: flex; 
          align-items: center; 
          gap: 16px; 
          background-color: #f9fafb; 
          border-radius: 8px; 
          padding: 12px; 
          margin-bottom: 12px;
        `;
      cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" 
               style="width: 64px; height: 64px; object-fit: cover; border-radius: 6px;" 
               onerror="this.src='https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=صورة'">
          <div style="flex: 1;">
              <h4 style="font-weight: 500; color: #1f2937; font-size: 14px; margin: 0 0 4px 0;">${
                item.name
              }</h4>
              <div style="display: flex; align-items: center; gap: 8px;">
                  ${
                    item.discount && item.discount > 0
                      ? `<span style="font-size: 14px; color: #9ca3af; text-decoration: line-through;">${
                          item.price
                        } ر.س</span>
                       <span style="color: #059669; font-weight: 600;">${discountedPrice.toFixed(
                         0
                       )} ر.س</span>`
                      : `<span style="color: #059669; font-weight: 600;">${item.price} ر.س</span>`
                  }
              </div>
              <div style="display: flex; align-items: center; margin-top: 8px;">
                  <button onclick="FloatingCart.updateQuantity(${item.id}, ${
        item.quantity - 1
      })" 
                          style="width: 32px; height: 32px; border-radius: 50%; background-color: #e5e7eb; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;"
                          onmouseover="this.style.backgroundColor='#d1d5db'"
                          onmouseout="this.style.backgroundColor='#e5e7eb'">
                      -
                  </button>
                  <span style="margin: 0 12px; font-weight: 500;">${
                    item.quantity
                  }</span>
                  <button onclick="FloatingCart.updateQuantity(${item.id}, ${
        item.quantity + 1
      })" 
                          style="width: 32px; height: 32px; border-radius: 50%; background-color: #e5e7eb; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;"
                          onmouseover="this.style.backgroundColor='#d1d5db'"
                          onmouseout="this.style.backgroundColor='#e5e7eb'">
                      +
                  </button>
              </div>
          </div>
          <button onclick="FloatingCart.removeFromCart(${item.id})" 
                  style="color: #ef4444; background: none; border: none; cursor: pointer; padding: 8px; transition: color 0.3s ease;"
                  onmouseover="this.style.color='#dc2626'"
                  onmouseout="this.style.color='#ef4444'">
              <i class="sicon-trash" style="font-size: 18px;"></i>
          </button>
        `;
      this.elements.cartProducts.appendChild(cartItem);
    });
  },

  showCartAnimation() {
    this.elements.cartButton.classList.add("floating-cart-bounce");
    this.elements.pulseRing.style.display = "block";
    this.elements.pulseRing.classList.add("floating-cart-pulse");

    setTimeout(() => {
      this.elements.cartButton.classList.remove("floating-cart-bounce");
      this.elements.pulseRing.style.display = "none";
      this.elements.pulseRing.classList.remove("floating-cart-pulse");
    }, 600);
  },

  openCart() {
    this.elements.cartOverlay.style.display = "block";
    this.elements.cartDrawer.style.transform = "translateX(0)";
    this.elements.cartDrawer.classList.add("floating-cart-slide-in");
    document.body.style.overflow = "hidden";
  },

  closeCart() {
    this.elements.cartDrawer.style.transform = "translateX(100%)";
    this.elements.cartDrawer.classList.remove("floating-cart-slide-in");
    this.elements.cartOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  },

  proceedToCheckout() {
    if (this.cart.length === 0) {
      this.showNotification("السلة فارغة");
      return;
    }
    window.location.href = "/ar/cart";
  },

  showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed; 
        top: 16px; 
        right: 16px; 
        background-color: #10b981; 
        color: white; 
        padding: 12px 24px; 
        border-radius: 8px; 
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); 
        z-index: 50; 
        transform: translateX(100%); 
        transition: transform 0.3s ease;
      `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => (notification.style.transform = "translateX(0)"), 100);
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  },

  attachToProductButtons() {
    const sallaProductCards = document.querySelectorAll("salla-product-card");
    sallaProductCards.forEach((card) => {
      const productId = card.getAttribute("product-id");
      if (productId) {
        const addButton = card.querySelector(
          "salla-add-product-button, .btn--add-to-cart"
        );
        if (addButton) {
          addButton.addEventListener("click", () => {
            this.addToCart(productId);
          });
        }
      }
    });

    const customButtons = document.querySelectorAll("[product-id]");
    customButtons.forEach((button) => {
      const productId = button.getAttribute("product-id");
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.addToCart(productId);
      });
    });
  },

  bindEvents() {
    this.elements.cartButton.addEventListener("click", () => this.openCart());
    this.elements.closeCart.addEventListener("click", () => this.closeCart());
    this.elements.cartOverlay.addEventListener("click", () => this.closeCart());

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.elements.cartDrawer.style.transform !== "translateX(100%)"
      ) {
        this.closeCart();
      }
    });

    this.elements.cartDrawer.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  FloatingCart.init();
});

function addToFloatingCart(productId, quantity = 1) {
  FloatingCart.addToCart(productId, quantity);
}
