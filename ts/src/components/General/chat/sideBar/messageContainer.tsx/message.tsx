import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../../redux/store";
import { forwardRef, useRef } from "react";
import { MessageDoc } from '../../../../../interface/interfaces';
import formatRelativeTime from "../../../../../util/timeFormating";

const Message = forwardRef(({ message, index }: { message: MessageDoc, index: number }) => {
    const id = useSelector((state: ROOTSTORE) => state.signup.id);
    const conversation = useSelector((state: ROOTSTORE) => state.conversation);
    const messageFromMe: boolean = id === message.senderId;
    const messagesRef = useRef(null);

    return (
        <div ref={messagesRef} className={` ${messageFromMe ? "col-start-6 col-end-13" : "col-start-1 col-end-8"} p-3 rounded-lg`} key={index}>
            <div className={`flex  ${messageFromMe ? "items-center justify-start flex-row-reverse" : "flex-row items-center"}`}>
                {
                    !messageFromMe &&
                    <img src={`${conversation?.selectedConversations?.participants[0]?.Profile?.profile_Dp}`} alt="" className="h-10 w-10 flex-shrink-0 rounded-full border-2 border-red-500" />
                }
                <div
                    className={`relative ${messageFromMe ? "mr-3 text-sm bg-indigo-100" : "ml-3 text-sm bg-white"} py-2 px-4 shadow rounded-xl flex items-center gap-2 `}
                >
                    <div className="chat-bubble chat chat-start">{message.message}</div>
                    <label className=' text-end text-xs font-sans text-gray-400'>{formatRelativeTime(message.updatedAt)} </label>
                </div>
            </div>
        </div>
    );
});

export default Message;