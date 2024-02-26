import { useEffect } from "react";
import ShowcaseHeader from "../ShowcaseHeader";
import Footer from "../Footer";
import "../../styles.css"

const LoginBox = () => {
    useEffect(() => {
        document.title = 'Connexion | GroundR';
    }, []);

    return (
        <>
            <ShowcaseHeader />
            <div className="container login-layout">
                <h2 className="golden">Connexion</h2>
                <div className="login-card">
                    <form>
                        <div>
                            <label for="password">Adresse Courriel</label>
                            <input className="form-control" type="email" name="email" id="email" value="" />
                        </div>

                        <div>
                            <label for="password">Mot de passe</label>
                            <input className="form-control" type="password" name="password" id="password" value="" />
                        </div>
                        <input value="Connexion" type="submit" className="custom-btn"/>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginBox;