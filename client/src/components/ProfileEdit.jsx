import Select from "react-select";
import LoadingIndicator from "./LoadingIndicator";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";
import {useAuthContext} from "../context/AuthContext";

const ProfileEdit = () => {
    const navigate = useNavigate();

    const {authUser, setAuthUser} = useAuthContext()

    useEffect(() => {
        document.title = "Modifier votre profil | GroundR"
    }, []);


    const regExpString = '^[\'\"\-\$A-Za-zÀ-ÿ\ ]+$';
    const regExpEmail = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';

    const [formData, setFormData] = useState({

        email: "",
        gender: "M",
        orientation: "M",
        range: 0,
        bio: ""

    });
    const [interests, setInterests] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [interestList, setInterestList] = useState([]);


    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3001/user/get-interests')
                console.log(response.data)
                setInterestList(response.data);
                console.log(interestList)
                let temp = [];
                response.data.forEach(i => {
                    if (authUser.interests.includes(i.value)) {
                        temp.push(i);
                    }
                });
                setInterests(temp);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        setInterests(authUser.interests);
        setFormData({
            bio: authUser.bio,
            email: authUser.email,
            gender: authUser.gender,
            orientation: authUser.orientation,
            range: authUser.range
        });

    }, [authUser, interestList]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Ce champ est requis.';
        } else if (!formData.email.trim().match(regExpEmail)) {
            validationErrors.email = 'L\'adresse courriel est invalide.';
        }

        if (!formData.bio.trim()) {
            validationErrors.bio = 'Ce champ est requis'
        }
        else if (!formData.bio.match(regExpString)) {
            validationErrors.bio = 'La bio est invalide.';
        }

        if (!interests || interests.length < 3) {
            validationErrors.interests = 'Vous devez sélectionner au moins 3 intérêts.';
        }

        if (formData.range < 1) formData.range = 1

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            let interestsToSend = interests.map(i => i.value);

            let userData = {
                "bio": formData.bio,
                "email": formData.email,
                "gender": formData.gender,
                "orientation": formData.orientation,
                "interests": interestsToSend,
                "range": formData.range
            };

            axios.post('http://localhost:3001/user/update', userData, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                }
            })
                .then((response) => {
                    setAuthUser(response.data);
                    setLoading(false);
                    setIsChanged(false);
                    openModal();
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false);
                    const errors = err.response.data;
                    setErrors(errors);
                });
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData, [name]: value
        });
        setIsChanged(true);
    };

    const handleInterestChange = (e) => {
        setInterests(e);
        setIsChanged(true);
    };

    return (
        <>
            <div className="container signup-layout">
                <h2 className="golden">Modifier le profil</h2>
                <div className="signup-card">
                    <form onSubmit={handleSubmit} noValidate>

                        <label htmlFor="email">Adresse courriel</label>
                        <input
                            id="email"
                            className={errors.email ? "is-invalid form-control" : "form-control"}
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            className={errors.bio ? "is-invalid form-control" : "form-control"}
                            name="bio"
                            onChange={handleChange}
                            value={formData.bio}
                        />
                        {errors.bio && <span className="invalid-feedback">{errors.bio}</span>}
                        <label htmlFor="gender">Identité de genre</label>
                        <select id="gender" className={errors.gender ? "is-invalid form-control" : "form-control"}
                                name="gender"
                                onChange={handleChange}
                                value={formData.gender}>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="O">Autre</option>
                        </select>
                        {errors.gender && <span className="invalid-feedback">{errors.gender}</span>}
                        <label htmlFor="orientation">Je recherche</label>
                        <select id="orientation"
                                className={errors.orientation ? "is-invalid form-control" : "form-control"}
                                name="orientation"
                                onChange={handleChange}
                                value={formData.orientation}>
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
                            onChange={handleInterestChange}
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
                        <label htmlFor="range">Distance maximale (KM)</label>
                        <input
                            type="number"
                            name="range"
                            className="form-control"
                            min="0"
                            onChange={handleChange}
                            value={formData.range}
                        />
                        {errors.interests && <span className="invalid-feedback">{errors.interests}</span>}
                        {
                            isChanged ? <> {loading ? <div className="centerHeart mt-5"><LoadingIndicator/></div> :
                                    <input type="submit" className="custom-btn" value="Mettre à jour"/>}</>
                                : <></>

                        }
                    </form>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="center-text">
                    <h2 className="custom-modal-text">Paramètres mis à jour avec succès.</h2>
                </div>
            </Modal>
        </>
    );
};

export default ProfileEdit;