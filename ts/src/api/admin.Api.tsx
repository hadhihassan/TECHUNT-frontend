import { resolve, resolve1 } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'

export async function login(data: {}) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/admin-login/`, data)
    )
}
export async function getAllUser() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}admin/get-all-users`)
    )
}
export async function blockUser(data:any) {
    return await resolve1(
        axiosInstance.post(`${BASE_URL}admin/block-user/`,data)
    )
}