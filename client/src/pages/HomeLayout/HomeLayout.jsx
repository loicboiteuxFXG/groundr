import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import '../../styles.css'
import {useEffect} from "react";
import ProfileButton from "../../components/ProfileButton";
import LoadingIndicator from "../../components/LoadingIndicator";
import useLogout from "../../hooks/useLogout";
import Sidebar from "../../components/Sidebar";
import {BiLogOut} from "react-icons/bi";
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