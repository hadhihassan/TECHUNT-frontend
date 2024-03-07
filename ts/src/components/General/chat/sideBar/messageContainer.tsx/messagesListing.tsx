import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../../redux/store";
import formatRelativeTime from "../../../../../util/timeFormating";
import useGetMessage from "../../../../../hooks/useGetMessages";
import { useEffect, useRef, useState } from "react";
import { MessageDoc, ConversationDoc } from '../../../../../interface/interfaces';
import Message from "./message";
import useListenMessages from "../../../../../hooks/useListenMessages";

const MessageListing = () => {
    useListenMessages();
    const conversation = useSelector((state: ROOTSTORE) => state.conversation);
    const id = useSelector((state: ROOTSTORE) => state.signup.id);
    const [messages, setMessages] = useState<MessageDoc[]>([]);
    const { _loading, getMessages } = useGetMessage();
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (conversation.selectedConversations) {
            getMessages(conversation?.selectedConversations?._id, setMessages);
        }
    }, [conversation?.messages]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    console.log(conversation.messages, "selected messages");

    return (
        <>
            {conversation.messages && (
                conversation?.messages?.map((message: MessageDoc, index: number) => (
                    <Message 
                        key={index} 
                        message={message} 
                        index={index} 
                        forwardedRef={index === conversation.messages.length - 1 ? lastMessageRef : null} 
                    />
                ))
            )}
        </>
    );
}

export default MessageListing;
