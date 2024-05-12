import '../styles.css'
import { FaInstagram } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <p>Copyright © 2024 - Tous droits réservés par Adam Demers et Loïc Boiteux</p>
                    <div>
                        <a href="https://www.instagram.com/grindr/" target="_blank" rel="noreferrer"><FaInstagram
                            style={{color: "#e3a256", width: "100%", height: "100%"}}/></a>
                        <a href="https://www.facebook.com/Grindr/" target="_blank" rel="noreferrer"><FaFacebook
                            style={{color: "#e3a256", width: "100%", height: "100%"}}/></a>
                        <a href="https://twitter.com/grindr" target="_blank" rel="noreferrer"><FaXTwitter
                            style={{color: "#e3a256", width: "100%", height: "100%"}}/></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer