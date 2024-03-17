import {Link, useNavigate} from "react-router-dom";
import '../../styles.css'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ConnectedUserContext} from '../../pages/HomeLayout'

const Profile = () => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Votre profil | GroundR"

        const token = JSON.parse(localStorage.getItem("usertoken"))
        if (!token) {
            navigate('/account/login')
        }
    }, [navigate])

    let [user, setUser] = useState(useContext(ConnectedUserContext))
    const [file, setFile] = useState(null)

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const data = new FormData()
        data.append('file', selectedFile)
        data.append('user', user)
        let filename
        axios.post('http://localhost:3001/file/upload-new', data)
            .then((response) => {
                filename = response.data.filename;
            })
            .catch(err => console.error(err))


        const data2 = new FormData()
        data2.append('filename', filename)
        data2.append('userId', user._id)
        axios.post('http://localhost:3001/user/update-pfp', data2)
            .then(response => {
                console.log(response)
            })
            .catch(err => console.error(err))
        console.log(user)
    };

    const pfpURL = `http://localhost:3001/media/${user.pfpURL}`
    const fullname = user.firstName + " " + user.lastName

    return (
        <div className="profileLayout">
            <div>
                <div>
                    <div id="imageContainer" style={{position: 'relative', display: 'inline-block'}}>
                        <img src={pfpURL} alt="Photo de profil" onClick={handleImageClick}
                             style={{cursor: 'pointer'}}/>
                        <input type="file" id="fileInput" onChange={handleFileChange} style={{display: 'none'}}/>
                    </div>
                </div>
                <h2>{fullname}</h2>
                <p>BIO</p>
            </div>
            <div>
                <Link to="edit" className="btnGround">Modifier le profil</Link>
                <Link to="password/edit" className="btnGround">Modifier le mot de passe</Link>
            </div>
        </div>
    )

}

export default Profile

