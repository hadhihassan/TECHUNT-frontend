import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../../redux/store";
import useGetMessage from "../../../../../hooks/useGetMessages";
import { useEffect, useState } from "react";
import { MessageDoc } from '../../../../../interface/interfaces';
import Message from "./message";
import useListenMessages from "../../../../../hooks/useListenMessages";

const MessageListing = () => {
    useListenMessages();
    const conversation = useSelector((state: ROOTSTORE) => state.conversation);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_messages, setMessages] = useState<MessageDoc[]>([]);
    const { loading, getMessages }: { loading: boolean, getMessages: (id: string, fetchMessages: () => void) => Promise<unknown> } = useGetMessage();

    useEffect(() => {
        if (conversation.selectedConversations) {
            getMessages(conversation?.selectedConversations?._id as string || "", setMessages as () => void);
        }
    }, [conversation?.messages]);

    return (
        <>{loading}
            {conversation.messages && (
                conversation?.messages?.map((message: MessageDoc, index: number) => (
                    <Message
                        key={index}
                        message={message}
                        index={index}
                    />
                ))
            )}
        </>
    );
}

export default MessageListing;
