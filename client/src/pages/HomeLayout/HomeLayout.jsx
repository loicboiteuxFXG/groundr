import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import {createContext, useContext, useEffect, useState} from "react";
import ProfileButton from "../../components/ProfileButton";
import axios from "axios";
import Modal from "../../components/Modal";

export const ConnectedUserContext = createContext({
    firstName: 'Chargement',
    lastName: '',
    bio: '',
    pfpURL: 'default-user.png'
});
const HomeLayout = () => {
    const navigate = useNavigate();

    const [connectedUser, setConnectedUser] = useState({
        firstName: 'Chargement',
        lastName: '',
        bio: '',
        pfpURL: 'default-user.png'
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
    }, [navigate]);

    const LogoutButton = () => {

        const handleSubmit = (event) => {
            event.preventDefault();
            localStorage.removeItem("usertoken");
            setConnectedUser({})
            navigate('/');
        }

        return (
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Logout" />
            </form>
        )
    }

    return (
        <ConnectedUserContext.Provider value={[connectedUser, setConnectedUser]}>
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Match</h2>
                <p>You can put any content here.</p>
            </Modal>
            <Footer />
        </ConnectedUserContext.Provider>
    );
}
export default HomeLayout;