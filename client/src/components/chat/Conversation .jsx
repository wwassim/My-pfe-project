import React, {  useEffect, useRef, useState }  from 'react'
import { useDispatch, useSelector  } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {fetchUser} from '../../redux/userSlice'

  
const Conversation  = ({conv,currentUser}) => {
    const dispatch = useDispatch()
    const { user } =  useSelector((state) => state.users)
    useEffect(() => {
        const friendId = conv.members.find((m) => m !== currentUser._id);
        dispatch(fetchUser(friendId))
        
      }, [currentUser, conv]);
    
      
  return (
    <>
   {/* <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText >{user.firstname}</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <Divider /> 
                </List>
    </Grid> */}
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">{user?.firstname}</div>
                  <span className="text-gray-500">Pick me at 9:00 Am</span>
                </div>
              </div>
</>
  )
}

export default Conversation 