

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
import useTelemedicina from "../hooks/useTelemedicina";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

const GestionOnline = () => {
  const { handleSubmit, setSelectedDate, selectedDate } = useTelemedicina();
  const [medicos, setMedicos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState({});
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMedicoData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/medics");
        setMedicos(response.data);

        if (id) {
          const medicoEncontrado = response.data.find(
            (doc) => doc.id === parseInt(id)
          );
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

  const medicosFiltrados = medicos.filter(
    (doc) => doc.speciality === categoria
  );
  const categoriasDisponibles = [
    ...new Set(medicos.map((doc) => doc.speciality)),
  ];

  useEffect(() => {
    if (medicosFiltrados.length > 0) {
      const selectedMedico = medicosFiltrados[0];
      setMedicoSeleccionado(selectedMedico);
      console.log("Médico seleccionado:", selectedMedico);
    }
  }, [categoria, medicos]);

  useEffect(() => {
    if (medicoSeleccionado.openingHours && selectedDate) {
      const dayOfWeek = selectedDate.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
      const horarios = medicoSeleccionado.openingHours.filter(hour => hour.dayOfWeek === dayOfWeek);
      
      if (horarios.length > 0) {
        const startHour = parseInt(horarios[0].startTime.split(':')[0]);
        const endHour = parseInt(horarios[0].endTime.split(':')[0]);
        
        const availableHours = [];
        for (let hour = startHour; hour < endHour; hour++) {
          availableHours.push(`${hour.toString().padStart(2, '0')}:00`);
        }

        setHorariosDisponibles(availableHours);
        console.log("Horarios disponibles:", availableHours);
      } else {
        setHorariosDisponibles([]);
      }
    } else {
      setHorariosDisponibles([]);
    }
  }, [medicoSeleccionado, selectedDate]);

  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 2,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="categoria-label">Filtrar por Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            id="categoria-select"
            value={categoria}
            label="Filtrar por Categoría"
            onChange={(e) => {
              setCategoria(e.target.value);
              setMedicoSeleccionado({});
            }}
          >
            <MenuItem value="">
              <em>Mostrar todos</em>
            </MenuItem>
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
              onClick={() => setMedicoSeleccionado(doc)}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  medicoSeleccionado.id === doc.id
                    ? "rgba(0, 123, 255, 0.1)"
                    : "transparent",
              }}
            >
              <Typography variant="body1">{doc.name}</Typography>
            </ListItem>
          ))}
        </List>

        {medicoSeleccionado && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="body1"
              sx={{ color: "#134074", fontWeight: "bold" }}
            >
              {medicoSeleccionado.name || "Cargando..."}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "flex-start",
                gap: 2,
                height: "auto",
                boxShadow: 3,
                padding: 1,
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                image={medicoSeleccionado.picture || "/ruta/a/la/imagen.jpg"}
                sx={{
                  width: { xs: "100%", md: 150 },
                  height: 150,
                  borderRadius: "50%",
                  border: "4px solid rgba(128, 128, 128, 0.5)",
                }}
              />
              <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="body1">
                  {medicoSeleccionado.speciality || "Cargando..."}
                </Typography>
                <Typography variant="body2">
                  {medicoSeleccionado.description || "Cargando..."}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                boxShadow: 3,
                padding: 2,
                borderRadius: 1,
                marginTop: "30px",
              }}
            >
              <Typography variant="body2" sx={{ padding: 1, borderRadius: 1 }}>
                <strong>Días de atención:</strong>{" "}
                {medicoSeleccionado.openingHours &&
                medicoSeleccionado.openingHours.length > 0
                  ? medicoSeleccionado.openingHours
                      .map(({ dayOfWeek }) => dayOfWeek)
                      .join(", ")
                  : "Cargando..."}
              </Typography>
            </Box>
          </Box>
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
          Aquí puede seleccionar la fecha y hora de su consulta con el
          especialista. Utilice el calendario para elegir el día y la hora que
          mejor se ajuste a su disponibilidad para agendar su cita médica en
          línea.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Calendar
            onChange={(date) => {
              setSelectedDate(date);
              setHorarioSeleccionado(null); 
            }}
            value={selectedDate}
            sx={{ width: "100%", maxWidth: 400 }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Horarios Disponibles:</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1 }}>
            {horariosDisponibles.length > 0 ? (
              horariosDisponibles.map((horario, index) => (
                <Button
                  key={index}
                  variant={horarioSeleccionado === horario ? "contained" : "outlined"}
                  sx={{ marginBottom: 1, width: '100%' }}
                  onClick={() => handleHorarioSeleccionado(horario)}
                >
                  {horario}
                </Button>
              ))
            ) : (
              <Typography variant="body2">No hay horarios disponibles para este día.</Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#13315c" }}
            disabled={!selectedDate || !horarioSeleccionado}
          >
            Agendar Cita
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default GestionOnline;
