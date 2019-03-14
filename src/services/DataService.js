import { getDomain } from "../helpers/getDomain";

/**
 * Data service which handles all the http calls.
 * @Class
 */
export default class DataService {
  // Returns the http header
  static get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };
  }

  // Get request
  static getRequest(url) {
    return fetch(`${getDomain()}${url}`, {
      method: "GET",
      headers: this.headers
    });
  }

  // Post request
  static postRequest(url, data) {
    return fetch(`${getDomain()}${url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  // Put request
  static putRequest(url, data) {
    return fetch(`${getDomain()}${url}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }
}
