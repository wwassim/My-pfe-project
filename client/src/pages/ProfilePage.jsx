import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

//
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {cleanUser} from '../redux/userSlice'
import useUserDetails from "../Hooks/use-user-details"
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/utility/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(2),
  },
  bio: {
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  countsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  countsItem: {
    marginRight: theme.spacing(4),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  postImage: {
    width: '100%',
    height: 'auto',
  },
}));

function UserProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    return()=>{
      dispatch(cleanUser())
    }
  },[dispatch])
  const {user}=useUserDetails();
  const classes = useStyles();

  const postsCount = 15;
  const followersCount = 500;

  return (
    
    <div className={classes.root}>
        
      <Grid container spacing={3}>
        <Grid item sm={2} xs={2}>
          <Sidebar/>
        </Grid>
        <Grid item sm={10} xs={10}>
          <div className={classes.infoContainer}>
            <Avatar className={classes.avatar} alt="User Avatar" src="/path/to/avatar.png" />
            <div className={classes.nameContainer}>
              <div>
                <Typography variant="h5" gutterBottom>
                 {user?.firstname}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                {user?.lastname}
                </Typography>
              </div>
              <Button variant="outlined" color="primary" className={classes.button} onClick={()=>navigate(`edit`)}>
                Edit Profile
              </Button>
            </div>
          </div>
          <div className={classes.countsContainer}>
            <div className={classes.countsItem}>
              <Typography variant="h6">{postsCount}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Posts</Typography>
            </div>
            <div className={classes.countsItem}>
              <Typography variant="h6">{followersCount}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Followers</Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
        </Grid>
        {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>
            <img src="https://images.pexels.com/photos/11670185/pexels-photo-11670185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
        </Grid>  
        <Grid item xs={2} sm={4} md={4}>
            <img src="https://images.pexels.com/photos/11670185/pexels-photo-11670185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
        </Grid> 
        <Grid item xs={2} sm={4} md={4}>
            <img src="https://images.pexels.com/photos/11670185/pexels-photo-11670185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
        </Grid>   
        </Grid> */}
      </Grid>
    </div>
  );
}

export default UserProfilePage;




















