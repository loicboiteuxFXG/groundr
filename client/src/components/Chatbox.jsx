import Messages from "./Messages"
import MessageInput from "./MessageInput"
import {useConversation} from "../context/ConversationContext"

const NoChatSelected = () => {
    return (
        <div className="nochatselected">
            <h2>Bienvenue dans la section Chat!</h2>
            <p>Cliquez sur une conversation pour commencer.</p>
        </div>
    )
}

const Chatbox = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()


    return (
        <>
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
                <>
                    <h2 className="contact">{selectedConversation.firstName + " " + selectedConversation.lastName}</h2>
                    <Messages />
                    <MessageInput/>
                </>
            )
            }
        </>
    )
}

export default Chatbox