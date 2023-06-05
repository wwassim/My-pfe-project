import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { Box, Button, IconButton ,Badge,Popover, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {reset,logout} from '../../redux/auth/authSlice'
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { fetchUser } from "../../redux/userSlice";

  const Navbar = ({events,setSearchResults,allevent }) => {
    // const [open, setOpen] = useState(false);
    // const theme = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } =  useSelector((state) => state.auth)
  const { loading,error, user:sender } =  useSelector((state) => state.users)
  const {wishlistsItems}=useSelector((state) => state?.wishlists)
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationData, setNotificationData] = useState({ senderId: "", text: "" });
  const [userData, setUserData] = useState({ name: "", text: "" });

  useEffect(() => {
    if(user !== null){
      const socket = io("http://localhost:8900");

      // Emit the addUser event with the user's ID when they connect
      socket.emit("addUser", user._id);

      // Listen for new messages
      socket.on("getMessage", async ({ senderId, text }) => {
        // Logic to determine if the received message is relevant to the current user
        console.log(senderId)
        if (senderId !== user._id) {
          // Update the hasNewMessage state if there is a new relevant message
          setHasNewMessage(true);
          try {
            await dispatch(fetchUser(senderId));
            setUserData({ name: sender.firstname, text });
          } catch (error) {
            console.log("Error fetching user:", error);
          }
        
        }
      }); 

      return () => {
        // Clean up the event listener when the component unmounts
        socket.off("getMessage");
      };
    }
  }, [user?._id]);
  

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
    setHasNewMessage(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;
  const logOutHandler =() =>{
    if (window.confirm(`Do you really want to logOut`)) {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }
  }
  const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {

      if (events !== null  ){
        if (!e.target.value) return setSearchResults(allevent)
        const resultsArray = events.filter(event => event?.eventTitle.includes(e.target.value) || event?.user.firstname.includes(e.target.value))
        setSearchResults(resultsArray)
      } 
    }

    return (   
      <Box width={"full"} display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor="#f2f0f0"
        borderRadius="3px"
      >
        <form  onSubmit={handleSubmit}>
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={handleSearchChange}/>
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </form>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        
        <IconButton onClick={handleNotificationClick}>
  <Badge color="error" variant="dot" invisible={!hasNewMessage}>
    <NotificationsOutlinedIcon />
  </Badge>
</IconButton>
        <IconButton  onClick={()=>navigate("/wish")}>
          {wishlistsItems?.length>0 ? <FavoriteIcon sx={{ color: pink[500] }}/> :<FavoriteBorderIcon/>}
        </IconButton>
        {user ? (
        <>
          <Button  onClick={()=>logOutHandler()}>
          <PersonOutlinedIcon />
          </Button>
        </>
        ):(
          <>
          <IconButton  onClick={()=>navigate("/auth")}>
          <PersonOutlinedIcon />
          </IconButton>
        </>
        )}
      </Box>

      <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          style={{ minWidth: '200px' }} 
        >
           <div style={{ minWidth: '200px' }}>
            <Box className="p-2 flex  space-x-2 ">
              <Typography >New message</Typography>
              <Typography>"{userData.text}"</Typography>
            </Box>
           </div>
        </Popover>
    </Box>
    );
  };
  
  export default Navbar;


  