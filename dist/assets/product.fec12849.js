import{g as r,s as a,a as s,l as o}from"./utils.73518eb2.js";import{P as c}from"./ProductData.1b194e49.js";class e{constructor(t,d){this.productId=t,this.dataSource=d,this.product={},this.products=r("so-cart")===null?[]:r("so-cart"),this.init()}async init(){this.product=await this.dataSource.findProductById(this.productId),document.querySelector(".product-detail").innerHTML=this.renderProductDetails(this.product),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))}addToCart(t){this.products=[...this.products,this.product],a("so-cart",this.products)}renderProductDetails(t){return`
      <h3>${t.Brand.Name}</h3>

      <h2 class="divider">${t.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${t.Image}"
        alt="${t.Name}"
      />

      <h3 class="product-card__markup">$${this.product.SuggestedRetailPrice}</h3>
      <h2 class="product-card__price">$${this.product.FinalPrice}</h2>

      <p class="product__color">${t.Colors[0].ColorName}</p>

      <p class="product__description">
        ${t.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id=${t.Id}>Add to Cart</button>
      </div>`}}const i=s("product"),n=new c("tents"),u=new e(i,n);u.init();o();
