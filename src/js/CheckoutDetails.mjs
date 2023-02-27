import {
  alertMessage,
  getLocalStorage,
  removeAllAlert,
  renderWithTemplate,
  setLocalStorage,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

const packageItems = (items) => {
  const product = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Quantity,
    };
  });
  return product;
};

const formDataToJSON = (formElement) => {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
};

export default class CheckoutDetails {
  constructor(summaryElement) {
    this.summaryElement = summaryElement;
    this.cart = getLocalStorage(`so-cart`) ? getLocalStorage(`so-cart`) : [];
    this.quantity = this.getQuantity(this.cart);
    this.subTotal = this.getTotal(this.cart);
    this.tax = this.subTotal * 0.06;
    this.shipping = this.getShipping();
    this.total = this.subTotal + this.tax + this.shipping;
    this.init();
  }
  init() {
    renderWithTemplate(this.renderDetails(), this.summaryElement, "beforeend");
  }

  getTotal(cartItems) {
    var total = 0;
    //loop through all items in cart and add prices
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].FinalPrice * cartItems[i].Quantity;
    }
    return total;
  }
  getQuantity(cartItems) {
    var items = 0;
    for (let i = 0; i < cartItems.length; i++) {
      items += cartItems[i].Quantity;
    }
    return items;
  }
  getShipping() {
    var shipping = 10;
    for (let i = 0; i < this.quantity - 1; i++) {
      shipping += 2;
    }
    return shipping;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const json = formDataToJSON(formElement);
    json.orderDate = new Date();
    json.orderTotal = this.total;
    json.tax = this.tax;
    json.items = packageItems(this.cart);
    try {
      const res = await services.submitOrder(json);
      setLocalStorage(`so-cart`, []);
      location.href = "success.html";
    } catch (err) {
      removeAllAlert();
      for (let message in err.message) {
        alertMessage(err.message[message], `error`);
      }
    }
  }

  renderDetails() {
    return `<p>Item Subtotal(${this.quantity}): $${this.subTotal.toFixed(2)}</p>
    <p>Shipping Estimate: $${this.shipping.toFixed(2)}</p>
    <p>Tax: $${this.tax.toFixed(2)}</p>
    <p>Order Total: $${this.total.toFixed(2)}</p>`;
  }
}
