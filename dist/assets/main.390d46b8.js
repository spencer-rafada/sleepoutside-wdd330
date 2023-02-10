import{r as a,l as i}from"./utils.73518eb2.js";import{P as n}from"./ProductData.1b194e49.js";class l{constructor(t,e,r){this.category=t,this.dataSource=e,this.listElement=r}productCardTemplate(t){return`<li class="product-card">
        <a href="product_pages/index.html?product=${t.Id}">
        <img
          src="${t.Image}"
          alt="Image of ${t.Name} "
        />
        <h3 class="card__brand">${t.Brand.Name}</h3>
        <h2 class="card__name">${t.Name}</h2>
        <p class="product-card__markup">$${t.SuggestedRetailPrice}</p>
        <h3 class="product-card__price">${t.FinalPrice}</h3></a>
      </li>`}async init(){const t=await this.dataSource.getData(),e=this.filterProduct(t);this.renderList(e)}renderList(t){const e=t.map(this.productCardTemplate);this.listElement.insertAdjacentHTML("afterbegin",e.join(""))}filterProduct(t){return t.filter(e=>e.Id!="989CG"&&e.Id!="880RT")}}class c{constructor(){this.path="../json/alerts.json",this.mainElement=document.querySelector("main"),this.init()}async init(){this.alerts=await this.getData(),this.mainElement.insertAdjacentHTML("beforebegin",this.alertTemplate()),this.renderAlertList()}getData(){return fetch(this.path).then(a).then(t=>t)}alertTemplate(){return`<section class="alert-list">
    </section>`}renderAlertList(){const t=this.alerts.map(r=>`<p class="alert" style="background-color:${r.background};color:${r.color};">${r.message}</p>`),e=document.querySelector(".alert-list");setTimeout(()=>{e.innerHTML=t.join(""),this.removeAlertList()},2e3)}removeAlertList(){const t=document.querySelector(".alert-list");document.querySelectorAll(".alert").forEach(r=>{setTimeout(()=>{t.removeChild(r)},1e4)})}}new c;const o=new n("tents"),d=document.querySelector(".product-list"),m=new l("tents",o,d);m.init();i();
