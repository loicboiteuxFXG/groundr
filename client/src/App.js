/*
Routes sert à sélectionner le composant à afficher selon la route (/ = Presentation)
Il est aussi appelé Switch sur certains tutos
 */
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Presentation from "./pages/Presentation";
import HomeChatbox from "./components/HomeChatbox";
import HomeSettings from "./components/HomeSettings";
import HomeSwiper from "./components/HomeSwiper";


const App = () => {
  return (
      <>
        <Routes>
          <Route path="/" element={<Presentation />} />
            <Route path="/home" element={<HomeLayout />}>
                <Route path="chat" element={<HomeChatbox />} />
                <Route path="settings" element={<HomeSettings />} />
                <Route path="swipe" element={<HomeSwiper />} />
            </Route>
        </Routes>
      </>
  );
};

export default App;