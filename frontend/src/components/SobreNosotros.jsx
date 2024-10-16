import { Box, Typography } from '@mui/material';

const SobreNosotros = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, 
        padding: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '1px 1px 5px black',
        margin: 5,
        borderRadius: '10px'
      }}
    >
      
      <Box
        sx={{
          flex: 1,
          paddingRight: { md: '2rem' }, 
          marginBottom: { xs: '2rem', md: 0 }, 
          boxShadow: '1px 1px 5px black',
          margin: '25px',
          padding: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom 
        sx={
          {textAlign: 'center',
           fontFamily: 'roboto serif',
           backgroundColor: '#134074',
           color: 'white'
        }}
        >
          Sobre Nosotros
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nuestra app de telemedicina está diseñada para revolucionar la forma en que accedes a la atención médica. Ofrecemos una plataforma segura y fácil de usar que conecta a pacientes con profesionales de la salud desde la comodidad de sus hogares.
        </Typography>
      </Box>

      
      <Box
        component="img"
        sx={{
          flex: 1,
          width: { xs: '90%', sm: '300px' },
          height: 'auto',
          borderRadius: '8px',
          boxShadow: 3,
        }}
        alt="Sobre nosotros"
        src="/imagenes/nosotros.jpeg"
      />
    </Box>
  );
};

export default SobreNosotros;

