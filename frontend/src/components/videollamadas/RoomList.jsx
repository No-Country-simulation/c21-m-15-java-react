import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./socket-provider.jsx";
import { Button } from "@mui/material";
import { userContext } from "../userProvider.jsx";
export default function RoomList() {
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const { socket, isConnected } = useContext(SocketContext);
  const [socketRooms, setSocketRooms] = useState({});
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    async function getUsersData(rooms) {
      let usersIds = [];
      Object.keys(rooms).forEach((clave) => {
        usersIds.push(clave.split("-")[1].split("_")[0]);
      });

      async function fetchUser(userId) {
        const response = await fetch(
          `http://localhost:8080/api/patients/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error al obtener el usuario con id: ${userId}`);
        }
        return response.json();
      }

      async function fetchAllUsers(userIds) {
        try {
          const userPromises = userIds.map((userId) => fetchUser(userId));

          const users = await Promise.all(userPromises);

          return users;
        } catch (error) {
          console.error("Error al obtener los usuarios:", error);
        }
      }

      let data = await fetchAllUsers(usersIds);
      let usersData = {};
      data.forEach((user) => {
        usersData[user.id] = user;
      });
      setUsersData(usersData);
    }

    if (socket && !isConnected) {
      socket.connect();
    }
    if (socket) {
      socket.emit("getRooms");
      socket.on("updateRooms", (rooms) => {
        setSocketRooms(rooms);
        getUsersData(rooms);
      });
    }

    return () => {
      if (socket) {
        socket.off("updateRooms");
      }
    };
  }, [socket, isConnected, token]);

  function getUserIdFromSalaId(salaId) {
    let userId = salaId.split("-")[1].split("_")[0];
    return usersData[userId];
  }

  return (
    <section id="room-list" className="column-list">
      <h1>Pacientes esperando atención.</h1>
      {Object.keys(socketRooms).length === 0 && (
        <p>No hay pacientes esperando atención.</p>
      )}
      <ul className="lista-espera">
        {Object.keys(socketRooms).map((salaId) => (
          <li key={salaId}>
            {socketRooms[salaId].length < 2 && (
              <>
                <div>
                  Paciente{" "}
                  <strong>
                    {getUserIdFromSalaId(salaId)?.firstname}{" "}
                    {getUserIdFromSalaId(salaId)?.lastname}
                  </strong>
                </div>
                <div>
                  Esperando en la sala {salaId} (
                  {salaId.split("-")[1].split("_")[1][0] === "g" && "Guardia"}
                  {salaId.split("-")[1].split("_")[1][0] === "t" && "con Turno"}
                  )
                </div>
                {/*                 <a href={`/vl/${salaId}`}>Atender</a>
                 */}{" "}
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/vl/" + salaId)}
                >
                  Atender
                </Button>
              </>
            )}

            {socketRooms[salaId].length >= 2 && (
              <>
                <div>{salaId} - Atendida</div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
