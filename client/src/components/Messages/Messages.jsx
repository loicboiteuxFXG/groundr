import Message from "../Message";
import useGetMessages from "../../hooks/useGetMessages";
import LoadingIndicator from "../LoadingIndicator";
import {useEffect, useRef} from "react";


const Messages = () => {
    const {loading, messages} = useGetMessages()
    const lastMessageRef = useRef()
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
        }, 100)
    }, [messages]);
    return (
        <div className="messages" >
            {loading && <LoadingIndicator />}
            {!loading && messages.length > 0 && (
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                )))}
            {!loading && messages.length === 0 && (
                <div className="nochatselected"><p>Envoyez un message pour commencer la conversation.</p></div>)}
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default Messages