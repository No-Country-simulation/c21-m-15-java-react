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
  const { user, setUser  } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  // Obtener la ruta anterior del estado de la ubicación, o usar una ruta por defecto
  const from = location.state?.from || "/";
 
   async function handleSubmitBackend (e) {
    e.preventDefault();
    let response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      let data = await response.json();

      let userResponse = await fetch("http://localhost:8080/api/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (!userResponse.ok) {
        alert("Error al obtener el usuario");
        return;
      }
      if (userResponse.ok) {
        let userData = await userResponse.json();
 
        setUser(userData); //id role username
      }

      navigate(from, { replace: true });
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
           
            
  }

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
        <Box component="form" onSubmit={handleSubmitBackend} noValidate sx={{ mt: 1 }}>
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
          <button onClick={(e) => handleSubmitBackend(e)}>Login backend</button>
        </Box>
      </Box>
    </Container>
  );
}
