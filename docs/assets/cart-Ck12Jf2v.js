import{g as s,u as m,s as l}from"./utils-Ca-9W_8e.js";/* empty css                   */function i(){const e=s("so-cart")||[],a=document.querySelector(".product-list"),n=document.querySelector(".empty-cart-message"),t=document.querySelector(".cart-header h1");if(e.length===0){a.innerHTML="",n.style.display="block",t.textContent="Your Cart is Empty",y(),m();return}n.style.display="none",t.textContent=`Your Cart (${e.length} Items)`;const c=e.map((o,r)=>p(o,r));a.innerHTML=c.join(""),g(),y(),m()}function p(e,a){const n=e?.Image||"/images/placeholder.jpg",t=e?.Name||"Unknown Item",c=parseFloat(e?.FinalPrice)||0,o=e?.Colors?.[0]?.ColorName||"N/A",r=e?.Quantity||1;return`
    <li class="cart-card">
      <a href="#" class="cart-card__image">
        <img src="${n}" alt="${t}" loading="lazy">
      </a>
      <div class="cart-card__details">
        <a href="#" class="card__name">${t}</a>
        <p class="cart-card__color">Color: ${o}</p>
        
        <div class="price-row">
          <span class="unit-price">$${c.toFixed(2)} each</span>
          <span class="total-price">$${(c*r).toFixed(2)}</span>
        </div>
        
        <div class="quantity-control">
          <span class="quantity-label">Qty:</span>
          <button class="qty-btn decrease" data-index="${a}" aria-label="Decrease quantity">−</button>
          <input type="number" class="cart-card__quantity-input" 
                 min="1" value="${r}" data-index="${a}" aria-label="Quantity">
          <button class="qty-btn increase" data-index="${a}" aria-label="Increase quantity">+</button>
        </div>
        
        <button class="remove-btn" data-index="${a}">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          Remove
        </button>
      </div>
    </li>
  `}function g(){document.querySelectorAll(".cart-card__quantity-input").forEach(e=>{e.addEventListener("change",a=>{const n=a.target.dataset.index,t=parseInt(a.target.value);h(n,t)})}),document.querySelectorAll(".qty-btn.increase").forEach(e=>{e.addEventListener("click",a=>{const n=a.target.dataset.index,t=s("so-cart");t[n].Quantity+=1,l("so-cart",t),i()})}),document.querySelectorAll(".qty-btn.decrease").forEach(e=>{e.addEventListener("click",a=>{const n=a.target.dataset.index,t=s("so-cart");t[n].Quantity>1&&(t[n].Quantity-=1,l("so-cart",t),i())})}),document.querySelectorAll(".remove-btn").forEach(e=>{e.addEventListener("click",a=>{const n=a.target.dataset.index,t=s("so-cart");t.splice(n,1),l("so-cart",t),i()})})}function h(e,a){const n=Math.max(1,isNaN(a)?1:a),t=s("so-cart");t[e].Quantity=n,l("so-cart",t),i()}function y(){const e=s("so-cart")||[],a=document.querySelector(".checkout-button");let n=0,t=0;e.forEach(d=>{const u=d.Quantity||1;n+=u,t+=(d.FinalPrice||0)*u});const c=t*.06,o=n>0?10+(n-1)*2:0,r=t+c+o;document.getElementById("cart-subtotal").textContent=`$${t.toFixed(2)}`,document.getElementById("cart-tax").textContent=`$${c.toFixed(2)}`,document.getElementById("cart-shipping").textContent=`$${o.toFixed(2)}`,document.getElementById("cart-total").textContent=`$${r.toFixed(2)}`,a.disabled=e.length===0}document.addEventListener("DOMContentLoaded",()=>{i()});
