import {Card,CardFooter,Typography,Button,Tooltip,IconButton,} from "@material-tailwind/react";
import CardContent from '@mui/material/CardContent';
import {BsTiktok,}from 'react-icons/bs'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Loading from "../../utility/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getTicket } from "../../../redux/eventSlice";

const RightComp = ({event,loading,error}) => {
  const {user:currentUser}=useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [participation,setParticipation]=useState(
    currentUser?.participationEvent.includes(event?._id)
  )
  console.log(participation)

  const handleClick = async () => {
    const userId = currentUser?._id;
    if (participation) {
      // dispatch(unfollowUser({ id: user._id, userId }));
      // const updatedCurrentUser = { ...currentUser, followings: currentUser.followings.filter(f => f !== user._id) };
      // localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
    } else {
      dispatch(getTicket({ id: event._id, userId }));
      const updatedCurrentUser = { ...currentUser, participationEvent: [...currentUser.participationEvent, event._id] };
      localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
    }
    setParticipation(!participation);
  };
  
  return (
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
                    20 MAY-21 MAY 2023
                </Typography>
            </div>
            <div className="mb-1 flex items-center ">
                <ScheduleIcon size="small"/>
                <Typography variant="h5" color="blue-gray" className="ml-3">
                    12:00 pm -09:00 am
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
        <Button className="rounded-lg p-2 w-full bg-violet-700  text-white"onClick={()=>handleClick()}>
        {participation ? "buyticket 4 friend" : "Reserve"} 
        </Button>
        </Loading >
      </CardFooter>
    </Card>
  )
}

export default RightComp