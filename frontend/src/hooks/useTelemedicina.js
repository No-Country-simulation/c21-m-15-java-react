import { useState } from "react";

export default function useTelemedicina() {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return {
    handleOpenLogin,
    handleCloseLogin,
    openLogin,
  };
}
