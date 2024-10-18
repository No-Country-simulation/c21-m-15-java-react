import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Button, Container, Select, MenuItem, FormControl, InputLabel, List, ListItem, } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useTelemedicina from "../hooks/useTelemedicina";
import { useParams } from "react-router-dom";
import axios from "axios";

const GestionOnline = () => {
  const { handleSubmit, setSelectedDate, selectedDate } = useTelemedicina();
  const [medicos, setMedicos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState({});
  const { Id } = useParams();

  useEffect(() => {
    const fetchMedicoData = async () => {
      try {
        const response = await axios.get("/cartilla.json");
        const medicosData = response.data;
        setMedicos(medicosData);

        // Si hay un médico seleccionado por ID, seleccionarlo, sino, seleccionar el primero
        if (Id) {
          const medicoEncontrado = medicosData.find((doc) => doc.Id === parseInt(Id));
          if (medicoEncontrado) {
            setMedicoSeleccionado(medicoEncontrado);
            setCategoria(medicoEncontrado.Speciality);
          } else {
            console.error("Médico no encontrado");
          }
        } else if (medicosData.length > 0) {
          setMedicoSeleccionado(medicosData[0]);
          setCategoria(medicosData[0].Speciality);
        }
      } catch (error) {
        console.error("Error al cargar los datos del médico:", error);
      }
    };

    fetchMedicoData();
  }, [Id]);

  const medicosFiltrados = categoria
    ? medicos.filter((doc) => doc.Speciality === categoria)
    : medicos; 

  const categoriasDisponibles = [...new Set(medicos.map((doc) => doc.Speciality))];

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
              key={doc.Id}
              onClick={() => setMedicoSeleccionado(doc)}
              sx={{
                cursor: "pointer",
                backgroundColor: medicoSeleccionado.Id === doc.Id ? "rgba(0, 123, 255, 0.1)" : "transparent",
              }}
            >
              <Typography variant="body1">{doc.Name}</Typography>
            </ListItem>
          ))}
        </List>

        {medicoSeleccionado && medicoSeleccionado.Id && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="body1" sx={{ color: "#134074", fontWeight: "bold" }}>
              {medicoSeleccionado.Name || "Cargando..."}
            </Typography>

            <Box
              sx={{
                display: "flex",
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
                image={medicoSeleccionado.Picture || "/ruta/a/la/imagen.jpg"}
                sx={{
                  width: 150,
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
                <Typography variant="body1">{medicoSeleccionado.Speciality || "Cargando..."}</Typography>
                <Typography variant="body2">{medicoSeleccionado.Description || "Cargando..."}</Typography>
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
                {medicoSeleccionado.DaysOfAttention ? medicoSeleccionado.DaysOfAttention.join(", ") : "Cargando..."}
              </Typography>
              <Typography variant="body2" sx={{ padding: 1, borderRadius: 1 }}>
                <strong>Horarios:</strong>
                {medicoSeleccionado.OpeningHours ? (
                  Object.keys(medicoSeleccionado.OpeningHours).length > 0 ? (
                    Object.keys(medicoSeleccionado.OpeningHours).map((dia) => (
                      <Typography key={dia} variant="body2" sx={{ color: "#134074" }}>
                        {dia}: {medicoSeleccionado.OpeningHours[dia]}
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
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



