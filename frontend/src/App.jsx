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
import { SocketProvider } from "./components/videollamadas/socket-provider.jsx";
import VideoLlamada from "./components/videollamadas/VideoLlamada.jsx";
import VideoNoAuth from "./components/videollamadas/VideoNoAuth.jsx";
import RoomList from "./components/videollamadas/RoomList.jsx";
import { UserProvider } from "./components/userProvider.jsx";
function App() {
  
  return (
    <>
      <UserProvider>
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
              path="/gestion-online/:id"
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
            <Route
              path="/rooms"
              element={
                <ProtectedRoute>
                  <SocketProvider>
                    <RoomList />
                  </SocketProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Home>
      </UserProvider>
    </>
  );
}

export default App;
