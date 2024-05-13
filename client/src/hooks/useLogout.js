import axios from "axios";
import {useState} from "react";
import {useAuthContext} from "../context/AuthContext";


const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const logout  = async () => {
        setLoading(true)
        localStorage.removeItem('auth-user')
        setAuthUser(null)
    }

    return {loading, logout}
}

export default useLogout