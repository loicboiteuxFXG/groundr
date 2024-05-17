import Messages from "./Messages"
import MessageInput from "./MessageInput"
import {useConversation} from "../context/ConversationContext"
import {useEffect} from "react";

const NoChatSelected = () => {
    return (
        <div className="nochatselected">
            <h2>Bienvenue dans la section Chat!</h2>
            <p>Cliquez sur une conversation pour commencer.</p>
        </div>
    )
}

const Chatbox = () => {
    const {selectedConversation} = useConversation()

    useEffect(() => {
        document.title = "Messagerie | GroundR"
    }, [])

    return (
        <>
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
                <div className="chatbox">
                    <h2 className="contact">{selectedConversation.firstName + " " + selectedConversation.lastName}</h2>
                    <Messages />
                    <MessageInput/>
                </div>
            )
            }
        </>
    )
}

export default Chatbox