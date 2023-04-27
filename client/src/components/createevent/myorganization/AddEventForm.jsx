import { useEffect, useState } from "react";
import {useDispatch,useSelector,} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Box, TextField ,Paper,Autocomplete,InputAdornment } from "@mui/material";
import {Button} from "@material-tailwind/react";
import {useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dropzone from "react-dropzone";
// import { insertUser,updateUser,cleanUser } from "../../redux/userSlice";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import TextareaAutosize from '@mui/base/TextareaAutosize';  
import {addEvent} from '../../../redux/eventSlice'
import Loading from "../../utility/Loading";
import { fetchUser } from "../../../redux/userSlice";
const checkoutSchema = yup.object().shape({
    eventtitle: yup.string().required("Event title is required"),
    eventcategory: yup.string().required("Event Category is required"),
    location:yup.string().required("Location is required"),
    description:yup.string().required("Description is required"),
    ticketnumber: yup.number().typeError('Please enter a valid number').required('This field is required').min(1, 'Minimum value is 1 Ticket'),
    ticketprice: yup.number().typeError('Please enter a valid number').required('This field is required').min(1, 'Minimum value is 1 DT'),
});

const AddEventForm = ({categorys}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);
    const {isLoding ,isError,user:currentUser}= useSelector((state) => state.auth)
    const {user}= useSelector((state) => state.users)
    const {loading,error}= useSelector((state) => state.events)
  
    useEffect(()=>{
      return()=>{
       // dispatch(cleanUser())
      }
    },[dispatch])
    useEffect(()=>{
      dispatch(fetchUser(currentUser._id))
  },[dispatch])
 
    const formik = useFormik({
      initialValues: {
        eventtitle:'',
        eventcategory:null,
        eventimage:'',
        ticketnumber:'',
        ticketprice:'',
        time:[new Date(), new Date()],
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        location:'',
        description:'',
      },
      validationSchema:checkoutSchema,
      onSubmit: (values) => {     
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        formData.append("_id", currentUser._id);
        dispatch(addEvent(formData))
        .unwrap()
        .then(() => {
          navigate("/myorganazation");
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
    console.log(3)
  return (
    <Box className="m-20px h-[600px]">
        <Paper variant="outlined">
      <Loading loading={isLoding} error={isError}>
        {(user?.phonenumber==="")?<>
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-3xl font-bold mb-2 text-center">
              Complete Your info in General
            </div>
            <img
              src="/assets/signin.png"
              alt="no account"
              className="h-100 "
            />
            {/* <button  onClick={()=>navigate("/auth")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                sign in
            </button> */}
          </div>
      </> :<>
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
                    name="eventtitle"
                    onChange={formik.handleChange}
                    value={formik.values.eventtitle}
                    error={!!formik.touched.eventtitle && !!formik.errors.eventtitle}
                    helperText={formik.touched.eventtitle && formik.errors.eventtitle}
                    sx={{ gridColumn: "span 2" }}
                    />
                    <Autocomplete
                        {...defaultProps}
                        id="eventcategory"
                        value={formik.values.eventcategory}
                        onChange={(event, newValue) => {formik.setFieldValue('eventcategory', newValue);}}
                        onBlur={formik.handleBlur}
                        renderInput={(params) => (
                        <TextField {...params} label="eventcategory" variant="filled"
                        error={!!formik.touched.eventcategory && !!formik.errors.eventcategory}
                        helperText={formik.touched.eventcategory && formik.errors.eventcategory}
                        />
                        )}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <Box mt={2}  sx={{ gridColumn: "span 4" }}>
                      <Dropzone
                        onDrop={(acceptedFiles) => {formik.setFieldValue("eventimage", acceptedFiles[0]);}}
                        accept="image/jpeg, image/png, image/gif"
                        maxFiles={1}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="border border-dashed border-gray-400 p-4 rounded-md bg-gray-100">
                            <input type="file" {...getInputProps()} />
                            {formik.values.eventimage ? (
                              <Box display="flex" alignItems="center">
                                <Box flexGrow={1}>
                                  <p>{formik.values.eventimage.path}</p>
                                </Box>
                                <IconButton onClick={() => formik.setFieldValue("eventimage", "")} color="primary" aria-label="delete" component="span">
                                  <ClearIcon />
                                </IconButton>
                              </Box>
                            ) : (<p>  Event Picture</p>)}
                          </div>
                        )}
                      </Dropzone>
                    </Box>

                    <TextField fullWidth
                    variant="filled"
                    type="number"
                    label="Ticket Number"
                    onBlur={formik.handleBlur}
                    name="ticketnumber"
                    onChange={formik.handleChange}
                    value={formik.values.ticketnumber}
                    error={!!formik.touched.ticketnumber && !!formik.errors.ticketnumber}
                    helperText={formik.touched.ticketnumber && formik.errors.ticketnumber}
                    sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Ticket Price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.ticketprice}
                    name="ticketprice"
                    error={!!formik.touched.ticketprice && !!formik.errors.ticketprice}
                    helperText={formik.touched.ticketprice && formik.errors.ticketprice}
                    sx={{ gridColumn: "span 2" }}
                    />
                    <Box    sx={{ gridColumn: "span 2" }}>  
                        {/* <DateTimeRangePicker
                          sx={{ gridColumn: "span 2" }}
                          className="w-full h-14 col-span-2"
                          value={formik.values.time}
                          disableClock={true}
                          disableCalendar={false}
                          onChange={(time) => formik.setFieldValue('time', time)}
                          onChange={handleDateRangeChange}
                          format={'d-MM-yyyy HH:mm'}
                          minDate={new Date()}
                        />   */}
                        <DateTimeRangePicker
                          className="w-full h-14 col-span-2"
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
                    <Box mt={2}  sx={{ gridColumn: "span 4" }}>
                    <TextareaAutosize
                    className="w-full p-2 text-base  border-2 border-black focus:border-secondary "
                        aria-label="empty textarea"
                        placeholder="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      />
                    </Box>         
                </Box>
                <Box display="flex" justifyContent="end" m="20px" >
                  <Loading loading={loading} error={error}>
                    
                    <Button  type="submit"  className="rounded-lg p-2  bg-violet-700  text-white">
                    Create New Event
                    </Button>
                  </Loading>
                </Box>
          </form>
      </>}
      </Loading>
        </Paper>
    </Box>
  )
}

export default AddEventForm