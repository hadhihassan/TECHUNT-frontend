import useGetConversations from '../../../../hooks/useGetConversation'
import Conversation from './conversation'
import NormalSkeleton from '../../emptyData/normalSkeleton'

const ListConversations = () => {
    const { loading, conversation } = useGetConversations()
    return (
        <div className="flex flex-col  rounded-t-xl bg-gray-100 ">
            {
                loading ? <>
                    <NormalSkeleton />
                </> : <>
                    {conversation?.map((con, index) => (
                        <div key={index} className='m-2'>
                            <Conversation conversation={con} index={index} _lastIndex={false} />
                            {index === conversation.length - 1 && <div ></div>}
                        </div>
                    ))}
                </>
            }
        </div>
    );
}

export default ListConversations;