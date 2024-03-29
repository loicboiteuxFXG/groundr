import {Link, useNavigate} from "react-router-dom";
import '../../styles.css'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ConnectedUserContext} from '../../pages/HomeLayout'

const Profile = () => {
    const navigate = useNavigate()

    let [connectedUser, setConnectedUser] = useContext(ConnectedUserContext)
    const [file, setFile] = useState(null)

    useEffect(() => {
        document.title = "Votre profil | GroundR"

        const token = JSON.parse(localStorage.getItem("usertoken"))
        if (!token) {
            navigate('/account/login')
        }

        console.log(connectedUser)
    }, [])




    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const data = new FormData()
        data.append('file', selectedFile)
        data.append('user', connectedUser)
        var filename = ""
        await axios.post('http://localhost:3001/file/upload-new', data, {

        })
            .then((response) => {
                filename = response.data.filename;
                console.log(filename)
            })
            .catch(err => console.error(err))

        console.log(filename)

        const data2 = new FormData()
        data2.append('filename', filename)
        await axios.post('http://localhost:3001/user/update-pfp', {filename: filename}, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`
            }
        })
            .then(response => {
                setConnectedUser(response.data)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem("usertoken");
                    navigate('/');
                }
            })
        console.log(connectedUser)
    };

    const pfpURL = `http://localhost:3001/media/${connectedUser.pfpURL}`
    const fullname = connectedUser.firstName + " " + connectedUser.lastName

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
                <p>{connectedUser.bio}</p>
            </div>
            <div>
                <Link to="edit" className="btnGround">Modifier le profil</Link>
                <Link to="password/edit" className="btnGround">Modifier le mot de passe</Link>
            </div>
        </div>
    )

}

export default Profile

