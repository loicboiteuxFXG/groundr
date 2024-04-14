import Conversation from "../Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import LoadingIndicator from "../LoadingIndicator";

const Conversations = () => {
    const {loading, conversations} = useGetConversations()
    return (
        <div className="conversations">
            {conversations.map((conversation, idx) => {
                <Conversation key={conversation._id} conversation={conversation}/>
            })}
            {loading ? <LoadingIndicator /> : null}
        </div>
    )
}

export default Conversations