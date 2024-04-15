import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import {useEffect} from "react";
import ProfileButton from "../../components/ProfileButton";
import LoadingIndicator from "../../components/LoadingIndicator";
import useLogout from "../../hooks/useLogout";
import Sidebar from "../../components/Sidebar";
import {BiLogOut} from "react-icons/bi";
import {useAuthContext} from "../../context/AuthContext";
import axios from "axios";
const HomeLayout = () => {
    const {setAuthUser} = useAuthContext()
    useEffect(() => {
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
                console.error(err)
            }
        }
        fetchUser()
    }, []);

    const LogoutButton = () => {
        const {loading, logout} = useLogout()
        const handleSubmit = async (event) => {
            event.preventDefault();
            await logout()
        }

        return (
            <form onSubmit={handleSubmit} method="post">
                {!loading ? (
                    <button type="submit" className="btnLogout">
                        <BiLogOut
                            style={{color: "#e3a256", width: "100%", height: "100%"}}
                        />
                    </button>
                ) : (
                    <LoadingIndicator />
                )}
            </form>
        )
    }

    return (
        <>
            <div className="page-layout">
                <div className='sidebar'>
                    <div>
                        <h1 className="homeTitle"><img src={require('../../images/logo_nobackground.png')} alt="GroundR" /></h1>
                        <ProfileButton/>
                        <Link to="swipe" className="btnGround">Let's Ground!</Link>
                        <Sidebar />
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default HomeLayout;