import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardMedia, Typography, TextField } from '@mui/material';

const Cartilla = () => {
  const [cartillas, setCartillas] = useState([]);
  const [categoriaBuscada, setCategoriaBuscada] = useState('');

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
    return <Typography>No se encontraron datos de la cartilla.</Typography>; 
  }

  const cartillasFiltradas = cartillas.filter(cartilla =>
    cartilla.categoria.toLowerCase().includes(categoriaBuscada.toLowerCase())
  );

  return (
    <Box>
      <Typography variant='h3'
      sx={{fontFamily: 'roboto serif',
        marginTop: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        textShadow: '1px 1px 2px #134074'
      }}
      >Cartilla Médica
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', padding: '0 2rem' }}>
        <TextField
          label="Buscar por categoría"
          variant="outlined"
          value={categoriaBuscada}
          onChange={(e) => setCategoriaBuscada(e.target.value)}
          sx={{ marginRight: '1rem', width: '300px', fontFamily:'roboto serif'}}  
        />
      </Box>


      <Box className="cartilla-list">
        {cartillasFiltradas.map((cartilla) => (
          <Card
          key={cartilla.id}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, 
            margin: '1rem',
            boxShadow: '1px 1px 3px #134074'
          }}
        >
          <CardMedia
            component='img'
            sx={{
              maxWidth: { xs: '100%', md: '20%' }, 
              objectFit: 'contain',
            }}
            image={cartilla.img}
            alt={cartilla.nombre}
          />
          <Box sx={{ padding: '1rem' }}>
            <Typography variant='h6'
              sx={{ fontFamily: 'roboto serif', color: '#13315c', fontWeight: 'bold' }}
            >
              {cartilla.nombre}
            </Typography>
            <Typography>
              <strong>Especialidad:</strong> {cartilla.categoria}
            </Typography>
            <Typography>{cartilla.descripcion}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "10px", backgroundColor: "#134074" }}
            >
              Pedir Turno
            </Button>
          </Box>
        </Card>
        
         
        ))}
      </Box>
    </Box>
  );
};

export default Cartilla;
