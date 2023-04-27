import { useEffect, useState } from "react";
import { Box, IconButton, Button,Typography, TextField,useTheme,Paper,Autocomplete,InputAdornment  } from "@mui/material";
import { tokens } from "../../theme";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Dropzone from "react-dropzone";
import ClearIcon from "@material-ui/icons/Clear";
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { fetchEvent, updateEvent } from "../../redux/eventSlice";
import { fetchCategorys } from "../../redux/categorySlice";
import useEventDetails from "../../Hooks/use-event-datails";
import Loading from '../global/Loading'
import {useParams} from'react-router-dom'

const checkoutSchema = yup.object().shape({
    eventTitle: yup.string().required("Event title is required"),
    category: yup.string().required("Event Category is required"),
    location:yup.string().required("Location is required"),
    description:yup.string().required("Description is required"),
    ticketsNbr: yup.number().typeError('Please enter a valid number').required('This field is required').min(1, 'Minimum value is 1 Ticket'),
    ticketsPrice: yup.number().typeError('Please enter a valid number').required('This field is required').min(1, 'Minimum value is 1 DT'),
});


const EditEvent = () => {
    const theme = useTheme();
    const {id}= useParams();

    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);
    const {categorys}=useSelector((state)=>state.categorys)
     const {loading,error,event}=useSelector((state)=>state.events)
    console.log("jj"+error)
    // useEffect(()=>{
    //   return()=>{
    //    // dispatch(cleanUser())
    //   }
    // },[dispatch])

    useEffect(()=>{
      dispatch(fetchCategorys())
    },[dispatch])
    useEffect(()=>{
      dispatch(fetchEvent(id)())
    },[dispatch,id])

    const formik = useFormik({
      initialValues: {
        eventTitle:event.eventTitle ,
        category:event.category,
        eventimage:event.eventpicture,
        ticketsNbr:event.ticketsNbr,
        ticketsPrice:event.ticketsPrice,
        time:event.time,
        // time:[new Date(), new Date()],
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        location:event.location,
        description:event.description,
      },
      // enableReinitialize: true,
      validationSchema:checkoutSchema,
      onSubmit: (values) => {     
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        formData.append("_id",event?._id)
        console.log(formData)
        dispatch(updateEvent(formData))
        .unwrap()
        .then(() => {
          navigate("/event");
        })
        .catch((error) => {
          console.log(error);
        });      
      }, 
    })
    const handleDateRangeChange = (time) => {
      const [startDate, endDate] = time;
      formik.setFieldValue('time', time);
      formik.setFieldValue('startDate', startDate?.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
      formik.setFieldValue('startTime', startDate?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      formik.setFieldValue('endDate', endDate?.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
      formik.setFieldValue('endTime', endDate?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      
    };
    const defaultProps = {options: categorys.map((option) => option.name),};
    
    
  return (
    <Box m="20px">
      <Header title="Update an event" subtitle="Update an event" /> 
      <Loading loading={loading} error={error} >

      <form onSubmit={formik.handleSubmit}>
                <Box
                    className="p-4"
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
                    label="event title "
                    onBlur={formik.handleBlur}
                    name="eventTitle"
                    onChange={formik.handleChange}
                    value={formik.values.eventTitle}
                    error={!!formik.touched.eventTitle && !!formik.errors.eventTitle}
                    helperText={formik.touched.eventTitle && formik.errors.eventTitle}
                    sx={{ gridColumn: "span 2" }}
                    />
                    <Autocomplete
                        {...defaultProps}
                        id="category"
                        value={formik.values.category}
                        onChange={(event, newValue) => {formik.setFieldValue('category', newValue);}}
                        onBlur={formik.handleBlur}
                        renderInput={(params) => (
                        <TextField {...params} label="category" variant="filled"
                        error={!!formik.touched.category && !!formik.errors.category}
                        helperText={formik.touched.category && formik.errors.category}
                        />
                        )}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <Box gridColumn="span 4" border={`1px solid `} borderRadius="5px"  >
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          formik.setFieldValue("eventimage", acceptedFiles[0]);
                          formik.setFieldValue('previewUrl', URL.createObjectURL(acceptedFiles[0]));
                        }}
                        accept="image/jpeg, image/png, image/gif"
                        maxFiles={1}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="border border-dashed border-gray-400 p-4 rounded-md bg-gray-100">
                            <input type="file" {...getInputProps()} />
                            {/* {console.log(formik.values)} */}
                            {formik.values.previewUrl ? (
                              <Box display="flex" alignItems="center">
                                <Box flexGrow={1}>
                                <img src={formik.values.previewUrl} sx={{display:"flex"}} width="200" height="100" />
                                </Box>
                                <IconButton onClick={() => formik.setFieldValue("eventimage", )} color={colors.primary[500]} aria-label="delete" component="span">
                                  <ClearIcon />
                                </IconButton>
                              </Box>
                            ) : ( <img  src={`http://localhost:5000/assets/${event?.eventpicture}`} sx={{display:"flex"}} width="200" 
                            height="100" alt="hhh" />
                            )}
                          </div>
                        )}
                      </Dropzone>
                      
                    </Box>
                    
                    <TextField fullWidth
                    variant="filled"
                    type="number"
                    label="Ticket Number"
                    onBlur={formik.handleBlur}
                    name="ticketsNbr"
                    onChange={formik.handleChange}
                    value={formik.values.ticketsNbr}
                    error={!!formik.touched.ticketsNbr && !!formik.errors.ticketsNbr}
                    helperText={formik.touched.ticketsNbr && formik.errors.ticketsNbr}
                    sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Ticket Price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.ticketsPrice}
                    name="ticketsPrice"
                    error={!!formik.touched.ticketsPrice && !!formik.errors.ticketsPrice}
                    helperText={formik.touched.ticketsPrice && formik.errors.ticketsPrice}
                    sx={{ gridColumn: "span 2" }}
                    />
                 <Box sx={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}> 
                  <DateTimeRangePicker
                    value={formik.values.time}
                    disableClock={true}
                    disableCalendar={false}
                    onChange={handleDateRangeChange}
                    format={'d-MM-yyyy HH:mm'}
                    minDate={new Date()}
                  />         
                </Box>


                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Location"
                    onBlur={formik.handleBlur}
                    name="location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    error={!!formik.touched.location && !!formik.errors.location}
                    helperText={formik.touched.location && formik.errors.location}
                    sx={{ gridColumn: "span 2" }}
                    />
                    <Box sx={{ gridColumn: "span 4" }}> 
                    <TextareaAutosize
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          border: '1px solid rgba(0, 0, 0, 0.23)',
                          borderRadius: '4px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease-in-out',
                          ':hover': {
                            borderColor: 'rgba(0, 0, 0, 0.87)',
                          },
                          ':focus': {
                            borderColor: '#3f51b5',
                          },
                        }}
                        maxRows={4}
                        aria-label="empty textarea"
                        placeholder="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      />
                    </Box>  
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

export default EditEvent