import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import ShowcaseHeader from "../ShowcaseHeader";
import Footer from "../Footer";
import "../../styles.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const sha256 = require('js-sha256');

const SignupBox = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Créer un compte | GroundR";

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const regExpString = '^[\'\"\-\$A-Za-zÀ-ÿ\ ]+$';
    const regExpEmail = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
    const regExpPassword = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

    const [file, setFile] = useState();
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
    const [interests, setInterests] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [interestList, setInterestList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            axios.get('http://localhost:3001/user/get-interests')
                .then((response) => {
                    setInterestList(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
        fetchData();
    }, []);


    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};


        let today = new Date();
        let birthDate = new Date(formData.DoB);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            validationErrors.DoB = "Vous devez avoir au moins 18 ans pour utiliser GroundR.";
        }


        if (!formData.firstName.trim()) {
            validationErrors.firstName = 'Ce champ est requis.';
        } else if (!formData.firstName.trim().match(regExpString)) {
            validationErrors.firstName = 'Le champ contient des caractères invalides.';
        }

        if (!formData.lastName.trim()) {
            validationErrors.lastName = 'Ce champ est requis.';
        } else if (!formData.lastName.trim().match(regExpString)) {
            validationErrors.lastName = 'Le champ contient des caractères invalides.';
        }

        if (!formData.email.trim()) {
            validationErrors.email = 'Ce champ est requis.';
        } else if (!formData.email.trim().match(regExpEmail)) {
            validationErrors.email = 'L\'adresse courriel est invalide.';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Ce champ est requis.';
        } else if (!formData.password.trim().match(regExpPassword)) {
            validationErrors.password = 'Le mot de passe est invalide. Il doit contenir au moins 8' +
                ' caractères dont au moins une lettre minuscule, une lettre majuscule et un chiffre.';
        }

        if (!formData.password_confirm.trim()) {
            validationErrors.password_confirm = 'Ce champ est requis.';
        } else if (!(formData.password_confirm.trim() === formData.password.trim())) {
            validationErrors.password_confirm = 'Les mots de passe ne correspondent pas.';
        }

        if (!formData.DoB) {
            validationErrors.DoB = 'Ce champ est requis.';
        }

        if (!interests || interests.length < 3) {
            validationErrors.interests = 'Vous devez sélectionner au moins 3 intérêts.';
        }

        if (!formData.bio.trim()) {
            validationErrors.bio = 'Ce champ est requis.';
        } else if (!formData.bio.match(regExpString)) {
            validationErrors.bio = 'La bio contient des données invalides';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            const data = new FormData();
            data.append('file', file);

            let interestsToSend = interests.map(i => i.value);

            var filename = "";

            await axios.post('http://localhost:3001/file/upload', data)
                .then((response) => {
                    filename = response.data.filename;
                })
                .catch((error) => {
                    console.error(error);
                });

            let hashedPassword = sha256.sha256(formData.password);
            let hashedPassword2 = sha256.sha256(formData.password_confirm);

            let userData = {
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "email": formData.email,
                "password": hashedPassword,
                "password_confirm": hashedPassword2,
                "gender": formData.gender,
                "orientation": formData.orientation,
                "DoB": formData.DoB,
                "bio": formData.bio,
                "interests": interestsToSend,
                "pfpURL": filename
            };

            axios.post('http://localhost:3001/auth/register', userData)
                .then((response) => {
                    if (response.data.status !== "error") {
                        axios.post('http://localhost:3001/auth/login', { email: formData.email, password: formData.password })
                            .then((response) => {
                                if (response.data.token) {
                                    localStorage.setItem("usertoken", JSON.stringify(response.data.token));
                                    navigate('/home');
                                } else {
                                    throw Error();
                                }
                            })
                            .catch((error) => {
                                navigate('/account');
                            });
                    } else {
                        setLoading(false);
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    const errors = error.response.data;
                    setErrors(errors);
                });
        }
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