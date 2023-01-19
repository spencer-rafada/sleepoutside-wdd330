// get info from local storage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// set info to local storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Render Items for the first load
window.addEventListener(`load`, () => {
  getCartContents();
});

// Remove items from the cart event listener

// function that has an arry with the info from local storage
function getCartContents() {
  document.querySelector(`.product-list`).innerHTML = "";
  let markup = "";
  const cartItems = getLocalStorage(`so-cart`);
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(`.product-list`).innerHTML = htmlItems.join("");

  // Remove item event handler
  document.querySelectorAll(`[data-id]`).forEach((item) => {
    item.addEventListener(`click`, removeClickedHandler);
  });
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

// renders the items
function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id=${item.Id}>X</span>
</li>`;
  return newItem;
}

// Event Handler for clicking remove from cart
const removeClickedHandler = (event) => {
  const selectId = event.target;
  var cartItems = getLocalStorage(`so-cart`).filter(
    (item) => item.Id !== selectId.dataset.id
  );
  setLocalStorage(`so-cart`, cartItems);
  getCartContents();
};
