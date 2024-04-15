import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Modal from "../Modal";

const ProfilePassword = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Modifier le mot de passe | GroundR";
    }, [navigate]);

    const regExpPassword = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

    const [formData, setFormData] = useState({
        password: '',
        password_confirm: '',
        password_previous: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

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

        if (!formData.password_previous.trim()) {
            validationErrors.password_previous = 'Ce champ est requis.';
        } else if (formData.password === formData.password_previous) {
            validationErrors.password_previous = "Le nouveau mot de passe doit être différent de l'ancien mot de passe.";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            axios.post('http://localhost:3001/user/update-password', formData, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
                }
            })
                .then((response) => {
                    console.log(response);
                    setLoading(false);
                    setFormData({
                        password: '',
                        password_confirm: '',
                        password_previous: ''
                    });
                    openModal();
                })
                .catch((err) => {
                    setLoading(false);
                    const errors = err.response.data;
                    setErrors(errors);
                    if (err.response.status === 401) {
                        localStorage.removeItem("auth-user");
                        navigate('/');
                    }
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
            <div className="signup-layout">
                <h2 className="golden">Modifier le mot de passe</h2>
                <div className="signup-card">
                    <form onSubmit={handleSubmit} noValidate>
                        <label htmlFor="password_previous">Ancien mot de passe</label>
                        <input
                            id="password_previous"
                            className={errors.password_previous ? "is-invalid form-control" : "form-control"}
                            type="password"
                            name="password_previous"
                            onChange={handleChange}
                            value={formData.password_previous} />
                        {errors.password_previous && <span className="invalid-feedback">{errors.password_previous}</span>}
                        <label htmlFor="password">Nouveau un mot de passe</label>
                        <input
                            id="password"
                            className={errors.password ? "is-invalid form-control" : "form-control"}
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password} />
                        {errors.password && <span className="invalid-feedback">{errors.password}</span>}
                        <label htmlFor="password_confirm">Confirmez le nouveau mot de passe</label>
                        <input
                            id="password_confirm"
                            className={errors.password_confirm ? "is-invalid form-control" : "form-control"}
                            type="password"
                            name="password_confirm"
                            onChange={handleChange}
                            value={formData.password_confirm} />
                        {errors.password_confirm && <span className="invalid-feedback">{errors.password_confirm}</span>}

                        {loading ? <div className="centerHeart mt-5"><LoadingIndicator /></div> :
                            <input type="submit" className="custom-btn" value="Modifier" />}
                    </form>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="center-text">
                    <h2 className="custom-modal-text">Mot de passe mis à jour avec succès.</h2>
                </div>
            </Modal>
        </>
    );
};

export default ProfilePassword;