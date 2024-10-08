"use client"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io,Socket } from "socket.io-client"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
   messages: { message: string }[]; 
}


const SocketContext = React.createContext<ISocketContext | null>(null)
export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);
    return state;
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<{ message: string }[]>([])
    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("send message", msg);
        if (socket) {
            socket.emit("event:message", { message: msg })
        }

    }, [socket]);

    const onMessageRec  = useCallback((msg : string)=>{
        console.log("From Server Msg Rec",msg);
        const message = JSON.parse(msg)
        setMessages(prev =>[...prev, message]);
    },[])


    useEffect(() => {
        const _socket = io('http://localhost:8000')
        _socket.on('message',onMessageRec)
        setSocket(_socket)
       
        return () => {
            _socket.off('message',onMessageRec)
            _socket.disconnect()
            setSocket(undefined)
        }
    }, [])



    return (
        <SocketContext.Provider  value={{ sendMessage, messages }}>
            {children}
        </SocketContext.Provider>

    )
}