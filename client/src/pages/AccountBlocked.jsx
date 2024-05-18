import {Link, useNavigate} from "react-router-dom"
import Footer from "../components/Footer"
import {useAuthContext} from "../context/AuthContext"
import {useEffect} from "react"
import AdminHeader from "../components/AdminHeader"


const AccountBlocked = () => {
    const {authUser, setAuthUser} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if(!authUser.isBlocked) {
            navigate("/home")
        }
        localStorage.removeItem("auth-user")
        setAuthUser(null)
        console.log(authUser)
    }, []);

    return (
        <div className="notfound">
            <AdminHeader/>
            <div className="notfoundcontainer">
                <div className="notfoundcard">
                    <h2>Votre compte a été bloqué.</h2>
                    <p>Un administrateur a détecté des comportements ne respectant pas notre politique de conduite et a donc bloqué votre compte. Pour plus d'information, veuillez vous adresser au service à la clientèle en suivant le lien suivant:</p>
                    <a href="https://help.grindr.com/hc/en-us" target="_blank" className="buttons">Service à la clientèle</a>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AccountBlocked