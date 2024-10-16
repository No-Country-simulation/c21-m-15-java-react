import { useState } from "react";
import axios from "axios";

export default function useTelemedicina() {
  const [openLogin, setOpenLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleMenuItemClick = () => {
  
    handleMenuClose();
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
    
  };
}
