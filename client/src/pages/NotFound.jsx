import ShowcaseHeader from "../components/ShowcaseHeader"
import Footer from "../components/Footer"
import {Link} from "react-router-dom"
import {useEffect} from "react";

const NotFound = () => {
    useEffect(() => {
        document.title = "Erreur 404 | GroundR"
    }, [])

    return (
        <div className="notfound">
            <ShowcaseHeader />
            <div className="notfoundcontainer">
                <div className="notfoundcard">
                    <h1>404</h1>
                    <h2>Erreur: Ressource non trouvée.</h2>
                    <Link to="/" className="buttons">Accueil</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound