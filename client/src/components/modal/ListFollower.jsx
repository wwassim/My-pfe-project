import React, { useEffect, useState }  from 'react';
import {makeStyles,  Avatar, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import {Button}  from "@material-tailwind/react";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    listItem: {
        backgroundColor: "#e0f2f1",
        marginBottom: theme.spacing(1),
        borderRadius: theme.spacing(1),
        width: '100%',
    },
    listItemText: {
        color: "#000000"
    },
    closeButton: {
        marginLeft: 'auto',
        backgroundColor: '#ffffff', // Set the desired background color here
        color: '#ff2400'
    },
    listItemSecondaryAction: {
        marginRight: theme.spacing(2)
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
    },

}));
const ListFollower = ({user,event}) => {
    const classes = useStyles();
    const [participation, setParticipation] = useState(false);

    useEffect(() => {
      if (user.participationEvent.includes(event?._id)) {
        setParticipation(true);
      } else {
        setParticipation(false);
      }
    }, [user, event]);

      console.log(participation)
const handleClick = async () => {
        //send event id to localstorage
        localStorage.setItem('enevt',JSON.stringify(event._id))
        localStorage.setItem('userId',JSON.stringify(user._id))
       
        if (participation) {
          // dispatch(unfollowUser({ id: user._id, userId }));
          // const updatedCurrentUser = { ...currentUser, followings: currentUser.followings.filter(f => f !== user._id) };
          // localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
        } else {
    
          const ticketsPrice=event.ticketsPrice+"000"
          axios.post('/payment',{ticketsPrice}).then((res)=>{
            const {result}=res.data;
            window.location.href=result.link;
            setParticipation(!participation);
          }).catch((err)=>{console.error(err);});
        }
      };
  return (
    <List style={{ width: '100%' }}>
                        <ListItem  className={classes.listItem} style={{ width: '100%' }}>
                            <ListItemAvatar>
                                <Avatar alt={user.firstname} src={user.profileImage} className={classes.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={`${user.firstname} ${user.lastname}`} secondary={user.username} className={classes.listItemText} />
                            <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                            <Button
                                className={`rounded-lg p-2 ${participation ? 'bg-gray-500 text-gray-400' : 'bg-violet-700 text-white'}`} 
                                disabled={participation}
                                onClick={()=>{handleClick()}}
                            >
                                buy
                            </Button>
                            </ListItemSecondaryAction>
                        </ListItem>                
    </List>
  )
}

export default ListFollower