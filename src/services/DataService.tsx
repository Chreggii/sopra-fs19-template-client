import { getDomain } from "../helpers/getDomain";

/**
 * Data service which handles all the http calls.
 * @Class
 */
export default class DataService {
  // Get request
  static getRequest(url: string) {
    return fetch(`${getDomain()}${url}`, {
      method: "GET",
      headers: this.headers
    });
  }

  // Post request
  static postRequest(url: string, data: any) {
    return fetch(`${getDomain()}${url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  // Put request
  static putRequest(url: string, data: any) {
    return fetch(`${getDomain()}${url}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  // Returns the http header
  private static get headers(): Headers {
    const token: string = localStorage.getItem("token") || "";

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", token);

    return headers;
  }
}
