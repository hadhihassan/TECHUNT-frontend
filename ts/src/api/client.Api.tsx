import { resolve } from '../config/axios';
import { CONTACT_FROM } from '../components/General/contactForm';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { INITIALSTATE } from '../redux/Slice/signupSlice';
import { useSelector } from 'react-redux';
import { ROOTSTORE } from '../redux/store';
import { axiosInstance, BASE_URL } from '../config/axios'




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

export async function Login(data: {}) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}login/`, data)
    )

}

export async function postJob(data: {}) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}CLIENT/post-job/`, data)
    )
}
export async function fetchAllJobPost() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}CLIENT/get-all-jobpost/`)
    )
}
export async function editJobPost(data:{},id:string) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}CLIENT/edit-jobpost/`,{data,id})
    )
}

