import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Auth-Token",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
};
const defaultConfig = {
  baseURL: "http://user-service/user-service",
  headers: defaultHeaders,
};

const getAxiosInstance = () => {
  const instance = axios.create(defaultConfig);
  instance.interceptors.request.use(
    (config: any) => {
      let token;
      if(localStorage.getItem('token') != null){
        token = JSON.parse(localStorage.getItem('token') || '');
      }
      if(token){
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config;
    }
  );

  return instance;
};
export default getAxiosInstance;
