import { createContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export const socketServerURL = "https://prueba-videollamada-back.onrender.com";

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(`${socketServerURL}/nspRooms`, {
      path: "/socket.io",
      autoConnect: false,
    });
  }, []);

  useEffect(() => {
    const onConnect = () => {
      console.log("- SocketContext | conectado", socketRef.current.id);
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);

    socketRef.current.connect();

    return () => {
      if (socketRef.current) {
        console.log(
          "- SocketContext | unmount -> desconectado",
          socketRef.current.id
        );

        socketRef.current.off("connect", onConnect);
        socketRef.current.off("disconnect", onDisconnect);
        setIsConnected(false);

        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
