import { useEffect, useState } from "react";
import { getAllConversations } from "../services/commonApiService";
import {  AxiosResponse } from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                getAllConversations()
                    .then((res: AxiosResponse) => {
                        setConversations(res.data)
                    })
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])
    return { loading, conversation }
}

export default useGetConversations;