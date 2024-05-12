import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import ShowcaseHeader from "../components/ShowcaseHeader";
import {useEffect} from "react";

const Account = () => {

    useEffect(() => {
        document.title = "GroundR Web | GroundR";
    }, []);

    return (
        <div className="accountspage">
            <ShowcaseHeader/>
            <div className="accountscontainer">
                <div className="accountscard">
                    <h2><img
                        src={require('../images/logo_web.png')}
                        alt="GroundR Web"/></h2>
                    <h3>Bienvenue sur GroundR Web!</h3>
                    <p>
                        Utilisez les services de Groundr dès maintenant directement depuis votre navigateur!
                    </p>
                    <Link to="login" className="buttons">Se connecter</Link>
                    <Link to="signup" className="buttons">Créer un compte</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Account;