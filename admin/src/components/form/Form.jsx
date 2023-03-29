import { useEffect } from "react";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { insertUser,updateUser,cleanUser } from "../../redux/userSlice";

const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.')
});


const Form = ({itemId,isupdate}) => {
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch()
 
  useEffect(()=>{
    return()=>{
      dispatch(cleanUser())
    }
  },[dispatch])

  const formik = useFormik({
    initialValues: {
      firstname: itemId? itemId?.firstname : '',
      lastname: itemId? itemId?.lastname : '',
      email: itemId? itemId?.email : '',
      password:itemId? itemId?.password : '',
    },
    validationSchema:checkoutSchema,
    onSubmit: (values) => {
      const userData={
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password:values.password,
      }     
        dispatch(insertUser(userData))
        .unwrap()
        .then(() => {
          navigate("/team");
        })
        .catch((error) => {
          console.log(error);
        });      
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
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                error={!!formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>

    </Box>
  );
};




export default Form;