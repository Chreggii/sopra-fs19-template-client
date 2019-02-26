import { getDomain } from "../helpers/getDomain";

export default class DataService {
  static postRequest(url, data) {
    return fetch(`${getDomain()}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
}
