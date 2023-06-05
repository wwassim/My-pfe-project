import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchEvents } from "../redux/eventSlice";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

const EventChart = () => {
  const [selectedRange, setSelectedRange] = useState([null, null]);

  const dispatch = useDispatch();
  const { loading, error, events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents(selectedRange));
  }, [dispatch, selectedRange]);

  const sortDataByEventCount = (events) => {
    // Count the number of events per user
    const eventCounts = {};
    events.forEach((event) => {
      const user = `${event.user._id}-${event.user.firstname}`;

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
      const [userId, firstname] = user.split("-");
      return {
        id: index + 1,
        user: firstname,
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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user", headerName: "User", width: 150 },
    { field: "userId", headerName: "UserId", width: 150 },
    { field: "eventCount", headerName: "Event Count", width: 150 },
  ];

  return (
    <div>
      <DateTimeRangePicker
        value={selectedRange}
        onChange={setSelectedRange}
        format="y-MM-dd HH:mm:ss"
        // clearIcon={null}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={sortedData} columns={columns} />
      </div>
    </div>
  );
};

export default EventChart;
