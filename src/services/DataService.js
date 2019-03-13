import { getDomain } from "../helpers/getDomain";

export default class DataService {
  static get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };
  }

  static getRequest(url) {
    return fetch(`${getDomain()}${url}`, {
      method: "GET",
      headers: this.headers
    });
  }

  static postRequest(url, data) {
    console.log("Post data: ", JSON.stringify(data)); //TODO CH: Remove
    return fetch(`${getDomain()}${url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  static putRequest(url, data) {
    console.log("Put data: ", JSON.stringify(data)); //TODO CH: Remove
    return fetch(`${getDomain()}${url}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }
}
