import { useEffect } from "react";

import { useSocketContext } from "../context/socketContext";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";
import { setMessages } from "../redux/Slice/conversationsSlice";
import { Socket } from "socket.io-client";


// import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket }: { socket: Socket } = useSocketContext() as { socket: Socket };
	const messages = useSelector((state: ROOTSTORE) => state.conversation.messages)

	useEffect(() => {
		socket?.on("newMessage", (newMessage: { shouldShake: boolean; }) => {
			newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newMessage]);
		});
		return () => socket?.off("newMessage");
	}, [messages, socket]);
};
export default useListenMessages;