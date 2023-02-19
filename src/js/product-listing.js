import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./Alert.js";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter("../partials/");

const alerts = new Alert();
const category = getParams(`category`);

const dataSource = new ProductData();
const productListElement = document.querySelector(".product-list");
const productList = new ProductListing(
  category,
  dataSource,
  productListElement
);

productList.init();
