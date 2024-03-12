
import React from "react";
import axiosInstance, { BASE_URL, resolve } from "../config/axios";
import routerVariables from '../routes/pathVariables'
export async function editMainProfileSection(data: {}, role: string) {

    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/edit-profile-section-1/`, data)
    )
}
export async function editProfileContact(data: {}, role: string) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/edit-profile-contact/`, data)
    )
}
export async function signup(data: {}, role: string) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}${routerVariables.VerifyEmail}`, data)
    )
}
export async function checkValidNumber(number: string, role: string, id: number) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}checkValidNumber/`, { number, role, id })
    )
}
export async function updateNumberVerification(role: string, id: string) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}update-number-verified/`, { role, id })
    )
}
export async function getAllConversations() {
    return await axiosInstance.get(`${BASE_URL}message/get-Conversations/`)
}
export async function sendMessageBakend(message: string, id: string) {
    return await axiosInstance.post(`${BASE_URL}message/send/${id}/`, { message })
}
export async function getMessageBakend(id: string) {
    return await axiosInstance.get(`${BASE_URL}message/get-messages/${id}/`)
}
export async function createConversation(id: string) {
    return await axiosInstance.post(`${BASE_URL}message/create-conversation/`, { id })
}
export async function getAllActiveContract(role: string) {
    return await axiosInstance.get(`${BASE_URL}${role}/fetch-all-active-contract/`)
}
export async function getSubmittedWork(id: string, role: string) {
    return await axiosInstance.get(`${BASE_URL}${role}/contract/get-submitted-work/${id}`)
}
export async function addBankDetails(id: string, role: string, data: object) {
    return await axiosInstance.post(`${BASE_URL}add-bank-details/`, { data, role, id })
}

