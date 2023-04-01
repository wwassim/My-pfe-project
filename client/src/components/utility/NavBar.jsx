import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {reset,logout} from '../../redux/auth/authSlice'
  const Navbar = () => {
    // const [open, setOpen] = useState(false);
    // const theme = useStyles();
  const navigate = useNavigate()
   const dispatch = useDispatch()
  const { user } =  useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

    return (   
      <Box width={"full"} display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor="#f2f0f0"
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton  onClick={()=>navigate("/wish")}>
        <FavoriteBorderIcon/>
        </IconButton>
        {user ? (
        <>
          <Button  onClick={onLogout}>
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
    </Box>
    );
  };
  
  export default Navbar;


  // {user ? (
  //   <>
  //    <Button  variant="outlined" onClick={()=>navigate(`users/${user._id}`)}>
  //     Profile
  //   </Button>
  //   <Button  variant="outlined" onClick={onLogout}>
  //     lougout
  //   </Button>

  //   </>
  // ):(
  //   <Avatar alt="Remy Sharp" src="https://www.pngkit.com/png/detail/518-5186670_login-icon-login-signup-icon-png.png"component={Link} to="/auth" />
  // )}