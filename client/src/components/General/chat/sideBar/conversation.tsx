
import { useSelector, useDispatch } from 'react-redux';
import { ROOTSTORE } from '../../../../redux/store';
import { setConversation, cleanChatItems } from '../../../../redux/Slice/conversationsSlice'
import useGetMessage from '../../../../hooks/useGetMessages';

import { ConversationDoc } from '../../../../interface/interfaces'
const Conversation = ({ conversation, _lastIndex, index }: { conversation: ConversationDoc, _lastIndex: boolean, index: number }) => {

    const conversationState = useSelector((state: ROOTSTORE) => state.conversation)
    const selectedConversation: boolean = conversationState?.selectedConversations?.participants[0]?._id === conversation.participants[0]?._id
    const dispatch = useDispatch()
    const { getMessages } = useGetMessage()


    return <>
        <div className={`flex flex-row items-center justify-between text-xs w-full hover:bg-gray-300 ${_lastIndex && "rounded-b-xl"} ${index === 0 && "rounded-t-xl"} ${selectedConversation ? "bg-gray-200" : ""}`}
            onClick={() => {
                dispatch(cleanChatItems())
                dispatch(setConversation(conversation))
                getMessages(conversation?.participants[0]?._id)
            }}
        >
            {/* <div className='border'>
                <img src={`${conversation.participants[0]?.Profile?.profile_Dp}`} alt="" className='size-12  border-4 rounded-full border-red-500 ' />
                <div className='flex justify-start items-center gap-5'>
                    <p className='text-xl font-sans font-semibold text-gray-700'>{conversation.participants[0]?.First_name}</p>
                    <p className='font-sans font-semibold text-gray-700'>{conversation.participants[0]?.Profile?.email}</p>
                </div>
            </div> */}
            <div className="flex flex-col space-y-1 overflow-y-auto md:h-[370px rounded-xl">
                <button
                    key={index}
                    className="flex flex-row items-center rounded-xl p-2"
                >
                    <img src={`${conversation.participants[0]?.Profile?.profile_Dp}`} alt="" className='size-12  border-4 rounded-full border-red-500 ' />
                    <div className="ml-2 text-sm font-semibold">
                    <p className='text-xl font-sans font-semibold text-gray-700'>{conversation.participants[0]?.First_name}</p>
                    <p className='font-sans font-semibold text-gray-700'>{conversation.participants[0]?.Profile?.email}</p>
                    </div>
                </button>
            </div>
        </div>
    </>;
}


export default Conversation;