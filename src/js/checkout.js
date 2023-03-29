import { loadHeaderFooter, alertMessage, convertToJson } from "./utils.mjs";
import CheckoutDetails from "./CheckoutDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter("../partials/");

const summary = document.querySelector(`#summary`);
const form = document.querySelector(`form`);

const checkout = new CheckoutDetails(summary, form);

document.querySelector(`button`).addEventListener("click", (e) => {
  e.preventDefault();
  checkout.checkout();
});
