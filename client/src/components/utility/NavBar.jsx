import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { Box, Button, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {reset,logout} from '../../redux/auth/authSlice'

  const Navbar = ({events,setSearchResults,allevent }) => {
    // const [open, setOpen] = useState(false);
    // const theme = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } =  useSelector((state) => state.auth)
  const {wishlistsItems}=useSelector((state) => state?.wishlists)

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
        console.log(!e.target.value)
        if (!e.target.value) return setSearchResults(allevent)
        const resultsArray = events.filter(event => event?.eventTitle.includes(e.target.value) || event?.user.firstname.includes(e.target.value))
        console.log(resultsArray)
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
        
        <IconButton>
          <NotificationsOutlinedIcon />
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