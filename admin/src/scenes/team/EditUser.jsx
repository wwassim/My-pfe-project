import { Box, Button, IconButton, Typography, TextField,useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect } from "react";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { updateUser,cleanUser } from "../../redux/userSlice";
import useUserDetails from "../../Hooks/use-user-details"
////////////////////////////////:
const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
  });




const EditUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const{user}=useUserDetails();
    useEffect(()=>{
        return()=>{
          dispatch(cleanUser())
        }
      },[dispatch])
    
      const formik = useFormik({
        initialValues: {
          firstname: user?user?.firstname: '',
          lastname:user?user?.lastname: '',
          email: user?user?.email:'',
          password:user?user?.password:'',
        }, enableReinitialize: true,
        validationSchema:checkoutSchema,
        onSubmit: (values) => {
          const _id=user._id
          const userData={
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
          }
          dispatch( updateUser({_id,...userData}))
          .unwrap()
          .then(() => navigate("/team"));
        },
        
        
    }) 
 
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />   
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={formik.handleBlur}
                name="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                error={!!formik.touched.firstname && !!formik.errors.firstname}
                helperText={formik.touched.firstname && formik.errors.firstname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastname}
                name="lastname"
                error={!!formik.touched.lastname && !!formik.errors.lastname}
                helperText={formik.touched.lastname && formik.errors.lastname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                 onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                error={!!formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>

    </Box>
  )
}

export default EditUser