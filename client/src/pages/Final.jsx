import * as React from 'react';
import {CssBaseline,Container,Paper,Typography,Box,Button}from'@mui/material/'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpdateProfile from './UpdateProfile';

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