import { useEffect, useState } from 'react';
import { BASE_URL } from "../config/axios";
import io, { Socket } from 'socket.io-client';

const useSocket = (url: string = BASE_URL, userId: string = "hai") => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket: Socket = io(url, {
            query: { userId },
        });

        setSocket(newSocket);

        newSocket.emit("OnlineUser", { id: userId, role: "TALENT" });

        return () => {
            newSocket.emit("OfflineUser", { id: userId, role: "TALENT" });
            newSocket.disconnect();
        };
    }, [url, userId]);

    return socket;
};

export default useSocket;