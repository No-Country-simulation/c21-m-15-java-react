import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useTelemedicina from "../hooks/useTelemedicina";

export default function Footer() {
  const { handleMenuItemClick } = useTelemedicina();

  return (
    <Box
      sx={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "20px",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link
          to="/"
          onClick={() => {
            handleMenuItemClick("Inicio");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Inicio
          </Typography>
        </Link>

        <Link
          to="/Cartilla"
          onClick={() => handleMenuItemClick("Cartilla")}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Cartilla
          </Typography>
        </Link>
        <Link
          to="/gestion-online"
          onClick={() => handleMenuItemClick("Citas")}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Turnos
          </Typography>
        </Link>
        <Link
          to="/video-consultas"
          onClick={() => handleMenuItemClick("Telemedicina")}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Telemedicina
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "#0b2545",
            },
          }}
        >
          Términos y Condiciones
        </Typography>
        <Typography
          sx={{
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "#0b2545",
            },
          }}
        >
          Política de Privacidad
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ marginTop: "10px" }}>
        © {new Date().getFullYear()} Tu Plataforma de Telemedicina. Todos los
        derechos reservados.
      </Typography>
    </Box>
  );
}

