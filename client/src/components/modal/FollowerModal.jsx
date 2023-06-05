import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Avatar, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import {Button}  from "@material-tailwind/react";
import CloseIcon from '@material-ui/icons/Close';
import ListFollower from './ListFollower';
import axios from "axios";
import Loading from '../utility/Loading';

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

const FollowerModal = (props) => {
    const { title, openPopup, setOpenPopup, Data,event,isError,isLoading } = props;
    const currentUser = Data
    const usersData=Data.followings
    const classes = useStyles();
    
    // const [participation,setParticipation]=useState(
    //     currentUser.participationEvent.includes(event?._id)
    //   )
      const handleClick = async () => {
        //send event id to localstorage
        localStorage.setItem('enevt',JSON.stringify(event._id))
        localStorage.setItem('userId',JSON.stringify(currentUser._id))
        
        const ticketsPrice=event.ticketsPrice+"000"
          axios.post('/payment',{ticketsPrice}).then((res)=>{
            const {result}=res.data;
            window.location.href=result.link;
          }).catch((err)=>{console.error(err);});
        //  setParticipation(!participation);
      };
      const eventId = event._id;

    return (
        <Loading error={isError} loading={isLoading} >
            <Dialog open={openPopup} maxWidth="md" fullWidth={true} classes={{ paper: classes.dialogWrapper, backgroundColor: "#141b2d", color: "#666666", }}>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6">
                            {title}
                        </Typography>
                        <Button
                            onClick={() => { setOpenPopup(false) }}
                            className={classes.closeButton}>
                            <CloseIcon />
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <List style={{ width: '100%' }}>
                            <ListItem  className={classes.listItem} style={{ width: '100%' }}>
                                <ListItemAvatar>
                                    <Avatar alt={currentUser.firstname} src={currentUser.profileImage} className={classes.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={`${currentUser.firstname} ${currentUser.lastname}`} secondary={currentUser.username} className={classes.listItemText} />
                                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                                <Button
                                    className={`rounded-lg p-2 ${currentUser.participationEvent.some(event => event._id === eventId) ? 'bg-gray-500 text-gray-400' : 'bg-violet-700 text-white'}`} 
                                    disabled={currentUser.participationEvent.includes(event._id)}
                                    onClick={()=>{handleClick()}}
                                >
                                    buy for me
                                </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                    </List>
                        {usersData.map(user => (
                            <ListFollower key={user.id} user={user} event={event}/>
                        ))}
                </DialogContent>
            </Dialog>
        </Loading>
    )
}

export default FollowerModal;
