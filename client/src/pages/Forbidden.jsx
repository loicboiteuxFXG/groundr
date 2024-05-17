import {useEffect} from "react";
import ShowcaseHeader from "../components/ShowcaseHeader";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";


const Forbidden = () => {
    useEffect(() => {
        document.title = "Erreur 403 | GroundR"
    }, [])

    return (
        <div className="notfound">
            <ShowcaseHeader/>
            <div className="notfoundcontainer">
                <div className="notfoundcard">
                    <h1>403</h1>
                    <h2>Erreur: vous n'avez pas les permissions pour effectuer cette action.</h2>
                    <Link to="/home" className="buttons">Accueil</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Forbidden