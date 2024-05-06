import {useState} from "react";
import {useAuthContext} from "../context/AuthContext";
import axios from "axios";


const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [interestList, setInterestList] = useState([]);
    const {setAuthUser} = useAuthContext()

    const signup = async (formData, interests, file) => {
        const validationErrors = handleInputErrors(formData, interests)

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            const data = new FormData();
            data.append('file', file);

            let interestsToSend = interests.map(i => i._id);

            var filename = "";

            try {
                const response = await axios.post('http://localhost:3001/file/upload', data);
                filename = response.data.filename;
            } catch (error) {
                console.error(error);
            }

            let userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirm: formData.password_confirm,
                gender: formData.gender,
                orientation: formData.orientation,
                DoB: formData.DoB,
                bio: formData.bio,
                interests: interestsToSend,
                pfpURL: filename
            };

            try {
                const registerResponse = await axios.post('http://localhost:3001/auth/register', userData);
                if (!registerResponse.data.error) {
                    localStorage.setItem('auth-user', JSON.stringify(registerResponse.data))
                    setAuthUser(registerResponse.data)
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.data) {
                    const errors = error.response.data;
                    setErrors(errors);
                }
            } finally {
                setLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setLoading(false)
            return
        }
    }

    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/user/get-interests');
            setInterestList(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return {errors, loading, interestList, signup, fetchData}
}
export default useSignup

const handleInputErrors = (formData, interests) => {
    const regExpString = '^[\'\"\-\$A-Za-zÀ-ÿ\ ]+$'
    const regExpEmail = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
    const regExpPassword = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'

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

    return validationErrors
}
