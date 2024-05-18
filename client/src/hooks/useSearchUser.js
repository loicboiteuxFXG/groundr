import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";


const useSearchUser = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const {setAuthUser} = useAuthContext()

    const searchUser = async (name, genders, orientations, sort) => {
        setLoading(true)

        const searchData = {
            name: name,
            genders: genders,
            orientations: orientations,
            sort: sort
        }

        try {
            const response = await axios.post("http://localhost:3001/user/users-search", searchData, {
                headers: {
                    "Authorization" :`Bearer ${JSON.parse(localStorage.getItem('auth-user'))}`
                }
            })
            setUsers(response.data)
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

    return {searchUser, loading, users}
}

export default useSearchUser