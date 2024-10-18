import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const VideoConsultas = () => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  let user = sessionStorage.getItem("user");
  let rol = sessionStorage.getItem("rol");

  console.log("user: ", user);
  console.log("rol: ", rol);

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
    <section id="video-consultas">
      {roomUrl && (
        <div className="content">
          <p>
            Para realizar una video consulta ingrese al siguiente enlace y
            aguarde a ser atendido/a:
          </p>

          <a href={`/vl/${roomId}`}>{userId !== "" ? roomUrl : ""}</a>
        </div>
      )}
    </section>
  );
};

export default VideoConsultas;
