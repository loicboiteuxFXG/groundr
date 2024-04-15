import useConversation from "../../zustand/useConversation";
import {useSocketContext} from "../../context/SocketContext";

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id
    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)

    const fullName = conversation.firstName + " " + conversation.lastName
    return (
        <>
            <div className={`conversation ${isSelected ? "selected" : ""}`} onClick={() => selectedConversation(conversation)}>
                <div className="photo">
                    <img src={conversation.pfpURL} alt="Photo de profil"/>
                </div>
                <div className="middlecontent">
                    <p className="receiver">{fullName}</p>
                    <p className="lastmessage">Dernier message</p>
                </div>
                {isOnline && <img src={require('../../images/online.png')} className="onlinestatus" alt="Online"/>}
            </div>
        </>
    )
}

export default Conversation