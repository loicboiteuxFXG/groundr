import React, {useEffect, useState} from "react"
import axios from "axios"
import {useAuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import Message from "./Message";

const UserOneLine = ({user}) => {

    return (
        <div className="useroneline">

        </div>
    )
}


const AdminControlPanel = () => {
    const [users, setUsers] = useState([])
    const {setAuthUser} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const response = await axios.get("http://localhost:3001/users", {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                    }
                })
                setUsers(response.data)
                setLoading(false)
            } catch (err) {
                switch (err.response.status){
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
            }
        }

        fetchUsers()
    }, []);

    return(
        <div className="controlpanel">
            {loading && <div className="centerHeart"><LoadingIndicator/></div>}
            {users && users.length > 0 ? (
                users.map((user) => (
                    <div key={user._id}>
                        <UserOneLine user={user}/>
                    </div>
                ))
            ) : !loading ? (
                <div className="nochatselected">
                    <p>Envoyez un message pour commencer la conversation.</p>
                </div>
            ) : null}
        </div>
    )
}

export default AdminControlPanel