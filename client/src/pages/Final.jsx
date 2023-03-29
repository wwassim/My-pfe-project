import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpdateProfile from './UpdateProfile';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const theme = createTheme();

const Final =()=> {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Info Update
          </Typography>
            <React.Fragment>
                <UpdateProfile />
                <Box  sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button    variant="contained"  sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                </Box>
            </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default Final