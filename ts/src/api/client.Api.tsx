import { resolve } from '../config/axios';
import { CONTACT_FROM } from '../components/General/contactForm';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { INITIALSTATE } from '../redux/Slice/signupSlice';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../redux/store';

const BASE_URL: string = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

const jwtToken = localStorage.getItem('token');
const onRequest: (config: AxiosRequestConfig) => any = (config) => {
    config.headers = config.headers || {};
    config.headers['authorization'] = `Bearer ${jwtToken}`;
    return config;
};

axiosInstance.interceptors.request.use(onRequest);


//Client Api
//=========


export async function createContactDetails(formData: CONTACT_FROM, role: INITIALSTATE["role"]) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/add-contact/`, formData).then((res: AxiosResponse) => res.data)
    );
}
export async function uploadProfilePhoto(image: FormData, role:string) {
    console.log(image,role)
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/upload-profile-pic/`, image, { headers })
    );
}

