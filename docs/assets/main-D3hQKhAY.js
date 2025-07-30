import{r as i,l as d,u as l}from"./utils-Ca-9W_8e.js";function h(a){if(a.ok)return a.json();throw new Error("Bad Response")}class u{constructor(t){this.category=t,this.path=`../json/${this.category}.json`}getData(){return fetch(this.path).then(h).then(t=>t)}async findProductById(t){return(await this.getData()).find(r=>r.Id===t)}}class p{constructor(t,s,r){this.category=t,this.dataSource=s,this.listElement=r}async init(){const t=await this.dataSource.getData();this.renderList(t)}renderList(t){i(this.productCardTemplate,this.listElement,t,"afterbegin",!0)}productCardTemplate(t){return`
      <li class="product-card">
        <a href="product_pages/index.html?product=${t.Id}">
          <img src="${t.Image}" alt="${t.NameWithoutBrand}" />
          <h2 class="card__brand">${t.Brand.Name}</h2>
          <h3 class="card__name">${t.NameWithoutBrand}</h3>
          <p class="product-card__price">$${t.FinalPrice}</p>
        </a>
      </li>
    `}}class m{constructor(t){this.alertInfo=t}async render(t){const r=await(await fetch(this.alertInfo)).json();if(r.length>0){const n=document.createElement("section");n.classList.add("alert-list"),r.forEach(o=>{const e=document.createElement("p");e.textContent=o.message,e.style.backgroundColor=o.background,e.style.color=o.color,e.style.padding="10px",e.style.margin="5px 0",e.style.borderRadius="5px",n.appendChild(e)}),t.prepend(n)}}}d();window.location.pathname==="/index.html"&&new m("/json/alerts.json").render(document.querySelector("main"));const c="tents",g=new u(c),y=document.querySelector(".product-list"),f=new p(c,g,y);f.init();l();export{u as P};
