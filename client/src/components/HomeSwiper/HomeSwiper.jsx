import { useEffect, useState } from "react";
import axios from "axios";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"

const HomeSwiper = () => {
    const [matches, setMatches] = useState(null);
    const [currentMatch, setCurrentMatch] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        setLoading(true)
        axios.get('http://localhost:3001/swipe/get-matches', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`
            }
        })
            .then((response) => {
                setMatches(response.data.recommendations);
                setLoading(false)
            })
            .catch((err) => {
                console.error(err);
                setLoading(false)
            })
    }

    return (
        <div>
            {loading ? <LoadingIndicator /> :
                JSON.stringify(matches)}
        </div>
    )
}

export default HomeSwiper;