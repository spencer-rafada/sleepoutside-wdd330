import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("../partials/");

document.querySelector(`button`).addEventListener("click", () => {
  alert("Hi");
});
