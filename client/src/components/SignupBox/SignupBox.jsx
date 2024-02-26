import React, {useState} from "react";
import axios from "axios";
import {User} from "../../class/User";
import Select from 'react-select';

const InterestsOptions = require('../../data/Interests.json');


const SignupBox = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPwd] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("M");
    const [orientation, setOrientation] = useState("M");
    const [DoB, setDoB] = useState(Date());
    const [interests, setInterests] = useState([]);
    const [file, setFile] = useState()


    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        let interestsToSend = interests.map(i => i.value);

        let filename = ""
        axios.post('http://localhost:3001/file/upload', formData)
            .then((response) => {
                filename = response.data.filename;
                let user = new User(firstName, lastName, password, email, DoB, gender, orientation, interestsToSend, filename);
                console.dir(user);

                axios.post('http://localhost:3001/user/create', user)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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
            <label>Mes intérêts
                <Select
                    defaultValue={interests}
                    isMulti
                    name="colors"
                    options={InterestsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={setInterests}
                />
            </label>
            <label>
                <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange}/>
            </label>
            <input type="submit"/>
        </form>
    );
}

export default SignupBox;