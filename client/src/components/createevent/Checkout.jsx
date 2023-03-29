import * as React from 'react';
import{CssBaseline,AppBar,Box,Container,Toolbar,Paper,Stepper,Step,StepLabel,Button,Link,Typography} from'@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useNavigate } from "react-router-dom";




const steps = ['Organizateur', 'Event details', 'Tickets'];


const theme = createTheme();

export default function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({price:'',ticketsnumber:''})
  


  const handleSubmit = async (e) => {
    const {price,ticketsnumber} = data
    e.preventDefault();
    console.log(data)
    navigate("/")
    }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const getStepContent= (step)=> {
    switch (step) {
      case 0:
        return <AddressForm data={data} setData={setData}/>;
      case 1:
        return <PaymentForm data={data} setData={setData}/>;
      case 2:
        return <Review data={data} setData={setData}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Your Event
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                 {activeStep === steps.length - 1 ? (
                    <Button
                    variant="contained"
                    onClick={(e) => {handleSubmit(e)}}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Validation
                  </Button>
                 ):(
                  <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
                 ) }
                
              </Box>
            </React.Fragment>
          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}