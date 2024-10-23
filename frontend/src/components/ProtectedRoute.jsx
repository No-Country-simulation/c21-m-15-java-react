/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userContext } from "./userProvider";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useContext(userContext);

  const isAuthenticated = user ? true : false;

  // redireccionamiento a la página de inicio de sesión si el usuario no está autenticado
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
          /*           user: user.username,
          rol: user.role, */
        }}
        replace
      />
    );
  }

  // Checkeo de autorización si se está intentando entrar a una video llamada
  // El id de usuario debe coincidir con el id de usuario en la URL de la sala
  // (las url de las salas están formadas por el userId-NumeroAleatorio)
  let isRoomPath = location.pathname.includes("/vl/");
  let userInRoomId = null;

  if (isRoomPath) {
    const pathParts = location.pathname.split("/");
    if (pathParts.length > 2) {
      const roomPart = pathParts[2];
      if (roomPart.includes("-")) {
        userInRoomId = roomPart.split("-")[0];
      }
    }
  }
  let authRoom = user.username === userInRoomId || user.role === "MEDIC";

  if (isRoomPath && !authRoom) {
    return (
      <Navigate
        to="/video-no-auth"
        state={{
          from: location.pathname,
          origin: location.origin,
        }}
        replace
      />
    );
  }

  return children;
}
