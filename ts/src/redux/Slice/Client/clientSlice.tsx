import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Define the initial state shap
export type Client_INITIALSTATE = {
    fName: string,
    lName: string,
    imageUrl: string,
    description: string,
    contact: {
        address: string,
        country: string,
        cityName: string,
        pinCode: number | null,
    }
};
//Set the initial state 
const initialState: Client_INITIALSTATE = {
    imageUrl: "",
    description: "",
    contact: {
        address: "",
        country: "",
        cityName: "",
        pinCode: null,
    },
    fName: "",
    lName: "",
};
//Create redux slice 
const Client = createSlice({
    name: "client",
    initialState,
    reducers: {
        setFName: (state, action: PayloadAction<"">) => {
            state.fName = action.payload
        },
        setLName: (state, action: PayloadAction<string>) => {
            state.lName = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setContact: (state, action: PayloadAction<Client_INITIALSTATE["contact"]>) => {
            state.contact = action.payload
        },
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload
        }


    }
})
//exporting the actions
export const { setFName, setContact, setImageUrl, setDescription, setLName } = Client.actions
//exprting the slice reducers
export default Client.reducer

