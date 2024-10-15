import Home from "./views/Home";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from 'react-router-dom';
import CardSection from './components/CardSection'
import Cartilla from './components/Cartilla';
import VideoConsultas from './components/VideoConsultas';
import GestionOnline from './components/GestionOnline';
import  SobreNosotros from './components/SobreNosotros';
import NuestrasEspecialidades from './components/NuestrasEspecialidades';
import './App.css'
import Footer from "./views/Footer";


function Inicio(){
  return(
    <>
    <Navbar />
     <Home />
    <SobreNosotros />
    <CardSection />
    <NuestrasEspecialidades />
    <Footer/>
    </>
  )
}
function App() {
  return (
    <>

     <Routes>
      <Route path="/" element={<Inicio /> } />
      <Route path="/cartilla" element={<Cartilla />} />
      <Route path="/video-consultas" element={<VideoConsultas />} />
      <Route path="/gestion-online" element={<GestionOnline />} />
    </Routes>

    </>
  )
}

export default App;
