import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./socket-provider.jsx";

export default function RoomList() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { socket, isConnected } = useContext(SocketContext);
  const [socketRooms, setSocketRooms] = useState({});

  useEffect(() => {
    if (socket && !isConnected) {
      socket.connect();
    }
    if (socket) {
      socket.emit("getRooms");
      console.log("pido rooms");
      socket.on("updateRooms", (rooms) => {
        console.log("Salas actualizadas:", rooms);
        setSocketRooms(rooms);
      });
    }

    // Limpiar el socket cuando el componente se desmonte
    return () => {
      if (socket) {
        socket.off("updateRooms");
      }
    };
  }, [socket, isConnected]);

  // no usar navigate, usar <a href> para que se recargue la página y
  // funcionen los socket
  /* <button onClick={() => navigate("/vl/" + salaId)}>Atender</button> */

  return (
    <section className="column-list">
      <h1>Pacientes esperando</h1>
      {Object.keys(socketRooms).length === 0 && (
        <p>No hay pacientes esperando.</p>
      )}
      <ul className="lista-espera">
        {Object.keys(socketRooms).map((salaId) => (
          <li key={salaId}>
            {socketRooms[salaId].length < 2 && (
              <>
                <div>
                  {salaId} - {socketRooms[salaId].length} paciente esperando
                </div>
                <a href={`/vl/${salaId}`}>Atender</a>
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
