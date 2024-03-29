import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type INITIALSTATE = {
    email: string;
    verify: boolean;
    role: "CLIENT" | "ADMIN" | "TALENT" | "NOTHING",
    isLogged: boolean,
    id: null | string,
    numberVerify: boolean
    premiumUser: boolean
    bankVerified: boolean
    progress: number
};

const initialState: INITIALSTATE = {
    email: '',
    verify: false,
    role: "NOTHING",
    isLogged: false,
    id: null,
    numberVerify: false,
    premiumUser: false,
    bankVerified: false,
    progress: 0
};

const Signup = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setVerify: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload)
            state.verify = action.payload
        },
        setRole: (state, action: PayloadAction<INITIALSTATE['role']>) => {
            console.log("ROLE CHANGING ROLE IS ", action.payload)
            state.role = action.payload
        },
        setLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        isNumberVerify: (state, action: PayloadAction<boolean>) => {
            state.numberVerify = action.payload
        },
        isPremimunUser: (state, action: PayloadAction<boolean>) => {
            state.premiumUser = action.payload
        },
        isBankVeried: (state, action: PayloadAction<boolean>) => {
            state.bankVerified = action.payload
        },
        setProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload
        },
        cleanAllData: (state) => {
            state.email = ""
            state.verify = false
            state.role = "NOTHING"
            state.isLogged = false
            state.id = null
            state.numberVerify = false
            state.premiumUser = false
            state.bankVerified = false
            state.progress = 0
        },

    }
})
export const { setEmail,
    setVerify,
    setRole,
    setLogged,
    cleanAllData,
    setId,
    isNumberVerify,
    isPremimunUser,
    isBankVeried,
    setProgress } = Signup.actions
export default Signup.reducer

