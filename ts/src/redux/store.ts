import { configureStore } from "@reduxjs/toolkit";
import Login from './Slice/loginSlice'
import { INITIALSTATE } from "./Slice/loginSlice"; 

const store = configureStore({
    reducer: {
        login:  Login
    }
})
export default store


export type ROOTSTORE ={
    login : INITIALSTATE
} 