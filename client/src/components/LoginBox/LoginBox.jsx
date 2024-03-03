import { useEffect, useState } from "react";
import axios from "axios";
import ShowcaseHeader from "../ShowcaseHeader";
import Footer from "../Footer";
import "../../styles.css"

const LoginBox = () => {
    useEffect(() => {
        document.title = 'Connexion | GroundR';
    }, []);


    const [password, setPwd] = useState("")
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        let userData = {
            "email": email,
            "password": password
        }


        axios.post('http://localhost:3001/auth/login', userData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    };




    return (
        <>
            <ShowcaseHeader />
            <div className="container login-layout">
                <h2 className="golden">Connexion</h2>
                <div className="login-card">
                    <form onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email">Adresse Courriel</label>
                            <input 
                            className="form-control" 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div>
                            <label for="password">Mot de passe</label>
                            <input 
                            className="form-control" 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPwd(e.target.value)} 

                            />
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