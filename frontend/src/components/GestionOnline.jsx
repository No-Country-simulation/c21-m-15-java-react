import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Button, Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useTelemedicina from "../hooks/useTelemedicina";
import { useParams } from "react-router-dom";
import axios from "axios";

const GestionOnline = () => {
  const { handleSubmit, setSelectedDate, selectedDate } = useTelemedicina();
  const [medico, setMedico] = useState({});
  const { id } = useParams();



  useEffect(() => {

    const fetchMedicoData = async () => {
      try {
        const response = await axios.get("/cartilla.json");

        const medicoEncontrado = response.data.find((doc) => doc.id === parseInt(id));
        if (medicoEncontrado) {
          setMedico(medicoEncontrado);
        } else {
          console.error("Médico no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar los datos del médico:", error);
      }
    };

    fetchMedicoData();
  }, [id]);

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
        <Box>
          <Typography
            variant="h5"
            sx={{
              lineHeight: 2,
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              padding: 1,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            Especialista
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 3,
              padding: 1,
              borderRadius: 1,
              color: '#134074',
              fontWeight: 'bold'
            }}
          >
            {medico.nombre || "Cargando..."}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            height: "200px",
            boxShadow: 3,
            padding: 1,
            borderRadius: 2,
            height: 'auto'
          }}
        >
          <CardMedia
            component="img"
            image={medico.img || "/ruta/a/la/imagen.jpg"}
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
            <Typography variant="body1">{medico.categoria || "Cargando..."}</Typography>
            <Typography variant="body2"

            >{medico.descripcion || "Cargando..."}</Typography>
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
          <Typography
            variant="body2"
            sx={{
              padding: 1,
              borderRadius: 1,
            }}
          >
            <strong>Dias de atención:</strong>  {medico.diasDeAtencion ? medico.diasDeAtencion.join(", ") : "Cargando..."}


          </Typography>
          <Typography
            variant="body2"
            sx={{
              padding: 1,
              borderRadius: 1,
            }}
          >
            <strong>Horarios:</strong>
            {medico.horarios ? (
              Object.keys(medico.horarios).length > 0 ? (
                Object.keys(medico.horarios).map((dia) => (
                  <Typography key={dia} variant="body2"
                  sx={{color: '#134074'}}
                  >
                    {dia}: {medico.horarios[dia]}
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



