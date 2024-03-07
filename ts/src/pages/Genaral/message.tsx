import a from '../../assets/4950287_19874-removebg-preview.png'
import { AudioOutlined } from '@ant-design/icons';
import Footer from '../../components/General/Home/footer/footer';
import React from 'react';
import ChatSearchBar from '../../components/General/chat/sideBar/charSearchInput';
import { SearchProps } from 'antd/es/input';
import ListConversations from '../../components/General/chat/sideBar/listConversations';
import MessageHeader from '../../components/General/chat/sideBar/messageContainer.tsx/header';
import SendMessageInput from '../../components/General/chat/sideBar/messageContainer.tsx/messageInput';
import MessageListing from '../../components/General/chat/sideBar/messageContainer.tsx/messagesListing';

const Message = () => {
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <React.Fragment>
            <div className="bg-blue-900 absolute top-0 flex justify-end items-center -z-10 w-full h-[50vh] " >
                <img src={a} alt="" className='h-[100%] ' />
            </div>
            <div className='container xl:ml-20 mt-10 md:ml-10 text-white flex flex-col justify-start ' onClick={()=>history.back()}>
                <p className='font-sans font-semibold text-sm flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                    Back</p>
            </div>
            <p className='font-sans font-semibold sm:ml-5 ml-7 gap text-2xl text-white md:ml-20 xl:ml-28 mb-5 mt-5'>Messages</p>
            <div className="flex h-auto text-gray-800 mb-10 w-[90%] m-auto">
                <div className="flex flex-row h-full bg-white m-5 border rounded-xl w-full overflow-hidden">
                    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r overflow-auto">
                        {/* side bar conversation search input */}
                        <ChatSearchBar onSearch={onSearch} />
                        {/* Conversations listing */}
                        <ListConversations />
                    </div>
                    <div className="flex flex-col flex-auto h-full p-6 overflow-auto">
                        {/* Message container header */}
                        <MessageHeader />
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 shadow-xl border w-full overflow-auto">
                            <div className="flex flex-col h-full w-full mb-4">
                                <div className="grid relative grid-cols-12 w-full gap-y-2 overflow-auto h-[60vh]">
                                    <MessageListing />
                                </div>
                            </div>
                            {/* Message sending input bar */}
                            <SendMessageInput />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}
export default Message
