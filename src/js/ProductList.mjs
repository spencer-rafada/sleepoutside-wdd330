export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  productCardTemplate(product) {
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
        <picture>
        <source media="(min-width: 650px) and (max-width: 899px)" srcset="${product.Images.PrimaryLarge}">
        <source media="(min-width: 900px)" srcset="${product.Images.PrimaryExtraLarge}">
        <img
          class="divider"
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
        />
      </picture>
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__markup">$${product.SuggestedRetailPrice}</p>
        <h3 class="product-card__price">$${product.FinalPrice}</h3></a>
      </li>`;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    const filteredList = this.filterProduct(list);
    this.renderProductCategory(this.category);
    this.renderList(filteredList);
  }

  renderProductCategory(category) {
    document.querySelector(`.products h2`).innerHTML = "";
    document.querySelector(
      `.products h2`
    ).innerHTML = `Top Products: ${category}`;
  }

  renderList(list) {
    const render = list.map(this.productCardTemplate);
    this.listElement.insertAdjacentHTML("afterbegin", render.join(""));
  }

  filterProduct(productList) {
    return productList.filter(
      (product) => product.Id != "989CG" && product.Id != "880RT"
    );
  }
  // searchinh for a product and displaying the results
  async searchProduct(key) {
    const searchInstert = document.querySelector("#search-products");
    searchInstert.innerHTML = "";
    const list = await this.dataSource.getData(this.category);
    const filteredList = this.filterProduct(list);
    const products = filteredList.filter(item => item.Name.toLowerCase().includes(key.toLowerCase()));
    const render = products.map(this.productCardTemplate);
    searchInstert.insertAdjacentHTML("afterbegin", render.join(""));
  }

}
