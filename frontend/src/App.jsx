import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./components/Navbar.jsx";
import CardSection from "./components/CardSection";
import Cartilla from "./components/Cartilla";
import VideoConsultas from "./components/VideoConsultas";
import GestionOnline from "./components/GestionOnline";
import SobreNosotros from "./components/SobreNosotros";
import NuestrasEspecialidades from "./components/NuestrasEspecialidades";
import LoginScreen from "./components/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Footer from "./views/Footer";
import Carrucel from "./components/Carrucel.jsx";
import { SocketProvider } from "./components/socket-provider.jsx";
import VideoLlamada from "./components/VideoLlamada.jsx";
import VideoNoAuth from "./components/VideoNoAuth.jsx";

function App() {
  return (
    <>
      <Navbar />
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
          <Route
            path="/vl/:roomId"
            element={
              <ProtectedRoute>
                <SocketProvider>
                  <VideoLlamada />
                </SocketProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/video-no-auth" element={<VideoNoAuth />} />
        </Routes>
        <Footer />
      </Home>
    </>
  );
}

export default App;
