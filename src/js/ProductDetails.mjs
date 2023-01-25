import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
    this.products = getLocalStorage(`so-cart`);
    this.init();
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector(`.product-detail`).innerHTML =
      this.renderProductDetails(this.product);
    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  // add to cart button event handler
  addToCart(e) {
    this.products = [...this.products, this.product];
    setLocalStorage("so-cart", this.products);
  }

  renderProductDetails(product) {
    const newItem = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"
        alt="${product.Name}"
      />

      <h3 class="product-card__markup">$${this.product.SuggestedRetailPrice}</h3>
      <h2 class="product-card__price">$${this.product.FinalPrice}</h2>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
      </div>`;
    return newItem;
  }
}
