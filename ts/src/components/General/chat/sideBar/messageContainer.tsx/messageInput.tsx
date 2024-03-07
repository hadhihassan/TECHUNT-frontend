import { ChangeEvent, useState } from "react"
import useSendMessages from "../../../../../hooks/useSendMessage"
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../../../redux/store";


const SendMessageInput = () => {
    const [message, setMessage] = useState<string>("");
    const isSelectedConversation = useSelector((state: ROOTSTORE) => state.conversation.selectedConversations)
    const { loading, sendMessage } = useSendMessages();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(message);
        setMessage("");
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };
    return <>
        {
            isSelectedConversation && <form onSubmit={handleSubmit}>
                <div
                    className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 border shadow-xl "
                >
                    <div>
                        <button
                            className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >
                            <svg
                                className="w-5 h-5 shadow-xl text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow ml-4 ">
                        <div className="relative w-full">
                            <input
                                value={message}
                                onChange={handleChange}
                                type="text"
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            <button
                                className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="ml-4 shadow-xl ">
                        <button
                            className=" flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        >
                            <span >Send</span>
                            {
                                loading ? <div className="w-6 h-6 animate-spin">
                                    <svg className="w-full h-full text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01M12 20v.01M12 20h.01M12 20l.01-.01M12 20l-.01-.01M12 20l-.01.01M12 20l.01.01M16 18.364a3 3 0 10-4 0M12 20l-.01-.01M8 18.364l.01.01M8 18.364a3 3 0 10-4 0M8 18.364l-.01-.01M8 18.364l.01-.01M8 18.364a3 3 0 00-4 0M12 20l.01-.01M12 20a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                </div> : <span className="ml-2">
                                    <svg
                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        ></path>
                                    </svg>
                                </span>
                            }

                        </button>
                    </div>
                </div>
            </form>
        }

    </>
}

export default SendMessageInput