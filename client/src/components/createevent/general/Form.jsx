import { useEffect, useState } from "react";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import {Button} from "@material-tailwind/react";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import Dropzone from "react-dropzone";
// import { insertUser,updateUser,cleanUser } from "../../redux/userSlice";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import {fetchUser, updateUser,cleanUser} from '../../../redux/userSlice'
import { toast } from 'react-toastify'


const checkoutSchema = yup.object().shape({
  phonenumber: yup.string().required("Phone number is required").matches(/^(\+216|0)\d{8}$/,"Phone number must be a valid Tunisian phone number"),
  ribNumber: yup.string().required("RIB number is required").matches( /^(\d{2})\s(\d{3})\s(\d{12})\s(\d{2})$/,"RIB number must be a valid Tunisian RIB number"),
});


const Form = ({currentUser}) => {
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch()
 console.log(currentUser)

  useEffect(()=>{
    return()=>{
     dispatch(cleanUser())
    }
  },[dispatch])

  

  const formik = useFormik({
    initialValues: {
      phonenumber:currentUser? currentUser.phonenumber:'',
      ribNumber:currentUser? currentUser.ribNumber:'',
      frontcin:currentUser? currentUser.frontcin:'',
      backcin:currentUser? currentUser.backcin:'',
    },
    validationSchema:checkoutSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      } 
      formData.append("_id", currentUser._id);
      if (currentUser.acceptaion === 'refuse') {
        formData.append('acceptaion', '');
      }
      dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast("Verification in 12 hours");
      })
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
   
      <Header title="Organizer" subtitle="Create a New Organizer Profile" />   
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
            {currentUser?.phonenumber ?(
              <>
               <Box mt={2}  sx={{ gridColumn: "span 2" }}>
               <Dropzone
                 name="frontcin"
                 id="frontcin"
                 onDrop={(acceptedFiles) => {
                  formik.setFieldValue("frontcin", acceptedFiles[0]);
                  formik.setFieldValue('previewUrl', URL.createObjectURL(acceptedFiles[0]));
                }}
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
                     {formik.values.previewUrl ? (
                       <Box display="flex" alignItems="center">
                         <Box flexGrow={1}>
                         <img src={formik.values.previewUrl} sx={{display:"flex"}} width="200" height="100" />
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
                     ) : ( <img  src={`http://localhost:5000/assets/${formik.values.frontcin}`} sx={{display:"flex"}} width="200" 
                     height="100" alt="hhh" />
                     )}
                   </div>
                 )}
               </Dropzone>
               </Box>
              
              <Box mt={2}  sx={{ gridColumn: "span 2" }}>
                  <Dropzone
                   name="backcin"
                   id="backcin"
                    onDrop={(acceptedFiles) => {formik.setFieldValue("backcin", acceptedFiles[0]);
                  formik.setFieldValue('preview', URL.createObjectURL(acceptedFiles[0]));

                  }}
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
                          
                        }}backcin
                      >
                          <input name="backcin" id="backcin"  type="file" {...getInputProps()} />
                        {formik.values.preview ? (
                          <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                            <img src={formik.values.preview} sx={{display:"flex"}} width="200" height="100" />
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
                        ) : ( <img  src={`http://localhost:5000/assets/${formik.values.backcin}`} sx={{display:"flex"}} width="200" 
                        height="100"  alt="hhh" />
                        )}
                      </div>
                    )}
                  </Dropzone>
              </Box>
              </>
            ):(
              <>
              <Box mt={2}  sx={{ gridColumn: "span 2" }}>
               <Dropzone
                 name="frontcin"
                 id="frontcin"
                 onDrop={(acceptedFiles) => {formik.setFieldValue("frontcin", acceptedFiles[0]);}}
                 accept="image/jpeg, image/png, image/gif,image/jpg"
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
                    accept="image/jpeg, image/png, image/gif,,image/jpg"
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
              </>
            )}
             
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button  type="submit" className="rounded-lg p-1 w-[150px] bg-violet-700  text-white"  >
               Update to org
              </Button>
            </Box>
          </form>

    </Box>
  );
};




export default Form;