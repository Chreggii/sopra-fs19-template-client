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
    return fetch(`${getDomain()}${url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  static putRequest(url, data) {
    return fetch(`${getDomain()}${url}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }
}
