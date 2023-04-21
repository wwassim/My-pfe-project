import { useEffect, useState } from "react";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import Dropzone from "react-dropzone";
// import { insertUser,updateUser,cleanUser } from "../../redux/userSlice";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import {updateUser} from '../../../redux/userSlice'


const checkoutSchema = yup.object().shape({
  phonenumber: yup.string().required("Phone number is required").matches(/^(\+216|0)\d{8}$/,"Phone number must be a valid Tunisian phone number"),
  ribNumber: yup.string().required("RIB number is required").matches( /^(\d{2})\s(\d{3})\s(\d{12})\s(\d{2})$/,"RIB number must be a valid Tunisian RIB number"),
});


const Form = () => {
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user:currentUser}= useSelector((state) => state.auth)


  useEffect(()=>{
    return()=>{
     // dispatch(cleanUser())
    }
  },[dispatch])

  const formik = useFormik({
    initialValues: {
      phonenumber:'',
      ribNumber:'',
      frontcin:'',
      backcin:'',
    },
    validationSchema:checkoutSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("phonenumber", values.phonenumber);
      formData.append("ribNumber", values.ribNumber);
      formData.append("frontcin", values.frontcin);
      formData.append("backcin", values.backcin);
      formData.append("_id", currentUser._id);
      dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        navigate("/myorganazation");
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
                label="Phone Number "
                onBlur={formik.handleBlur}
                name="phonenumber"
                onChange={formik.handleChange}
                value={formik.values.phonenumber}
                error={!!formik.touched.phonenumber && !!formik.errors.phonenumber}
                helperText={formik.touched.phonenumber && formik.errors.phonenumber ?formik.errors.phonenumber:"+(216)55333999"}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Rib Number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.ribNumber}
                name="ribNumber"
                error={!!formik.touched.ribNumber && !!formik.errors.ribNumber}
                helperText={formik.touched.ribNumber && formik.errors.ribNumber  ? formik.errors.ribNumber: "E.g. 08 400 123456789012 34"}
                sx={{ gridColumn: "span 2" }}
              />

              <Box mt={2}  sx={{ gridColumn: "span 2" }}>
                  <Dropzone
                    name="frontcin"
                    id="frontcin"
                    onDrop={(acceptedFiles) => {formik.setFieldValue("frontcin", acceptedFiles[0]);}}
                    accept="image/jpeg, image/png, image/gif"
                    maxFiles={1}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          border: "1px dashed grey",
                          padding: "1rem",
                          borderRadius: "4px",
                          backgroundColor: "#fafafa",
                          
                        }}
                      >
                         <input name="frontcin" id="frontcin" type="file" {...getInputProps()} />
                        {formik.values.frontcin ? (
                          <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                              <p>{formik.values.frontcin.path}</p>
                            </Box>
                            <IconButton
                              onClick={() => formik.setFieldValue("frontcin", "")}
                              color="primary"
                              aria-label="delete"
                              component="span"
                            >
                              <ClearIcon />
                            </IconButton>
                          </Box>
                        ) : (<p>  upload your front id</p>)}
                      </div>
                    )}
                  </Dropzone>
              </Box>
              
              <Box mt={2}  sx={{ gridColumn: "span 2" }}>
                  <Dropzone
                    onDrop={(acceptedFiles) => {formik.setFieldValue("backcin", acceptedFiles[0]);}}
                    accept="image/jpeg, image/png, image/gif"
                    maxFiles={1}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          border: "1px dashed grey",
                          padding: "1rem",
                          borderRadius: "4px",
                          backgroundColor: "#fafafa",
                          
                        }}
                      >
                         <input type="file" {...getInputProps()} />
                        {formik.values.backcin ? (
                          <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                              <p>{formik.values.backcin.path}</p>
                            </Box>
                            <IconButton
                              onClick={() => formik.setFieldValue("backcin", "")}
                              color="primary"
                              aria-label="delete"
                              component="span"
                            >
                              <ClearIcon />
                            </IconButton>
                          </Box>
                        ) : (<p>  upload your Back id</p>)}
                      </div>
                    )}
                  </Dropzone>
              </Box>
              
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