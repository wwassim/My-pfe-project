import {Card,CardFooter,Typography,Button,Tooltip,IconButton,} from "@material-tailwind/react";
import CardContent from '@mui/material/CardContent';
import {BsTiktok,}from 'react-icons/bs'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import Loading from "../../utility/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTicket } from "../../../redux/eventSlice";
import axios from "axios";
import FollowerModal from "../../modal/FollowerModal";
import { Box } from "@mui/material";
import { fetchUser } from "../../../redux/userSlice";

const RightComp = ({event,loading,error}) => {
  const {user}=useSelector((state)=>state.auth)
  const {error:isError,loading:isLoading,user:currentUser}=useSelector((state)=>state.users)
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false)//mtaa3 follower modal
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    if (user !== null) {
      dispatch(fetchUser(user._id));
    }
  }, [dispatch, user]);
  

  return (
    <>
    <Card className="w-full ">
     <CardContent>
        <div >
            <Typography variant="h4" color="Black" className="m-2">
            {event?.eventTitle}
            </Typography>
        </div>
        <div>
            <div className="mb-1 flex items-center ">
                <CalendarTodayIcon size="small"/>
                <p className="text-xl ml-1">
                  {event?.startDate.substring(0, 12)+ '-'+ event?.endDate.substring(0, 12)}
                </p>
            </div>
            <div className="mb-1 flex items-center ">
                <ScheduleIcon size="small"/>
                <p className="text-xl ml-1">
                {event?.startTime+ '-'+ event?.endTime}
                </p>
            </div>
            <div className="mb-1 flex items-center ">
                <PaymentsIcon size="small"/>
                <p className="text-xl ml-1">
                {event.ticketsPrice} dt
                </p>
            </div>
            <div className="mb-1 flex items-center ">
                <LocationOnIcon size="small"/>
                <p className="text-xl ml-1">
                {event.location} 
                </p>
            </div>
        </div>
     </CardContent> 
     
      <CardFooter className="p-1">
      <Loading loading={loading} error={error}> 
        {event.ticketsNbr > 0 ?(
            <Button className="rounded-lg p-2 w-full bg-violet-700  text-white"  onClick={()=>{setOpenPopup(true)}} disabled={disabled} >
            Buy Ticket
            </Button>
        ):(
          <Button className="rounded-lg p-2 w-full bg-violet-300  text-white"  onClick={()=>{setOpenPopup(true)}} disabled={true} >
            Sold out
          </Button>
        )}
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
      isError={isError}
      isLoading={isLoading}
  >
      {/* <ArtistForm itemId={itemId} /> */}
    </FollowerModal>
      </Box>
    )}
  </>
  )
}

export default RightComp