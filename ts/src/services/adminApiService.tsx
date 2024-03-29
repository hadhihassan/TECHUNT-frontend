import { PlanInterface } from '../components/Admin/plan/createPlanForm';
import { resolve } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'
/* eslint-disable react-refresh/only-export-components */
export async function login(data: unknown) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/admin-login/`, data)
    )
}
export async function getAllUser() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}admin/get-all-users`)
    )
}
export async function blockUser(data: unknown) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/block-user/`, data)
    )
}

export async function createNewJobCategoru(data: unknown) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/add-new-job-category/`, data)
    )
}
export async function getAllJobCategoies() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}admin/get-all-job-category/`)
    )
}
export async function softDeleteJobCategory(status: boolean, id: string) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}admin/change-job-category-status/`, { status, id })
    )
}
export async function editJobCategory(data: unknown) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/edit-job-category-status/`, data)
    )
}
export async function getJobPosts(id: string | null) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}admin/get-job-post/`, { id: id })
    )
}
export async function getDashBoardData() {
    return await axiosInstance.get(`${BASE_URL}admin/get-dashBoardData/`)
}
export async function createNewPlan(data:PlanInterface) {
    return await axiosInstance.post(`${BASE_URL}admin/plan/create-new/`, { ...data })
}
export async function getAllPlan() {
    return await axiosInstance.get(`${BASE_URL}admin/plan/get-all/`)
}
export async function getPlan(id:string | undefined) {
    return await axiosInstance.get(`${BASE_URL}admin/plan/get-plan/${id}/`)
}
export async function getPlanForEdit(id:string ) {
    return await axiosInstance.get(`${BASE_URL}admin/plan/edit-plan/${id}/`)
}
export async function updatePlan(id:string , data: PlanInterface) {
    return await axiosInstance.put(`${BASE_URL}admin/plan/update/`,{id , data})
}

