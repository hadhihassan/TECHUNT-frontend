import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

const BASE_URL: string = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const jwtToken = localStorage.getItem("token");
console.log("local store data",jwtToken)
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers = config.headers || {};
  config.headers['authorization'] = `Bearer ${jwtToken}`;
  return config;
};

axiosInstance.interceptors.request.use(onRequest);

export const get = async <T>(url: string, _type?: string): Promise<T> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(url);
    console.log(response)
    return response.data.status;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  try {
    console.log("email is=>", data);
    url = data.type + url;
    console.log("url is ", url);
    const response: AxiosResponse = await axiosInstance.post(url, data);
    console.log("RESPONSE", response);
    return response.data;
  } catch (error) {
    console.log(error);
    handleRequestError(error);
    throw error;
  }
};

const handleRequestError = (error: any): void => {
  console.error('Request error:', error.message || 'Unknown error');
};

export default axiosInstance;