   
  window.FloatingCart = (function () {
    let cart = {
      items: [],
      total: 0,
      count: 0,
    };

    let cartButton, cartCount, cartDrawer, cartOverlay, closeButton;
    let emptyCart, cartProducts, cartFooter, subtotalElement, totalElement;

    function init() {
      cartButton = document.getElementById("cart-button");
      cartCount = document.getElementById("cart-count");
      cartDrawer = document.getElementById("cart-drawer");
      cartOverlay = document.getElementById("cart-overlay");
      closeButton = document.getElementById("close-cart");
      emptyCart = document.getElementById("empty-cart");
      cartProducts = document.getElementById("cart-products");
      cartFooter = document.getElementById("cart-footer");
      subtotalElement = document.getElementById("subtotal");
      totalElement = document.getElementById("total");

      cartButton.addEventListener("click", openCart);
      closeButton.addEventListener("click", closeCart);
      cartOverlay.addEventListener("click", closeCart);

      loadCartFromSalla();

      setupSallaEventListeners();
    }

    function loadCartFromSalla() {
      try {
        const cartItems = document.querySelectorAll('form[id^="item-"]');
        if (cartItems.length > 0) {
          console.log("Loading cart from DOM elements...");
          cart.items = [];

          cartItems.forEach((form) => {
            const itemId = form.querySelector('input[name="id"]')?.value;
            const itemName = form.querySelector("h1 a")?.textContent?.trim();
            const itemImage = form.querySelector("img")?.src;
            const quantityInput = form.querySelector('input[name="quantity"]');
            const itemQuantity = quantityInput
              ? parseInt(quantityInput.value) || 1
              : 1;
            const priceElement = form.querySelector(".item-price");
            const itemPrice = priceElement
              ? extractPrice(priceElement.textContent)
              : 0;

            if (itemId && itemName) {
              cart.items.push({
                id: parseInt(itemId),
                name: itemName,
                price: itemPrice,
                quantity: itemQuantity,
                image:
                  itemImage || "https://via.placeholder.com/60x50?text=صورة",
                currency: "SAR",
                url: form.querySelector("h1 a")?.href || "#",
              });
            }
          });

          calculateTotals();
          updateCartDisplay();
          return;
        }

        const headerCartSummary = document.querySelector("salla-cart-summary");
        if (headerCartSummary) {
          const countElement = headerCartSummary.querySelector(
            ".s-cart-summary-count"
          );
          const totalElement = headerCartSummary.querySelector(
            ".s-cart-summary-total"
          );

          if (countElement && totalElement) {
            cart.count = parseInt(countElement.textContent) || 0;
            cart.total = extractPrice(totalElement.textContent);

            if (cart.count > 0 && cart.items.length === 0) {
              cart.items = [
                {
                  id: 1,
                  name: "عناصر السلة",
                  price: cart.total / cart.count,
                  quantity: cart.count,
                  image: "https://via.placeholder.com/60x50?text=سلة",
                  currency: "SAR",
                  url: "/cart",
                },
              ];
            }

            updateCartDisplay();
            return;
          }
        }

        if (
          window.dataLayer &&
          window.dataLayer[0] &&
          window.dataLayer[0].ecommerce
        ) {
          const ecommerceData = window.dataLayer[0].ecommerce;

          if (ecommerceData.checkout && ecommerceData.checkout.products) {
            cart.items = ecommerceData.checkout.products.map((product) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              image: product.image,
              currency: product.currency,
              variant: product.variant,
              url: product.url || "#",
            }));

            calculateTotals();
            updateCartDisplay();
            return;
          }
        }

        if (window.salla && window.salla.cart) {
          window.salla.cart
            .get()
            .then((response) => {
              if (response && response.data && response.data.items) {
                cart.items = response.data.items.map((item) => ({
                  id: item.product_id,
                  name: item.product.name,
                  price: item.product.price,
                  quantity: item.quantity,
                  image: item.product.image.url,
                  currency: "SAR",
                  variant: item.variant_id,
                  url: item.product.url,
                }));

                calculateTotals();
                updateCartDisplay();
              }
            })
            .catch((error) => {
              console.log("Could not load cart from Salla API:", error);
            });
        }
      } catch (error) {
        console.log("Error loading cart:", error);
      }
    }

    function extractPrice(text) {
      if (!text) return 0;
      const cleanText = text.replace(/[^\d٠-٩,،.]/g, "");
      const arabicNumerals = "٠١٢٣٤٥٦٧٨٩";
      const englishNumerals = "0123456789";
      let converted = cleanText;
      for (let i = 0; i < arabicNumerals.length; i++) {
        converted = converted.replace(
          new RegExp(arabicNumerals[i], "g"),
          englishNumerals[i]
        );
      }
      converted = converted.replace(/,/g, "");
      return parseFloat(converted) || 0;
    }

    function setupSallaEventListeners() {
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (
                node.nodeType === 1 &&
                ((node.matches && node.matches('form[id^="item-"]')) ||
                  (node.querySelector &&
                    node.querySelector('form[id^="item-"]')))
              ) {
                shouldUpdate = true;
              }
            });
            mutation.removedNodes.forEach((node) => {
              if (
                node.nodeType === 1 &&
                ((node.matches && node.matches('form[id^="item-"]')) ||
                  (node.querySelector &&
                    node.querySelector('form[id^="item-"]')))
              ) {
                shouldUpdate = true;
              }
            });
          }
        });
        if (shouldUpdate) {
          setTimeout(loadCartFromSalla, 300);
        }
      });

      const mainContent =
        document.querySelector(".main-content") || document.body;
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
      });

      if (window.Salla) {
        Salla.onReady(() => {
          loadCartFromSalla();

          if (window.salla && window.salla.event) {
            window.salla.event.on("cart::updated", () => {
              setTimeout(loadCartFromSalla, 500);
            });

            window.salla.event.on("product::added", () => {
              setTimeout(() => {
                loadCartFromSalla();
                showAddedAnimation();
                openCart();
              }, 500);
            });
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (
          e.target.closest("salla-add-product-button") ||
          e.target.closest('[class*="addToCart"]') ||
          e.target.closest('button[aria-label*="Add to cart"]')
        ) {
          setTimeout(() => {
            loadCartFromSalla();
            showAddedAnimation();
            openCart();
          }, 1000);
        }
      });

      document.addEventListener("change", (e) => {
        if (
          e.target.name === "quantity" &&
          e.target.closest('form[id^="item-"]')
        ) {
          setTimeout(loadCartFromSalla, 300);
        }
      });

      if (window.dataLayer) {
        const originalPush = window.dataLayer.push;
        window.dataLayer.push = function (...args) {
          originalPush.apply(window.dataLayer, args);
          setTimeout(loadCartFromSalla, 100);
        };
      }
    }

    function calculateTotals() {
      cart.count = cart.items.reduce((total, item) => total + item.quantity, 0);
      cart.total = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }

    function updateCartDisplay() {
      if (cart.count > 0) {
        cartCount.textContent = cart.count;
        cartCount.style.display = "flex";
      } else {
        cartCount.style.display = "none";
      }

      if (cart.items.length === 0) {
        emptyCart.style.display = "block";
        cartProducts.style.display = "none";
        cartFooter.style.display = "none";
      } else {
        emptyCart.style.display = "none";
        cartProducts.style.display = "block";
        cartFooter.style.display = "block";

        renderCartItems();
        updateTotals();
      }
    }

    function renderCartItems() {
      cartProducts.innerHTML = cart.items
        .map(
          (item) => `
      <div style="
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        direction: rtl;
      ">
        <div style="display: flex; gap: 12px; align-items: flex-start">
          <img 
            src="${item.image}" 
            alt="${item.name}"
            style="
              width: 60px;
              height: 50px;
              border-radius: 6px;
              object-fit: cover;
              border: 1px solid #e5e7eb;
            "
          />
          <div style="flex: 1; min-width: 0">
            <h3 style="
              font-size: 14px;
              font-weight: 600;
              color: #111827;
              margin: 0 0 8px 0;
              line-height: 1.4;
              font-family: 'DINNextLTArabic-Regular', sans-serif;
            ">${item.name}</h3>
            
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
            ">
              <span style="
                font-size: 12px;
                color: #6b7280;
                font-family: 'DINNextLTArabic-Regular', sans-serif;
              ">الكمية: ${item.quantity}</span>
              <span style="
                font-size: 13px;
                color: #4b5563;
                font-weight: 600;
                font-family: 'DINNextLTArabic-Regular', sans-serif;
              ">${item.price} ر.س</span>
            </div>
            
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
              <button 
                onclick="FloatingCart.removeItem(${item.id})"
                style="
                  background-color: #fee2e2;
                  color: #dc2626;
                  border: none;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 11px;
                  cursor: pointer;
                  transition: background-color 0.2s ease;
                  font-family: 'DINNextLTArabic-Regular', sans-serif;
                "
                onmouseover="this.style.backgroundColor='#fecaca'"
                onmouseout="this.style.backgroundColor='#fee2e2'"
              >
                <i class="sicon-cancel" style="font-size: 10px; margin-left: 4px"></i>
                حذف
              </button>
              
              <span style="
                font-weight: bold;
                color: #000000;
                font-size: 14px;
                font-family: 'DINNextLTArabic-Regular', sans-serif;
              ">${item.price * item.quantity} ر.س</span>
            </div>
          </div>
        </div>
      </div>
    `
        )
        .join("");
    }

    function updateTotals() {
      const formattedSubtotal = `${cart.total} ر.س`;
      const formattedTotal = `${cart.total} ر.س`;

      subtotalElement.textContent = formattedSubtotal;
      totalElement.textContent = formattedTotal;
    }

    function openCart() {
      cartOverlay.style.display = "block";
      cartDrawer.style.transform = "translateX(0)";
      cartDrawer.classList.add("floating-cart-slide-in");
      document.body.style.overflow = "hidden";
    }

    function closeCart() {
      cartOverlay.style.display = "none";
      cartDrawer.style.transform = "translateX(100%)";
      cartDrawer.classList.remove("floating-cart-slide-in");
      document.body.style.overflow = "";
    }

    function showAddedAnimation() {
      const pulseRing = document.getElementById("pulse-ring");
      if (pulseRing) {
        pulseRing.style.display = "block";
        pulseRing.classList.add("floating-cart-pulse");

        setTimeout(() => {
          pulseRing.style.display = "none";
          pulseRing.classList.remove("floating-cart-pulse");
        }, 600);
      }

      cartButton.classList.add("floating-cart-bounce");
      setTimeout(() => {
        cartButton.classList.remove("floating-cart-bounce");
      }, 600);
    }

    function removeItem(productId) {
      if (window.salla && window.salla.cart) {
        const cartItemElement = document.querySelector(`#item-${productId}`);
        if (cartItemElement) {
          const itemId = cartItemElement.querySelector('input[name="id"]');
          if (itemId) {
            window.salla.cart
              .deleteItem(itemId.value)
              .then(() => {
                if (cartItemElement) {
                  cartItemElement.remove();
                }
                loadCartFromSalla();
                console.log("تم حذف العنصر من السلة");
              })
              .catch((error) => {
                console.log("خطأ في حذف العنصر:", error);
              });
          }
        }
      } else {
        cart.items = cart.items.filter(
          (item) => item.id !== parseInt(productId)
        );
        calculateTotals();
        updateCartDisplay();
        console.log("تم حذف العنصر محلياً");
      }
    }

    function clearCart() {
      if (confirm("هل أنت متأكد من إفراغ السلة؟")) {
        if (window.salla && window.salla.cart) {
          window.salla.cart.clear().then(() => {
            cart.items = [];
            cart.total = 0;
            cart.count = 0;
            updateCartDisplay();
          });
        }
      }
    }

    function proceedToCheckout() {
      window.location.href = "/ar/cart";
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    return {
      removeItem,
      clearCart,
      proceedToCheckout,
      openCart,
      closeCart,
    };
  })();
