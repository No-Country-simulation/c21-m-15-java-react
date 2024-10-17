import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const VideoConsultas = () => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  let user = sessionStorage.getItem("user");
  let rol = sessionStorage.getItem("rol");

  const [userId, setUserId] = useState(user);
  const [roomUrl, setRoomUrl] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    let tempRoomId = `${userId}-${randomNumber}`;
    setRoomId(tempRoomId);
    setRoomUrl(`${window.location.origin}/vl/${tempRoomId}`);
  }, [userId]);

  if (rol === "admin" || rol === "doc") {
    return (
      <Navigate
        to="/rooms"
        state={{
          from: location.pathname,
          origin: location.origin,
        }}
        replace
      />
    );
  }

  return (
    <div>
      {userId && (
        <h3>
          Usuario: {userId} - Rol: {rol}
        </h3>
      )}

      {roomUrl && (
        <div>
          <h3>
            Para realizar una video consulta ingrese al siguiente enlace y
            aguarde a ser atendido/a:
          </h3>

          <a href={`/vl/${roomId}`}>{userId !== "" ? roomUrl : ""}</a>
        </div>
      )}
    </div>
  );
};

export default VideoConsultas;
