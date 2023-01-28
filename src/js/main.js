import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./Alert.js";

const alerts = new Alert();

const dataSource = new ProductData("tents");
const productListElement = document.querySelector(".product-list");
const productList = new ProductListing("tents", dataSource, productListElement);

productList.init();
