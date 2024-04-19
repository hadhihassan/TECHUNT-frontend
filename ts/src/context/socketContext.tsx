import React, { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { ROOTSTORE } from "../redux/store";
import { useSelector } from "react-redux";

interface SocketContextValue {
	socket: Socket | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onlineUsers: any[]; 
}
const SocketContext = createContext<SocketContextValue>({
	socket: null,
	onlineUsers: [],
});

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const id = useSelector((state: ROOTSTORE) => state.signup.id)
	const [socket, setSocket] = useState<Socket | null>(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		if (id) {
			const socketInstance = io("https://timezones.website", {
				query: {
					userId: id,
				},
			});

			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			setSocket(socketInstance);

			return () => {
				socketInstance.close();
			};
		} else if (socket) {
			socket.close();
			setSocket(null);
		}
	}, [id]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};