import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { setLocalStorage, getParams, loadHeaderFooter } from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
loadHeaderFooter("../public/partials/");
