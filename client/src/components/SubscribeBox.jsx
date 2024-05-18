import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../styles.css";
import LoadingIndicator from "./LoadingIndicator";
import Modal from "./Modal";
import {useAuthContext} from "../context/AuthContext";


const SubscribeBox = () => {
    const navigate = useNavigate();
    const {authUser, setAuthUser} = useAuthContext()

    useEffect(() => {
        document.title = "S'abonner | GroundR";
    }, []);

    const regExpString = '^[\'\"\-\$A-Za-zÀ-ÿ\ ]+$';
    const regExpNumber = '^[0-9]+$';

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        card: "",
        cvv: "",
        name: "",
        month: "",
        year: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/home/profile")
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let today = new Date()

        const validationErrors = {};

        if (!formData.name.trim()) {
            validationErrors.name = 'Ce champ est requis.';
        } else if (!formData.name.trim().match(regExpString)) {
            validationErrors.name = 'Le nom entré est invalide.';
        }

        if (!formData.card.trim()) {
            validationErrors.card = 'Ce champ est requis.';
        } else if (!formData.card.replaceAll(" ", "").match(regExpNumber) || formData.card.replaceAll(" ", "").length !== 16) {
            validationErrors.card = 'Le numéro de carte est invalide.';
        }

        if (!formData.cvv.trim()) {
            validationErrors.cvv = 'Ce champ est requis.';
        } else if (!formData.cvv.trim().match(regExpNumber) || formData.cvv.trim().length !== 3) {
            validationErrors.cvv = 'Le CVV est invalide.';
        }

        if (!formData.month.trim()) {
            validationErrors.month = 'Ce champ est requis.';
        } else if (!formData.month.trim().match(regExpNumber) || formData.month.trim().length !== 2 || formData.month.trim() < 1 || formData.month.trim() > 12) {
            validationErrors.month = 'Le mois est invalide.';
        }

        if (!formData.year.trim()) {
            validationErrors.year = 'Ce champ est requis.';
        } else if (!formData.year.trim().match(regExpNumber) || formData.year.trim().length !== 2) {
            validationErrors.year = "L'année est invalide.";
        }

        let expirationDate = new Date((Number(formData.year) + 2000), Number(formData.month) - 1, 1)
        if ((expirationDate - today) < 0 && (typeof validationErrors.card === "undefined")) {
            validationErrors.card = "La carte entrée est expirée"
        }

        setErrors(validationErrors);
        setLoading(false);

        if (Object.keys(validationErrors).length === 0) {

            try {
                const response = await axios.post('http://localhost:3001/user/subscribe', {}, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                    }
                })
                setAuthUser(response.data)
                openModal()
            } catch (err) {
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
                    default:
                        navigate("/500")
                }
            }
        }
    }


    return (
        <div className="subscribe">
            <div className="subscribecard">
                <h2>S'abonner à GroundR Max</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="name">Nom du titulaire</label>
                    <input
                        id="name"
                        name="name"
                        className={errors.name ? "is-invalid form-control" : "form-control"}
                        onChange={handleChange}
                        value={formData.name}
                    />
                    {errors.name && <span className="invalid-feedback">{errors.name}</span>}

                    <label htmlFor="card">Numéro de carte</label>
                    <input
                        id="card"
                        name="card"
                        className={errors.card ? "is-invalid form-control" : "form-control"}
                        maxLength="19"
                        placeholder="xxxx xxxx xxxx xxxx"
                        onChange={handleChange}
                        value={formData.card}
                    />
                    {errors.card && <span className="invalid-feedback">{errors.card}</span>}

                    <label htmlFor="cvv">CVV</label>
                    <input
                        id="cvv"
                        name="cvv"
                        maxLength="3"
                        className={errors.cvv ? "is-invalid form-control" : "form-control"}
                        onChange={handleChange}
                        value={formData.cvv}
                    />
                    {errors.cvv && <span className="invalid-feedback">{errors.cvv}</span>}

                    <div className="year">
                        <div>
                            <label htmlFor="month">MM</label>
                            <input
                                id="month"
                                name="month"
                                maxLength="2"
                                className={errors.month ? "is-invalid form-control" : "form-control"}
                                onChange={handleChange}
                                value={formData.month}
                            />
                            {errors.month && <span className="invalid-feedback">{errors.month}</span>}
                        </div>
                        <div>
                            <label htmlFor="year">AA</label>
                            <input
                                id="year"
                                name="year"
                                maxLength="2"
                                className={errors.year ? "is-invalid form-control" : "form-control"}
                                onChange={handleChange}
                                value={formData.year}
                            />
                            {errors.year && <span className="invalid-feedback">{errors.year}</span>}
                        </div>
                    </div>

                    {loading ? <div className="centerHeart mt-5"><LoadingIndicator/></div> :
                        <input type="submit" className="custom-btn" value="S'abonner"/>}
                </form>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>
                <div className="center-text">
                    <h2 className="custom-modal-text">Vous êtes maintenant abonné(e) à Groundr Max</h2>
                    <p className="custom-modal-text-p">Merci de votre soutien!</p>
                </div>
            </Modal>
        </div>
    );
};

export default SubscribeBox