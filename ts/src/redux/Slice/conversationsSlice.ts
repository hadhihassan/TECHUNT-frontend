import { createSlice } from "@reduxjs/toolkit";
//Define the initial state shap
export type ConversationType = {
    selectedConversations: unknown,
    messages: []
};

const initialState: ConversationType = {
    selectedConversations: null,
    messages: []
}

const conversation = createSlice({
    name: "conversation",
    initialState: initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setConversation: (state, action) => {
            state.selectedConversations = action.payload
        }
    }
})
export const { setMessages, setConversation } = conversation.actions
export default conversation.reducer