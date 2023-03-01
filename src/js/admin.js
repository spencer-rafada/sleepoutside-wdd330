import { loadHeaderFooter } from "./utils.mjs";
import Admin from "./admin.mjs";

loadHeaderFooter("../partials/");

const submit = new Admin("main");
document.querySelector("main").insertAdjacentHTML("beforeend", submit.showLogin())
document.querySelector("button").addEventListener("click", submit.login());



