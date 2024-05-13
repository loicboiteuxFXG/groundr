import {useConversation} from "../context/ConversationContext";
import {useSocketContext} from "../context/SocketContext";
import {useNavigate} from "react-router-dom";

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id
    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
    const url = `https://localhost:3001/media/${conversation.pfpURL}`
    const navigate = useNavigate()

    const fullName = conversation.firstName + " " + conversation.lastName

    const handleClick = () => {
        setSelectedConversation(conversation)
        navigate('chat')
    }

    return (
        <>
            <div className={`conversation ${isSelected ? "selected" : ""}`}
                 onClick={handleClick}>
                <div className="photo">
                    <img src={url} alt="Photo de profil"/>
                </div>
                <div className="middlecontent">
                    <p className="receiver">{fullName}</p>
                </div>
                {isOnline && <img src={require('../images/online.png')} className="onlinestatus" alt="Online"/>}
            </div>
        </>
    )
}

export default Conversation