import { useEffect, useState } from "react";
import axios from "axios";

const HomeSwiper = () => {

    const [matches, setMatches] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/swipe/get-matches', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`
            }
        })
            .then((response) => {
                console.log(response);
                setMatches(response.data.matches);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);
    


    return (
        <div>
            <p>{JSON.stringify(matches)}</p>         
        </div>
    )
}

export default HomeSwiper;