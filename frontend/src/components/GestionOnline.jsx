import { Box, Typography, CardMedia, Button, Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useTelemedicina from "../hooks/useTelemedicina";

const GestionOnline = () => {
  const { handleSubmit, setSelectedDate, selectedDate } = useTelemedicina();

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
              BoxShadow: 3,
            }}
          >
            Medico
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 3,
              padding: 1,
              borderRadius: 1,
            }}
          >
            Dr. John Doe
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
          }}
        >
          <CardMedia
            component="img"
            image="/ruta/a/la/imagen.jpg"
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
            <Typography variant="body1">Especialidad</Typography>
            <Typography variant="body2">
              Médico especialista en cardiología con 10 años de experiencia.
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
          <Typography
            variant="body2"
            sx={{
              padding: 1,
              borderRadius: 1,
            }}
          >
            Programar cita:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              padding: 1,
              borderRadius: 1,
            }}
          >
            Siguiente disponibilidad:
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
            BoxShadow: 3,
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
