import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
=======
import Navbar from "./components/Navbar.jsx";
>>>>>>> 819b2d3c28304666013ad5d61d979e116c73c9a3
import CardSection from "./components/CardSection";
import Cartilla from "./components/Cartilla";
import VideoConsultas from "./components/VideoConsultas";
import GestionOnline from "./components/GestionOnline";
import SobreNosotros from "./components/SobreNosotros";
import NuestrasEspecialidades from "./components/NuestrasEspecialidades";
<<<<<<< HEAD
=======
import LoginScreen from "./components/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> 819b2d3c28304666013ad5d61d979e116c73c9a3
import "./App.css";
import Footer from "./views/Footer";
import Carrucel from "./components/Carrucel.jsx";

<<<<<<< HEAD
function Inicio() {
  return (
    <>
      <Home />
      <SobreNosotros />
      <CardSection />
      <NuestrasEspecialidades />
      
    </>
  );
}
=======
>>>>>>> 819b2d3c28304666013ad5d61d979e116c73c9a3
function App() {
  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cartilla" element={<Cartilla />} />
        <Route path="/video-consultas" element={<VideoConsultas />} />
        <Route path="/gestion-online" element={<GestionOnline />} />
      </Routes>
      <Footer />
=======
      <Home>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carrucel />
                <SobreNosotros />
                <CardSection />
                <NuestrasEspecialidades />
              </>
            }
          />
          <Route path="/cartilla" element={<Cartilla />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/video-consultas"
            element={
              <ProtectedRoute>
                <VideoConsultas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion-online"
            element={
              <ProtectedRoute>
                <GestionOnline />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Home>
>>>>>>> 819b2d3c28304666013ad5d61d979e116c73c9a3
    </>
  );
}

export default App;
