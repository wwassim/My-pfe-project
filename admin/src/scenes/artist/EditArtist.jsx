import { Box, Button, IconButton, Typography, TextField,useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect } from "react";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { updateArtist,cleanArtist } from "../../redux/artistSlice";
import useArtistDetails from "../../Hooks/use-artist-details"

////////////////////////////////:
const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    picture: yup.string(),
  });




const EditArtist = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const{artist}=useArtistDetails();
    useEffect(()=>{
        return()=>{
          dispatch(cleanArtist())
        }
      },[dispatch])
      
      const formik = useFormik({
        initialValues: {
          name: artist ? artist?.name : "",
          nn: artist ? artist?.picture : "",
        },
        enableReinitialize: true,
        validationSchema: checkoutSchema,
        onSubmit: (values) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("nn", values.nn);
          formData.append("_id", artist._id);
          // const data = Object.fromEntries(formData);
          dispatch(updateArtist(formData))
            .unwrap()
            .then(() => navigate("/artist"));
        },
      });
  return (
    <Box m="20px">
      <Header title="CREATE artist" subtitle="Create a New artist Profile" />   
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
              onChange={(e) => formik.setFieldValue('nn', e.target.files[0])}
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

export default EditArtist