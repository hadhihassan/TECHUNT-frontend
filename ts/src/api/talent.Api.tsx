import { resolve } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'



export async function storeWorkBasedDataBioData(data: object) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}TALENT/save-bio-data`, data)
    )
}
export async function getUserProfileDetails(role: string) {
    return await resolve(
        axiosInstance.get(`${BASE_URL}${role}/get-profile-Data/`)
    )
}

export async function updateSkills(data:string[]) {
    return (
        axiosInstance.post(`${BASE_URL}TALENT/update-skills/`, data)
    )
}
export async function updateExperiance(data:string[]) {
    return (
        axiosInstance.post(`${BASE_URL}TALENT/update-experiance/`, data)
    )
}
export async function fetchAllJobCategory(){
    return await resolve(
        axiosInstance.get(`${BASE_URL}TALENT/fetch-job-cate/`)
    )
}
export async function fetchAllJobPostForTalent(){
    return await axiosInstance.get(`${BASE_URL}TALENT/fetch-all-job-post/`)
}



