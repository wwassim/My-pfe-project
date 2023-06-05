import {useState} from "react";
import {Box,Card,CardContent,CardMedia,Typography} from "@mui/material";
import Button from '@mui/joy/Button';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RembModal from "../modal/RembModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import QrcodeModal from "../modal/QrcodeModal";

const EventTicketCard = ({item,remboursement}) => {
    const [open, setOpen] = useState(false);//mtaa3 Rembo modal
    const [openPopup, setOpenPopup] = useState(false)//mtaa3 Qrcode modal
    const { user } =  useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick =()=>{
      const userId = user._id;
      const id = item._id;
      if (window.confirm(` Are you sure you want to Back your money ${item._id}`)) {
        dispatch(remboursement( userId, id ))
        }
        
     
  }
    return (
          <>
            <Card  sx={{m: 1, display: "flex",  justifyContent: 'space-between'}}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                onClick={()=>navigate(`/events/${item._id}`)}
                component="img"
                sx={{ width: 151, height: 186 }}
                image={`http://localhost:5000/assets/${item.eventpicture}`}
                alt="Live from space album cover"
                className="cursor-pointer"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item.eventTitle}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {item.startDate + "," + item.endDate}
                  </Typography>
        
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                   {item.location}
                  </Typography>
                </CardContent>
              </Box>
            </Box>  
              <Box sx={{ display: "flex",  }}>
                <Box sx={{ display: "flex", p: 1,m: 1, flexDirection: "column",justifyContent: "space-around" }}>
                  <Button  color="primary" variant="soft"  onClick={() => setOpenPopup(true)}>Download <ConfirmationNumberIcon/></Button>
                  <Button color="danger" variant="outlined" onClick={() =>  setOpen(true)}>Rembou</Button>
                </Box>
              </Box>
            </Card>
            <RembModal open={open} 
            setOpen={setOpen}
            eventId={item._id}
            userId={user._id}
            ></RembModal>  
            <QrcodeModal
              title="Download Your ticket"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              event={item.eventTitle}
            >
            </QrcodeModal>
          </>
      );    
}

export default EventTicketCard