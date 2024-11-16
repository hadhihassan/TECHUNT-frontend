/* eslint-disable no-unsafe-optional-chaining */
import { useState } from "react"
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";
import { setMessages } from '../redux/Slice/conversationsSlice'
import { sendMessageBakend } from "../services/commonApiService";

const useSendMessages = () => {
    const [loading, setLoading] = useState(false);
    const conversation = useSelector((state: ROOTSTORE) => state.conversation.selectedConversations)

    const sendMessage = async (message: string) => {
        setMessages([...conversation?.messages  || [], { message }]);
        setLoading(true);
        await sendMessageBakend(message, conversation?.participants[0]._id || "")
    };
    return { loading, sendMessage };
}

export default useSendMessages
