import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const BASE_URL: string = 'http://localhost:3000';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Define types for response and error
interface ApiResponse<T = any> {
  data: T;
}

interface ApiError {
  message: string;
}

// Function to make an HTTP GET request
export const get = async <T>(url: string, email?: AxiosRequestConfig): Promise<T> => {
    
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(url, {data : email });
    return response.data.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

// Function to make an HTTP POST request
export const post = async <T>(url: string, data?: any): Promise<T> => {
  try {
    console.log("email is=>",data)
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(url, data);
      console.log("RESPONSE",response)
    return response.data.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

// Function to handle common request errors
const handleRequestError = (error: any): void => {
  console.error('Request error:', error.message || 'Unknown error');
};

export default axiosInstance;
