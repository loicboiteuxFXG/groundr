import {Link, Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import ShowcaseHeader from "../../components/ShowcaseHeader";
import {useEffect} from "react";

const Account = () => {
    useEffect(() => {
        document.title = "GroundR Web | GroundR"
    }, []);

    return(
        <>
            <ShowcaseHeader/>
            <div className="container">
                <h2 className="text-center"><img src={require('../../images/logo_web.png')}/></h2>

                <h3 className="golden">Bienvenue sur GroundR Web</h3>
                <div>
                    <Link to="login" className="btnGround">Se connecter</Link>
                    <Link to="signup" className="btnGround">Créer un compte</Link>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default Account;