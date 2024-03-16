/* eslint-disable react-refresh/only-export-components */
import { resolve } from '../config/axios';
import { CONTACT_FROM } from '../components/General/contactForm';
import { AxiosResponse } from 'axios';
import { INITIALSTATE } from '../redux/Slice/signupSlice';
import { axiosInstance, BASE_URL } from '../config/axios'
import type { ContractDetailsType, MilestoneType } from '../components/Client/contract/contractInterface'


// CLIENT / USERS API 
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
export async function Login(data: object) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}login/`, data)
    )
}
export async function postJob(data: object) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}CLIENT/post-job/`, data)
    )
}
export async function fetchAllJobPost() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}CLIENT/get-all-jobpost/`)
    )
}
export async function editJobPost(data: object, id: string) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}CLIENT/edit-jobpost/`, { data, id })
    )
}
export async function getAllProposalForClient(id: string | null) {
    return await axiosInstance.post(`${BASE_URL}CLIENT/get-all-proposals/`, { id });
}
export async function updateproposalAsAccept(id: string) {
    return await axiosInstance.patch(`${BASE_URL}CLIENT/update-proposal-accept/`, { id })
}
export async function updateproposalAsDecline(id: string) {
    return await axiosInstance.patch(`${BASE_URL}CLIENT/update-proposal-decline/`, { id })
}
export async function fetchConnectedTalent() {
    return await axiosInstance.get(`${BASE_URL}CLIENT/fetch-Connected-talents/`)
}
export async function getALlTalent() {
    return await axiosInstance.get(`${BASE_URL}CLIENT/get-all-talent/`)
}
export async function sendContract({ contract, milestone, isMilestone }: { contract: ContractDetailsType, milestone: MilestoneType[], isMilestone: boolean }) {
    return await axiosInstance.post(`${BASE_URL}CLIENT/contract/send-contract/`, { contract, milestone, isMilestone });
}
export async function sendMilestoneApproval( id: string, approval: boolean ) {
    return await axiosInstance.patch(`${BASE_URL}CLIENT/contract/milestone/send-approval/`, { id, approval });
}
export async function makePaymentToBank(talentId:string, amount:number ) {
    return await axiosInstance.post(`${BASE_URL}CLIENT/send-money-talent/`,{talentId, amount});
}
export async function addWalletAmount(talentId:string, amount:number, milestoneId:boolean = true) {
    return await axiosInstance.post(`${BASE_URL}CLIENT/wallet/add-amount/`, { talentId, amount, milestoneId })
}


