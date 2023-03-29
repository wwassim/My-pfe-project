import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Formik} from "formik";



export default function Review({data, setData}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tickets
      </Typography>
    <Formik initialValues={data} >
    {({setFieldValue,}) => (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>

          <TextField
            required
            id="price"
            name="price"
            label="Price"
            onChange={(e) => setData({...data, price: e.target.value})}
            value={data.price}
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
            onChange={(e) => setData({...data, ticketsnumber: e.target.value})}
            value={data.ticketsnumber}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ticketsnumber"
            name="ticketsnumber"
            label="Nember of tickets"
            onChange={(e) => setData({...data, ticketsnumber: e.target.value})}
            value={data.ticketsnumber}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
      </Grid>
       )}
      </Formik>
    </React.Fragment>
  );
}