import Message from "../Message";
import useGetMessages from "../../hooks/useGetMessages";
import LoadingIndicator from "../LoadingIndicator";
import {useEffect, useRef} from "react";
import useListenMessages from "../../hooks/useListenMessages";


const Messages = () => {
    const {loading, messages} = useGetMessages()
    useListenMessages()
    const lastMessageRef = useRef()
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
        }, 100)
    }, [messages]);
    return (
        <div className="messages" >
            {loading && <LoadingIndicator />}
            {messages && messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))
            ) : !loading ? (
                <div className="nochatselected">
                    <p>Envoyez un message pour commencer la conversation.</p>
                </div>
            ) : null}
        </div>
    )
}

export default Messages