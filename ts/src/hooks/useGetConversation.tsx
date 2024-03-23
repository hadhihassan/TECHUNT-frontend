import { useEffect, useState } from "react";
import { getAllConversations } from "../services/commonApiService";
import { AxiosError, AxiosResponse } from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversations] = useState([]);
    const [conversation1, setConversations1] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                getAllConversations()
                .then((res:AxiosResponse)=>{
                    setConversations(res.data)
                    setConversations1(res.data)
                }).catch((err:AxiosError) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])
    return { loading, conversation }
}

export default useGetConversations;