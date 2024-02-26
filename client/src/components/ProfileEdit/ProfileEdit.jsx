import React, {useState} from 'react'

const ProfileEdit = () => {
    const [gender, setGender] = useState("M");
    const [orientation, setOrientation] = useState("M");
    const [DoB, setDoB] = useState(Date());
    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }


    return (
        <>
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
                <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleChange}/>
            </label>
        </>
    );
}

export default ProfileEdit;