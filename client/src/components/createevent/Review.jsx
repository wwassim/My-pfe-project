import 'react-phone-number-input/style.css'
//import 'react-phone-input-2/lib/material.css'
import * as React from 'react';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Formik} from "formik";
import PhoneInput,{isPossiblePhoneNumber,isValidPhoneNumber,formatPhoneNumberIntl   } from 'react-phone-number-input'
//import PhoneInput from 'react-phone-input-2'
import MuiPhoneNumber from 'material-ui-phone-number';


const schema = Yup.object().shape({
  phone: Yup.string().test('isValidPhoneNumber', 'Invalid phone number', (value) => {
    if (!value) {
      return true; // allow empty value
    }
    return PhoneInput.isValidPhoneNumber(value);
  })
});


export default function Review({formData, setData}) {
  const handleFileChange = (event) => {
    setData({
      ...formData,
      file: event.target.files[0]
    });
  };

  const handleInputChange = (event) => {
    setData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tickets
      </Typography>
    <Formik initialValues={formData} validationSchema={schema}   >
    {({setFieldValue,handleBlur,errors, touched,}) => (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>

          <TextField
            required
            id="price"
            name="price"
            label="Price"
            onChange={handleInputChange}
            value={formData.price}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ticketsnumber"
            name="ticketsnumber"
            label="Nember of tickets"
            onChange={handleInputChange}
            value={formData.ticketsnumber}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="file"
            id="file"
            name="file"
            label="file"
            onChange={handleFileChange}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            />
        </Grid>
        <Grid item xs={9} >
        <PhoneInput
        id="phone"
        name="phone"
        label="phone"
         placeholder="Enter phone number"
         defaultCountry="TN"
         onChange={(value) => {
          setData({
            ...formData,
            phone: value
          });
        }}
         value={formData.phone}
         onBlur={handleBlur}
         isPossiblePhoneNumber
         isValidPhoneNumber
         formatPhoneNumberIntl
         component={TextField}
         />
         {errors.phone && touched.phone && <div>{errors.phone}</div>}
        </Grid> 
        {/* <Grid item xs={9} >
        <MuiPhoneNumber
         id="phone"
         name="phone"
         label="phone"
         defaultCountry={'tn'}
         disableAreaCodes
         onChange={handleInputChange}
         value={formData.phone}
        //component={TextField}
        variant="standard"
         />
        </Grid>  */}
      </Grid>
       )}
      </Formik>
    </React.Fragment>
  );
}