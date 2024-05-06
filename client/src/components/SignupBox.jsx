import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import ShowcaseHeader from "./ShowcaseHeader";
import Footer from "./Footer";
import "../styles.css";
import LoadingIndicator from "./LoadingIndicator";
import useSignup from "../hooks/useSignup";

const SignupBox = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Créer un compte | GroundR";
    }, [navigate]);


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirm: '',
        gender: 'M',
        orientation: 'M',
        DoB: '',
        bio: ''
    });

    const {errors, loading, interestList, signup, fetchData} = useSignup()
    const [interests, setInterests] = useState([]);
    const [file, setFile] = useState();

    useEffect(() => {
        fetchData();
    }, []);


    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData, interests, file)
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
            <div className="container signup-layout">
                <h2 className="golden">Créer un compte</h2>
                <div className="signup-card">
                    <form onSubmit={handleSubmit} noValidate>
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            id="firstname"
                            className={errors.firstName ? "is-invalid form-control" : "form-control"}
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="invalid-feedback">{errors.firstName}</span>}
                        <label htmlFor="lastname">Nom</label>
                        <input
                            id="lastname"
                            className={errors.lastName ? "is-invalid form-control" : "form-control"}
                            type="text"
                            name="lastName"
                            onChange={handleChange} />
                        {errors.lastName && <span className="invalid-feedback">{errors.lastName}</span>}
                        <label htmlFor="email">Adresse courriel</label>
                        <input
                            id="email"
                            className={errors.email ? "is-invalid form-control" : "form-control"}
                            type="text"
                            name="email"
                            onChange={handleChange} />
                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                        <label htmlFor="password">Créez un mot de passe</label>
                        <input
                            id="password"
                            className={errors.password ? "is-invalid form-control" : "form-control"}
                            type="password"
                            name="password"
                            onChange={handleChange} />
                        {errors.password && <span className="invalid-feedback">{errors.password}</span>}
                        <label htmlFor="password_confirm">Confirmez votre mot de passe</label>
                        <input
                            id="password_confirm"
                            className={errors.password_confirm ? "is-invalid form-control" : "form-control"}
                            type="password"
                            name="password_confirm"
                            onChange={handleChange} />
                        {errors.password_confirm && <span className="invalid-feedback">{errors.password_confirm}</span>}
                        <label htmlFor="birthdate">Date de naissance</label>
                        <input id="birthdate" className={errors.DoB ? "is-invalid form-control" : "form-control"}
                            type='date' name="DoB"
                            onChange={handleChange} />
                        {errors.DoB && <span className="invalid-feedback">{errors.DoB}</span>}
                        <label htmlFor="gender">Identité de genre</label>
                        <select id="gender" className={errors.gender ? "is-invalid form-control" : "form-control"}
                            name="gender"
                            onChange={handleChange}>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="O">Autre</option>
                        </select>
                        {errors.gender && <span className="invalid-feedback">{errors.gender}</span>}
                        <label htmlFor="orientation">Je recherche</label>
                        <select id="orientation"
                            className={errors.orientation ? "is-invalid form-control" : "form-control"}
                            name="orientation"
                            onChange={handleChange}>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="B">Les deux</option>
                            <option value="A">Tout</option>
                        </select>
                        {errors.orientation && <span className="invalid-feedback">{errors.orientation}</span>}
                        <label htmlFor="interests">Mes intérêts</label>
                        <Select
                            id="interests"
                            isMulti
                            name="interests"
                            options={interestList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={interests}
                            onChange={setInterests}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'DarkGoldenRod',
                                    primary: 'DarkGoldenRod',
                                }
                            })}
                            styles={{
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "lightgrey"
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: "#232020",
                                    color: "white",
                                    borderColor: "#e3a256",
                                    borderRadius: "5px",
                                    marginBottom: "20px"
                                }),
                                menu: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: "#232020",
                                    borderRadius: "5px",
                                    color: "white"
                                }),
                                menuList: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: "5px",
                                    color: "white",
                                }),
                                multiValue: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: "5px",
                                    color: "white",
                                    backgroundColor: "DarkGoldenRod"
                                }),
                                multiValueLabel: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "white"
                                }),
                                multiValueRemove: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: "5px",
                                    color: "white",
                                    ":hover": {
                                        backgroundColor: "goldenrod"
                                    }
                                })
                            }}
                        />
                        {errors.interests && <span className="invalid-feedback">{errors.interests}</span>}
                        <label htmlFor="profilepicture">Ajoutez une photo de profil</label>
                        <input id="profilepicture" type="file" className="form-control"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleFileChange} />
                        <label htmlFor="bio">Ajoutez une bio pour votre profil</label>
                        <textarea
                            id="bio"
                            className={errors.bio ? "is-invalid form-control" : "form-control"}
                            name="bio"
                            onChange={handleChange}
                            value={formData.bio} />
                        {errors.bio && <span className="invalid-feedback">{errors.bio}</span>}
                        {loading ? <div className="centerHeart mt-5"><LoadingIndicator /></div> :
                            <input type="submit" className="custom-btn" value="Créer un compte" />}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignupBox;