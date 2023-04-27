import {Card,CardFooter,Typography,Button,Tooltip,IconButton,} from "@material-tailwind/react";
import CardContent from '@mui/material/CardContent';
import {BsTiktok,}from 'react-icons/bs'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Loading from "../../utility/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTicket } from "../../../redux/eventSlice";
import axios from "axios";
import FollowerModal from "../../modal/FollowerModal";
import { Box } from "@mui/material";

const RightComp = ({event,loading,error}) => {
  const {user:currentUser}=useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false)//mtaa3 follower modal
  const [disabled, setDisabled] = useState(false);
 console.log(event.startTime)
  
  return (
    <>
    <Card className="w-full ">
     <CardContent>
        <div >
            <Typography variant="h3" color="Black" className="font-medium">
            {event?.eventTitle}
            </Typography>
        </div>
        <div>
            <div className="mb-1 flex items-center ">
                <CalendarTodayIcon size="small"/>
                <Typography variant="h5" color="blue-gray" className="ml-3">
                  {event?.startDate.substring(0, 12)+ '-'+ event?.endDate.substring(0, 12)}
                  {/* {event?.startDate+ '-'+ event?.endDate} */}
                </Typography>
            </div>
            <div className="mb-1 flex items-center ">
                <ScheduleIcon size="small"/>
                <Typography variant="h5" color="blue-gray" className="ml-3">
                {event?.startTime+ '-'+ event?.endTime}
                </Typography>
            </div>
            <div className="mb-1 flex items-center ">
                <AttachMoneyIcon size="small"/>
                <Typography variant="h5" color="blue-gray" className="ml-3">
                {event.ticketsPrice} dt
                </Typography>
            </div>
        </div>
     </CardContent> 
     
      <CardFooter className="p-1">
      <Loading loading={loading} error={error}> 
        <Button className="rounded-lg p-2 w-full bg-violet-700  text-white"  onClick={()=>{setOpenPopup(true)}} disabled={disabled} >
         Buy Ticket
        </Button>
        </Loading >
      </CardFooter>
  

    </Card>
    {currentUser&&(
      <Box>
      <FollowerModal
      title="buy ticket for ..."
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      Data={currentUser}
      event={event}
  >
      {/* <ArtistForm itemId={itemId} /> */}
    </FollowerModal>
      </Box>
    )}
    
  </>
  )
}

export default RightComp