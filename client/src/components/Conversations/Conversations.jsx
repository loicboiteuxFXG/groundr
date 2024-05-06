import Conversation from "../Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import LoadingIndicator from "../LoadingIndicator";
import React from "react";

const Conversations = () => {
    const {loading, conversations} = useGetConversations()
    return (
        <div className="conversations">
            {conversations.map((conversation) => {
                return <Conversation key={conversation._id} conversation={conversation}/>
            })}
            {loading ? <div className="centerHeart"><LoadingIndicator/></div> : null}
        </div>
    )
}

export default Conversations