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
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.swipeStatus.value);

        axios.post('http://localhost:3001/swipe/ground', {
            swipedUser : matches[0], // TODO Faire le défilement des utilisateurs à swiper
            swipeStatus : e.target.swipeStatus.value,
        },{headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`}})
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    const SwiperButtons = () => {
        return (
            <div>
                <div>
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="swipeStatus" value="like"/>
                        <button type="submit">like</button>
                    </form>
                </div>
                <div>
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="swipeStatus" value="dislike"/>
                        <button type="submit">dislike</button>
                    </form>
                </div>
                <div>
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="swipeStatus" value="superlike"/>
                        <button type="submit">superlike</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            {loading ? <div className="centerHeart"><LoadingIndicator/></div> :
                <SwiperButtons/>}
        </>
    )
}

export default HomeSwiper;