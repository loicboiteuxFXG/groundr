import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import {useEffect, useState} from "react";
import ProfileButton from "../../components/ProfileButton";
import axios from "axios";

const HomeLayout = () => {
    const navigate = useNavigate();

    const [connectedUser, setConnectedUser] = useState({
        firstName: 'Chargement',
        lastName: '',
        pfpURL: 'default-user.png'
    })

    let fullname
    let pfp

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
                console.error(err);
            }
        };

        fetchData();

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (!token) {
            navigate('/account/login');
        }
    }, []);

    fullname = connectedUser.firstName + " " + connectedUser.lastName
    pfp = connectedUser.pfpURL

    const LogoutButton = () => {

        const handleSubmit = (event) => {
            event.preventDefault();
            localStorage.removeItem("usertoken");
            navigate('/');
        }

        return (
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Logout" />
            </form>
        )
    }

    return (
        <>
            <div className="page-layout">
                <div className='sidebar'>
                    <div>
                        <h1 className="homeTitle"><img src={require('../../images/logo_nobackground.png')} alt="GroundR" /></h1>
                        <ProfileButton name={fullname} pfp={pfp}/>
                        <Link to="swipe" className="btnGround">Let's Ground!</Link>
                        <Link to="chat">Chat</Link>
                    </div>
                    <div>
                        <Link to="settings">Settings</Link>
                        <LogoutButton/>
                    </div>
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomeLayout;