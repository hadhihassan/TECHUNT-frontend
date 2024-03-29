import { useState } from "react";

import { useDispatch } from "react-redux";
import { getMessageBakend } from "../services/commonApiService";
import { setMessages } from "../redux/Slice/conversationsSlice";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
 
    const [newMessage, setMessage] = useState()

    const getMessages = async (id: string, fetchMessages: () => void) => {
        setLoading(true);
        try {
            const messages = await getMessageBakend(id)
            if (messages) {
                dispatch(setMessages(messages?.data?.messages))
                setMessage(messages?.data?.messages)
                fetchMessages()
                console.log(messages?.data?.messages)
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