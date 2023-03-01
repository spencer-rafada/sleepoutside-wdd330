import ExternalServices from "./ExternalServices.mjs";

const formDataToJSON = (formElement) => {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
};

export default class Admin{
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    }

    async login(next) {
        const formElement = document.forms["login"];
        const creds = formDataToJSON(formElement);
        try {
          this.token = await this.services.loginRequest(creds);
          next()
        } 
        catch(err) {
          alertMessage(err.message.message);
    }
    this.getOrders(this.token);
}

    showLogin() {
        return `    
        <form name="login" method="GET">
            <fieldset>
                <label for="email">Email</label>
                <input type="email"  name="email" placeholder="Enter your email" required></input>
                <label for="password">Password</label>
                <input type="password"  name="password" placeholder="Enter your password" required></input>
            </fieldset>
            <button type="button">Submit</button>
        </form>
        `
    }

    getOrders(token) {
        console.log(this.services.getOrders(token))
    }
}