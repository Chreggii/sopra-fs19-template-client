import { getDomain } from "../helpers/getDomain";

export default class DataService {
  static getRequest(url) {
    return fetch(`${getDomain()}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  static postRequest(url, data) {
    console.log("Post data: ", JSON.stringify(data)); //TODO CH: Remove
    return fetch(`${getDomain()}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  static putRequest(url, data) {
    console.log("Put data: ", JSON.stringify(data)); //TODO CH: Remove
    return fetch(`${getDomain()}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
}
