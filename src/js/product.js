//Converting to Json
let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Not Good!! ERROR!');
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data by fetching th json file
function getProductsData() {
  fetch('../json/tents.json')
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}

// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  setLocalStorage('so-cart', product);
}

// calling the function to fetch the data
getProductsData();
// add listener to Add to Cart button
document.getElementById('addToCart').addEventListener('click', addToCart);
