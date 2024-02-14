import {Outlet} from "react-router-dom";
import Footer from "../../Components/Footer";
import './HomeLayout.css'
const HomeLayout = () => {
    return (
        <>
            <h1>Page principale</h1>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default HomeLayout;