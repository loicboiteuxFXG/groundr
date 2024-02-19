import {Link, Outlet} from "react-router-dom";
import Footer from "../../components/Footer";

const Account = () => {
    return(
        <>
            <h1>Login</h1>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Account;