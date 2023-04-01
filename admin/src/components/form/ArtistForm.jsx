import { useEffect } from "react";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField,Typography } from "@mui/material";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { insertArtist,cleanArtist } from "../../redux/artistSlice";

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
});


const ArtistForm = ({itemId}) => {
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch()
 
  useEffect(()=>{
    return()=>{
      dispatch(cleanArtist())
    }
  },[dispatch])

  const formik = useFormik({
    initialValues: {
      name: itemId? itemId?.name : '',
      nn: itemId? itemId?.picture?.name : '',
    },
    validationSchema:checkoutSchema,
    onSubmit: (values) => {
      const formData = new FormData();
          formData.append("name", values.name);
          formData.append("nn", values.nn);
          console.log(formData)
        dispatch(insertArtist(formData))
        .unwrap()
        .then(() => {
          navigate("/artist");
        })
        .catch((error) => {
          console.log(error);
        });      
    },
  })
 
  return (
    <Box m="20px">
      <Header title="CREATE Artist" subtitle="Create a New Artist Profile" />   
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="flex"
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
                label="Artist Name"
                onBlur={formik.handleBlur}
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={!!formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name} 
                 sx={{ width: "span 1" }}
                
              /> 
          <TextField
              name="nn"
              id="nn"
              type="file"
              onChange={(e) => formik.setFieldValue('nn', e.target.files[0])}
            />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" variant="contained">
                Create New Artist
              </Button>
            </Box>
          </form>

    </Box>
  );
};
export default ArtistForm;