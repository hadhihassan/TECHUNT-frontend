import { useEffect } from "react";

import { useSocketContext } from "../context/socketContext";
import { useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";
import { setMessages } from "../redux/Slice/conversationsSlice";


// import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
    const messages = useSelector((state:ROOTSTORE)=>state.conversation.messages)

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
            console.log("socket worked and new messages",messages,newMessage); 
			newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;