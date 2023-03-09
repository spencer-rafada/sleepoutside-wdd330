import ExternalServices from "./ExternalServices.mjs";

const formDataToJSON = (formElement) => {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
};

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
    this.init();

    // listener for login
    document.querySelector(`#submitForm`).addEventListener(`click`, (e) => {
      e.preventDefault();
      this.login();
    });
  }

  init() {
    this.mainElement.insertAdjacentHTML(`beforebegin`, this.showLogin());
  }

  async login() {
    const formElement = document.forms["login"];
    const creds = formDataToJSON(formElement);
    try {
      this.token = await this.services.loginRequest(creds);
    } catch (err) {
      console.log(err);
    }
    this.getOrders(this.token.accessToken);
  }

  showLogin() {
    return `    
        <form name="login" method="GET">
            <fieldset>
                <label for="email">Email</label>
                <input type="email"  name="email" placeholder="Enter your email" required></input>
                <label for="password">Password</label>
                <input id="password" type="password"  name="password" placeholder="Enter your password" required></input>
            </fieldset>
            <button type="button" id="submitForm">Submit</button>
        </form>
        `;
  }

  async getOrders(token) {
    console.log(await this.services.getOrders(token));
    // If we want to continue this
    // Add to Local Storage with different key
    // We can make a new page to display orders (stretch)
  }
}
