import React,{ useEffect, useState } from 'react';
import {Grid,TextField,Typography,Box,Button,Avatar}from'@mui/material/'
import useUserDetails from "../Hooks/use-user-details"
import { updateUser,cleanUser } from "../redux/userSlice"
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import {useFormik } from "formik";
import * as yup from "yup";

const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
});


const UpdateProfile = () => {
  const {error,loading,user}=useUserDetails();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
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
      profileImg:user?user?.profileImg:'',
    }, enableReinitialize: true,
    validationSchema:checkoutSchema,
  
    onSubmit: (values) => { 
      const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        formData.append("_id",user._id)
        console.log(formData)
      dispatch( updateUser(formData))
      .unwrap()
      .then(() => navigate(`/users/${user._id}`));
    },
    
    
}) 
const handleFileChange = (event) => {
  const uploadedFile = event.target.files[0];
  setFile(uploadedFile);
};
  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="profile flex justify-center py-1">
            <label htmlFor="profileImg" className='flex justify-'>
              <Avatar
                   style={{ width: "6rem", height: "15vh" ,cursor: 'pointer' }}
                  alt="Remy Sharp"
                  src={formik.values.previewUrl  ?formik.values.previewUrl:`http://localhost:5000/assets/${formik.values?.profileImg}`}
                />
            </label>
            <input
              onChange={(e) => {
                
                formik.setFieldValue('profileImg', e.target.files[0]);
                formik.setFieldValue('previewUrl', URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              id="profileImg"
              name="profileImg"
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
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
              />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        
          />
        </Grid>
        
        <Grid item xs={12}>
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
            />
        </Grid>  
        <Box  display="flex" justifyContent="end" mt="20px">
          <Button  onClick={()=>navigate(`/users/${user._id}`)}   variant="outlined" >
               cancel
          </Button>
          <Button type="submit"   variant="contained"  >
               update
          </Button>
        </Box>
      </Grid>
      </form>     
    </React.Fragment>
  );
}
export default UpdateProfile