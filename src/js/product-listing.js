import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./Alert.js";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter("../partials/");

const alerts = new Alert();
const category = getParams(`category`);

const dataSource = new ExternalServices();
const productListElement = document.querySelector(".product-list");
const productList = new ProductListing(
  category,
  dataSource,
  productListElement
);

productList.init();

//event listner for a search form
document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  const value = document.querySelector('#query').value;
  productList.searchProduct(value);
});
