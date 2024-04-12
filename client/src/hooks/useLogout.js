import axios from "axios";
import {useState} from "react";
import {useAuthContext} from "../context/AuthContext";


const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const logout  = async () => {
        setLoading(true)
        try {
            const response  = await axios.post('http://localhost:3001/auth/logout')

            if(!response.error) {
                localStorage.removeItem('auth-user')
                setAuthUser(null)
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return {loading, logout}
}

export default useLogout