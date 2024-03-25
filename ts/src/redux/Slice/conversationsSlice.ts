import { createSlice } from "@reduxjs/toolkit";

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
        },
        cleanChatItems: (state) => {
            state.selectedConversations = []
            state.messages = []
        }
    }
})
export const { setMessages, setConversation, cleanChatItems } = conversation.actions
export default conversation.reducer