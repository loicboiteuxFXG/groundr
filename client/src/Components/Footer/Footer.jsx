import {Outlet} from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <a>Lien 1</a>
                    <a>Lien 2</a>
                    <a>Lien 3</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;