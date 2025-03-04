import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../utils/ustil2";

const methods = ["post", "get", "delete"];

const token = Cookies.get("authToken");

export const useFetchApi = async (
  method = "post",
  path = "",
  data = {},
  header = ""
) => {
  const requestType = method.toLowerCase();
  const headers = {
    "Content-Type": header || "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    if (!methods.includes(requestType)) {
      throw new Error(
        `Invalid method: ${method}. Allowed methods are ${methods.join(", ")}`
      );
    }

    const response = await axios({
      method: requestType,
      url: path,
      data: requestType !== "get" ? data : undefined,
      params: requestType === "get" ? data : undefined,
      headers,
      data: requestType !== "get" ? data : undefined,
      params: requestType === "get" ? data : undefined,
      headers,
    });
    return { response: response?.data, error: null };
    // notify(response?.message || 'Data fetch successfully', 'success')
    return { response: response?.data, error: null };
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return { response: null, error: error.response.data };
    console.error("API Fetch Error:", error?.response?.data);
    // notify(error.message || 'Some technical issue occured', 'error')
    return { response: null, error: error };
  }
};
