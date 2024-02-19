import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";

const Account = () => {
    return(
        <>
            <h1>Login</h1>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Account;