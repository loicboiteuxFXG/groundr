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

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/get-user-token', {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`
                    }
                });
                setConnectedUser(response.data);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem("usertoken");
                    navigate('/');
                }
            }
        };

        fetchData();

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (!token) {
            navigate('/account/login');
        }
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