import { convertToJson } from "./utils.mjs";

const baseURL = "https://wdd330-backend.onrender.com/";

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async getProduct(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const product = await this.getProduct(id);
    return product;
  }
  async submitOrder(data) {
    const response = await fetch(`${url}/checkout`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
