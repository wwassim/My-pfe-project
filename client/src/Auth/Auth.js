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
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
//
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from'../redux/auth/authSlice'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.')
});

const theme = createTheme();

const Auth=()=>{
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    console.log(isError)
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
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const {  email, password } = values;
      const userData = {
        email,
        password,
      };
      dispatch(login(userData))
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
            Sign in
          </Typography>
         
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs component={Link} to="/auth/reset" variant="body2">            
                  Forgot password?     
              </Grid>
              <Grid item component={Link} to="/auth/singup" variant="body2">
                  "Don't have an account? Sign Up"
              </Grid>
            </Grid>
          </Box>
        </Box>     
      </Container>
    </ThemeProvider>
  );
}

export default Auth;