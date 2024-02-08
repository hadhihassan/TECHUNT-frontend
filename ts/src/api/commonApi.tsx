import React from "react";
import axiosInstance, { BASE_URL, resolve } from "../config/axios";

export async function editMainProfileSection(data: {}, role: string) {
    console.log("role", role);

    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/edit-profile-section-1/`, data)
    )
}
export async function editProfileContact(data: {}, role:any) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}${role}/edit-profile-contact/`, data)
    )
}


