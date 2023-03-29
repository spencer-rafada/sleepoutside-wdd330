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

export function updateBreadCrumbs(text){
  document.querySelector(".breadcrumbs").innerHTML = text
  console.log(text)
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
export async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    throw { name: `servicesError`, message: response };
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
  banner();
}

export function alertMessage(message, alertType, scroll = true) {
  const alert = document.createElement(`div`);
  alert.classList.add(`alert`);
  alert.classList.add(`${alertType}`);
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener(`click`, (e) => {
    if (e.target.tagName === "SPAN") {
      main.removeChild(alert);
    }
  });
  const main = document.querySelector(`main`);
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function removeAllAlert() {
  const alerts = document.querySelectorAll(`.alert`);
  alerts.forEach((alert) => document.querySelector(`main`).removeChild(alert));
}
