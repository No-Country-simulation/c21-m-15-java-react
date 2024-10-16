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

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  // Obtener la ruta anterior del estado de la ubicación, o usar una ruta por defecto
  const from = location.state?.from || "/";
  const origin = location.state?.origin || "/";
  console.log("location-------------:", location.state?.origin, from);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    // Simulamos una autenticación exitosa
    sessionStorage.setItem("isAuthenticated", "true");

    // Redirigir al usuario a la página de la que vino
    console.log("Redirigiendo a:", from);
    //navigate(from, { replace: true });
    //TODO: no está guardando bien, revisar.
    console.log("guardo: ", origin + from);
    localStorage.setItem(origin + from, "true");
    console.log("posguardado: ", localStorage.getItem(origin + from));
    let userData = { user: username, rol: username };
    console.log("userData: ", userData);
    navigate(from, { replace: true, state: userData });
  };

  return (
    <Container component="main" maxWidth="xs">
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
