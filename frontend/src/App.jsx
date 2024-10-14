import Home from "./views/Home";
import Navbar from "./components/navbar";
import { Routes, Route } from 'react-router-dom';
import CardSection from './Components/CardSection'
import Cartilla from './Components/Cartilla';
import VideoConsultas from './Components/VideoConsultas';
import GestionOnline from './Components/GestionOnline';
import  SobreNosotros from './Components/SobreNosotros';
import NuestrasEspecialidades from './Components/NuestrasEspecialidades';
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
