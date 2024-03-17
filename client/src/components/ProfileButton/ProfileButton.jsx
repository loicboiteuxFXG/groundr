import {useNavigate} from 'react-router-dom'
import {ConnectedUserContext} from "../../pages/HomeLayout";
import {useContext} from "react";

const ProfileButton = () => {
    const user = useContext(ConnectedUserContext)

    const navigate = useNavigate()

    const fullName = user.firstName + " " + user.lastName
    const pfp = `http://localhost:3001/media/${user.pfpURL}`

    const handleCLick = () => {
        navigate('profile')
    }

    return (
        <div className="profileButton" onClick={handleCLick}>
            <div className="profileIcon">
                <img src={pfp} alt="Photo de profil"/>
            </div>
            <div className="profileButtonContent">
                <h4>{fullName}</h4>
                <p>Accéder au profil</p>
            </div>
        </div>
    )
}

export default ProfileButton