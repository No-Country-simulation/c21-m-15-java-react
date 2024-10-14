import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
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
        {/* Enlace a Cartilla */}
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "white",
            "&:hover": {
              color: "#0b2545", 
            },
          }}
        >
          Cartilla
        </Link>

        {/* Enlace a Telemedicina */}
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "white",
            "&:hover": {
              color: "#0b2545",
            },
          }}
        >
          Telemedicina
        </Link>

        {/* Enlace a Contacto */}
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "white",
            "&:hover": {
              color: "#0b2545",
            },
          }}
        >
          Contacto
        </Link>
      </Box>
      <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
  <Box
    href="#"
    underline="hover"
    sx={{
      color: "white",
 
    }}
  >
    Términos y Condiciones
  </Box>
  <Box
    href="#"
    underline="hover"
    sx={{
      color: "white",
    
    }}
  >
    Política de Privacidad
  </Box>
</Box>


      <Typography variant="body2" sx={{ marginTop: "10px" }}>
        © {new Date().getFullYear()} Tu Plataforma de Telemedicina. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
