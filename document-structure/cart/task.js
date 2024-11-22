document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".product__quantity-controls")
    .forEach((controls) => {
      controls.addEventListener("click", (event) => {
        const quantityValue = controls.querySelector(
          ".product__quantity-value"
        );
        let currentValue = parseInt(quantityValue.textContent);
        if (event.target.classList.contains("product__quantity-control_inc")) {
          quantityValue.textContent = currentValue + 1;
        } else if (
          event.target.classList.contains("product__quantity-control_dec")
        ) {
          quantityValue.textContent = Math.max(1, currentValue - 1);
        }
      });
    });
  document.querySelectorAll(".product__add").forEach((addButton) => {
    addButton.addEventListener("click", () => {
      const product = addButton.closest(".product");
      const productId = product.dataset.id;
      const productImageSrc = product.querySelector(".product__image").src;
      const productQuantity = parseInt(
        product.querySelector(".product__quantity-value").textContent
      );
      const cartProductsContainer = document.querySelector(".cart__products");
      let cartProduct = cartProductsContainer.querySelector(
        `.cart__product[data-id="${productId}"]`
      );

      if (cartProduct) {
        const cartProductCount = cartProduct.querySelector(
          ".cart__product-count"
        );
        cartProductCount.textContent =
          parseInt(cartProductCount.textContent) + productQuantity;
      } else {
        cartProduct = document.createElement("div");
        cartProduct.classList.add("cart__product");
        cartProduct.dataset.id = productId;
        cartProduct.innerHTML = `
                  <img class="cart__product-image" src="${productImageSrc}">
                  <div class="cart__product-count">${productQuantity}</div>
              `;
        cartProductsContainer.appendChild(cartProduct);
      }
      animateProductToCart(
        product.querySelector(".product__image"),
        cartProduct.querySelector(".cart__product-image")
      );
    });
  });
  function animateProductToCart(sourceImage, targetImage) {
    const sourceRect = sourceImage.getBoundingClientRect();
    const targetRect = targetImage.getBoundingClientRect();
    const shadowImage = sourceImage.cloneNode();
    shadowImage.style.position = "absolute";
    shadowImage.style.zIndex = 1000;
    shadowImage.style.left = `${sourceRect.left}px`;
    shadowImage.style.top = `${sourceRect.top}px`;
    shadowImage.style.width = `${sourceRect.width}px`;
    shadowImage.style.height = `${sourceRect.height}px`;
    shadowImage.style.transition = "all 0.5s ease";
    document.body.appendChild(shadowImage);
    setTimeout(() => {
      shadowImage.style.left = `${targetRect.left}px`;
      shadowImage.style.top = `${targetRect.top}px`;
      shadowImage.style.width = `${targetRect.width}px`;
      shadowImage.style.height = `${targetRect.height}px`;
    }, 0);
    shadowImage.addEventListener("transitionend", () => {
      shadowImage.remove();
    });
  }
});
