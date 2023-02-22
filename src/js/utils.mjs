// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function renderWithTemplate(
  template,
  parentElement,
  position,
  data,
  callback
) {
  parentElement.innerHTML = ``;
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the browser url
export const getParams = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};

// converting to json
export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

async function loadTemplate(path) {
  const response = await fetch(path);
  const template = response.text();
  return template;
}

async function banner() {
  let currentDay = new Date();
  const pthing = document.querySelector(".register");
  let lastVisitString = window.localStorage.getItem("last-visit");
  if (lastVisitString != null) {
    pthing.style.display = "none";
  }
  window.localStorage.setItem("last-visit", currentDay.toString());
}

import ShoppingCart from "./ShoppingCart.mjs";

const shoppingCart = new ShoppingCart(null, `so-cart`);

function renderSuperscript() {
  // const productList = getLocalStorage(`so-cart`);
  var items = 0;
  shoppingCart.cartItems.forEach((item) => {
    items += item.Quantity;
  });
  document.getElementById("total").innerHTML = items;
}

export async function loadHeaderFooter(location) {
  const footer = await loadTemplate(location + `footer.html`);
  const header = await loadTemplate(location + `header.html`);
  const footerElement = document.querySelector("footer");
  const headerElement = document.querySelector("header");

  renderWithTemplate(header, headerElement, "afterbegin");
  renderWithTemplate(footer, footerElement, "afterbegin");
  renderSuperscript();
  renderWithTemplate(banner());
}
