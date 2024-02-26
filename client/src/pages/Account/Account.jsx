import {Link, Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import ShowcaseHeader from "../../components/ShowcaseHeader";

const Account = () => {
    return(
        <>
            <ShowcaseHeader/>
            <div className="container">
                <h2 className="text-center"><img src={require('../../images/logo_web.png')}/></h2>
                <Link to="login" className="btnGround">Login</Link>
                <Link to="signup" className="btnGround">Signup</Link>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default Account;