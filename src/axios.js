import axios from "axios";

// Override the ones defined in index.js
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

// All files in your project
instance.interceptors.request.use(
  (requestConfig) => {
    console.log(requestConfig);
    return requestConfig;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (responseConfig) => {
    console.log(responseConfig);
    return responseConfig;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN NEW";

export default instance;
