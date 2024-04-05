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
			// Create a new object instead of mutating the existing one
			const updatedMessage = { ...newMessage, shouldShake: true };
			console.log("new message is here");
			dispatch(setMessages([...messages, updatedMessage])); // Assuming setMessages is an action creator
		};

		socket?.on("newMessage", handleNewMessage);
		return () => socket?.off("newMessage", handleNewMessage); // Ensure the same handler is removed
	}, [messages, socket, dispatch]); // Removed messages.length from the dependency array

};
export default useListenMessages;