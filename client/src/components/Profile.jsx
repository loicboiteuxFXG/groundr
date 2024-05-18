import {Link, useNavigate} from "react-router-dom"
import '../styles.css'
import {useEffect, useState} from "react"
import axios from "axios"
import {useAuthContext} from "../context/AuthContext"

const Profile = () => {
    const {authUser, setAuthUser} = useAuthContext()
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Votre profil | GroundR"
    }, [])

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const data = new FormData()
        data.append('file', selectedFile)
        data.append('user', authUser)
        var filename = ""
        await axios.post('http://localhost:3001/file/upload-new', data)
            .then((response) => {
                filename = response.data.filename;
            })
            .catch(err => {
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
            })

        await axios.post('http://localhost:3001/user/update-pfp', {filename: filename}, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
            }
        })
            .then(response => {
                setAuthUser(response.data)
            })
            .catch(err => {
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
            })
    };

    const pfpURL = `http://localhost:3001/media/${authUser.pfpURL}`
    const fullname = authUser.firstName + " " + authUser.lastName

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
                <p>{authUser.bio}</p>
            </div>
            <div>
                <Link to="edit" className="btnGround buttons">Modifier le profil</Link>
                <Link to="password/edit" className="btnGround buttons">Modifier le mot de passe</Link>
                {authUser.isPremium ? <> </> : <Link to="subscribe" className="btnGround buttons">S'abonner à GroundR Max</Link>}
            </div>
        </div>
    )

}

export default Profile

