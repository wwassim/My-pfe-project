import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Avatar, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import {Button}  from "@material-tailwind/react";
import CloseIcon from '@material-ui/icons/Close';
import Loading from '../utility/Loading';
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 
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
        cursor:"pointer"
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

const Follower = (props) => {
    const { title, openPopup, setOpenPopup, Data,isError,isLoading } = props;
    const [usersData,setUsersData]=useState([])
    const navigate = useNavigate();
    const classes = useStyles();
    useEffect(()=>{
        setUsersData(Data)
      },[Data])
    

    const handleSubmit = (e) => e.preventDefault()
    const handleSearchChange = (e) => {
      if (usersData !== null  ){
        if (!e.target.value) return setUsersData(Data)
        const resultsArray = usersData.filter(user => user?.lastname.includes(e.target.value) || user?.firstname.includes(e.target.value))
        setUsersData(resultsArray)
      } 
    }

    return (
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
                <Box
                backgroundColor="#f2f0f0"
                borderRadius="3px"
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputBase sx={{ ml: 2, flex: '1' }} placeholder="Search" onChange={handleSearchChange} />
                        <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                        </IconButton>
                        </div>
                    </form>
                </Box>
                <Loading error={isError} loading={isLoading}>
                    <List style={{ width: '100%' }}>
                        {usersData &&usersData.length > 0 ?( usersData.map((user) => {
                        return (
                            <ListItem
                            key={user?._id}
                            className={classes.listItem}
                            style={{ width: '100%' }}
                            onClick={() => {
                                navigate(`/users/${user?._id}`);
                                setOpenPopup(false);
                            }}
                            >
                            <ListItemAvatar>
                                <Avatar
                                alt={user.firstname}
                                src={user.profileImg ?`http://localhost:5000/assets/${user?.profileImg}`:" https://cdn-icons-png.flaticon.com/512/147/147144.png"}
                                className={classes.avatar}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${user.firstname} ${user.lastname}`}
                                secondary={user.username}
                                className={classes.listItemText}
                            />
                            </ListItem>
                         );
                        })):
                       ( <>
                        haw aalech
                        </>)
                        }
                    </List>
                </Loading>
                </DialogContent>
            </Dialog>
    )
}

export default Follower;
