import {useConversation} from "../../context/ConversationContext";
import {useSocketContext} from "../../context/SocketContext";

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id
    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
    const url = `http://localhost:3001/media/${conversation.pfpURL}`

    const fullName = conversation.firstName + " " + conversation.lastName
    return (
        <>
            <div className={`conversation ${isSelected ? "selected" : ""}`}
                 onClick={() => setSelectedConversation(conversation)}>
                <div className="photo">
                    <img src={url} alt="Photo de profil"/>
                </div>
                <div className="middlecontent">
                    <p className="receiver">{fullName}</p>
                </div>
                {isOnline && <img src={require('../../images/online.png')} className="onlinestatus" alt="Online"/>}
            </div>
        </>
    )
}

export default Conversation