import {Link, Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import './HomeLayout.css'
const HomeLayout = () => {
    return (
        <>
            <div className="page-layout">
                <div className='sidebar'>
                    <div>
                        <h1>LOGO</h1>
                        <Link to="swipe" className="btnGround">Let's Ground!</Link>
                        <Link to="chat">Chat</Link>
                    </div>
                    <div>
                        <Link to="settings">Settings</Link>
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