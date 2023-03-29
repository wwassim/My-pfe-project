import * as React from "react";
import {Box,Card,CardContent,CardMedia,Typography} from "@mui/material";
import Button from '@mui/joy/Button';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RembModal from "../modal/RembModal";

const EventTicketCard = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
        <Card sx={{m: 1, display: "flex",  justifyContent: 'space-between'}}>
           <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: 151, height: 186 }}
            image="https://images.pexels.com/photos/11276365/pexels-photo-11276365.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Live From Space
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                19,oct 19pm-7am
              </Typography>
    
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Jobi,Gammarth
              </Typography>
            </CardContent>
          </Box>
        </Box>  
          <Box sx={{ display: "flex",  }}>
            <Box sx={{ display: "flex", p: 1,m: 1, flexDirection: "column",justifyContent: "space-around" }}>
              <Button  color="primary" variant="soft">Download <ConfirmationNumberIcon/></Button>
              <Button color="danger" variant="outlined" onClick={() => setOpen(true)}>Rembou</Button>
            </Box>
          </Box>
        </Card>
        <RembModal open={open} setOpen={setOpen}></RembModal>

        
        </>
      );    
}

export default EventTicketCard