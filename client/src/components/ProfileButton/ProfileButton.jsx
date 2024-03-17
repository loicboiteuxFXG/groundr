import {useNavigate} from 'react-router-dom'

const ProfileButton = (props) => {

    const navigate = useNavigate()

    let fullName = props.name
    let pfp = `http://localhost:3001/media/${props.pfp}`

    const handleCLick = () => {
        navigate('/home/swipe')
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