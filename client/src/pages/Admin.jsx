import {useEffect} from "react"
import {useAuthContext} from "../context/AuthContext"
import {useNavigate} from "react-router-dom"
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import AdminControlPanel from "../components/AdminControlPanel";


const Admin = () => {
    const navigate = useNavigate()

    const {authUser} = useAuthContext()

    useEffect(() => {
        document.title = "Administrateur | GroundR"

        if(authUser.isAdmin === "undefined") {
            navigate("/403")
        }
    }, [])

    return (
        <div className="admin">
            <AdminHeader />
            <div className="adminlayout">
                <div className="admincard">
                    <h2>Panneau de contrôle administrateur</h2>
                    <AdminControlPanel />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Admin