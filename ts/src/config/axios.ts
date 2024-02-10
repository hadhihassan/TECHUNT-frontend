import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export const BASE_URL: string = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const jwtToken = localStorage.getItem("token");
console.log("local store data", jwtToken)
const onRequest = (config: AxiosRequestConfig): any => {
  config.headers = config.headers || {};
  config.headers['authorization'] = `Bearer ${jwtToken}`;
  // config.headers['role'] = `Bearer ${jwtToken}`;
  return config;
};

axiosInstance.interceptors.request.use(onRequest);

export const get = async <T>(url: string, _type?: string): Promise<T> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(url);
    console.log("repones axios",response)
    return response.data.status;
  } catch (error) {
    console.log(error);
    
    handleRequestError(error);
    throw error;
  }
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  try {
    console.log(url, data);

    url = data.type + url;
    const response: AxiosResponse = await axiosInstance.post(url, data);
    console.log(response,"axios post response");
    return response.data;
  } catch (error) {
    console.log(error);
    // handleRequestError(error);
    throw error;
  }
};

const handleRequestError = (error: any): void => {
  console.error('Request error:', error.message || 'Unknown error');
};



interface resolve {
  data: {} | null,
  error: {} | any
}
export async function resolve(promise: Promise<any> | PromiseLike<null> | null) {
  const resolved: resolve = {
    data: null,
    error: null
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    
    resolved.error = e;
  }

  return resolved;
}

export async function resolve1(promise: Promise<any> | PromiseLike<null> | null) {
  const resolved: resolve = {
    data: null,
    error: null
  };

  try {
    const response = await promise;
    resolved.data = response.data.data; // Assuming the response object has a 'data' property
  } catch (error:any) {
    resolved.error = error.response.data;
  }

  return resolved;
}




export default axiosInstance;