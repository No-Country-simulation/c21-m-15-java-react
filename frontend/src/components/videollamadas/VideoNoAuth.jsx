import { useContext } from "react";
import { userContext } from "../userProvider.jsx";
export default function VideoNoAuth() {
  // Borramos los datos de auth para que si vuelve a entrar a un enlace de
  // sala, tenga que autenticarse nuevamente

  const { user, setUser } = useContext(userContext);

  setUser(null);

  return (
    <div>
      <h1>No tiene permisos para ingresar a la sala solcitada.</h1>
    </div>
  );
}
