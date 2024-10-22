import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardMedia, Typography, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Cartilla = () => {
  const [cartillas, setCartillas] = useState([]);
  const [categoriaBuscada, setCategoriaBuscada] = useState('');
  const [loading, setLoading] = useState(true);
  

  const medicos = async () => {
    const URL = 'http://localhost:8080/api/medics'; 
    console.log(URL); 
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setCartillas(response.data); 
        
      } else {
        console.error("Los datos no son un t", response.data);
      }
    } catch (error) {
      console.error("Error al obtener los datos de la cartilla:", error);
    }finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    medicos();
  }, []);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (!Array.isArray(cartillas) || cartillas.length === 0) {
    return <Typography>No se encontraron datos de la cartilla.</Typography>; 
  }

  const cartillasFiltradas = cartillas.filter(cartilla =>
    cartilla.speciality.toLowerCase().includes(categoriaBuscada.toLowerCase())
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


      <Box className="cartilla-list"  
      >
        {cartillasFiltradas.map((cartilla) => (
          <Card
          key={cartilla.id}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, 
            margin: '2rem',
            boxShadow: '1px 1px 3px #134074'
          }}
        >
          <CardMedia
            component='img'
            sx={{
              maxWidth: { xs: '100%', md: '20%' }, 
              objectFit: 'contain',
            }}
            image={cartilla.picture}
            alt={cartilla.name}
          />
          <Box sx={{ padding: '1rem' }}>
            <Typography variant='h6'
              sx={{ fontFamily: 'roboto serif', color: '#13315c', fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem', lg: '2rem', xl: '2.2rem' }
               }}
            >
              {cartilla.name}
            </Typography>
            <Typography
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem', xl: '1.3rem' }, 
            }}
            >
              <strong>Especialidad:</strong> {cartilla.speciality}
            </Typography>
            <Typography variant='body2'
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem', xl: '1.3rem' } 
            }}
            >{cartilla.description}</Typography>
            <Link  to={`/gestion-online/${cartilla.id}`}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "10px", backgroundColor: "#134074" }}
                      
            >
              Solicitar Turno
            </Button>
            </Link>
          </Box>
        </Card>
        
         
        ))}
      </Box>
    </Box>
  );
};

export default Cartilla;

