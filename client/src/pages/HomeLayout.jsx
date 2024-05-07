import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import '../styles.css'
import {useEffect, useState} from "react";
import ProfileButton from "../components/ProfileButton";
import LoadingIndicator from "../components/LoadingIndicator";
import useLogout from "../hooks/useLogout";
import Sidebar from "../components/Sidebar";
import {BiLogOut} from "react-icons/bi";
import {IoSearch} from "react-icons/io5";
import {useAuthContext} from "../context/AuthContext";
import axios from "axios";
import {useConversation} from "../context/ConversationContext"

const HomeLayout = () => {
    const location = useLocation()
    const {setSelectedConversation} = useConversation()

    useEffect(() => {
        if (location.pathname !== "/home/chat") {
            setSelectedConversation(null)
        }
    }, [location])

    const sendLocation = (locationData) => {
        console.dir(locationData.coords)
        const data = {latitude: locationData.coords.latitude, longitude: locationData.coords.longitude}
        axios.post('http://localhost:3001/user/set-location', data, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
            }
        })
            .then(response => {
                console.info("OK");
            })
            .catch((err) => {
                console.log("Not OK")
            })
    }

    const {setAuthUser} = useAuthContext()
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(sendLocation)
        document.title = "Accueil | GroundR";
        setAuthUser({
            firstName: "Chargement",
            lastName: "",
            pfpURL: "default-user.png"
        })
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:3001/user/get-user-token", {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                    }
                })
                const user = response.data
                console.dir(user)
                setAuthUser(user)
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem("auth-user")
                }
            }
        }
        fetchUser()
    }, []);

    const LogoutButton = () => {
        const {loading, logout} = useLogout()
        const navigate = useNavigate()
        const handleSubmit = async (event) => {
            event.preventDefault();
            await logout()
        }

        const handleClick = () => {
            navigate('search')
        }

        return (
            <div className="d-flex justify-content-between align-items-center">
                <form onSubmit={handleSubmit} method="post">
                    {!loading ? (
                        <button type="submit" className="btnLogout">
                            <BiLogOut
                                style={{color: "#e3a256", width: "100%", height: "100%"}}
                            />
                        </button>
                    ) : (
                        <div className=""><LoadingIndicator/></div>
                    )}
                </form>
                <button className="btnLogout" onClick={handleClick}>
                    <IoSearch
                        style={{color: "#e3a256", width: "100%", height: "100%"}}
                    />
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="page-layout">
                <div className='sidebar'>
                    <div>
                        <h1 className="homeTitle"><img src={require('../images/logo_nobackground.png')} alt="GroundR"/>
                        </h1>
                        <ProfileButton/>
                        <Link to="swipe" className="btnGround">Let's Ground!</Link>
                        <Sidebar/>
                    </div>
                    <div>
                        <LogoutButton/>
                    </div>
                </div>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default HomeLayout;