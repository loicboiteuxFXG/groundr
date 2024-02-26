import {Link, Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import './HomeLayout.css'
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
const HomeLayout = () => {
    return (
        <>
            <h1>Page principale</h1>
            <Link to="swipe">Swipe</Link>
            <Link to="settings">Settings</Link>
            <Link to="chat">Chat</Link>
            <ProfileEdit/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default HomeLayout;