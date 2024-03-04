import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import { useEffect } from "react";

const HomeLayout = () => {
    useEffect(() => {
        document.title = "Accueil | GroundR"

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (!token) {
            navigate('/account/login');
        }
    }, []);


    const navigate = useNavigate();


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