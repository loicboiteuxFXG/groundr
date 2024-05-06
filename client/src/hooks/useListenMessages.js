import {useSocketContext} from "../context/SocketContext";
import {useConversation} from "../context/ConversationContext";
import {useEffect} from "react";
import notificationSound from '../assets/sounds/message.wav'

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {setMessages} = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.anim = true
            const sound = new Audio(notificationSound)
            sound.play()
            setMessages((prevMessages) => [...prevMessages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMessages]);
}

export default useListenMessages