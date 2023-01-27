import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
const source = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductListing("tents", source, element);

list.init();

