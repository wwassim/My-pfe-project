  import { Box, Button, IconButton, Typography, TextField,useTheme } from "@mui/material";
  import { tokens } from "../../theme";
  import { useEffect,useRef  } from "react";
  import {useDispatch,useSelector,} from "react-redux"
  import { useNavigate } from "react-router-dom";
  import {useFormik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import Header from "../../components/Header";
  import { updateCategory,cleanCategory } from "../../redux/categorySlice";
  import useCategoryDetails from "../../Hooks/use-category-details"
  import Loading from "../global/Loading"
  ////////////////////////////////:
  const checkoutSchema = yup.object().shape({
      name: yup.string().required("required"),
      picture: yup.string(),
    });




  const EditCategory = () => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const isNonMobile = useMediaQuery("(min-width:600px)");
      const navigate = useNavigate();
      const dispatch = useDispatch()
      const{loading,error,category}=useCategoryDetails();
    
      useEffect(()=>{
          return()=>{
            dispatch(cleanCategory())
          }
        },[dispatch])

        const formik = useFormik({
          initialValues: {
            name:category?.name ,
            nn: category?.picture ,
          },
          enableReinitialize: true,
          validationSchema: checkoutSchema,
          onSubmit: (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("nn", values.nn);
            formData.append("_id", category._id);
            // const data = Object.fromEntries(formData);
            dispatch(updateCategory(formData))
              .unwrap()
              .then(() => navigate("/category"));
          },
        });
      
    return (
      <Box m="20px">
        <Header title="Update category" subtitle="Update a New category Profile" />   
        <Loading loading={loading} error={error} >
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
                  label="Name"
                  onBlur={formik.handleBlur}
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={!!formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                
                <TextField
                name="nn"
                id="nn"
                type="file"
                onChange={(e) => {
                  formik.setFieldValue('nn', e.target.files[0]);
                  formik.setFieldValue('previewUrl', URL.createObjectURL(e.target.files[0]));
                }}
              />
              {formik.values.previewUrl ? (
                
                <img src={formik.values.previewUrl} sx={{display:"flex"}} width="200" 
              height="100" />
              ):(
                <img  src={`http://localhost:5000/assets/${formik.values.nn}`} sx={{display:"flex"}} width="200" 
              height="100" />
              )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update
                </Button>
              </Box>
            </form>
        </Loading>
      </Box>
    )
  }

  export default EditCategory