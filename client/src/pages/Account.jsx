import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import ShowcaseHeader from "../components/ShowcaseHeader";
import {useEffect} from "react";

const Account = () => {

    useEffect(() => {
        document.title = "GroundR Web | GroundR";
    }, []);

    return(
        <>
            <ShowcaseHeader/>
            <div className="container">
                <div className="min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="w-100">
                        <h2 className="text-center"><img className="limit-center"
                                                         src={require('../images/logo_web.png')}
                                                         alt="GroundR Web"/></h2>

                        <h3 className="golden mb-4">Bienvenue sur GroundR Web</h3>
                        <div className="limit-center">
                            <Link to="login" className="btnGround">Se connecter</Link>
                            <Link to="signup" className="btnGround">Créer un compte</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Account;