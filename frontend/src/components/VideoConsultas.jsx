import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./userProvider";
import { Button } from "@mui/material";

const VideoConsultas = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  console.log("user: ", user.username);
  console.log("rol: ", user.role);

  const [userId, setUserId] = useState(user.username);
  const [roomUrl, setRoomUrl] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    let tempRoomId = `${userId}-${randomNumber}`;
    setRoomId(tempRoomId);
    setRoomUrl(`${window.location.origin}/vl/${tempRoomId}`);
  }, [userId]);

  //TODO: ADAPTAR A LA BASE DE DATOS

  if (user.role === "admin" || user.role === "doc") {
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
          <p>Para realizar una video consulta haga click aquí:</p>

          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(`/vl/${roomId}`)}
          >
            Ingresar a la llamada
          </Button>

          <p>
            Si necesita ingresar desde otro dispositivo puede hacerlo mediante
            el siguiente enlace:{" "}
          </p>
          <a href={`/vl/${roomId}`}>{userId !== "" ? roomUrl : ""}</a>
        </div>
      )}
    </section>
  );
};

export default VideoConsultas;
