import{g as p,s as l}from"./utils-CdS3DkT2.js";function i(){const t=p("so-cart")||[],e=document.querySelector(".product-list"),c=document.querySelector(".cart-sum"),n=document.querySelector(".cart-total");if(t.length===0){e.innerHTML="<p>Your cart is empty.</p>",c.classList.add("hide");return}const a=f(t),r=a.map(m);e.innerHTML=r.join("");const o=v(a);n.textContent=`Total: $${o.toFixed(2)}`,c.classList.remove("hide"),y(t)}function f(t){const e={};return t.forEach(c=>{const n=c.Id;e[n]?e[n].Quantity+=1:e[n]={...c,Quantity:1}}),Object.values(e)}function m(t){return`
    <li class="cart-card enhanced-cart-card" data-id="${t.Id}">
      <div class="cart-card__image-wrapper">
        <a href="#" class="cart-card__image">
          <img src="${t.Image}" alt="${t.Name}" />
        </a>
      </div>
      <div class="cart-card__details">
        <a href="#">
          <h2 class="card__name">${t.Name}</h2>
        </a>
        <p class="cart-card__color">Color: ${t.Colors?.[0]?.ColorName||"N/A"}</p>
        <div class="cart-card__controls">
          <div class="quantity-section">
            <button class="quantity-btn decrease-btn">–</button>
            <span class="cart-card__quantity">Qty: ${t.Quantity}</span>
            <button class="quantity-btn increase-btn">+</button>
          </div>
          <div class="price-section">
            <p class="cart-card__price">$${t.FinalPrice}</p>
          </div>
          <div class="delete-section">
            <button class="delete-btn">🗑 Remove</button>
          </div>
        </div>
      </div>
    </li>
  `}function v(t){return t.reduce((e,c)=>e+Number(c.FinalPrice)*c.Quantity,0)}function y(t){const e=document.querySelectorAll(".increase-btn"),c=document.querySelectorAll(".decrease-btn"),n=document.querySelectorAll(".delete-btn");e.forEach(a=>{a.addEventListener("click",r=>{const o=u(r.target),s=t.find(d=>d.Id===o);s&&(t.push(s),l("so-cart",t),i())})}),c.forEach(a=>{a.addEventListener("click",r=>{const o=u(r.target),s=t.findIndex(d=>d.Id===o);s!==-1&&(t.splice(s,1),l("so-cart",t),i())})}),n.forEach(a=>{a.addEventListener("click",r=>{const o=u(r.target),s=t.filter(d=>d.Id!==o);l("so-cart",s),i()})})}function u(t){return t.closest(".cart-card").getAttribute("data-id")}i();
