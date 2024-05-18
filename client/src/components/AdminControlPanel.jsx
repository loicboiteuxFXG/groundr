import React, {useEffect, useState} from "react"
import axios from "axios"
import {useAuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import {FaLock, FaUnlock} from "react-icons/fa";


const AdminControlPanel = () => {
    const [users, setUsers] = useState([])
    const {setAuthUser} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/user/users-admin", {
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
    const UserOneLine = ({user}) => {
        const pfpURL = `http://localhost:3001/media/${user.pfpURL}`

        const handleClick = async () => {
            try {
                await axios.post("http://localhost:3001/user/" + user._id, {}, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                    }
                })
                fetchUsers()
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

        return (
            <div className="useroneline">
                <div className="start-items">
                    <img src={pfpURL} alt="Photo de profil"/>
                    <h3>{user.firstName} {user.lastName}</h3>
                </div>
                <div>
                    <button className="buttons" onClick={handleClick}>
                        {user.isBlocked ?
                            <FaLock style={{color: "#e3a256", width: "100%", height: "100%"}}/>
                            :
                            <FaUnlock style={{color: "#e3a256", width: "100%", height: "100%"}}/>
                        }
                    </button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        setLoading(true)
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