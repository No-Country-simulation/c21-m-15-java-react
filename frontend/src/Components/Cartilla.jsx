import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';

const Cartilla = () => {
  const [cartillas, setCartillas] = useState([]);

  const medicos = async () => {
    const URL = '/cartilla.json';  
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setCartillas(response.data); 
      } else {
        console.error("Los datos no son un array", response.data);
      }
    } catch (error) {
      console.error("Error al obtener los datos de la cartilla:", error);
    }
  };

  useEffect(() => {
    medicos();
  }, []);

  if (!Array.isArray(cartillas) || cartillas.length === 0) {
    return <Typography>No se encontraron datos de la cartilla.</Typography>; // Mostrar mensaje si no hay datos
  }

  return (
    <Box>
      <Typography variant='h3'
      sx={{fontFamily: 'roboto serif',
        margin: '2rem',
        textAlign: 'center'
      }}
      >Cartilla Médica</Typography>
      <Box className="cartilla-list">
        {cartillas.map((cartilla) => (
          <Card key={cartilla.id} sx={{ display: 'flex', margin: '1rem', boxShadow: '1px 1px 3px #134074' }}>
            <CardMedia
              component='img'
              sx={{
                maxWidth: '20%',
                objectFit: 'contain',
              }}
              image={cartilla.img}
              alt={cartilla.nombre}
            />
            <Box sx={{ padding: '1rem' }}>
              <Typography variant='h6'>{cartilla.nombre}</Typography>
              <Typography>
                <strong>Especialidad:</strong> {cartilla.categoria}
              </Typography>
              <Typography>{cartilla.descripcion}</Typography>
              <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "10px", backgroundColor: "#134074" }}>
              Contactar
            </Button>
            </Box>
            
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Cartilla;
