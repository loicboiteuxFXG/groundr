import {useState} from "react";
import {useConversation} from "../context/ConversationContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

const useSendMessages = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()
    const navigate = useNavigate()
    const {setAuthUser} = useAuthContext()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:3001/message/send/${selectedConversation._id}`, {message: message}, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}` } })
            if(response.data.error) {
                throw new Error(response.data.error)
            }

            setMessages([...messages, response.data])
        } catch (err) {
            switch (err.response.status) {
                case 401:
                    localStorage.removeItem("auth-user")
                    setAuthUser(null)
                    break
                case 403:
                    navigate("/403")
                    break
                case 404:
                    navigate("/404")
                    break
                default:
                    navigate("/500")
            }
        } finally {
            setLoading(false)
        }
    }
    return {sendMessage, loading}
}

export default useSendMessages