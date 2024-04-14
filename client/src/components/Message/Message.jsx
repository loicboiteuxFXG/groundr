import {useAuthContext} from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import {extractTime} from "../../utils/extractTime";

const Message = ({message}) => {
    const {authUser} = useAuthContext()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    const formattedTime = extractTime(message.createdAt)
    const chatClassName = fromMe ? 'message-end' : 'message-start'
    const profilePic = fromMe ? authUser.pfpURL : selectedConversation?.pfpURL
    const pfpURL = `http://localhost:3001/media/${profilePic}`
    return (
        <div className={chatClassName}>
            <div className="pfp">
                <img src={pfpURL} alt="Photo de profil"/>
            </div>
            <div className="message">
                <div className="bubble">{message.message}</div>
                <div className="timestamp">{formattedTime}</div>
            </div>
        </div>
    )
}

export default Message