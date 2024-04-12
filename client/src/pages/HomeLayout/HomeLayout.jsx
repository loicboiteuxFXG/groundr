import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import {useEffect, useState} from "react";
import ProfileButton from "../../components/ProfileButton";
import LoadingIndicator from "../../components/LoadingIndicator";
import useLogout from "../../hooks/useLogout";
const HomeLayout = () => {

    useEffect(() => {
        document.title = "Accueil | GroundR";
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
                    <input type="submit" value="Logout" />
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
                        <Link to="chat">Chat</Link>
                    </div>
                    <div>
                        <Link to="settings">Settings</Link>
                        <LogoutButton/>
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