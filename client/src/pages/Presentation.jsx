import ShowcaseHeader from "../components/ShowcaseHeader";
import Footer from "../components/Footer";
import '../styles.css'
import React, {useEffect} from "react";


const Presentation = () => {
    useEffect(() => {
        document.title = "GroundR | Site de rencontre"
    }, []);

    return(
        <div className="presentation">
            <ShowcaseHeader/>
            <div className="presentationcontainer">
                <div className="container">

                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Presentation;