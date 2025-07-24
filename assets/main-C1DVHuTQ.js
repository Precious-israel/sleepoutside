import{r as i,u as d}from"./utils-CdS3DkT2.js";function l(a){if(a.ok)return a.json();throw new Error("Bad Response")}class u{constructor(t){this.category=t,this.path=`/json/${this.category}.json`}getData(){return fetch(this.path).then(l).then(t=>t)}async findProductById(t){return(await this.getData()).find(r=>r.Id===t)}}class h{constructor(t,s,r){this.category=t,this.dataSource=s,this.listElement=r}async init(){const t=await this.dataSource.getData();this.renderList(t)}renderList(t){i(this.productCardTemplate,this.listElement,t,"afterbegin",!0)}productCardTemplate(t){return`
      <li class="product-card">
        <a href="product_pages/index.html?product=${t.Id}">
          <img src="${t.Image}" alt="${t.NameWithoutBrand}" />
          <h2 class="card__brand">${t.Brand.Name}</h2>
          <h3 class="card__name">${t.NameWithoutBrand}</h3>
          <p class="product-card__price">$${t.FinalPrice}</p>
        </a>
      </li>
    `}}class p{constructor(t){this.alertInfo=t}async render(t){const r=await(await fetch(this.alertInfo)).json();if(r.length>0){const n=document.createElement("section");n.classList.add("alert-list"),r.forEach(o=>{const e=document.createElement("p");e.textContent=o.message,e.style.backgroundColor=o.background,e.style.color=o.color,e.style.padding="10px",e.style.margin="5px 0",e.style.borderRadius="5px",n.appendChild(e)}),t.prepend(n)}}}window.location.pathname==="/index.html"&&new p("/json/alerts.json").render(document.querySelector("main"));const c="tents",m=new u(c),g=document.querySelector(".product-list");document.getElementById("cart-count");const y=new h(c,m,g);y.init();d();export{u as P};
