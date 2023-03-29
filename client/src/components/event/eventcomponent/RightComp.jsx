import {Card,CardFooter,Typography,Button,Tooltip,IconButton,} from "@material-tailwind/react";
import CardContent from '@mui/material/CardContent';
import {BsTiktok,}from 'react-icons/bs'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const RightComp = () => {
  return (
    <Card className="w-full ">
     <CardContent>
        <div >
            <Typography variant="h3" color="Black" className="font-medium">
                 Wooden House, Florida
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
                    500dt
                </Typography>
            </div>
        </div>
     </CardContent> 
     
      <CardFooter className="p-1">
        <Button size="lg p-5" fullWidth={true}>
          Reserve
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RightComp