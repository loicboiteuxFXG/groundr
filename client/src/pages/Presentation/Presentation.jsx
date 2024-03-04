import ShowcaseHeader from "../../components/ShowcaseHeader";
import Footer from "../../components/Footer";
import '../../styles.css'
import React, {useEffect} from "react";


const Presentation = () => {
    useEffect(() => {
        document.title = "GroundR | Site de rencontre"
    }, []);

    console.log(JSON.parse(localStorage.getItem('usertoken')))

    return(

        <>
            <ShowcaseHeader/>
            <div className="container">
                <h1 className="golden">Page vitrine</h1>
            </div>
            <Footer/>
        </>

    );
}

export default Presentation;