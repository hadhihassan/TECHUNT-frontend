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
            <div className="flex  text-gray-800 mb-10 w-full h-[83vh] m-auto ">
                <div className="flex flex-row h-full bg-white m-5 border rounded-xl w-full overflow-hidden">
                    <div className="flex flex-col py-8 w-64 bg-white flex-shrink-0 border-r overflow-auto">
                        <div className='border-b -mb-2'>
                            <div className=' text-xs text-black flex flex-col  justify-center items-center ' onClick={() => history.back()}>
                                <p className='font-sans font-semibold text-2xl text-gray-500 mb-3 text-center '>Messages</p>
                            </div>
                        </div>
                        {/* side bar conversation search input */}
                        <ChatSearchBar onSearch={onSearch} />
                        {/* Conversations listing */}
                        <ListConversations />
                    </div>
                    <div className="flex flex-col flex-auto h-full p-2 ">
                        {/* Message container header */}
                        <MessageHeader />
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 shadow-xl border w-full ">
                            <div className="flex flex-col h-full w-full ">
                                <div className="grid relative grid-cols-12 w-full overflow-auto h-[60vh]">
                                    <MessageListing />
                                </div>
                            </div>
                            {/* Message sending input bar */}
                            <SendMessageInput />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Message
