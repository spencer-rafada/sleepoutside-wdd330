export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.mainElement = document.querySelector("main");
  }


  async init() {
    const list = await this.dataSource.getData(this.category);

    this.filteredList = this.filterProduct(list);

    this.renderProductCategory(this.category);
    this.renderList(this.filteredList);

    // Add Event Listeners for each button
    document.querySelectorAll(`.lookup-button`).forEach((product) => {
      product.addEventListener(`click`, () =>
        this.showModal(product.dataset.id)
      );
    });
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


  showModal(productId) {
    const item = this.filteredList.filter(
      (product) => product.Id === productId
    );
    this.mainElement.insertAdjacentHTML(
      `beforebegin`,
      this.productCardModal(item[0])
    );
    document.querySelector(`.product-bg`).addEventListener(`click`, () => {
      // alert("Test");
      // TODO: add event listener for removing modal
      document.querySelector(`.product-bg`).remove();
    });
  }

  productCardTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
            <img
              src="${product.Images.PrimaryLarge}"
              alt="Image of ${product.Name} "
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__markup">$${product.SuggestedRetailPrice}</p>
            <h3 class="product-card__price">$${product.FinalPrice}</h3>
            </a>
            <button class="lookup-button" data-id="${product.Id}">Look Up</button>
          </li>`;
  }

  productCardModal(product) {
    return `<div class="product-bg">
    <div class="product-modal">
    <div>
    <h1>${product.Brand.Name}</h1>
    <a href="../product_pages/index.html?product=${product.Id}">More details</a>
    </div>
    <div>
    <picture>
    <source media="(min-width: 650px) and (max-width: 899px)" srcset="${product.Images.PrimaryLarge}">
    <source media="(min-width: 900px)" srcset="${product.Images.PrimaryExtraLarge}">
    <img
    class="divider"
    src="${product.Images.PrimaryMedium}"
    alt="${product.Name}"
    />
    </picture>
    <h3 class="product-card__markup">$${product.SuggestedRetailPrice}</h3>
    <h2 class="product-card__price">$${product.FinalPrice}</h2>
    
    <p class="product__color">${product.Colors[0].ColorName}</p>
    
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    </div>
    </div>
    </div>`;
  }
}
