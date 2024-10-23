import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "./socket-provider.jsx";
import { useVideoCall } from "../../hooks/useVideoCall.jsx"; // Import the new hook
import { userContext } from "../userProvider.jsx";
import "./videollamada.css";

export default function VideoLlamada() {
  const { user, setUser, token } = useContext(userContext);
  const [patientRecords, setPatientRecords] = useState([]);
  const { roomId } = useParams();
  const { socket, isConnected } = useContext(SocketContext);
  const {
    hasVideo,
    hasAudio,
    webcamVideoRef,
    remoteVideoRef,
    joinCall,
    leaveCall,
    socketVideoId,
  } = useVideoCall(roomId);

  const [usersInCall, setUsersInCall] = useState([]);

  const [usersInRoom, setUsersInRoom] = useState([]);

  useEffect(() => {
    if (socket && !isConnected) {
      socket.connect();
    }
  }, [isConnected, socket]);

  useEffect(() => {
    if (isConnected && socket) {
      socket.emit("joinRoom", roomId);
      console.log("Joining room", roomId);

      socket.emit("getUsersInCall", roomId);

      socket.on("usersInRoom", (users) => {
        console.log("Users in room:", users);
        setUsersInRoom(users);
      });
      socket.on("usersInCall", (users) => {
        console.log("Users in call:", users);
        setUsersInCall(users);
      });

      socket.on("roomFull", () => {
        alert("La sala está llena, no puede ingresar.");
        window.location.href = "/";
      });
    }

    return () => {
      if (isConnected && socket) {
        socket.emit("leaveCall", roomId);
        socket.emit("leaveRoom", roomId);
        console.log("Leaving room", roomId);
      }
    };
  }, [roomId, socket, isConnected]);

  function handleCallButton() {
    if (isConnected && socket) {
      socket.emit("joinCall", roomId, Date.now().toString());
    }
    joinCall();
  }

  function handleLeaveButton() {
    socket.emit("leaveCall", roomId, Date.now().toString());
    leaveCall();
  }

  let userFromRoomId = roomId.split("-")[0];
  let roomUserId = roomId.split("-")[1].split(".")[0];
  console.log("roomUserId", roomUserId);

  let isAuthorized =
    user.username === userFromRoomId ||
    user.role === "admin" ||
    user.role === "MEDIC";

  //TODO CAMBIAR SEGUN USUARIOS Y ROLES DE LA BASE
  let localName = "";
  let remoteName = "";
  if (user.role === "PATIENT") {
    localName = user.username;
    remoteName = "HealthPro";
  } else {
    localName = "HealthPro";
    remoteName = "Paciente: " + userFromRoomId;
  }

  useEffect(() => {
    async function fetchUserData() {
      let response = await fetch(
        `http://localhost:8080/api/patients/${roomUserId}/medical-records`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Error al obtener datos del paciente");
        return;
      }
      if (response.ok) {
        let patientRecords = await response.json();
        console.log("patientRecords", patientRecords);
        setPatientRecords(patientRecords);
      }
    }
    fetchUserData();
  }, [token, roomUserId]);

  return (
    <section id="videollamada">
      {/*    {!isAuthorized && <h1>Usuario no autenticado</h1>}
      {isAuthorized && (
        <h3>
          Usuario autenticado: {user.username} - Rol: {user.rol}
        </h3>
      )} */}
      <h3>
        {socket?.id
          ? `Conectado a la sala ${roomId}`
          : "Conectando a la sala, por favor aguarde."}
      </h3>
      <h4>
        {socket?.id && usersInCall.length === 0 && user.role === "PATIENT"
          ? "Haga click en unirse a la llamada y aguarde a ser atendido/a."
          : ""}
      </h4>
      <h4>
        {socket?.id && usersInCall.length === 1 && user.role === "PATIENT"
          ? "Aguarde a ser atendido/a."
          : ""}
      </h4>

      <div className="videos">
        <div id="localstream">
          <h3>{localName}</h3>
          <video
            ref={webcamVideoRef}
            id="webcamVideo"
            autoPlay
            muted
            playsInline
          ></video>
        </div>
        <div id="remotestream">
          <h3>{remoteName}</h3>
          <video
            ref={remoteVideoRef}
            id="remoteVideo"
            autoPlay
            playsInline
          ></video>
        </div>
      </div>
      {!socketVideoId && (
        <button className="video" id="join-call" onClick={handleCallButton}>
          Unirse a la llamada
        </button>
      )}
      {socketVideoId && (
        <button className="video" id="leave-call" onClick={handleLeaveButton}>
          Terminar llamada
        </button>
      )}
      <div id="divider">* * *</div>
      <section id="records">
        <h3>Historial del paciente:</h3>
        {patientRecords.length === 0 && <p>No hay registros médicos</p>}
        {patientRecords.length > 0 && (
          <ul>
            {patientRecords.map((record) => (
              <li key={record.id}>
                <h4>{record.diagnosisDate}</h4>
                <p>Diagnostico: {record.conditionName}</p>
                <p>Tratamiento: {record.treatment}</p>
                <p>Notas: {record.notes} </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <div>
        <h3>Usuarios en la sala:</h3>
        {usersInRoom.length === 0 && <li>No hay usuarios en la sala</li>}
        {usersInRoom.length > 0 && (
          <span>
            {usersInRoom.map((user) => (
              <p key={user}>{user}</p>
            ))}
          </span>
        )}
        <h3>Usuarios conectados a la llamada:</h3>
        {usersInCall.length === 0 && (
          <span>
            <p>No hay usuarios conectados a la llamada</p>
          </span>
        )}
        {usersInCall.length > 0 && (
          <span>
            {usersInCall.map((user) => (
              <p key={user}>{user}</p>
            ))}
          </span>
        )}
        <h3>Socket ID: {socket && socket.id}</h3>
        <p>
          Estado: {hasVideo ? "Video disponible" : "Video no disponible"},{" "}
          {hasAudio ? "Audio disponible" : "Audio no disponible"}
        </p>
      </div>
    </section>
  );
}
