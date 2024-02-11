import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type INITIALSTATE = {
    email: string;
    verify: boolean;
    role: "CLIENT" | "ADMIN" | "TALENT" | "NOTHING",
    isLogged: Boolean
};

const initialState: INITIALSTATE = {
    email: '',
    verify: false,
    role: "NOTHING",
    isLogged: false
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
        setRole: (state, action: PayloadAction<"CLIENT" | "ADMIN" | "TALENT" | "NOTHING">) => {
            state.role = action.payload
        },
        setLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
        },
        cleanAllData: (state, action: PayloadAction) => {
            state.email = ""
            state.verify = false
            state.role = "NOTHING"
            state.isLogged = false
        }

    }
})
export const { setEmail, setVerify, setRole, setLogged, cleanAllData } = Signup.actions
export default Signup.reducer

