import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useTelemedicina() {
  const [openLogin, setOpenLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const menu = {
    Cartilla: "/cartilla",
    Contacto: "/contacto",
    Telemedicina: "/telemedicina",
    Citas:"/gestion-online"
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/agendar-cita", {
        fecha: selectedDate,
        medico: "Dr. John Doe",
      });
      console.log("Cita agendada:", response.data);
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  const handleMenuItemClick = (item) => {
    const route = menu[item]; // Obtiene la ruta correspondiente
    if (route) {
      navigate(route); // Redirige a la ruta si existe
    }
  };
  return {
    handleOpenLogin,
    handleCloseLogin,
    openLogin,
    handleMenuOpen,
    handleMenuClose,
    handleMenuItemClick,
    anchorEl,
    handleSubmit,
    setSelectedDate,
    selectedDate,
    handleMenuItemClick,
  };
}
