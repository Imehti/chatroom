import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import socket from './socket'
import ConnectionState from "./components/ConnectionState";
import ConnectionManager from "./components/ConnectionManager";
import ChatForm from "./components/ChatForm";

import { addMessage } from "./features/messageSlice"; // Action for handling incoming messages

const App = () => {
  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onNewMessage = (message: { message: string; user: { id: number; userName: string }}) => {
      dispatch(addMessage(message)); // Add the new message (with user) to Redux
  
    };
    
  
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newMessage", onNewMessage);
  
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newMessage", onNewMessage);
    };
  }, [dispatch]);
  


  return (
    <>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <ChatForm /> 
    </>
  );
};

export default App;
