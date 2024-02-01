import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type INITIALSTATE = {
    email: string;
    fName: string;
    lName: string;
    verify : boolean;
    role : "CLIENT" | "ADMIN" | "TALENT" | "NOTHING" 
 };

const initialState: INITIALSTATE = {
    email: '',
    fName: '',
    lName: '',
    verify: false,
    role : "NOTHING"
};

const Signup = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setEmail: (state, action : PayloadAction<string>) => {
            state.email = action.payload
        },
        setFname : (state, action : PayloadAction<string>) => {
            state.fName = action.payload
        },
        setLname : (state, action : PayloadAction<string>) => {
            state.lName = action.payload
        },
        setVerify : (state, action : PayloadAction<boolean>) => {
            console.log(action.payload)
            state.verify = action.payload
        },
        setRole : (state, action : PayloadAction<"CLIENT" | "ADMIN" | "TALENT" | "NOTHING">) => {
            state.role = action.payload 
        }

    }
})
export const { setEmail, setFname ,setLname, setVerify, setRole } = Signup.actions
export default Signup.reducer

