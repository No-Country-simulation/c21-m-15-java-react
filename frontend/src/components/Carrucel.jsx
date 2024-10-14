import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, CardMedia, Typography, Button } from "@mui/material";
import atencionTelefonica from "../assets/atencion.jpg";
import historial from "../assets/historial.jpg";
import telemedicina from "../assets/telemedicina.jpg";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";


export default function Carrucel() {
    const images = [atencionTelefonica, historial, telemedicina];
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
  
    // Flecha Siguiente
    function NextArrow(props) {
      return (
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            zIndex: 1,
            cursor: "pointer",
            opacity: 0.8,
          }}
          onClick={props.onClick}
        >
          <ArrowCircleRightIcon sx={{ fontSize: "40px", color: "white" }} />
        </Box>
      );
    }
  
    // Flecha Anterior
    function PrevArrow(props) {
      return (
        <Box
          sx={{
            position: "absolute",
            left: "10px",
            top: "50%",
            zIndex: 1,
            cursor: "pointer",
            opacity: 0.8,
          }}
          onClick={props.onClick}
        >
          <ArrowCircleLeftIcon sx={{ fontSize: "40px", color: "white" }} />
        </Box>
      );
    }
  
    return (
      <Box sx={{ width: "100%", height: "60vh", backgroundColor: "#F8F9FA" }}>
        <Slider {...settings} sx={{ width: "100%"}}>
          {images.map((src, index) => (
            <Box key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "60vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={src}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition:"center",
                 }}
                  alt={`Imagen ${index + 1}`}
                />
              
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "60vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                />
  
                {/* Texto y botón que cambian de tamaño en móvil */}
                {src === telemedicina && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: { xs: "50%", sm: "20px" }, 
                      left: { xs: "50%", sm: "10%" }, 
                      transform: { xs: "translate(-50%, 50%)", sm: "none" }, 
                      textAlign: { xs: "center", sm: "left" },
                      top: { sm: "20%", xs: "none" },
                      color: "white",
                      width: {
                        xs: "90%",
                        sm: "60%",
                        md: "40%",
                        lg: "25%",
                      },
                      zIndex: 2,
                    }}
                  >
                    <Typography variant="h4" gutterBottom>
                      Consulta con tu médico en vivo, desde donde estés.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Salud a un clic de distancia.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "10px", backgroundColor: "#134074" }}
                    >
                      Conéctate ahora
                    </Button>
                  </Box>
                )}
  
                {src === atencionTelefonica && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: { xs: "50%", sm: "20px" }, 
                      left: { xs: "50%", sm: "10%" }, 
                      transform: { xs: "translate(-50%, 50%)", sm: "none" }, 
                      top: { sm: "20%", xs: "none" },
                      textAlign: { xs: "center", sm: "left" },
                      color: "white",
                      width: {
                        xs: "75%",
                        sm: "60%",
                        md: "40%",
                        lg: "25%",
                      },
                      zIndex: 2,
                    }}
                  >
                    <Typography variant="h4" gutterBottom>
                      Accede a médicos disponibles
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      para consultas rápidas o programadas.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "10px", backgroundColor: "#134074" }}
                    >
                      Reserva tu cita
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    );
  }


