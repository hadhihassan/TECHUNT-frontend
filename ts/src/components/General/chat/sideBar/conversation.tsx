
import { useSelector, useDispatch } from 'react-redux';
import { ROOTSTORE } from '../../../../redux/store';
import { setConversation } from '../../../../redux/Slice/conversationsSlice'
import { IMG_URL } from '../../../../constant/columns';
import formatRelativeTime from '../../../../util/timeFormating';
import useGetMessage from '../../../../hooks/useGetMessages';

import { ConversationDoc } from '../../../../interface/interfaces'
const Conversation = ({ conversation, _lastIndex }: { conversation: ConversationDoc, _lastIndex: number }) => {

    const conversationState = useSelector((state: ROOTSTORE) => state.conversation)
    const selectedConversation: boolean = conversationState?.selectedConversations?.participants[0]?._id === conversation.participants[0]?._id
    const dispatch = useDispatch()
    const { _loading, getMessages } = useGetMessage()


    return <>
        <div className={`flex flex-row items-center justify-between text-xs ${selectedConversation ? "bg-blue-50" : ""}`}
            onClick={() => {
                dispatch(setConversation(conversation))
                getMessages(conversation?.participants[0]?._id)
            }}
        >
            <div className='flex'>
                <img src={`${IMG_URL}${conversation.participants[0]?.Profile?.profile_Dp}`} alt="" className='size-16 border rounded-full shadow-sm ' />
                <div className=' ml-2 mt-1'>
                    <p className='font-sans font-semibold'>{conversation.participants[0]?.First_name}</p>
                    {/* <p className='font-sans font-semibold text-gray-500 mb-1 mt-1'>You: Jai</p> */}
                    <p className='font-sans font-semibold text-gray-500'>{formatRelativeTime(conversation?.updatedAt)}</p>
                </div>
            </div>
        </div>
    </>;
}


export default Conversation;