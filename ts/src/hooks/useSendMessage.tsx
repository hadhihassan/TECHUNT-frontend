import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";
import { setMessages } from '../redux/Slice/conversationsSlice'
import { sendMessageBakend } from "../services/commonApiService";

const useSendMessages = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const conversation = useSelector((state: ROOTSTORE) => state.conversation.selectedConversations)

    const sendMessage = async (message: string) => {
        setLoading(true);
        try {
            const res = await sendMessageBakend(message, conversation?.participants[0]._id)
            setMessages([...conversation.messages, {message}]);
            // console.log(res,  "is the message for the sending sending message")
            console.log("sending message", [...conversation.messages, {message}])
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            console.log(conversation);
        }
    };
    return { loading, sendMessage};
}

export default useSendMessages
