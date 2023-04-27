import React, { useEffect }  from 'react'
import {Box, Button, IconButton, Typography, useTheme}from "@mui/material";
import { fetchEvents } from '../../redux/eventSlice'
import { useSelector,useDispatch } from 'react-redux'
import { tokens } from "../../theme";
import Loading from "../global/Loading"

const EventsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {loading,error,events} = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const sortedEvents = [...events].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
  }); // create a sorted copy of the events array

  return (
    <>
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`1px solid ${colors.primary[900]}`}
        colors={colors.grey[100]}
        p="10px"
    >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Recent Events
        </Typography>
    </Box>
    <Loading loading={loading} error={error}>
    {sortedEvents.slice(0, 4).map((event, i) => (
        <Box
            key={i}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.primary[900]}`}
            p="5px"
        >
            <Box>
                <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                >
                    {event.eventTitle}
                </Typography>
                <Typography color={colors.grey[100]}>
                    {event.user.firstname}
                </Typography>
            </Box>
            <Box color={colors.grey[100]}>{event.startDate}</Box>
            <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
            >
                {event.createdAt.slice(0, 10)}
            </Box>
        </Box>
    ))}
    </Loading>
</>
  )
}

export default EventsList