import { useEffect, useState } from "react";
import axios from "axios";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useNavigate } from "react-router-dom";

const HomeSwiper = () => {
    const [matches, setMatches] = useState(null);
    const [currentMatch, setCurrentMatch] = useState({});
    const [loading, setLoading] = useState(false);
    const [inputEnabled, setInputEnabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        axios.get('http://localhost:3001/swipe/get-matches', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}`
            }
        })
            .then((response) => {
                let temp = response.data.recommendations;
                setCurrentMatch(temp.shift());
                setMatches(temp);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                if (err.response.status === 401) {
                    localStorage.removeItem("usertoken");
                    navigate('/');
                }
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputEnabled(false);
        console.log(e.target.swipeStatus.value);
        console.log(currentMatch);
        axios.post('http://localhost:3001/swipe/ground', {
            swipedUser: currentMatch,
            swipeStatus: e.target.swipeStatus.value,
        }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("usertoken"))}` } })
            .then((response) => {
                console.log(response.data);
                let temp = matches;
                setCurrentMatch(temp.shift());
                setMatches(temp);
                if (matches === null || matches.length === 0) {
                    fetchData();
                }
                setInputEnabled(true);

                if (response.data.match) {
                    alert("MATCH DING DING DING");
                }
            })
            .catch((err) => {
                console.error(err);
                setInputEnabled(true);
                if (err.response.status === 401) {
                    localStorage.removeItem("usertoken");
                    navigate('/');
                }
            });
    };


    const SwiperCard = () => {
        return (
            <div className="homecard swipercard">
                <img src={loading ? "http://localhost:3001/media/default-user.png" : `http://localhost:3001/media/${currentMatch.pfpURL}`} alt="pfp" />
                <h2>{loading ? "Chargement..." : currentMatch.firstName}</h2>
                {loading ? <LoadingIndicator /> :
                    <div className="swipercard-buttons">
                        <div>
                            <form method="POST" onSubmit={handleSubmit}>
                                <input type="hidden" name="swipeStatus" value="like" />
                                <button id="like" type="submit" disabled={!inputEnabled}>
                                    <img src={require('../../images/like.png')} alt="like" />
                                </button>
                            </form>
                        </div>
                        <div>
                            <form method="POST" onSubmit={handleSubmit}>
                                <input type="hidden" name="swipeStatus" value="superlike" />
                                <button id="superlike" type="submit" disabled={!inputEnabled}>
                                    <img src={require('../../images/superlike.png')} alt="superlike" />
                                </button>
                            </form>
                        </div>
                        <div>
                            <form method="POST" onSubmit={handleSubmit}>
                                <input type="hidden" name="swipeStatus" value="dislike" />
                                <button id="dislike" type="submit" disabled={!inputEnabled}>
                                    <img src={require('../../images/dislike.png')} alt="dislike" />
                                </button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        );
    };

    return (
        <>
            {
                loading ?
                    <div className="homecard">
                        <div className="centerHeart">
                            <LoadingIndicator />
                        </div>
                    </div>
                    :
                    <SwiperCard />
            }
        </>
    );
};

export default HomeSwiper;