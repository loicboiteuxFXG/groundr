import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import { useEffect } from "react";
const { checkIfValidToken } = require('../../utils/check-token')

const HomeLayout = () => {
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Accueil | GroundR";
    }, []);

    useEffect(() => { // fuck react
        async function check() {
            if (!(await checkIfValidToken())) {
                localStorage.removeItem('usertoken');
                navigate('/account');
            }
        }
        check()
    })


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
                        <LogoutButton />
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