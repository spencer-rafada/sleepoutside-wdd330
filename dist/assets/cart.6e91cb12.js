import{l}from"./utils.73518eb2.js";function o(t){return JSON.parse(localStorage.getItem(t))}function s(t,e){localStorage.setItem(t,JSON.stringify(e))}window.addEventListener("load",()=>{n(),l()});function d(t){var e=0;for(let c=0;c<t.length;c++)e+=t[c].FinalPrice;var a=document.getElementById("cart-footer");a.classList.toggle("hide");var r=document.querySelector(".cart-total");r.innerHTML=`Total: $${e}`}function n(){document.querySelector(".product-list").innerHTML="";const t=o("so-cart");if(t){d(t);const e=t.map(a=>i(a));document.querySelector(".product-list").innerHTML=e.join("")}document.querySelectorAll("[data-id]").forEach(e=>{e.addEventListener("click",m)})}function i(t){return`<li class="cart-card divider">
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
</li>`}const m=t=>{const e=t.target;var a=o("so-cart").filter(r=>r.Id!==e.dataset.id);s("so-cart",a),n()};
