
import { useSelector, useDispatch } from 'react-redux';
import { ROOTSTORE } from '../../../../redux/store';
import { setConversation ,cleanChatItems} from '../../../../redux/Slice/conversationsSlice'
import { IMG_URL } from '../../../../constant/columns';
import formatRelativeTime from '../../../../util/timeFormating';
import useGetMessage from '../../../../hooks/useGetMessages';

import { ConversationDoc } from '../../../../interface/interfaces'
const Conversation = ({ conversation, _lastIndex ,index}: { conversation: ConversationDoc, _lastIndex: boolean,index:number }) => {

    const conversationState = useSelector((state: ROOTSTORE) => state.conversation)
    const selectedConversation: boolean = conversationState?.selectedConversations?.participants[0]?._id  === conversation.participants[0]?._id
    const dispatch = useDispatch()
    const {  getMessages } = useGetMessage()


    return <>
        <div className={`flex flex-row items-center justify-between text-xs w-full ${_lastIndex && "rounded-b-xl"} ${index === 0 && "rounded-t-xl"} ${selectedConversation ? "bg-red-500" : ""}`}
            onClick={() => {
                dispatch(cleanChatItems())
                dispatch(setConversation(conversation))
                getMessages(conversation?.participants[0]?._id)
            }}
        >
            <div className='flex m-2'>
                <img src={`${IMG_URL}${conversation.participants[0]?.Profile?.profile_Dp}`} alt="" className='size-12  border-4 rounded-full border-white ' />
                <div className=' ml-2 mt-1 m'>
                    <p className='font-sans font-semibold text-white'>{conversation.participants[0]?.First_name}</p>
                    {/* <p className='font-sans font-semibold text-gray-500 mb-1 mt-1'>You: Jai</p> */}
                    <p className='font-sans font-semibold text-white'>{formatRelativeTime(conversation?.updatedAt)}</p>
                </div>
            </div>
        </div>
    </>;
}


export default Conversation;