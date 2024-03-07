import { useEffect, useRef } from 'react'
import useGetConversations from '../../../../hooks/useGetConversation'
import Conversation from './conversation'

const ListConversations = () => {
    const { loading, conversation } = useGetConversations()
    const lastMessageRef = useRef();

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]); 

    return (
        <div className="flex flex-col mt-8 hover:bg-blue-50 ">
            {conversation?.map((con, index) => (
                <div key={index}>
                    <Conversation conversation={con} lastIndex={index === conversation.length - 1 ? true : undefined} />
                    {index === conversation.length - 1 && <div ref={lastMessageRef}></div>}
                </div>
            ))}
        </div>
    );
}

export default ListConversations;
