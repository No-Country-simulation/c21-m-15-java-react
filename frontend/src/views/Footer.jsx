
import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
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
          onClick={() => handleMenuItemClick('Inicio')}
          style={{ textDecoration: "none" }}
        >
          <MuiLink
            underline="hover"
            sx={{
              color: "white",
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Inicio
          </MuiLink>
        </Link>
        <Link
          to="/Cartilla"
          onClick={() => handleMenuItemClick('Cartilla')}
          style={{ textDecoration: "none" }}
        >
          <MuiLink
            underline="hover"
            sx={{
              color: "white",
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Cartilla
          </MuiLink>
        </Link>

       
        <Link
          to="/video-consultas"
          onClick={() => handleMenuItemClick('Telemedicina')}
          style={{ textDecoration: "none" }}
        >
          <MuiLink
            underline="hover"
            sx={{
              color: "white",
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Telemedicina
          </MuiLink>
        </Link>

 
        <Link
          to="/Contacto"
          onClick={() => handleMenuItemClick('Contacto')}
          style={{ textDecoration: "none" }}
        >
          <MuiLink
            underline="hover"
            sx={{
              color: "white",
              "&:hover": {
                color: "#0b2545",
              },
            }}
          >
            Contacto
          </MuiLink>
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
        © {new Date().getFullYear()} Tu Plataforma de Telemedicina. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
