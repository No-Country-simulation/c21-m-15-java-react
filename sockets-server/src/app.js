import process from "process";
import { readFileSync } from "fs";
import { createServer as createHTTPSServer } from "https";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
dotenv.config();

const ALLOWED_ORIGINS = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
  "http://127.0.0.1:5174",
  "http://localhost:5174",
  "https://192.168.0.59:5174",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "https://192.168.0.59:5173",
];

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(null, true); //por ahora permitir toda petición
        /*return callback(new Error("Not allowed by CORS"));*/
      }
    },
    credentials: true,
  })
);

app.get("*", (req, res) => {
  res.status(404).send("¡Hola! 404 Page not found");
});

let server;

// Verificar si estamos en desarrollo o producción
if (process.env.NODE_ENV === "development") {
  // Solo en desarrollo: usar HTTPS
  const httpsOptions = {
    key: readFileSync(
      path.join(path.dirname(new URL(import.meta.url).pathname), "server.key")
    ),
    cert: readFileSync(
      path.join(path.dirname(new URL(import.meta.url).pathname), "server.cert")
    ),
  };
  server = createHTTPSServer(httpsOptions, app);
} else {
  server = createServer(app);
}

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(null, true); //por ahora permitir todo
        /*return callback(new Error("Not allowed by CORS"));*/
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
});

function mapWithSetsToObject(map) {
  const result = {};

  map.forEach((valueSet, key) => {
    result[key] = Array.from(valueSet);
  });

  return result;
}

const rooms = new Map();
const roomsCalls = new Map();

const nspRooms = io.of("/nspRooms");

nspRooms.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("getRooms", () => {
    console.log("Usuario ", socket.id, " pidiendo salas");
    nspRooms.emit("updateRooms", mapWithSetsToObject(rooms));
  });

  socket.on("getUsersInRoom", (roomId) => {
    console.log("Usuario ", socket.id, " pidiendo usuarios en la sala", roomId);
    if (rooms.has(roomId)) {
      console.log("Usuarios en la sala", Array.from(rooms.get(roomId)));
      socket.emit("usersInRoom", Array.from(rooms.get(roomId)));
    }
  });

  socket.on("getUsersInCall", (roomId) => {
    console.log(
      "Usuario ",
      socket.id,
      " pidiendo usuarios en la llamada  ",
      roomId
    );
    console.log("Llamadas:", roomsCalls);
    if (roomsCalls.has(roomId)) {
      console.log("Usuarios en la llamada", Array.from(roomsCalls.get(roomId)));
    }
  });

  socket.on("joinCall", (roomId, date) => {
    console.log(
      "Usuario ",
      socket.id,
      " conectado a la llamada en ",
      roomId,
      " a las ",
      date
    );

    if (!roomsCalls.has(roomId)) {
      roomsCalls.set(roomId, new Set());
    }
    roomsCalls.get(roomId).add(socket.id);

    nspRooms.to(roomId).emit("usersInCall", Array.from(roomsCalls.get(roomId)));
  });

  socket.on("joinRoom", (roomId) => {
    // Máximo de dos usuarios por sala
    if (rooms.has(roomId)) {
      if (rooms.get(roomId).size === 2) {
        console.log("Sala llena");
        socket.emit("roomFull");
        return;
      }
    }

    console.log("Usuario ", socket.id, " conectado a la sala", roomId);

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);

    nspRooms.emit("updateRooms", mapWithSetsToObject(rooms));
    nspRooms.to(roomId).emit("usersInRoom", Array.from(rooms.get(roomId)));
    if (roomsCalls.has(roomId)) {
      nspRooms
        .to(roomId)
        .emit("usersInCall", Array.from(roomsCalls.get(roomId)));
    }
  });

  socket.on("leaveRoom", (roomId) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id);
      if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId);
      }
    }
    if (roomsCalls.has(roomId)) {
      roomsCalls.get(roomId).delete(socket.id);
      if (roomsCalls.get(roomId).size === 0) {
        roomsCalls.delete(roomId);
      }
    }
    if (roomsCalls.has(roomId)) {
      nspRooms
        .to(roomId)
        .emit("usersInCall", Array.from(roomsCalls.get(roomId)));
    } else {
      nspRooms.to(roomId).emit("usersInCall", []);
    }

    nspRooms.emit("updateRooms", mapWithSetsToObject(rooms));
    socket.leave(roomId);
  });

  socket.on("leaveCall", (roomId) => {
    if (roomsCalls.has(roomId)) {
      roomsCalls.get(roomId).delete(socket.id);
      if (roomsCalls.get(roomId).size === 0) {
        roomsCalls.delete(roomId);
      }
    }
    if (roomsCalls.has(roomId)) {
      nspRooms
        .to(roomId)
        .emit("usersInCall", Array.from(roomsCalls.get(roomId)));
    } else {
      nspRooms.to(roomId).emit("usersInCall", []);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);

    rooms.forEach((clientsSet, roomId) => {
      if (clientsSet.has(socket.id)) {
        clientsSet.delete(socket.id);
        console.log(
          "Usuario ",
          socket.id,
          " desconectado de la sala",
          roomId,
          "emito usersInRoom",
          Array.from(rooms.get(roomId))
        );
        nspRooms.to(roomId).emit("usersInRoom", Array.from(rooms.get(roomId)));

        if (clientsSet.size === 0) {
          rooms.delete(roomId);
        }
      }
    });

    roomsCalls.forEach((clientsSet, roomId) => {
      if (clientsSet.has(socket.id)) {
        clientsSet.delete(socket.id);
        if (clientsSet.size === 0) {
          roomsCalls.delete(roomId);
          nspRooms.to(roomId).emit("usersInCall", []);
        } else {
          nspRooms.to(roomId).emit("usersInCall", Array.from(clientsSet));
        }
      }
    });

    nspRooms.emit("updateRooms", mapWithSetsToObject(rooms));
  });
});

const namespaces = io.of(/^\/[\w-]+$/);

namespaces.on("connect", function (socket) {
  const namespace = socket.nsp;
  console.log(`Video Socket namespace: ${namespace.name}`);

  socket.broadcast.emit("connected peer");

  socket.on("signal", function (data) {
    socket.broadcast.emit("signal", data);
  });

  socket.on("disconnect", function () {
    namespace.emit("disconnected peer");
  });
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
);
