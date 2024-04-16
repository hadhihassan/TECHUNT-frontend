/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { resolve } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'
import { EducationType } from '../pages/Talent/profile/education';


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
export async function uploadFileToSignedUelInS3(signedUrl: string, file: File | null, content_type: string, onProgress: () => void) {
    return await axios.put(signedUrl, file, {
        headers: {
            "Content-Type": content_type,
        },
        onUploadProgress: onProgress,
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitProposal(formData: any) {
    return await axiosInstance.post(`${BASE_URL}TALENT/submit-proposal/`, formData)
}
export async function makePayment(id: string) {
    return await axiosInstance.post(`${BASE_URL}TALENT/make-payment-proposal/`, { id })
}
export async function updatePaymentStatus(status: string, proposalId: string) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/update-payment-status/`, { status, proposalId })
}
export async function getAllClientForTalent() {
    return await axiosInstance.get(`${BASE_URL}TALENT/fetch-all-clients/`)
}
export async function getAllClientProposalsForTalent(id: string) {
    return await axiosInstance.get(`${BASE_URL}TALENT/fetch-all-clients-proposal/${id}/`)
}
export async function getAllNewContracts() {
    return await axiosInstance.get(`${BASE_URL}TALENT/fetch-all-new-contract/`)
}

export async function updateContractStatus(id: string, status: boolean, actualStatus: string) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/update-contract-status/`, { id, status, actualStatus })
}
export async function updateMilestoneStatus(id: string, status: string) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/update-milestone-status/`, { id, status })
}
export async function submitWork(id: string, data: { url: string, description: string }) {
    return await axiosInstance.post(`${BASE_URL}TALENT/contract/milestone/submit-work/`, { id, data })
}
export async function submitEditWork(id: string, data: { url: string, description: string }, workId: string) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/contract/milestone/edit-work/`, { id, data, workId })
}
export async function saveResume(s3Link: string) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/profile/resume-save/`, { s3Link })
}
export async function searchJob(searchData: { query: string, postType: string, experience: string, maxInputValue: number, inputValue: number }) {
    return await axiosInstance.post(`${BASE_URL}TALENT/search/find-job/`, { searchData })
}
export async function saveEducation(data:EducationType) {
    return await axiosInstance.post(`${BASE_URL}TALENT/profile/save-education/`, { data })
}
export async function  deleteEducation(id: string) {
    return await axiosInstance.delete(`${BASE_URL}TALENT/profile/delete-education/${id}`)
}
export async function  updateEducation(id: string, data:EducationType) {
    return await axiosInstance.patch(`${BASE_URL}TALENT/profile/edit-education/`,{id, data})
}