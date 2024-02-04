import { resolve } from '../config/axios';
import { CONTACT_FROM } from '../components/General/contactForm';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { INITIALSTATE } from '../redux/Slice/signupSlice';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../redux/store';
import { axiosInstance, BASE_URL } from '../config/axios'

//Client Api
//=========


export async function createContactDetails(formData: CONTACT_FROM, role: INITIALSTATE["role"]) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/add-contact/`, formData).then((res: AxiosResponse) => res.data)
    );
}

export async function uploadProfilePhoto(image: FormData, role: string) {
    console.log(image, role)
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/upload-profile-pic/`, image, { headers })
    );
}

export async function Login(data:{},role:string) {
    console.log("email =>", data, "password => ", data);
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/login/`,data)
    )

}

