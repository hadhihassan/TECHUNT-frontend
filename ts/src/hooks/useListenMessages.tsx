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
		const handleNewMessage = (newMessage: { shouldShake: boolean; }) => {
			const updatedMessage = { ...newMessage, shouldShake: true };
			console.log("new message is here");
			dispatch(setMessages([...messages, updatedMessage])); 
		};

		socket?.on("newMessage", handleNewMessage);
		return () => socket?.off("newMessage", handleNewMessage); 
	}, [messages, socket, dispatch]); 

};
export default useListenMessages;