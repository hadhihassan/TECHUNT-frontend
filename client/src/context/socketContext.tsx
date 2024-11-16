import React, { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { ROOTSTORE } from "../redux/store";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config/axios";

interface SocketContextValue {
	socket: Socket | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}


const SocketContext = createContext<SocketContextValue>({
	socket: null,
});

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const id = useSelector((state: ROOTSTORE) => state.signup.id)

	useEffect(() => {

		if (id) {
			const socketInstance = io(BASE_URL, {
				query: {
					userId: id,
				},
			});
			setSocket(socketInstance);


			socketInstance.on("connect", () => {
				console.log("Connected to socket");
			});

			socketInstance.on("disconnect", () => {
				console.log("Disconnected from socket");
			});

			socketInstance.on("error", (err) => {
				console.error("Socket.IO error:", err);
			});

			return () => {
				socketInstance.close();
			};
		} else if (socket) {
			socket.close();
			setSocket(null);
		}
	}, [id]);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};