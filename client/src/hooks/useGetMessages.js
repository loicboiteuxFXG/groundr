import {useEffect, useState} from "react";
import {useConversation} from "../context/ConversationContext";
import axios from "axios";


const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://localhost:3001/message/${selectedConversation._id}`, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}` } })
                if(response.data.error) {
                    throw new Error(response.data.error)
                }
                setMessages(response.data)
            } catch (err) {
                console.error(err)
            }finally {
                setLoading(false)
            }
        }

        if(selectedConversation?._id) {
            getMessages()
        }

    }, [selectedConversation._id, setMessages])

    return {messages, loading}
}

export default useGetMessages