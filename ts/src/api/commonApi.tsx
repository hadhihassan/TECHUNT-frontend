import React from "react";
import axiosInstance, { BASE_URL, resolve, resolve1 } from "../config/axios";
import routerVariables from '../../src/util/pathVariables'
export async function editMainProfileSection(data: {}, role: string) {

    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/edit-profile-section-1/`, data)
    )
}
export async function editProfileContact(data: {}, role:any) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/edit-profile-contact/`, data)
    )
}
export async function signup(data: {}, role:any) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}${routerVariables.VerifyEmail}`, data)
    )
}
export async function checkValidNumber(number: string, role: string, id: string){
    return await resolve(
        axiosInstance.post(`${BASE_URL}checkValidNumber/`,{number, role, id})
    )
}


