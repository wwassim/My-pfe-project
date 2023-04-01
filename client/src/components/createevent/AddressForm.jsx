import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AddressForm({formData, setData}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Organizateur details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // onChange={(e) => setData({...data, firstName: e.target.value})}
            // value={data.firstName}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // onChange={(e) => setData({...data, lastName: e.target.value})}
            //  value={data.lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            // onChange={(e) => setData({...data, email: e.target.value})}
            // value={data.email}
            id="email"
            name="email"
            label="Email address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            required
            id="rib"
            name="rib"
            label="Rib"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}