import { useState } from "react";
import { ROOTSTORE } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getMessageBakend } from "../services/commonApiService";
import { setMessages } from "../redux/Slice/conversationsSlice";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const conversation = useSelector((state: ROOTSTORE) => state.conversation)
    const [newMessage, setMessage] = useState()

    const getMessages = async (id: string, fetchMessages: () => void) => {
        setLoading(true);
        try {
            const messages = await getMessageBakend(id)
            if (messages) {
                dispatch(setMessages(messages?.data?.messages))
                setMessage(messages?.data?.messages)
                fetchMessages()
                return messages?.data?.messages
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, getMessages, newMessage }
}
export default useGetMessage 