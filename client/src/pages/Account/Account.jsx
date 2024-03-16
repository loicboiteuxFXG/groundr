import {Link, Outlet, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer";
import ShowcaseHeader from "../../components/ShowcaseHeader";
import {useEffect} from "react";

const Account = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "GroundR Web | GroundR";
        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (token) {
            navigate('/home');
        }
    }, []);

    return(
        <>
            <ShowcaseHeader/>
            <div className="container">
                <h2 className="text-center"><img className="limit-center" src={require('../../images/logo_web.png')} alt="GroundR Web"/></h2>

                <h3 className="golden">Bienvenue sur GroundR Web</h3>
                <div className="limit-center">
                    <Link to="login" className="btnGround">Se connecter</Link>
                    <Link to="signup" className="btnGround">Créer un compte</Link>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default Account;