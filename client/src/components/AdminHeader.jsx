import {Link, useNavigate} from "react-router-dom"
import {BiLogOut} from "react-icons/bi"
import useLogout from "../hooks/useLogout";

const AdminHeader = () => {
    const navigate = useNavigate()
    const {logout} = useLogout()
    const handleClick = async () => {
        await logout()
        navigate("/account")
    }

    return (
        <>
            <header>
                <div className="container">
                    <div className="admin-header-layout">
                        <h1 className="presTitle"><Link to={'/'}><img
                            src={require('../images/logo_nobackground.png')} alt='GroundR'/></Link>
                        </h1>
                        <div className="btnAdminLogout">
                            <button onClick={handleClick}>
                                <BiLogOut
                                    style={{color: "#e3a256", width: "100%", height: "100%"}}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default AdminHeader