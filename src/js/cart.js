import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const cartHeader = document.querySelector(".cart-header h1");

  if (cartItems.length === 0) {
    productList.innerHTML = "";
    emptyCartMessage.style.display = "block";
    cartHeader.textContent = "Your Cart is Empty";
    renderCartTotal();
    updateCartCount();
    return;
  }

  emptyCartMessage.style.display = "none";
  cartHeader.textContent = `Your Cart (${cartItems.length} Items)`;

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  productList.innerHTML = htmlItems.join("");

  attachEventListeners();
  renderCartTotal();
  updateCartCount();
}

function cartItemTemplate(item, index) {
  const image = item?.Image || "/images/placeholder.jpg";
  const name = item?.Name || "Unknown Item";
  const price = parseFloat(item?.FinalPrice) || 0;
  const color = item?.Colors?.[0]?.ColorName || "N/A";
  const quantity = item?.Quantity || 1;

  return `
    <li class="cart-card">
      <a href="#" class="cart-card__image">
        <img src="${image}" alt="${name}" loading="lazy">
      </a>
      <div class="cart-card__details">
        <a href="#" class="card__name">${name}</a>
        <p class="cart-card__color">Color: ${color}</p>
        
        <div class="price-row">
          <span class="unit-price">$${price.toFixed(2)} each</span>
          <span class="total-price">$${(price * quantity).toFixed(2)}</span>
        </div>
        
        <div class="quantity-control">
          <span class="quantity-label">Qty:</span>
          <button class="qty-btn decrease" data-index="${index}" aria-label="Decrease quantity">−</button>
          <input type="number" class="cart-card__quantity-input" 
                 min="1" value="${quantity}" data-index="${index}" aria-label="Quantity">
          <button class="qty-btn increase" data-index="${index}" aria-label="Increase quantity">+</button>
        </div>
        
        <button class="remove-btn" data-index="${index}">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          Remove
        </button>
      </div>
    </li>
  `;
}

function attachEventListeners() {
  // Quantity input changes
  document.querySelectorAll(".cart-card__quantity-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      updateQuantity(index, newQty);
    });
  });

  // Increase quantity buttons
  document.querySelectorAll(".qty-btn.increase").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const cartItems = getLocalStorage("so-cart");
      cartItems[index].Quantity += 1;
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  });

  // Decrease quantity buttons
  document.querySelectorAll(".qty-btn.decrease").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const cartItems = getLocalStorage("so-cart");
      if (cartItems[index].Quantity > 1) {
        cartItems[index].Quantity -= 1;
        setLocalStorage("so-cart", cartItems);
        renderCartContents();
      }
    });
  });

  // Remove item buttons
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const cartItems = getLocalStorage("so-cart");
      cartItems.splice(index, 1);
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  });
}

function updateQuantity(index, newQty) {
  const validatedQty = Math.max(1, isNaN(newQty) ? 1 : newQty);
  const cartItems = getLocalStorage("so-cart");
  cartItems[index].Quantity = validatedQty;
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const checkoutBtn = document.querySelector(".checkout-button");

  let itemCount = 0;
  let subtotal = 0;

  cartItems.forEach(item => {
    const quantity = item.Quantity || 1;
    itemCount += quantity;
    subtotal += (item.FinalPrice || 0) * quantity;
  });

  const tax = subtotal * 0.06;
  const shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
  const total = subtotal + tax + shipping;

  document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("cart-tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cart-shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;

  checkoutBtn.disabled = cartItems.length === 0;
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});
