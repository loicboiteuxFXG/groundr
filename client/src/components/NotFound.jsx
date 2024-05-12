import ShowcaseHeader from "./ShowcaseHeader"
import Footer from "./Footer"
import {Link, useNavigate} from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/home')
    }

    return (
        <div className="notfound">
            <ShowcaseHeader />
            <div className="notfoundcontainer">
                <div className="notfoundcard">
                    <h1>404</h1>
                    <h2>Erreur: Ressource non trouvée.</h2>
                    <Link to="/home" className="buttons">Accueil</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound