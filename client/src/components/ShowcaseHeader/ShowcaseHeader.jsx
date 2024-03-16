import {Link, Outlet} from "react-router-dom";
import '../../styles.css';
import {useNavigate} from "react-router-dom"


const ShowcaseHeader = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/account")
    }
    const Button = ({text, onClick}) => {

        return (
            <button type="button" className="custom-btn" onClick={onClick}>
                {text}
            </button>
        )
    }
    return (
        <>
            <header>
                <div className="container">
                    <div className="header-layout">
                        <h1 className="presTitle"><Link to={'/'}><img
                            src={require('../../images/logo_nobackground.png')} alt='GroundR'/></Link>
                        </h1>
                        <Button text={"GroundR Web"} onClick={handleClick}/>
                    </div>
                </div>
            </header>
        </>
    );
}

export default ShowcaseHeader;