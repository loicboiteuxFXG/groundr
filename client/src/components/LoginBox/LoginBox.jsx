import React, {useEffect, useState} from "react";
import axios from "axios";
import ShowcaseHeader from "../ShowcaseHeader";
import LoadingIndicator from "../LoadingIndicator"
import Footer from "../Footer";
import "../../styles.css"
import {useNavigate} from "react-router-dom";

const LoginBox = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Connexion | GroundR';

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (token) {
            navigate('/home');
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = {}

        if (formData.email === "") {
            validationErrors.email = 'Ce champ est requis.'
        }

        if (formData.password === "") {
            validationErrors.password = 'Ce champ est requis'
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            let userData = {
                "email": formData.email,
                "password": formData.password
            }

            axios.post('http://localhost:3001/auth/login', userData)
                .then((response) => {
                    if (response.data.token) {
                        localStorage.setItem("usertoken", JSON.stringify(response.data.token));
                        navigate('/home');
                    } else {
                        throw Error()
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    const errors = {
                        email: "L'adresse courriel ou le mot de passe est incorrect.",
                        password: "L'adresse courriel ou le mot de passe est incorrect."
                    }
                    setErrors(errors)
                })
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    return (
        <>
            <ShowcaseHeader/>
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
                        {loading ? <LoadingIndicator/> :
                            <input type="submit" className="custom-btn" value="Se connecter"/>}
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default LoginBox;