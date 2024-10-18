import { Card, CardContent, CardMedia, Container, Typography, Stack, Box } from "@mui/material";

const cardEspecialidades = [
  {
    id: 10,
    title: 'Clínica Medica',
    imagen: '/imagenes/clinica-medica.jpg'
  },
  {
    id: 11,
    title: 'Pediatría',
    imagen: '/imagenes/pediatria.jpeg'
  },
  {
    id: 12,
    title: 'Cardiología',
    imagen: '/imagenes/cardio2.jpg'
  },
  {
    id: 13,
    title: 'Dermatología',
    imagen: '/imagenes/dermato2.jpg'
  },
  {
    id: 14,
    title: 'Nutrición',
    imagen: '/imagenes/nutricion.jpg'
  },
  {
    id: 15,
    title: 'Psicología',
    imagen: '/imagenes/Psicologia.jpg'
  },
];

const NuestrasEspecialidades = () => {
  return (
    <Container>
      <Typography 
        variant="h3"
        sx={{
          textAlign: 'center',
          marginTop: '50px',
          marginBottom: '50px',
          fontFamily: 'roboto serif',
          textShadow: '1px 1px 2px #134074',
        }}
      >
        Nuestras Especialidades
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',  
          justifyContent: 'center',
          gap: '20px',      
        }}
      >
        {cardEspecialidades.map((especialidad) => (
          <Box 
            key={especialidad.id}
            sx={{
              flexBasis: { xs: '100%', sm: 'calc(50% - 20px)', md: 'calc(33.33% - 20px)' },
              boxSizing: 'border-box',
              boxShadow: '1px 1px 5px #134074',
              borderRadius: '10px',
              backgroundColor:'#8DA9C4'
            }}
          >
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: "space-around", padding: '10px' }}>
              <CardMedia
                component='img'
                height='100'
                width='100%'
                image={especialidad.imagen}
                alt={especialidad.title}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: 'roboto',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'black',
                  }}
                >
                  {especialidad.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default NuestrasEspecialidades;

