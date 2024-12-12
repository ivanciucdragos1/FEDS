import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Auth-Token",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
};
const defaultConfig = {
  baseURL: "http://device-service/device-service",
  headers: defaultHeaders,
};

const getAxiosDevicesInstance = () => {
  return axios.create(defaultConfig);
};
export default getAxiosDevicesInstance;