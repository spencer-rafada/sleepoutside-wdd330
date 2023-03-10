import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

const alerts = new Alert();

const dataSource = new ExternalServices();
const productListElement = document.querySelector(".product-list");
const productList = new ProductListing("tents", dataSource, productListElement);

productList.init();
// calling the search product function from main page as well
document.querySelector(".search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.querySelector("#query").value;
  productList.searchProduct(value);
});
loadHeaderFooter("./partials/");
