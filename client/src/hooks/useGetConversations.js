import {useEffect, useState} from "react";
import axios from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:3001/user/users', {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                    }
                })
                if(response.data.error) {
                    throw new Error(response.data.error)
                }
                setConversations(response.data)
                console.log(conversations)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, []);

    return {loading, conversations}
}

export default useGetConversations