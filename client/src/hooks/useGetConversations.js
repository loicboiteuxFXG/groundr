import {useEffect, useState} from "react";
import axios from "axios";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

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
            console.log(response.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getConversations()
    }, []);

    return {loading, conversations, setConversations, getConversations}
}

export default useGetConversations