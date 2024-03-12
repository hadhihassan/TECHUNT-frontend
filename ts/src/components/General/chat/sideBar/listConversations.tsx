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
        <div className="flex flex-col  hover:bg-red-500 rounded-t-xl">
            {conversation?.map((con, index) => (
                <div key={index} className='m-2'>
                    <Conversation conversation={con} _lastIndex={index === conversation.length - 1 ? true : undefined} index={index} />
                    {index === conversation.length - 1 && <div ref={lastMessageRef}></div>}
                </div>
            ))}
        </div>
    );
}

export default ListConversations;
