import {IoSearch} from "react-icons/io5";
import {useState} from "react";
import useSearchUser from "../hooks/useSearchUser"
import LoadingIndicator from "./LoadingIndicator";

const SearchResult = ({user}) => {
    const url = `http://localhost:3001/media/${user.pfpURL}`
    const fullName = user.firstName + " " + user.lastName
    let today = new Date();
    let birthDate = new Date(user.DoB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    let gender
    switch (user.gender) {
        case "M":
            gender = "Homme"
            break
        case "F":
            gender = "Femme"
            break
        case "O":
            gender = "Autre"
            break
        default :
            gender = "Autre"
            break
    }

    let orientation
    switch (user.orientation) {
        case "M":
            orientation = "Recherche un homme"
            break
        case "F":
            orientation = "Recherche une femme"
            break
        case "B":
            orientation = "Recherche un homme ou une femme"
            break
        case "A":
            orientation = "Recherche une personne sans regard au genre"
            break
        default :
            orientation = "Recherche une personne sans regard au genre"
            break
    }

    const display = `${fullName}, ${age} ans\n${gender}\n${orientation}`

    const handleClick = () => {

    }

    return (
        <div className="searchresult" onClick={handleClick}>
            <div className="photo">
                <img src={url} alt="Photo de profil"/>
            </div>
            <div className="text">
                <p className="foundUser">{display}</p>
            </div>
        </div>
    )
}

const UserSearch = () => {
    const {loading, users, searchUser} = useSearchUser()

    const [name, setName] = useState("")
    const [genders, setGenders] = useState(['M', 'F', 'O'])
    const [orientations, setOrientations] = useState(['M', 'F', 'B', 'A'])
    const [sort, setSort] = useState("alphabetical")
    const [searchDone, setSearchDone] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSearchDone(true)
        await searchUser(name, genders, orientations, sort)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleGenderChange = (e) => {
        const selectedGender = e.target.value
        const isChecked = e.target.checked

        let updatedGenders
        if (isChecked) {
            updatedGenders = [...genders, selectedGender]
        } else {
            updatedGenders = genders.filter(gender => gender !== selectedGender)
        }
        setGenders(updatedGenders)
    }

    const handleOrientationChange = (e) => {
        const selectedOrientation = e.target.value
        const isChecked = e.target.checked

        let updatedOrientations;
        if (isChecked) {
            updatedOrientations = [...orientations, selectedOrientation]
        } else {
            updatedOrientations = orientations.filter(orientation => orientation !== selectedOrientation)
        }
        setOrientations(updatedOrientations)
    }

    const handleSortChange = (e) => {
        setSort(e.target.value)
    }

    return (
        <div className="usersearchbox d-flex flex-column">
            <h2>Recherche d'utilisateurs</h2>
            <div className="headerbox">
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <input type="text" id="search" name="search" placeholder="Aa" className="searchfield" onChange={handleNameChange}/>
                        <button type="submit" className="btnSend">
                            <IoSearch style={{width: "100%", height: "100%"}}/>
                        </button>
                    </div>
                    <div className="d-flex justify-content-between">
                        <fieldset>
                            <legend>Genre</legend>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="M" id="gmen" onChange={handleGenderChange} checked/>
                                <label className="form-check-label" htmlFor="gmen">
                                    Hommes
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="checkbox" value="F" id="gwomen" onChange={handleGenderChange} checked/>
                                <label className="form-check-label" htmlFor="gwomen">
                                    Femmes
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="checkbox" value="O" id="others" onChange={handleGenderChange} checked/>
                                <label className="form-check-label" htmlFor="others">
                                    Autres
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Orientation sexuelle</legend>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="checkbox" value="M" id="omen" onChange={handleOrientationChange} checked/>
                                <label className="form-check-label" htmlFor="omen">
                                    Hommes
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="checkbox" value="F" id="owomen" onChange={handleOrientationChange} checked/>
                                <label className="form-check-label" htmlFor="owomen">
                                    Femmes
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="checkbox" value="B" id="both" onChange={handleOrientationChange} checked/>
                                <label className="form-check-label" htmlFor="both">
                                    Les deux
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="checkbox" value="A" id="tout" onChange={handleOrientationChange} checked/>
                                <label className="form-check-label" htmlFor="tout">
                                    Tout
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Tri</legend>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="radio" value="alphabetical" name="sort" id="alphabetical" onChange={handleSortChange} checked/>
                                <label className="form-check-label" htmlFor="alphabetical">
                                    A-Z
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="radio" value="gender" name="sort" id="gender" onChange={handleSortChange}/>
                                <label className="form-check-label" htmlFor="gender">
                                    Genre
                                </label>
                            </div>
                            <div className="form-check checkgroup">
                                <input className="form-check-input" type="radio" value="orientation" name="sort" id="orientation" onChange={handleSortChange}/>
                                <label className="form-check-label" htmlFor="orientation">
                                    Orientation
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </form>
            </div>
            <div className="results">
                {loading && <div className="centerHeart"><LoadingIndicator /></div>}
                {users.length === 0 && searchDone ? (
                    <p>Aucun résultat pour la recherche effectuée.</p>
                ) : (
                    <>
                        {users.map((user) => {
                            return <SearchResult key={user._id} user={user}/>
                        })}
                    </>
                )
                }
                {!searchDone && <p>Faites une recherche pour voir les résultats!</p>}
            </div>
        </div>
    )
}

export default UserSearch