import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const navigate = useNavigate()
    const {setAuthUser} = useAuthContext()

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

    useEffect(() => {
        getConversations()
    }, []);

    return {loading, conversations, setConversations, getConversations}
}

export default useGetConversations