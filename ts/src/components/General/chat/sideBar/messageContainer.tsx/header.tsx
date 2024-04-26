import { useSelector } from 'react-redux'
import { ROOTSTORE } from '../../../../../redux/store'


const MessageHeader = () => {
    const conversationState = useSelector((state: ROOTSTORE) => state?.conversation?.selectedConversations?.participants[0])
    return <>
        {
            conversationState && <div className='mb-1 flex justify-between'>
                <div className='flex border w-full p-2  bg-gray-100 rounded-t-2xl '>
                    <img src={`${conversationState?.Profile?.profile_Dp}`} className='size-14 rounded-full  border-2 border-red-500' alt="" />
                    <p className='font-sans m-3  font-semibold text-black text-xl'>{conversationState?.First_name }</p>
                </div>
            </div>
        }

    </>
}

export default MessageHeader