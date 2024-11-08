import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./userProvider";
import { Button } from "@mui/material";

const VideoConsultas = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.username);
  const [roomUrl, setRoomUrl] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    let tempRoomId = `${userName}-${user.id}_g${randomNumber}`;
    //let tempRoomId = `${userId}-${randomNumber}`;
    setRoomId(tempRoomId);
    setRoomUrl(`${window.location.origin}/vl/${tempRoomId}`);
  }, [userName, user.id]);

  if (user.role === "MEDIC") {
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
          <a href={`/vl/${roomId}`}>{userName !== "" ? roomUrl : ""}</a>
        </div>
      )}
    </section>
  );
};

export default VideoConsultas;
