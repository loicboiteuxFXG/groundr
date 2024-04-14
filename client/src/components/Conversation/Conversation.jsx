import useConversation from "../../zustand/useConversation";

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id
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
                <img src={require('../../images/online.png')} className="onlinestatus"/>
            </div>
        </>
    )
}

export default Conversation