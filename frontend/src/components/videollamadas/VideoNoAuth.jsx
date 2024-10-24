import { useContext, useEffect } from "react";
import { userContext } from "../userProvider.jsx";
export default function VideoNoAuth() {
  // Borramos los datos de auth para que si vuelve a entrar a un enlace de
  // sala, tenga que autenticarse nuevamente

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    setUser(null);
  });

  return (
    <div
      style={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>No tiene permisos para ingresar a la sala solcitada.</h1>
    </div>
  );
}
