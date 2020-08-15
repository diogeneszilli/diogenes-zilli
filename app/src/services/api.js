import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const api = () => {
    const defaultOptions = {
      baseURL: baseUrl,
    };
  
    let instance = axios.create(defaultOptions);
  
    instance.interceptors.request.use(function (config) {
      const token = localStorage.getItem("Authorization") || "";
      config.headers.Authorization =  token;
      return config;
    });
  
    return instance;
};

export default api();