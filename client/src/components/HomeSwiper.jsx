import {useEffect, useState} from "react"
import axios from "axios"

import LoadingIndicator from "./LoadingIndicator"
import { useNavigate } from "react-router-dom"
import Modal from "./Modal"
import {useAuthContext} from "../context/AuthContext"
import notificationSound from "../assets/sounds/message.wav"
const HomeSwiper = () => {
    const [matches, setMatches] = useState(null);
    const [currentMatch, setCurrentMatch] = useState({});
    const [loading, setLoading] = useState(true);
    const [inputEnabled, setInputEnabled] = useState(true);
    const [matchedUsername, setMatchedUsername] = useState("");
    const [noMoreMatches, setNoMoreMatches] = useState(false);
    const {setAuthUser} = useAuthContext()

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const {authUser} = useAuthContext()
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
        window.location.reload();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        axios.get('http://localhost:3001/swipe/get-matches', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}`
            }
        })
            .then((response) => {
                let temp = response.data.recommendations;
                if (temp === null || temp.length === 0) {
                    setNoMoreMatches(true)
                    setLoading(false)
                }
                else {
                    setCurrentMatch(temp.shift());
                    setMatches(temp);
                    setLoading(false);
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 401:
                        localStorage.removeItem("auth-user")
                        setAuthUser(null)
                        break
                    case 403:
                        navigate("/403")
                        break
                    case 404:
                        navigate("/404")
                        break
                    default:
                        navigate("/500")
                }
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputEnabled(false);
        axios.post('http://localhost:3001/swipe/ground', {
            swipedUser: currentMatch,
            swipeStatus: e.target.swipeStatus.value,
        }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth-user"))}` } })
            .then(async (response) => {
                if (matches === null || matches.length === 0) {
                    fetchData().then(() => {
                        if (matches === null || matches.length === 0) {
                            setNoMoreMatches(true);
                        }
                    });
                } else {
                    let temp = matches;
                    setCurrentMatch(temp.shift());
                    setMatches(temp);
                }
                setInputEnabled(true);

                if (response.data.match) {
                    setMatchedUsername(response.data.user.firstName);
                    const sound = new Audio(notificationSound)
                    sound.play()
                    openModal();
                }
            })
            .catch((err) => {
                setInputEnabled(true);
                switch (err.response.status) {
                    case 401:
                        localStorage.removeItem("auth-user")
                        setAuthUser(null)
                        break
                    case 403:
                        navigate("/403")
                        break
                    case 404:
                        navigate("/404")
                        break
                    default:
                        navigate("/500")
                }
            });
    };


    const SwiperCard = () => {
        let today = new Date();
        let birthDate = new Date(currentMatch.DoB);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return (
            <div className="swiperLayout">
                {noMoreMatches ? <h2 className="custom-modal-text">Désolé, nous n'avons plus de Grounds à vous proposer.</h2> :
                    <><img
                        src={loading ? "http://localhost:3001/media/default-user.png" : `http://localhost:3001/media/${currentMatch.pfpURL}`}
                        alt="pfp" />
                        <h2>{loading ? "Chargement" : `${currentMatch.firstName}, `}<span className="age">{age}</span>
                        </h2>
                        <p>{loading ? "Chargement" : currentMatch.bio}</p>
                        {loading ? <LoadingIndicator /> :
                            <div className="swiperLayout-buttons">
                                <div>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <input type="hidden" name="swipeStatus" value="dislike"/>
                                        <button id="dislike" type="submit" disabled={!inputEnabled}>
                                            <img src={require('../images/dislike.png')} alt="dislike"/>
                                        </button>
                                    </form>
                                </div>
                                {authUser.isPremium ?
                                    <div>
                                        <form method="POST" onSubmit={handleSubmit}>
                                            <input type="hidden" name="swipeStatus" value="superlike"/>
                                            <button id="superlike" type="submit" disabled={!inputEnabled}>
                                                <img src={require('../images/superlike.png')} alt="superlike"/>
                                            </button>
                                        </form>
                                    </div>
                                    :
                                    <></>
                                }

                                <div>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <input type="hidden" name="swipeStatus" value="like"/>
                                        <button id="like" type="submit" disabled={!inputEnabled}>
                                            <img src={require('../images/like.png')} alt="like"/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        );
    };

    return (
        <>
            {
                loading ?
                    <div className="centerHeart mt-5"><LoadingIndicator/></div>
                    :
                    <SwiperCard/>

            }
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>
                <div className="center-text">
                    <h2 className="custom-modal-text">You have a Common Ground!</h2>
                    <p className="custom-modal-text-p">Vous avez matché avec {matchedUsername}!</p>
                </div>
            </Modal>
        </>
    );
};

export default HomeSwiper;