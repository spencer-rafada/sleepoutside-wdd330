import{g as c,s as o,l}from"./utils.f6d0183f.js";class i{constructor(t,e){this.listElement=t,this.key=e,this.cartItems=c(this.key)}init(){this.getCartContents()}getTotal(t){var e=0;for(let s=0;s<t.length;s++)e+=t[s].FinalPrice;var a=document.getElementById("cart-footer");a.classList.toggle("hide");var r=document.querySelector(".cart-total");r.innerHTML=`Total: $${e}`}getCartContents(){if(document.querySelector(this.listElement).innerHTML="",this.cartItems){this.getTotal(this.cartItems);const t=this.cartItems.map(e=>this.renderCartItem(e));document.querySelector(this.listElement).innerHTML=t.join("")}document.querySelectorAll("[data-id]").forEach(t=>{t.addEventListener("click",()=>{t.remove()})})}renderCartItem(t){return`<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${t.Image}"
        alt="${t.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${t.FinalPrice}</p>
    <span class="cart-card__remove" data-id=${t.Id}>X</span>
  </li>`}removeClickedHandler(t){const e=t.target;console.log(this.cartItems);const a=this.cartItems.filter(r=>r.Id!==e.dataset.id);o(this.key,a)}}const n=new i(".product-list","so-cart");l();n.init();
