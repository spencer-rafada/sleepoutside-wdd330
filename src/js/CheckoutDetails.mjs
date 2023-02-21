import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

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
  renderDetails() {
    return `<p>Item Subtotal(${this.quantity}): $${this.subTotal.toFixed(2)}</p>
    <p>Shipping Estimate: $${this.shipping.toFixed(2)}</p>
    <p>Tax: $${this.tax.toFixed(2)}</p>
    <p>Order Total: $${this.total.toFixed(2)}</p>`;
  }
}
