import axios from 'axios';
import { resolve } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'
import type { Proposal as ProposalInterface } from '../interface/interfaces';
/* eslint-disable react-refresh/only-export-components */


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

export async function updateSkills(data: string[]) {
    return (
        axiosInstance.post(`${BASE_URL}TALENT/update-skills/`, data)
    )
}
export async function updateExperiance(data: string[]) {
    return (
        axiosInstance.post(`${BASE_URL}TALENT/update-experiance/`, data)
    )
}
export async function fetchAllJobCategory() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}TALENT/fetch-job-cate/`)
    )
}
export async function fetchAllJobPostForTalent() {
    return await axiosInstance.get(`${BASE_URL}TALENT/fetch-all-job-post/`)
}
export async function CAllS3ServiceToStore(data: unknown) {
    return await axiosInstance.post(`${BASE_URL}TALENT/upload-attachment/`, data)
}
export async function uploadFileToSignedUelInS3(signedUrl: string, file: File | null, content_type: string, onProgress: (progressEvent: ProgressEvent) => void) {
    return await axios.put(signedUrl, file, {
        headers: {
            "Content-Type": content_type,
        },
        onUploadProgress: onProgress,
    });
}
export async function submitProposal(formData: ProposalInterface) {
    return await axiosInstance.post(`${BASE_URL}TALENT/submit-proposal/`, formData)
}
export async function makePayment(id: string) {
    return await axiosInstance.post(`${BASE_URL}TALENT/make-payment-proposal/`, {id})
}
export async function updatePaymentStatus(status:string, proposalId:string) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/update-payment-status/`, {status, proposalId})
}



