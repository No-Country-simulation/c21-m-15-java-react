import { useState } from "react";

export default function useTelemedicina() {
  const [openLogin, setOpenLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  return {
    handleOpenLogin,
    handleCloseLogin,
    openLogin,
    handleMenuOpen,
    handleMenuClose,
    handleMenuItemClick,
    anchorEl
    
  };
}
