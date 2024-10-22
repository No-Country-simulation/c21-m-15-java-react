import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Button, Container, Select, MenuItem, FormControl, InputLabel, List, ListItem, } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useTelemedicina from "../hooks/useTelemedicina";
import { useParams } from "react-router-dom";
import axios from "axios";
import { es } from "date-fns/locale";

const GestionOnline = () => {
  const { handleSubmit, setSelectedDate, selectedDate } = useTelemedicina();
  const [medicos, setMedicos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState({});
  const { id } = useParams();

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

  useEffect(() => {
    if (medicosFiltrados.length > 0) {
      setMedicoSeleccionado(medicosFiltrados[0]);
    }
  }, [categoria, medicos]);

  const shouldDisableDate = (date) => {
    const dayOfWeek = format(date, "EEEE", { locale: es }); // Obtener el día de la semana en español
    if (medicoSeleccionado && medicoSeleccionado.daysOfAttention) {
      return !medicoSeleccionado.daysOfAttention.includes(dayOfWeek);
    }
    return false;
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
                backgroundColor: medicoSeleccionado.id === doc.id ? "rgba(0, 123, 255, 0.1)" : "transparent",
              }}
            >
              <Typography variant="body1">{doc.name}</Typography>
            </ListItem>
          ))}
        </List>

        {medicoSeleccionado && (
          <Box sx={{ marginTop: "20px" }}>

            <Typography variant="body1" sx={{ color: "#134074", fontWeight: "bold" }}>
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
                <Typography variant="body1">{medicoSeleccionado.speciality || "Cargando..."}</Typography>
                <Typography variant="body2">{medicoSeleccionado.description || "Cargando..."}</Typography>
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
                <strong>Dias de atención:</strong>{" "}
                {medicoSeleccionado.daysOfAttention ? medicoSeleccionado.daysOfAttention.join(", ") : "Cargando..."}
              </Typography>
              <Box>
              <Typography variant="body2">
                <strong>Horarios:</strong>
                {medicoSeleccionado.openingHours ? (
                  Object.keys(medicoSeleccionado.openingHours).length > 0 ? (
                    Object.entries(medicoSeleccionado.openingHours).map(([dayOfWeek, hours]) => (
                      <Typography key={dayOfWeek} variant="body2" component="div" sx={{ color: "#134074" }}>
                        {dayOfWeek}: {hours.startTime} - {hours.endTime}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No hay horarios disponibles.</Typography>
                  )
                ) : (
                  <Typography variant="body2">Cargando horarios...</Typography>
                )}
              </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flex: 2,
          padding: 2,
          boxShadow: 3,
        }}
      >
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
          Aquí puede seleccionar la fecha y hora de su consulta con el especialista. Utilice el calendario para elegir el día y la hora que mejor se ajuste a su disponibilidad para agendar su cita médica en línea.
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns} locale= {es}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            shouldDisableDate={shouldDisableDate}
            sx={{
              ".MuiPickersCalendarHeader-label": {
                color: "#13315c",
                fontWeight: "bold",
              },
              ".MuiPickersArrowSwitcher-root button": {
                color: "#007BFF",
                "&:hover": {
                  color: "orange",
                },
              },
              ".Mui-selected": {
                backgroundColor: "#13315c",
                color: "white",
              },
              ".Mui-selected:hover": {
                backgroundColor: "#13315c",
              },
            }}
          />
        </LocalizationProvider>

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











