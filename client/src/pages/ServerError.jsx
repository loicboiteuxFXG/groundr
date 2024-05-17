import ShowcaseHeader from "../components/ShowcaseHeader"
import {Link} from "react-router-dom"
import Footer from "../components/Footer"
import {useEffect} from "react"


const ServerError = () => {

    useEffect(() => {
        document.title = "Erreur 500 | GroundR"
    }, [])

    return (
        <div className="notfound">
            <ShowcaseHeader/>
            <div className="notfoundcontainer">
                <div className="notfoundcard">
                    <h1>505</h1>
                    <h2>Erreur du côté serveur.</h2>
                    <Link to="/" className="buttons">Accueil</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ServerError