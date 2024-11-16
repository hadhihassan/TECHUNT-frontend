import { useEffect } from "react";

import { useSocketContext } from "../context/socketContext";
import { useDispatch, useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";
import { setMessages } from "../redux/Slice/conversationsSlice";
import { Socket } from "socket.io-client";


const useListenMessages = () => {
	const { socket }: { socket: Socket } = useSocketContext() as { socket: Socket };
	const messages = useSelector((state: ROOTSTORE) => state.conversation.messages)
	const dispatch = useDispatch()

	useEffect(() => {
		const handleNewMessage = (newMessage) => {
			const updatedMessage = { ...newMessage, shouldShake: true };
			dispatch(setMessages([...messages, updatedMessage]));
		};
		socket?.on("messageRecevied", handleNewMessage);
		return () => {
			socket?.off("messageRecevied", handleNewMessage)
		}
	}, [messages, socket, dispatch]);

};
export default useListenMessages;