import React, {useState} from "react";
import axios from "axios";
import {User} from "../../class/User";
import {postCreateUser} from "../../utils/FetchUtils";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import profileEdit from "../ProfileEdit/ProfileEdit";


const SignupBox = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPwd] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("M");
    const [orientation, setOrientation] = useState("M");
    const [DoB, setDoB] = useState(Date());
    const [file, setFile] = useState()


    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        // axios.post('http://localhost:3001/user/create', formData)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        formData.append('file', file);
        axios.post('http://localhost:3001/file/upload', formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your first name:
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>Enter your first name:
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <label>Enter your email:
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>Enter your password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPwd(e.target.value)}
                />
            </label>
            <label>Date de naissance:
                <input type='date' onChange={e => setDoB(e.target.value)} value={DoB}/>
            </label>
            <label>Genre
                <select name="gender" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                    <option value="O">Autre</option>
                </select>
            </label>
            <label>Je recherche
                <select name="orientation" value={orientation} onChange={e => setOrientation(e.target.value)}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                    <option value="A">Tout</option>
                    <option value="O">Autre</option>
                </select>
            </label>
            <label>
                <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange}/>
            </label>
            <input type="submit"/>
        </form>
    );
}

export default SignupBox;