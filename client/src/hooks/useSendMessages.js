import {useState} from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessages = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:3001/message/send/${selectedConversation._id}`, JSON.stringify(message))
            if(response.data.error) {
                throw new Error(response.data.error)
            }

            setMessages([...messages, response.data])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    return {sendMessage, loading}
}

export default useSendMessages