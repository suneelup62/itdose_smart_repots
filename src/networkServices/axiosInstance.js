import axios from "axios";
import { notify } from "../utils/utils";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
const baseurl = import.meta.env.VITE_APP_REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true,
});

let globalErrorFlag = false;

export const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
  // return (...args) => {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(() => func.apply(this, args), wait);
  // };
};

const globalErrorNotifier = debounce((message) => {
  notify(message, "error");
  globalErrorFlag = false;
  logOut();
}, 1000);

const logOut = () => {
  localStorage.clear();
  window.location.href = "/login";
  //notify("Please authenticate", "error");
};

const makeApiRequest = async (url, options, header = "") => {
  const localData = useLocalStorage("authToken", "get");
  const validUser = useLocalStorage("authToken", "get");
  const { method, data } = options;
  const lowerCaseMethod = method.toLowerCase();

  const headers = {
    "Content-Type": header ? header : "application/json",
    Authorization: localData && `Bearer ${localData}`,
  };

  const parameterChecker = () => {
    const symbol = url.includes("?") ? "&" : "?";
    return symbol;
  };

  // Pass url token
  // const finalUrl = validUser
  //   ? `${url}${parameterChecker()}userValidateID=${validUser}`
  //   : url;

  const finalUrl = validUser ? `${url}${parameterChecker()}` : url;
  try {
    const response = await axiosInstance({
      method: lowerCaseMethod,
      url: finalUrl,
      ...(data && { data }),
      headers,
    });
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.response?.statusText || "Error";

    if (status === 401) {
      if (!globalErrorFlag) {
        globalErrorFlag = true;
        globalErrorNotifier(message);
        logOut();
      }
    }

    notify(message, "error");
    return error.response;
  }
};

export default makeApiRequest;
