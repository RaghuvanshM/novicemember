import axios from "axios";
import { endOfDay } from "date-fns";
import { APIUrl } from "../api-constants";

export const signInApi = async (enpoint, payload) => {
  console.log(`${APIUrl.userbaseUrl}${enpoint}`, payload);
  return axios({
    method: "POST",
    url: `${APIUrl.userbaseUrl}${enpoint}`,
    headers: {
      "x-api-key": "prabhat@cab",
    },
    data: payload,
  });
};
