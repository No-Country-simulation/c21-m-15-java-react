import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
} from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Importa el CSS de react-calendar
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useTelemedicina from "../hooks/useTelemedicina";
import { useParams } from "react-router-dom";
import axios from "axios";

const GestionOnline = () => {
  const { handleSubmit, setSelectedDate, selectedDate } = useTelemedicina();
  const [medicos, setMedicos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const { id } = useParams();

  // Cargar los médicos desde la API
  useEffect(() => {
    const fetchMedicoData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/medics');
        setMedicos(response.data);

        if (id) {
          const medicoEncontrado = response.data.find((doc) => doc.id === parseInt(id));
          if (medicoEncontrado) {
            setMedicoSeleccionado(medicoEncontrado);
            setCategoria(medicoEncontrado.speciality);
          } else {
            console.error("Médico no encontrado");
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos del médico:", error);
      }
    };

    fetchMedicoData();
  }, [id]);

  const medicosFiltrados = medicos.filter((doc) => doc.speciality === categoria);
  const categoriasDisponibles = [...new Set(medicos.map((doc) => doc.speciality))];

  // Solo cambiar el médico seleccionado si no hay ninguno actualmente seleccionado
  useEffect(() => {
    if (medicoSeleccionado === null && medicosFiltrados.length > 0) {
      setMedicoSeleccionado(medicosFiltrados[0]);
    } else if (medicosFiltrados.length === 0) {
      setMedicoSeleccionado(null);
    }
  }, [categoria, medicos]);

  // Deshabilitar fechas en el calendario
  const shouldDisableDate = (date) => {
    if (!medicoSeleccionado || !medicoSeleccionado.openingHours) {
      return false;
    }

    const daysInSpanish = {
      0: "Domingo",
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado"
    };

    const dayOfWeek = date.getDay();
    const dayName = daysInSpanish[dayOfWeek];

    const isAvailableDay = medicoSeleccionado.openingHours.some(
      (horario) => horario.dayOfWeek === dayName
    );

    return !isAvailableDay;
  };

  return (
    <Container sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, width: "100%", minHeight: "100vh" }}>
      <Box sx={{ flex: 2, padding: 2, display: "flex", flexDirection: "column", boxShadow: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="categoria-label">Filtrar por Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            id="categoria-select"
            value={categoria}
            label="Filtrar por Categoría"
            onChange={(e) => {
              setCategoria(e.target.value);
              setMedicoSeleccionado(null); // Reiniciar la selección de médico al cambiar la categoría
            }}
          >
            <MenuItem value=""><em>Mostrar todos</em></MenuItem>
            {categoriasDisponibles.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <List sx={{ marginTop: "20px" }}>
          {medicosFiltrados.map((doc) => (
            <ListItem
              key={doc.id}
              onClick={() => setMedicoSeleccionado(doc)} // Aquí seleccionas el médico manualmente
              sx={{ cursor: "pointer", backgroundColor: medicoSeleccionado?.id === doc.id ? "rgba(0, 123, 255, 0.1)" : "transparent" }}
            >
              <Typography variant="body1">{doc.name}</Typography>
            </ListItem>
          ))}
        </List>

        {medicoSeleccionado ? (
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ color: "#134074", fontWeight: "bold" }}>
              {medicoSeleccionado.name}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start", gap: 2, height: "auto", boxShadow: 3, padding: 1, borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={medicoSeleccionado.picture || "/ruta/a/la/imagen.jpg"}
                sx={{ width: { xs: "100%", md: 150 }, height: 150, borderRadius: "50%", border: "4px solid rgba(128, 128, 128, 0.5)" }}
              />
              <Box sx={{ padding: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                <Typography variant="body1">{medicoSeleccionado.speciality}</Typography>
                <Typography variant="body2">{medicoSeleccionado.description}</Typography>
              </Box>
            </Box>

            <Box sx={{ boxShadow: 3, padding: 2, borderRadius: 1, marginTop: "30px" }}>
              <Box>
                <Typography variant="body2"><strong>Horarios:</strong></Typography>
                {medicoSeleccionado.openingHours && medicoSeleccionado.openingHours.length > 0 ? (
                  medicoSeleccionado.openingHours.map((horario, index) => (
                    <Typography key={index} variant="body2" sx={{ color: "#134074" }}>
                      {horario.dayOfWeek}: {horario.startTime} - {horario.endTime}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No hay horarios disponibles.</Typography>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">Seleccione un médico para ver los detalles.</Typography>
        )}
      </Box>

      <Box sx={{ flex: 2, padding: 2, boxShadow: 3 }}>
        <Typography
          variant="h5"
          sx={{
            lineHeight: 2,
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            padding: 1,
            borderRadius: 1,
            marginBottom: "15px",
            boxShadow: 3,
          }}
        >
          Seleccione la hora y fecha
        </Typography>
        <Typography variant="body1" gutterBottom>
          Aquí puede seleccionar la fecha y hora de su consulta con el especialista.
        </Typography>

        <Calendar
          locale="es" // Se define el idioma como español
          value={selectedDate}
          onChange={setSelectedDate}
          tileDisabled={({ date }) => shouldDisableDate(date)}
          formatDay={(locale, date) => format(date, "d", { locale: es })} // Formato de día
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#13315c" }}
            disabled={!selectedDate}
          >
            Agendar Cita
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default GestionOnline;
