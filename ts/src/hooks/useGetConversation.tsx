import { useEffect, useState } from "react";
import { getAllConversations } from "../services/commonApiService";
import { AxiosError, AxiosResponse } from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                getAllConversations()
                .then((res:AxiosResponse)=>{
                    setConversations(res.data)
                    console.log(res.data,"hadhi hassan ")
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