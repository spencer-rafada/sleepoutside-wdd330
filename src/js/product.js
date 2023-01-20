import ProductData from './ProductData.mjs';
import { setLocalStorage, getParam } from './utils.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');
console.log(productId)
console.log(dataSource.findProductById(productId));


//Converting to Json
let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Not Good!! ERROR!");
  }
}


// get tents data by fetching th json file
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}

// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  products = [...products, product];
  setLocalStorage("so-cart", products);
}

// calling the function to fetch the data
getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
