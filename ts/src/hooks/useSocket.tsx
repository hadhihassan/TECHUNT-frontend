import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (url: string) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket: Socket = io(url);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    return socket;
};

export default useSocket;