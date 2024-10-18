import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useContext } from "react";
import { userContext } from "./userProvider";

export default function LoginScreen() {
  const { user, setUser, userRol, setUserRol } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  // Obtener la ruta anterior del estado de la ubicación, o usar una ruta por defecto
  const from = location.state?.from || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Por favor, complete los campos de usuario y contraseña.");
      return;
    }
    setUser(username);
    // Aquí iría la lógica de autenticación
    console.log("Usuario:", username);
    console.log("Contraseña:", password);

    // Simulamos una autenticación exitosa
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("user", username);
    sessionStorage.setItem("rol", username); //TODO: cambiar por el rol real

    navigate(from, { replace: true });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", flexGrow: "1", flexDirection: "column" }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockOutlinedIcon
          sx={{ m: 1, bgcolor: "secondary.main", p: 1, borderRadius: "50%" }}
        />
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          {/*  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="#" variant="body2">
              {"¿No tienes una cuenta? Regístrate"}
            </Link>
          </Box> */}
        </Box>
      </Box>
    </Container>
  );
}
