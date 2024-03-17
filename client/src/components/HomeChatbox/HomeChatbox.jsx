import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HomeChatbox = () => {
    const [fact, setFact] = useState("");

    const navigate = useNavigate();

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
            console.error(err.response)
            if (err.response.status === 401) {
                localStorage.removeItem("usertoken");
                navigate('/');
            }
        })
    }, []);


    return(
        <p>{fact}</p>
    )
}

export default HomeChatbox;