import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button,Typography, useTheme } from "@mui/material";
import { fetchEvents } from "../../redux/eventSlice";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { tokens } from "../../theme";
import Header from "../../components/Header";


const OrgEvent = () => {
    const [selectedRange, setSelectedRange] = useState([null, null]);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { loading, error, events } = useSelector((state) => state.events);
  
    useEffect(() => {
      dispatch(fetchEvents(selectedRange));
    }, [dispatch, selectedRange]);
  
    const sortDataByEventCount = (events) => {
      // Count the number of events per user
      const eventCounts = {};
      events.forEach((event) => {
        const user = `${event.user._id}-${event.user.firstname}-${event.user.lastname}-${event.user.phonenumber}`;
  
        if (eventCounts[user]) {
          eventCounts[user]++;
        } else {
          eventCounts[user] = 1;
        }
      });
  
      // Sort users based on event counts
      const sortedUsers = Object.keys(eventCounts).sort(
        (a, b) => eventCounts[b] - eventCounts[a]
      );
  
      // Generate sorted data
      const sortedData = sortedUsers.map((user, index) => {
        const [userId, firstname,lastname,phonenumber] = user.split("-");
        return {
          id: index + 1,
          userFirst: firstname,
          userLast: lastname,
          phonenumber:phonenumber,
          userId,
          eventCount: eventCounts[user],
        };
      });
  
      return sortedData;
    };
  
    const filteredEvents = selectedRange?.[0] && selectedRange?.[1]
      ? events.filter((event) => {
          const eventDate = new Date(event.createdAt);
          const startDate = new Date(selectedRange[0]);
          const endDate = new Date(selectedRange[1]);
          return eventDate >= startDate && eventDate <= endDate;
        })
      : events;
  
    const sortedData = sortDataByEventCount(filteredEvents);
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "userId", headerName: "UserId", width: 200 },
      { field: "userFirst", headerName: "User", width: 150 ,cellClassName: "name-column--cell", },
      { field: "userLast", headerName: "User", width: 150,cellClassName: "name-column--cell", },
      { field: "phonenumber", headerName: "Phone Number", width: 150 },
      { field: "eventCount", headerName: "Event Count", width: 150 },
    ];
  
  return (
   <Box m="20px">
   <Box display="flex" justifyContent="space-between" alignItems="center">
       <Header title="ORGANIZERS" subtitle="" />
     <Box>
        <DateTimeRangePicker
        value={selectedRange}
        onChange={setSelectedRange}
        format="y-MM-dd HH:mm:ss"
        // clearIcon={null}
        />
     </Box>
   </Box>
   <Box
     // m="20px 0 0 0"
     height="70vh"
     sx={{
       "& .MuiDataGrid-root": {
         border: "none",
       },
       "& .MuiButtonBase-root": {
         color:  colors.primary[100],
       },
       "& .MuiDataGrid-cell": {
         borderBottom: "none",
       },
       "& .name-column--cell": {
         color: colors.greenAccent[300],
       },
       "& .MuiDataGrid-columnHeaders": {
         backgroundColor: colors.blueAccent[700],
         borderBottom: "none",
       },
       "& .MuiDataGrid-virtualScroller": {
         backgroundColor: colors.primary[400],
       },
       "& .MuiDataGrid-footerContainer": {
         borderTop: "none",
         backgroundColor: colors.blueAccent[700],
       },
       "& .MuiCheckbox-root": {
         color: `${colors.greenAccent[200]} !important`,
       },
     }}
   >
           <DataGrid rows={sortedData} columns={columns} />
   </Box>
   </Box>
  )
}

export default OrgEvent