import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowcaseHeader from "../ShowcaseHeader";
import LoadingIndicator from "../LoadingIndicator";
import Footer from "../Footer";
import "../../styles.css";
import useLogin from "../../hooks/useLogin";

const LoginBox = () => {

    useEffect(() => {
        document.title = 'Connexion | GroundR';
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {errors, loading, login} = useLogin()


    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(formData)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    return (
        <>
            <ShowcaseHeader />
            <div className="container login-layout">
                <h2 className="golden">Connexion</h2>
                <div className="login-card">

                    <form onSubmit={handleSubmit} method="POST" noValidate>
                        <label htmlFor="email">Adresse Courriel</label>
                        <input
                            className={errors.email ? "is-invalid form-control" : "form-control"}
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            className={errors.password ? "is-invalid form-control" : "form-control"}
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="invalid-feedback">{errors.password}</span>}

                        {loading ? <div className="centerHeart mt-5"><LoadingIndicator /></div> :
                            <input type="submit" className="custom-btn" value="Se connecter" />}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginBox;