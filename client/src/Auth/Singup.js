import * as React from 'react';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@material-ui/icons";
//
import { useState,useEffect } from 'react';
import {useSelector,useDispatch}from'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../redux/auth/authSlice'
import {io} from "socket.io-client";
import * as Yup from 'yup';

const socket = io("ws://localhost:8900");

const theme = createTheme();

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.')
});





const Singup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user,  isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { firstname, lastname, email, password } = values;
      const userData = {
        firstname,
        lastname,
        email,
        password,
      };
      dispatch(register(userData));
      socket.emit("newUser", email);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstname && formik.errors.firstname}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastname && formik.errors.lastname}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  autoComplete="family-name"
                />
              </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
              />
            </Grid>

             <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item component={Link} to="/auth" variant="body2">
                
                  Already have an account? Sign in
                
              </Grid>
            </Grid>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Singup