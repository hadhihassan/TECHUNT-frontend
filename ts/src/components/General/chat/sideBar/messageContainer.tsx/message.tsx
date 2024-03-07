import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../../redux/store";
import formatRelativeTime from "../../../../../util/timeFormating";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { MessageDoc, ConversationDoc } from '../../../../../interface/interfaces';
import { IMG_URL } from "../../../../../constant/columns";

const Message = forwardRef(({ message, index }: { message: MessageDoc, index: number }, ref: React.Ref<HTMLDivElement>) => {
    const id = useSelector((state: ROOTSTORE) => state.signup.id);
    const conversation = useSelector((state: ROOTSTORE) => state.conversation);
    const messageFromMe: boolean = id === message.senderId;

    useImperativeHandle(ref, () => ({
        scrollIntoView: () => {
            if (ref && ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }));

    return (
        <div ref={ref} className={` ${messageFromMe ? "col-start-6 col-end-13" : "col-start-1 col-end-8"} p-3 rounded-lg`} key={index}>
            <div className={`flex  ${messageFromMe ? "items-center justify-start flex-row-reverse" : "flex-row items-center"}`}>
                {
                    !messageFromMe &&
                    <img src={`${IMG_URL}${conversation?.selectedConversations?.participants[0]?.Profile?.profile_Dp}`} alt="" className="h-10 w-10 flex-shrink-0 rounded-full" />
                }
                <div
                    className={`relative ${messageFromMe ? "mr-3 text-sm bg-indigo-100" : "ml-3 text-sm bg-white"} py-2 px-4 shadow rounded-xl `}
                >
                    <div className="chat-bubble chat chat-start">{message.message}</div>
                    {/* <label className=' text-end text-xs font-sans text-gray-400'>{formatRelativeTime(message.updatedAt)}</label> */}
                </div>
            </div>
        </div>
    );
});

export default Message;
