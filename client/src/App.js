/*
Routes sert à sélectionner le composant à afficher selon la route (/ = Presentation)
Il est aussi appelé Switch sur certains tutos
 */
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Presentation from "./pages/Presentation";

const App = () => {
  return (
      <>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </>
  );
};

export default App;