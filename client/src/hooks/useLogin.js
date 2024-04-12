import {useState} from "react";
import axios from "axios";
import {useAuthContext} from "../context/AuthContext";


const useLogin = () => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const login = async (formData) => {
        const validationErrors = handleInputErrors(formData)

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            let userData = {
                email: formData.email,
                password: formData.password
            };

            try {
                const response = await axios.post('http://localhost:3001/auth/login', userData);
                if (!response.data.error) {
                    localStorage.setItem('auth-user', JSON.stringify(response.data));
                    setAuthUser(response.data);
                }
            } catch (error) {
                setLoading(false);
                const errors = {
                    email: "L'adresse courriel ou le mot de passe est incorrect.",
                    password: "L'adresse courriel ou le mot de passe est incorrect."
                };
                setErrors(errors);
            } finally {
                setLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setLoading(false)
            return
        }
    }

    return {errors, loading, login}

}

export default useLogin

function handleInputErrors(formData) {
    const validationErrors = {};

    if (formData.email === "") {
        validationErrors.email = 'Ce champ est requis.';
    }

    if (formData.password === "") {
        validationErrors.password = 'Ce champ est requis';
    }

    return validationErrors
}