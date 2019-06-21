import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create();

export default async function({
  url,
  headers = {},
  dispatch = null,
  version = false,
  method = "GET",
  data: body = {},
  returnCookie = false,
}) {
  const token = Cookies.get(
    typeof CSRF_COOKIE_NAME !== "undefined" ? CSRF_COOKIE_NAME : "token",
  );

  const defaultHeaders = {
    "X-CSRFToken": token || "token",
    "Content-Type": "application/json",
    credentials: "same-origin",
    "x-proxy-api-host": "test.mybook.tech",
  };

  return instance({
    url: "/api/" + url,
    headers: {
      accept: `application/json; ${version ? `version=${version}` : ""}`,
      ...defaultHeaders,
      ...headers,
    },
    method,
    data: body,
    withCredentials: true,
  })
    .then(res => {
      return returnCookie ? res.headers["set-cookie"] : res.data;
    })
    .catch(res => {
      if (res.config) {
        console.log({ res: res.config.url });
      }

      const { response } = res;
      if (response) {
        if (response.status === 404) {
          dispatch && dispatch({ type: "ERROR404" });
          return Promise.reject("404");
        }
        if (response.status === 403) {
          dispatch && dispatch({ type: "ERROR403" });
          return Promise.reject("403");
        } else {
          return Promise.reject(response);
        }
      } else {
        return Promise.reject(res);
      }
    });
}

export async function errorHandlerWrapper(calledFunction) {
  try {
    return await calledFunction();
  } catch (e) {
    return Promise.reject(e);
  }
}
