import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";


const SubscribeBox = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "S'abonner | GroundR";
    }, []);

    const regExpString = '^[\'\"\-\$A-Za-zÀ-ÿ\ ]+$';
    const regExpNumber = '0-9/-';

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        card:"",
        cvv:"",
        date:"",
        name:""
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const validationErrors = {};
        //
        // if (!formData.name.trim()) {
        //     validationErrors.name = 'Ce champ est requis.';
        // } else if (!formData.name.trim().match(regExpString)) {
        //     validationErrors.name = 'Le nom entré est invalide.';
        // }
        //
        // if (!formData.card.trim()) {
        //     validationErrors.card = 'Ce champ est requis.';
        // } else if (!formData.card.trim().match(regExpNumber)) {
        //     validationErrors.card = 'Le numéro de carte est invalide.';
        // }
        //
        // if (!formData.cvv.trim()) {
        //     validationErrors.cvv = 'Ce champ est requis.';
        // } else if (!formData.cvv.trim().match(regExpNumber)) {
        //     validationErrors.cvv = 'Le CVV est invalide.';
        // }
        //
        // if (!formData.date.trim()) {
        //     validationErrors.date = 'Ce champ est requis.';
        // } else if (!formData.date.trim().match(regExpNumber)) {
        //     validationErrors.date = 'La date est est invalide.';
        // }

        setErrors(validationErrors);
        setLoading(false);
        if (Object.keys(validationErrors).length === 0) {

            axios.post('http://localhost:3001/user/subscribe', {}, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                }
            })
                .then((response) => {
                    navigate('/home');
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }


    return (
        <>
            <div className="container signup-layout">
                <h2 className="golden">Modifier le compte</h2>
                <div className="signup-card">
                    <form onSubmit={handleSubmit} noValidate>
                        <label htmlFor="name">Nom du titulaire</label>
                        <input
                            id="name"
                            name="name"
                            className={errors.name ? "is-invalid form-control" : "form-control"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <label htmlFor="card">Numéro de carte</label>
                        <input
                            id="card"
                            name="card"
                            className={errors.card ? "is-invalid form-control" : "form-control"}
                            type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}"
                            maxLength="16"
                            placeholder="xxxx xxxx xxxx xxxx"
                            onChange={handleChange}
                            value={formData.card}
                        />

                        <label htmlFor="cvv">CVV</label>
                        <input
                            id="cvv"
                            name="cvv"
                            maxLength="3"
                            className={errors.cvv ? "is-invalid form-control" : "form-control"}
                            onChange={handleChange}
                            value={formData.cvv}
                        />

                        <label htmlFor="date">Date d'expiration</label>
                        <input
                            id="date"
                            name="date"
                            type="text"
                            maxLength="5"
                            className={errors.date ? "is-invalid form-control" : "form-control"}
                            onChange={handleChange}
                            value={formData.date}
                        />


                        {errors.interests && <span className="invalid-feedback">{errors.interests}</span>}
                        {loading ? <div className="centerHeart mt-5"><LoadingIndicator/></div> :
                            <input type="submit" className="custom-btn" value="Mettre à jour"/>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubscribeBox