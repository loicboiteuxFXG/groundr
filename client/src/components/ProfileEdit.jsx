import Select from "react-select"
import LoadingIndicator from "./LoadingIndicator"
import React, {useEffect, useState} from "react"
import axios from "axios"
import Modal from "./Modal"
import {useAuthContext} from "../context/AuthContext"
import {useNavigate} from "react-router-dom";

const ProfileEdit = () => {

    const {authUser, setAuthUser} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Modifier votre profil | GroundR"
    }, [])

    const [formData, setFormData] = useState({

        email: "",
        gender: "M",
        orientation: "M",
        range: 0,
        bio: ""

    })
    const [interests, setInterests] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [interestList, setInterestList] = useState([])


    const [isModalOpen, setIsModalOpen] = useState(false) // State for modal

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:3001/user/get-interests')
                console.log(response.data)
                setInterestList(response.data)
                console.log(interestList)
                let temp = []
                response.data.forEach(i => {
                    if (authUser.interests.includes(i.value)) {
                        temp.push(i);
                    }
                })
                setInterests(temp)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setInterests(authUser.interests);
        setFormData({
            bio: authUser.bio,
            email: authUser.email,
            gender: authUser.gender,
            orientation: authUser.orientation,
            range: authUser.range
        });

    }, [authUser, interestList])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = {}

        if (!formData.bio.trim()) {
            validationErrors.bio = 'Ce champ est requis'
        }

        if (!interests || interests.length < 3) {
            validationErrors.interests = 'Vous devez sélectionner au moins 3 intérêts.'
        }

        if (formData.range < 1) formData.range = 1

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            let interestsToSend = interests.map(i => i.value)

            let userData = {
                "bio": formData.bio,
                "gender": formData.gender,
                "orientation": formData.orientation,
                "interests": interestsToSend,
                "range": formData.range
            }

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
                    setLoading(false)
                    switch (err.response.status) {
                        case 401:
                            localStorage.removeItem("auth-user")
                            setAuthUser(null)
                            break
                        case 403:
                            navigate("/403")
                            break
                        case 404:
                            navigate("/404")
                            break
                        case 400:
                            const errors = err.response.data
                            setErrors(errors)
                            break
                        default:
                            navigate("/500")
                    }
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
        <div className="profileedit">
            <div className="profileeditcard">
                <h2>Modifier le profil</h2>
                <form onSubmit={handleSubmit} noValidate>
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
                                borderRadius: "40px",
                                marginBottom: "0px"
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
                                borderRadius: "40px",
                                color: "white",
                                backgroundColor: "DarkGoldenRod"
                            }),
                            multiValueLabel: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "white"
                            }),
                            multiValueRemove: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: "40px",
                                color: "white",
                                ":hover": {
                                    backgroundColor: "goldenrod"
                                }
                            })
                        }}
                    />
                    <label htmlFor="range">Distance de recherche maximale (Km)</label>
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="center-text">
                    <h2 className="custom-modal-text">Paramètres mis à jour avec succès.</h2>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileEdit;