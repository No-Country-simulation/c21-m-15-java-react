import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../assets/Logo.png";
import user from "../assets/user.png";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import useTelemedicina from "../hooks/useTelemedicina";
import { userContext } from "./userProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const { openLogin, handleOpenLogin, handleCloseLogin } = useTelemedicina();
  const { user, setUser, userRol, setUserRol } = useContext(userContext);
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#007BFF" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              maxWidth: "150px",
              minWidth: "150px",
              height: "80px",
              overflow: "hidden",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "100%",
                width: "90%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ fontSize: "1rem", color: "white" }}>
            {user ? "Usuario: " + user : ""}
          </Typography>
          <Typography
            sx={{ fontSize: "0.7rem", color: "white", margin: "0 0.5rem" }}
          ></Typography>

          {user && (
            <Button
              sx={{
                fontSize: "0.7rem",
                padding: "0.2rem 0.2rem",
                backgroundColor: "white",
              }}
              onClick={() => {
                setUser("");
                setUserRol("");
                sessionStorage.clear();
                navigate("/");
              }}
            >
              Cerrar Sesión
            </Button>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ fontSize: "2rem" }}
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/login")}
              autoFocus
            >
              <AccountCircle sx={{ fontSize: "inherit" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Diálogo para el login */}
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Iniciar Sesión</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={user}
            alt="User"
            sx={{
              height: 100,
              width: 100,
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseLogin} color="primary">
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
