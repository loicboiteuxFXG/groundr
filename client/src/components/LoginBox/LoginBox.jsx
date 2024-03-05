import { useEffect, useState } from "react";
import axios from "axios";
import ShowcaseHeader from "../ShowcaseHeader";
import LoadingIndicator from "../LoadingIndicator"
import Footer from "../Footer";
import "../../styles.css"
import { useNavigate } from "react-router-dom";

const LoginBox = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = 'Connexion | GroundR';

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (token) {
            navigate('/home');
        }
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

        if (email === "" || password === "") {
            setLoading(false);
            return console.log("No :gigachad:");
        }

        axios.post('http://localhost:3001/auth/login', userData)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("usertoken", JSON.stringify(response.data.token));
                    navigate('/home');
                } else {
                    throw Error(":C")
                }
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
                            <label htmlFor="password">Mot de passe</label>
                            <input 
                            className="form-control" 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPwd(e.target.value)} 
                            />

                        </div>
                        {loading ? <LoadingIndicator /> : <input type="submit" className="custom-btn" value="Se connecter" />}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginBox;