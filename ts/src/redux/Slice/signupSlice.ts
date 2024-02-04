import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type INITIALSTATE = {
    email: string;
    verify: boolean;
    role: "CLIENT" | "ADMIN" | "TALENT" | "NOTHING"
};

const initialState: INITIALSTATE = {
    email: '',
    verify: false,
    role: "NOTHING"
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
        }

    }
})
export const { setEmail, setVerify, setRole } = Signup.actions
export default Signup.reducer

