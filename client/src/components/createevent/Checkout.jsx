import * as React from 'react';
import * as Yup from 'yup';
import{CssBaseline,AppBar,Box,Container,Toolbar,Paper,Button,Link,Typography,TextField,Grid} from'@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Search } from "@material-ui/icons";
//
import 'react-phone-number-input/style.css'
//import 'react-phone-input-2/lib/material.css'
import {useFormik } from "formik";
import PhoneInput,{isPossiblePhoneNumber,isValidPhoneNumber,formatPhoneNumberIntl   } from 'react-phone-number-input'
//import PhoneInput from 'react-phone-input-2'
import MuiPhoneNumber from 'material-ui-phone-number';

const theme = createTheme();
const validationSchema = Yup.object().shape({
  rib: Yup.string().required('Le RIB est requis').matches(/[0-9]{2}[A-Z]{2}[0-9]{5}[0-9A-Z]{11}[0-9]{2}/, 'Le RIB est invalide'),
  eventtitle:Yup.string().required("required"),
  location: Yup.string().required("Location is required")
});
const verifyLocation = async (location) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDUDLFe5NHdgDkLCPQOkVA5tqMVspAuhKc`
    );
    const data = await response.json();
    if (data.status === "OK") {
      console.log("Location exists");
    } else {
      console.log("Location does not exist");
    }
  } catch (error) {
    console.error(error);
  }
};

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setData] = React.useState({price:'',ticketsnumber:'',file:null,phone:"",eventtitle:"",})
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { file, price, ticketsnumber,phone } = formData;
  //   const formDataToSend  = new FormData();
  //   formDataToSend.append('file', file);
  //   formDataToSend.append('price', price);
  //   formDataToSend.append('ticketsnumber', ticketsnumber);    
  //   formDataToSend.append('phone', phone);    
  //   console.log(formData)
  //   // navigate("/")
  //   }


    const formik = useFormik({
      initialValues: {
         file:"",
         phone:"",
         rib: '',
         price:null,
         ticketsnumber:null,
         eventtitle:"",
         location:"",
        },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit : async (e) => {
        e.preventDefault();
        const { file, price, ticketsnumber,phone } = formData;
        const formDataToSend  = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('price', price);
        formDataToSend.append('ticketsnumber', ticketsnumber);    
        formDataToSend.append('phone', phone);    
        console.log(formData)
        // navigate("/")
        }
    })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Your Event
          </Typography>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Tickets
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  {/* Organisateur */}
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="id card"
                          type="file"
                          name="id card"
                          label="Id card"
                          fullWidth
                          autoComplete="shipping address-line2"
                          focused 
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="id card"
                          type="file"
                          name="id card"
                          label="Id card"
                          fullWidth
                          autoComplete="shipping address-line2"
                          focused 
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="id card"
                          type="file"
                          name="id card"
                          label="Id card"
                          fullWidth
                          autoComplete="shipping address-line2"
                          focused 
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <PhoneInput
                      id="phone"
                      name="phone"
                      label="phone"
                      placeholder="Enter phone number"
                      defaultCountry="TN"
                      />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="RIB"
                          name="rib"
                          error={formik.touched.rib && formik.errors.rib}
                          helperText={formik.touched.rib && formik.errors.rib}
                          variant="standard"
                          fullWidth
                        />
                      </Grid> 
                      
                  {/* Event */}

                  <Grid item xs={12} sm={4}>
                        <TextField
                          label="Event Title"
                          name="eventtitle"
                          error={formik.touched.eventtitle && formik.errors.eventtitle}
                          helperText={formik.touched.eventtitle && formik.errors.eventtitle}
                          variant="standard"
                          fullWidth
                        />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                        <TextField
                          label="Category"
                          name="category"
                          error={formik.touched.eventtitle && formik.errors.eventtitle}
                          helperText={formik.touched.eventtitle && formik.errors.eventtitle}
                          variant="standard"
                          fullWidth
                        />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                        <TextField
                          label="Artist"
                          name="Artist"
                          error={formik.touched.eventtitle && formik.errors.eventtitle}
                          helperText={formik.touched.eventtitle && formik.errors.eventtitle}
                          variant="standard"
                          fullWidth
                        />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                       options={"top100Films","top100Films"}
                       getOptionLabel={(option) => option}
                      renderInput={() => (
                        <TextField  label="limitTags" placeholder="Favorites" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.errors.location && formik.touched.location}
                    helperText={formik.errors.location && formik.touched.location && formik.errors.location}
                    InputProps={{
                      endAdornment: (
                        <Search
                          color="primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            verifyLocation(formik.values.location);
                            console.log(formik.values.location)
                          }}
                    />
                     ),
                    }}
                    />
                  </Grid>
                  {/* Ticket */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="price"
                      name="price"
                      label="Price"
                      // onChange={handleInputChange}
                      value={formData.price}
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="ticketsnumber"
                      name="ticketsnumber"
                      label="Nember of tickets"
                      // onChange={handleInputChange}
                      value={formData.ticketsnumber}
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      type="file"
                      id="file"
                      name="file"
                      label="file"
                      // onChange={handleFileChange}
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      />
                  </Grid>
                  <Grid item xs={9} >
                  {/*<MuiPhoneNumber
                  id="phone"
                  name="phone"
                  label="phone"
                  defaultCountry={'tn'}
                  disableAreaCodes
                  //  onChange={handleInputChange}
                  value={formData.phone}
                  //component={TextField}
                  variant="standard"
                  />*/}
                  </Grid>  
                </Grid>
            </form>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}