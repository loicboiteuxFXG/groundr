import {IoSend} from "react-icons/io5";
import {useState} from "react";
import useSendMessages from "../hooks/useSendMessages";
import LoadingIndicator from "./LoadingIndicator";

const MessageInput = () => {
    const [message, setMessage] = useState("")
    const {loading, sendMessage} = useSendMessages()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return

        await sendMessage(message)
        setMessage("")
        document.getElementById("messageField").value = ""
    }

    return (
        <form className="messagebar" onSubmit={handleSubmit}>
            <input type="text" id="messageField" className="form-control" placeholder="Aa" onChange={(e) => setMessage(e.target.value)}/>
            {loading ? <LoadingIndicator /> : (
                <button type="submit" className="btnSend">
                    <IoSend style={{width: "100%", height: "100%"}}/>
                </button>
            )}
        </form>
    )
}

export default MessageInput