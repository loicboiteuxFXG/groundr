import { useEffect, useState } from "react";
import axios from "axios";

const HomeChatbox = () => {
    const [fact, setFact] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/get', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`
            }
        })
        .then((response) => {
            console.log(response);
            setFact(response.data.fact);
        })
        .catch((err) => {
            console.error(err);
        })
    }, []);


    return(
        <p>{fact}</p>
    )
}

export default HomeChatbox;