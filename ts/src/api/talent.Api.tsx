import { resolve } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'



export async function storeWorkBasedDataBioData(data: {}) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}TALENT/save-bio-data`,data)
    )
}
export async function getUserProfileDetails(role:string) {
    return await resolve(
        axiosInstance.get(`${BASE_URL}${role}/get-profile-Data/`)
    )
}