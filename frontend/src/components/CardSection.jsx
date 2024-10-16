import { Link } from 'react-router-dom';
import { Container, Card, CardContent, CardMedia, Typography, Button, CardActions, Stack } from '@mui/material';


const cardsData = [
  {
    id: 1,
    title: 'Cartilla Medica',
    image: '/imagenes/cartilla.jpeg',
    description: 'Contamos con una amplia cartilla medica con diversas especialidades.                                   ',
    buttonLabel: 'Más información',
    route: '/cartilla',
  },
  {
    id: 2,
    title: 'Video Consultas',
    image: '/imagenes/videoLlamada.jpeg',
    description: 'A través de videollamadas, los usuarios pueden recibir diagnósticos y tratamientos sin necesidad de desplazarse a una clínica o consultorio.',
    buttonLabel: 'Más Información',
    route: '/video-consultas',
  },
  {
    id: 3,
    title: 'Gestión Online',
    image: '/imagenes/citaMedica.jpeg',
    description: 'Agendamiento de citas en línea y acceso a historiales médicos digitales',
    buttonLabel: 'Más Información',
    route: '/gestion-online',
  },

];


const CardSection = () => {
  return (
    <Container>
      <Stack direction={{ xs: 'column', sm: 'column', md: 'row'}} spacing={4} justifyContent="center" alignItems="center">
        {cardsData.map((card) => (
          <Card key={card.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '10px',
              border: '1px solid grey',
              width: { xs: '90%', sm: '300px' },
              height: 500,
              flexWrap:'wrap',
              maxWidth: 330,
              boxShadow: 2
            }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                backgroundColor: '#134074',
                padding: '8px',
                fontFamily: 'roboto serif',
                color: 'white',
                textAlign: 'center'
              }}>
              {card.title}
            </Typography>
            <CardMedia
              component="img"
              height="180"
              image={card.image}
              alt={card.title}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                boxShadow: '1px 1px 5px black',
                minHeight: '95px',
                // marginTop: '3px',
                backgroundColor: '#8da9c4'
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontFamily: 'roboto',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'black'
                }}
              >
                {card.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center'}}>
              <Link to={card.route} style={{ textDecoration: 'none' }}>
                <Button
                  size="small"
                  sx={{
                    background: '#13315c',
                    color: 'white',
                    padding: '10'
                  }}
                >
                  {card.buttonLabel}
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};



export default CardSection