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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return await fetch(baseURL + `checkout`, options).then(convertToJson);
  }
  async loginRequest(creds) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    return await fetch(baseURL + `login`, options).then(convertToJson);
  }

  async getOrders(token) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(baseURL + `orders`, options).then(convertToJson);
  }
}
