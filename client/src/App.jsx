import {useAuthContext} from "./context/AuthContext"
import {Navigate, Route, Routes} from "react-router-dom"
import Presentation from "./pages/Presentation"
import HomeLayout from "./pages/HomeLayout"
import HomeSwiper from "./components/HomeSwiper"
import Profile from "./components/Profile"
import ProfileEdit from "./components/ProfileEdit"
import ProfilePassword from "./components/ProfilePassword"
import Account from "./pages/Account"
import LoginBox from "./components/LoginBox"
import SignupBox from "./components/SignupBox"
import Chatbox from "./components/Chatbox"
import SubscribeBox from "./components/SubscribeBox"
import UserSearch from "./components/UserSearch"
import NotFound from "./pages/NotFound"
import Forbidden from "./pages/Forbidden";
import ServerError from "./pages/ServerError";
import Admin from "./pages/Admin";


const App = () => {
    const {authUser} = useAuthContext()
    return (
        <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/home" element={authUser ? <HomeLayout /> : <Navigate to="/account/login" />}>
                <Route path="search" element={<UserSearch />} />
                <Route path="chat" element={<Chatbox />} />
                <Route path="swipe" element={<HomeSwiper />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<ProfileEdit />} />
                <Route path="profile/password/edit" element={<ProfilePassword />} />
                <Route path="profile/subscribe" element={<SubscribeBox />} />
            </Route>
            <Route path="/account" element={authUser ? <Navigate to="/home" />: <Account />} />
            <Route path="/account/login" element={authUser ? <Navigate to="/home" />: <LoginBox />} />
            <Route path="/account/signup" element={authUser ? <Navigate to="/home" />: <SignupBox />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/403" element={<Forbidden />}/>
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}

export default App