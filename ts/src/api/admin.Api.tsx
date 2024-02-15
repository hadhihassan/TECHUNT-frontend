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
export async function blockUser(data: any) {
    return await resolve1(
        axiosInstance.post(`${BASE_URL}admin/block-user/`, data)
    )
}

export async function createNewJobCategoru(data: {} | any) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/add-new-job-category/`, data)
    )
}
export async function getAllJobCategoies() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}admin/get-all-job-category/`)
    )
}
export async function softDeleteJobCategory(status:boolean, id:string) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}admin/change-job-category-status/`,{status, id})
    )
}
export async function editJobCategory(data:{},id:string | null) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/edit-job-category-status/`,{data,id})
    )
}