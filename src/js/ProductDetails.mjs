import {
  setLocalStorage,
  getLocalStorage,
  renderWithTemplate,
  updateBreadCrumbs,
  alertMessage,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
    this.init();
  }

  async init(breadcrumb = true) {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector(`.product-detail`).innerHTML = this.renderProductDetails(this.product);
    if (breadcrumb){
      updateBreadCrumbs(
        `
        <a href="/product-listing">Home</a> / <a href="/product-listing/?category=${this.product.Category}">${this.product.Category}</a> / ${this.product.NameWithoutBrand}`
      )
    }
    console.log(this.product);
    document.querySelector(`.product-detail`).innerHTML =
      this.renderProductDetails(this.product);

    document.querySelector(`.product-card__carousel`).innerHTML =
      this.renderCarousel(this.product);

    document.querySelector(`.product-card__colors`).innerHTML =
      this.renderColorSwitch(this.product);

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    // add listener for images
    document.querySelectorAll("[data-src]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Hi");
        // switch
        this.handleImageClick(item.dataset.src);
      });
    });
  }

  handleImageClick(data) {
    // get all source
    const sourcesets = document.querySelectorAll(`source`);
    // crete handler for current mainImg's data-src
    // switch images
    document.querySelector(`.product-card__mainImg`).dataset.src = data;
    document.querySelector(`.product-card__mainImg`).src = data;
    // set source for sources
    sourcesets.forEach((item) => {
      item.srcset = data;
    });
  }

  renderBagAnimation(data) {
    document.querySelector(data).setAttribute(`class`, `shake`);
    setTimeout(() => {
      document.querySelector(data).classList.remove(`shake`);
    }, 2000);
  }

  renderSuperscript(productList) {
    document.getElementById("total").innerHTML = productList.length;
  }

  // add to cart button event handler
  addToCart(e) {
    const colorValue = document.querySelector(`select`).value;
    // Get from storage - this.products
    this.products =
      getLocalStorage(`so-cart`) === null ? [] : getLocalStorage(`so-cart`);
    // Check if item is in this.products
    if (
      this.products.find(
        (item) => item.Id === this.product.Id && item.Colors === colorValue
      )
    ) {
      // If it is in this.products, add qty + 1
      this.products.map((item) => {
        if (item.Id === this.product.Id) {
          item.Quantity += 1;
        }
        return item;
      });
    } else {
      // else: add qty key
      const prod = { ...this.product, Quantity: 1, Colors: colorValue };
      this.products = [...this.products, prod];
    }
    // Set local storage
    setLocalStorage(`so-cart`, this.products);

    const badge = this.renderSuperscript(this.products);
    const bagParent = document.querySelector(`.cart a`);

    alertMessage("Successfully added to cart.", "success");

    // Animation
    renderWithTemplate(
      this.bagTemplate(),
      bagParent,
      "afterbegin",
      `.cart svg`,
      this.renderBagAnimation
    );
  }

  bagTemplate() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      d="M18.9 32.6c1.1 2.4 2.5 3.3 5.4 3.3 1.6 0 3.6-0.3 5.9-0.6 3.2-0.5 6.9-1 11.2-1 2.1 0 4.3 0.1 6.4 0.3 2.1 0.1 4.2 0.3 6.1 0.3 3.2 0 5.2-0.4 5.9-1.2 2.7-2.7 2.8-8.8 2.9-14.6 0.1-6.7 0.2-14.5 4.6-18.7 -0.5 0-1 0-1.6 0 -14.2 0-37.5 0-41.1 0C15.6 6.2 14.9 23.6 18.9 32.6z"
    />
    <path
      d="M90.1 29.7c1-3.3 1.5-7.3 1.5-11.2 0-9-2.7-18.8-8.6-18.8 -0.1 0-0.2 0-0.3 0L77.8-0.1c-0.3 0.2-0.8 0.3-1.1 0.4 0 0 0 0 0 0 -0.2 0-0.3 0-0.4 0 -4.5 0.1-7 1.8-8.4 4.9l8.9-0.1c-1.6 3.6-2.4 8.7-2.4 13.5 0 4.9 0.8 9.9 2.5 13.6l-12.3 0c-0.2 0.4-0.4 0.8-0.6 1.2 -0.2 0.4-0.4 0.7-0.6 1.1 -0.1 0.1-0.1 0.2-0.2 0.3 -0.3 0.4-0.5 0.7-0.9 1.1 0 0 0 0 0 0 0 0-0.1 0.1-0.1 0.1 -0.1 0.1-0.2 0.2-0.4 0.3 -0.2 0.1-0.4 0.3-0.6 0.4 0 0 0 0 0 0 -0.4 0.2-0.9 0.4-1.4 0.6 -1.3 0.4-2.9 0.6-4.9 0.7 -0.5 1.5-1.1 4.1 0 5.5l3.1 3.9 0 0.8c0 2.8-2.3 4.8-2.8 5.2l-3-3.8c0.3-0.2 0.5-0.5 0.7-0.8l-1.8-2.3c-2.2-2.7-1.8-6.3-1.2-8.7 -0.7 0-1.4-0.1-2-0.1 -2.1-0.1-4.3-0.3-6.2-0.3 -4.1 0-7.7 0.5-10.8 1 -1 0.2-2 0.3-3 0.4 -0.5 1.5-1.2 4.4-0.1 5.9l3.1 4 0 0.8c0 2.8-2.3 4.8-2.8 5.2l-3.1-3.8c0.3-0.2 0.6-0.6 0.7-0.9l-1.8-2.4c-2.1-2.8-1.8-6.3-1.2-8.7 -1.6-0.2-2.9-0.8-4-1.7h0c-0.8-0.6-1.4-1.4-2-2.4 -0.1-0.1-0.2-0.3-0.2-0.5 -0.1-0.2-0.2-0.4-0.3-0.6 -0.3-0.6-0.5-1.2-0.7-1.8l-5.6 0c-1-0.3-3.5-4.8-3.5-13.2 0-8.1 3.7-13.1 4.9-13.2L16.4 5.6c0.9-1.9 2-3.7 3.4-5.2L11.2 0.5c-5.4 0-10.1 8.6-10.1 18.4 0 8.9 2.7 18.4 8.6 18.4h2.4c-1.8 10.7-6.6 43 0.4 56.5 0.7 1.4 4.3 3.4 12.2 4.6 20.2 3.1 49.8-0.5 54.6-5.3 0.7-0.7 1.3-1.7 1.8-2.9 2-0.3 8.2-1.7 12.4-8.4C100.1 71.5 98.9 53.9 90.1 29.7zM35.6 87.1c-2.6 2-10.5 2.1-12.1 2.1 0 0 0 0 0 0 -3.9 0-9-0.4-10.8-2.3 -2.6-2.7-1.5-13-0.6-19.1 -0.1-1.9 0-5.8 2.2-7.2 1.9-1.2 8.7-1.3 11.6-1.3 6.4 0 7.4 0.6 7.8 0.9 3 1.8 3.1 5.6 2.6 7.8C37.7 75.5 38.6 84.8 35.6 87.1zM70.1 87.5c-2.6 2-10.5 2.1-12.1 2.1 0 0 0 0 0 0 -3.9 0-9-0.4-10.8-2.3 -2.6-2.7-1.5-13-0.6-19.1 -0.1-1.9 0-5.8 2.2-7.2 1.9-1.2 8.7-1.3 11.6-1.3 6.4 0 7.4 0.6 7.8 0.9 3 1.8 3.1 5.6 2.6 7.8C72.2 76 73.1 85.3 70.1 87.5zM85.9 12.3c-0.6-1.3-1.3-2.2-1.9-2.5 -0.5-0.3-1-0.3-1.4 0 -1.7 1.1-3.2 12.2-0.6 17.9 0.4 0.9 0.9 1.1 1.3 1.1 0.1 0 0.2 0 0.3 0 1.8-0.5 2.1-6.2 1.7-8.6l-1.6 0.2c0.3 2.2 0 5.1-0.4 6.3 -2.1-5.3-0.8-14.1 0.1-15.5 0.8 0.6 2.2 3.5 3.1 8 -0.1 7.9-2.4 12.3-3.4 12.8 -1-0.5-3.4-5.2-3.4-13.5 0-8.3 2.4-13 3.4-13.5C83.7 5.4 85.1 7.9 85.9 12.3zM87.3 77.7c-1.4 2.3-3.1 3.6-4.6 4.3 1.2-12.2-1-31-3.5-44.7h3.3c0.1 0 0.3 0 0.4 0 0.6 0 1.2-0.1 1.8-0.4C92.8 60.7 90.7 72.2 87.3 77.7z"
    />
    <path
      d="M24.7 71v5h-5.2v-5.4c-1.4-0.3-2.7-0.6-3.7-0.9 -0.9 6.8-1.1 13.3-0.3 14.5 0.4 0.3 2.9 1.1 8 1.1h0c5 0 8.8-0.7 9.7-1.3 0.8-1.3 0.6-7.7-0.4-14.4C30.7 70.1 27.5 70.8 24.7 71z"
    />
    <path
      d="M58.8 68.9c2.9-0.1 6.4-0.9 8.3-1.4 0.1-0.8 0.3-2.8-0.7-3.5 -0.5-0.2-2.5-0.4-5.9-0.4 -4.9 0-8.6 0.4-9.5 0.7 -0.3 0.5-0.5 1.9-0.5 3.3C52.5 68.1 56 69 58.8 68.9z"
    />
    <path
      d="M24.3 68.4c2.9-0.1 6.4-0.9 8.3-1.4 0.1-0.8 0.3-2.8-0.7-3.5 -0.5-0.2-2.5-0.4-5.9-0.4 -4.9 0-8.6 0.4-9.5 0.7 -0.3 0.5-0.5 1.9-0.5 3.3C18 67.7 21.5 68.6 24.3 68.4z"
    />
    <path
      d="M60.1 71.4v3.3h-5.2v-3.4c-1.7-0.3-3.3-0.7-4.6-1 -0.9 6.8-1.1 13.3-0.3 14.5 0.4 0.3 2.9 1.1 8 1.1h0c5 0 8.8-0.7 9.7-1.3 0.8-1.3 0.6-7.7-0.4-14.4C65.5 70.5 62.7 71.1 60.1 71.4z"
    />

    <!-- <text x="0" y="115" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Natalia Woodroffe</text>
      <text x="0" y="120" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text> -->
  </svg>`;
  }

  renderProductDetails(product) {
    const newItem = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <picture>
        <source media="(min-width: 650px) and (max-width: 899px)" srcset="${product.Images.PrimaryLarge}">
        <source media="(min-width: 900px)" srcset="${product.Images.PrimaryExtraLarge}">
        <img
          class="divider product-card__mainImg"
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
          data-src="${product.Images.PrimaryMedium}"
        />
      </picture>

      <div class="divider product-card__carousel">
      </div>

      <div class="divider product-card__colors"></div>

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

  renderCarousel(product) {
    const images = product.Images.ExtraImages;
    const section = document.createElement(`div`);

    // First Img
    const firstImg = document.createElement(`div`);
    firstImg.setAttribute("class", "product-card__carousel-image");
    firstImg.innerHTML = `
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}" data-src="${product.Images.PrimaryExtraLarge}">
      `;
    section.appendChild(firstImg);

    // Extra Images
    images.forEach((item) => {
      const imageDiv = document.createElement(`div`);
      imageDiv.setAttribute("class", "product-card__carousel-image");
      imageDiv.innerHTML = `
      <img src="${item.Src}" alt="${item.Title}" data-src="${item.Src}">
      `;
      section.appendChild(imageDiv);
    });
    return section.innerHTML;
  }

  renderColorSwitch(product) {
    const colors = product.Colors;
    const tempDiv = document.createElement(`div`);
    const select = document.createElement(`select`);
    colors.forEach((item) => {
      const option = document.createElement(`option`);
      option.setAttribute(`value`, item.ColorName);
      option.innerHTML = `${item.ColorName}`;
      select.appendChild(option);
    });

    tempDiv.appendChild(select);
    return tempDiv.innerHTML;
  }
}
