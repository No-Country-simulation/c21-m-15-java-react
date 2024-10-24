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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import useTelemedicina from "../hooks/useTelemedicina";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./userProvider";

const GestionOnline = () => {
  const { user } = useContext(userContext);

  const { setSelectedDate, selectedDate } = useTelemedicina();
  const [medicos, setMedicos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [linkTurno, setLinkTurno] = useState("");

  // Cargar los médicos desde la API
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
    if (medicoSeleccionado === null && medicosFiltrados.length > 0) {
      setMedicoSeleccionado(medicosFiltrados[0]);
    } else if (medicosFiltrados.length === 0) {
      setMedicoSeleccionado(null);
    }
  }, [categoria, medicos]);

  useEffect(() => {
    if (medicoSeleccionado && medicoSeleccionado.openingHours && selectedDate) {
      const dayOfWeek =
        selectedDate
          .toLocaleString("es-ES", { weekday: "long" })
          .charAt(0)
          .toUpperCase() +
        selectedDate.toLocaleString("es-ES", { weekday: "long" }).slice(1);

      const horarios = medicoSeleccionado.openingHours.filter(
        (hour) => hour.dayOfWeek === dayOfWeek
      );

      if (horarios.length > 0) {
        const startHour = parseInt(horarios[0].startTime.split(":")[0]);
        const endHour = parseInt(horarios[0].endTime.split(":")[0]);

        const availableHours = [];
        for (let hour = startHour; hour < endHour; hour++) {
          availableHours.push(`${hour.toString().padStart(2, "0")}:00`);
        }

        setHorariosDisponibles(availableHours);
      } else {
        setHorariosDisponibles([]);
      }
    } else {
      setHorariosDisponibles([]);
    }
  }, [medicoSeleccionado, selectedDate]);

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
      6: "Sábado",
    };

    const dayOfWeek = date.getDay();
    const dayName = daysInSpanish[dayOfWeek];

    const isAvailableDay = medicoSeleccionado.openingHours.some(
      (horario) => horario.dayOfWeek === dayName
    );

    return !isAvailableDay;
  };

  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const tileClassName = ({ date }) => {
    const day = date.getDay();
    return day === 0 || day === 6 ? "red-tile" : null;
  };

  const handleCita = () => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    const tempRoomId = `${user.username}-${user.id}_t${randomNumber}`;
    const link = `${window.location.origin}/vl/${tempRoomId}`;
    setLinkTurno(link);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    setSelectedDate(null);
    setHorarioSeleccionado(null);
    setMedicoSeleccionado(null);
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
              setMedicoSeleccionado(null);
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
                  medicoSeleccionado?.id === doc.id
                    ? "rgba(0, 123, 255, 0.1)"
                    : "transparent",
              }}
            >
              <Typography variant="body1">{doc.name}</Typography>
            </ListItem>
          ))}
        </List>

        {medicoSeleccionado ? (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="body1"
              sx={{ color: "#134074", fontWeight: "bold" }}
            >
              {medicoSeleccionado.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
                justifyContent: "center",
                gap: 2,
                height: "auto",
                boxShadow: 3,
                padding: 1,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={medicoSeleccionado.picture || "/ruta/a/la/imagen.jpg"}
                  sx={{
                    width: { xs: "100%", md: 150 },
                    height: "auto",
                    maxWidth: 150,
                    borderRadius: "50%",
                    border: "4px solid rgba(128, 128, 128, 0.5)",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="body1">
                  {medicoSeleccionado.speciality}
                </Typography>
                <Typography variant="body2">
                  {medicoSeleccionado.description}
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
              <Typography variant="body2">
                <strong>Horarios:</strong>
              </Typography>
              {medicoSeleccionado.openingHours &&
              medicoSeleccionado.openingHours.length > 0 ? (
                medicoSeleccionado.openingHours.map((horario, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ color: "#134074" }}
                  >
                    {horario.dayOfWeek}: {horario.startTime} - {horario.endTime}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay horarios disponibles.
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">
            Seleccione un médico para ver los detalles.
          </Typography>
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
          especialista.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Calendar
            locale="es"
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setHorarioSeleccionado(null);
            }}
            tileDisabled={({ date }) => shouldDisableDate(date)}
            tileClassName={tileClassName}
            formatDay={(locale, date) => format(date, "d", { locale: es })}
            minDate={new Date()}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Horarios Disponibles:</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 1,
            }}
          >
            {horariosDisponibles.length > 0 ? (
              horariosDisponibles.map((horario, index) => (
                <Button
                  key={index}
                  variant={
                    horarioSeleccionado === horario ? "contained" : "outlined"
                  }
                  sx={{ marginBottom: 1, width: "100%" }}
                  onClick={() => handleHorarioSeleccionado(horario)}
                >
                  {horario}
                </Button>
              ))
            ) : (
              <Typography variant="body2">
                No hay horarios disponibles para este día.
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCita}
            sx={{ backgroundColor: "#13315c" }}
            disabled={!selectedDate || !horarioSeleccionado}
          >
            Agendar Cita
          </Button>
        </Box>

        {/* Modal for success message */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth={false}
        >
          <DialogTitle>Reserva Exitosa</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {selectedDate && horarioSeleccionado
                ? `Su cita ha sido reservada exitosamente para el ${format(
                    selectedDate,
                    "PPP",
                    { locale: es }
                  )} a las ${horarioSeleccionado} hs. En el día y horario del turno podrá ingresar a la sala de espera mediante el siguiente enlace (se lo enviaremos también por correo electrónico): ${linkTurno}`
                : "Ocurrió un error al procesar su reserva."}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default GestionOnline;
