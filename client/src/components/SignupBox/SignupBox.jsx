import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

import ShowcaseHeader from "../ShowcaseHeader";
import Footer from "../Footer";
import "../../styles.css"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const InterestsOptions = require('../../data/Interests.json'); // A CHANGER


const SignupBox = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Créer un compte | GroundR";

        const token = JSON.parse(localStorage.getItem("usertoken"));
        if (token) {
            navigate('/home');
        }
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPwd] = useState("");
    const [password_confirm, setPwdConf] = useState("")
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("M");
    const [orientation, setOrientation] = useState("M");
    const [DoB, setDoB] = useState(Date());
    const [interests, setInterests] = useState([]);
    const [file, setFile] = useState();



    const [loading, setLoading] = useState(false);

    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        let interestsToSend = interests.map(i => i.value);

        let filename = ""
        axios.post('http://localhost:3001/file/upload', formData)
            .then((response) => {
                filename = response.data.filename;
                let userData = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                    "password_confirm": password_confirm,
                    "gender": gender,
                    "orientation": orientation,
                    "DoB": DoB,
                    "interests": interestsToSend,
                    "pfpURL": filename
                }

                axios.post('http://localhost:3001/auth/register', userData)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.status !== "error") {
                            navigate('/home');
                        } else {
                            setLoading(false);
                        }

                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    })
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    };


    return (
        <>
            <ShowcaseHeader />
            <div className="container signup-layout">
                <h2 className="golden">Créer un compte</h2>
                <div className="signup-card">
                    <form onSubmit={handleSubmit}>
                        <label for="firstname">Prénom</label>
                        <input
                            id="firstname"
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label for="lastname">Nom</label>
                        <input
                            id="lastname"
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <label for="email">Adresse courriel</label>
                        <input
                            id="email"
                            className="form-control"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label for="password">Créez un mot de passe</label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPwd(e.target.value)}
                        />

                        <label for="password_confirm">Confirmez votre mot de passe</label>
                        <input
                            id="password_confirm"
                            className="form-control"
                            type="password"
                            name="password_confirm"
                            value={password_confirm}
                            onChange={(e) => setPwdConf(e.target.value)}
                        />

                        <label for="birthdate">Date de naissance</label>
                        <input id="birthdate" className="form-control" type='date' onChange={e => setDoB(e.target.value)} value={DoB} />

                        <label for="gender">Identité de genre</label>
                        <select id="gender" className="form-select" name="gender" value={gender}
                            onChange={e => setGender(e.target.value)}>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="O">Autre</option>
                        </select>

                        <label for="orientation">Je recherche</label>
                        <select id="orientation" className="form-select" name="orientation" value={orientation}
                            onChange={e => setOrientation(e.target.value)}>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="B">Les deux</option>
                            <option value="A">Tout</option>
                        </select>

                        <label for="interests">Mes intérêts</label>
                        <Select
                            id="interests"
                            defaultValue={interests}
                            isMulti
                            name="interests"
                            options={InterestsOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
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

                        <label for="profilepicture">Ajoutez une photo de profil</label>
                        <input id="profilepicture" type="file" className="form-control" accept="image/png, image/jpg, image/jpeg"
                            onChange={handleFileChange} />
                        {loading ? <LoadingIndicator /> : <input type="submit" className="custom-btn" value="Créer un compte" />}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignupBox;