import axios from "axios";
import * as Config from "./configApi";

export default function callApi(endpoint, method = "GET", data) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: data
  });
}
