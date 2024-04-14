
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Presentation from "./pages/Presentation";
import HomeChatbox from "./components/HomeChatbox";
import HomeSettings from "./components/HomeSettings";
import HomeSwiper from "./components/HomeSwiper";
import Account from "./pages/Account";
import LoginBox from "./components/LoginBox";
import SignupBox from "./components/SignupBox";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import ProfilePassword from './components/ProfilePassword/ProfilePassword';
import SubscribeBox from "./components/SubscribeBox";
import {useAuthContext} from "./context/AuthContext";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
const App = () => {
    const {authUser} = useAuthContext()
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Presentation />} />
                <Route path="/home" element={authUser ? <HomeLayout /> : <Navigate to="/account/login" />}>
                    <Route path="chat" element={<Chatbox />} />
                    <Route path="settings" element={<HomeSettings />} />
                    <Route path="swipe" element={<HomeSwiper />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="profile/edit" element={<ProfileEdit />} />
                    <Route path="profile/password/edit" element={<ProfilePassword />} />
                    <Route path="profile/subscribe" element={<SubscribeBox/>}/>
                </Route>
                <Route path="/account" element={<Account />} />
                <Route path="/account/login" element={authUser ? <Navigate to="/home" />: <LoginBox />} />
                <Route path="/account/signup" element={<SignupBox />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;