/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import useTelemedicina from "../hooks/useTelemedicina";

export default function Home({ children }) {
  const { handleMenuOpen, handleMenuClose, handleMenuItemClick, anchorEl } =
    useTelemedicina();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "white",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MenuIcon
              sx={{ color: "black", display: { xs: "block", md: "none" } }}
              onClick={handleMenuOpen}
              autoFocus
            />

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                marginLeft: "20px",
              }}
            >
              <Typography
                component={Link}
                to="/"
                sx={{
                  color: "#343A40",
                  "&:hover": {
                    color: "#007BFF",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleMenuItemClick("Inicio")}
              >
                Inicio
              </Typography>
              <Typography
                component={Link}
                to="/cartilla"
                sx={{
                  color: "#343A40",
                  "&:hover": {
                    color: "#007BFF",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleMenuItemClick("Cartilla")}
              >
                Cartilla
              </Typography>
              <Typography
                component={Link}
                to="/contacto"
                sx={{
                  color: "#343A40",
                  "&:hover": {
                    color: "#007BFF",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleMenuItemClick("Contacto")}
              >
                Contacto
              </Typography>
              <Typography
                component={Link}
                to="/gestion-online"
                sx={{
                  color: "#343A40",
                  "&:hover": {
                    color: "#007BFF",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleMenuItemClick("Gestión Online")}
              >
                Turnos
              </Typography>
              <Typography
                component={Link}
                to="/video-consultas"
                sx={{
                  color: "#343A40",
                  "&:hover": {
                    color: "#007BFF",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleMenuItemClick("Telemedicina")}
              >
                Telemedicina
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#343A40",
            }}
          >
            <LocalHospitalIcon sx={{ fontSize: "24px", color: "#d32f2f" }} />
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              0800-333-9933
            </Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#007BFF",
                color: "white",
              },
            }}
          >
            <MenuItem
              onClick={() => handleMenuItemClick("Inicio")}
              sx={{
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Inicio
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Cartilla")}
              sx={{
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Cartilla
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Contacto")}
              sx={{
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Contacto
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Telemedicina")}
              sx={{
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Telemedicina
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {children}
    </>
  );
}