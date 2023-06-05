import * as React from 'react';
import {CssBaseline,Container,Paper,Typography,Box,Button}from'@mui/material/'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpdateProfile from './UpdateProfile';
import Navbar from '../components/utility/NavBar';
import Sidebar from '../components/utility/Sidebar';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Final =()=> {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar/>
      <div className="flex flex-col flex-1">
              <div className="flex-1 p-4 min-h-0 overflow-auto">
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                      <Typography component="h1" variant="h4" align="center">
                        Update Profile
                      </Typography>
                        <React.Fragment>
                            <UpdateProfile />
                        </React.Fragment>
                    </Paper>
                  </Container>
                </ThemeProvider>
              </div>
      </div>
    </div>
  );
}
export default Final