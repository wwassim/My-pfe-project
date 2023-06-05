import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "chart.js/auto";
import { fetchEvents } from '../../redux/eventSlice'
import { Box, TextField } from "@mui/material";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

const EventChart = () => {
  const {loading,error,events} = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState([null, null]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let filteredEvents = events;

    if (selectedRange !== null) {
      const startDate = selectedRange[0];
      const endDate = selectedRange[1];
      
      filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.createdAt);
        if (startDate && endDate) {
          return eventDate >= startDate && eventDate <= endDate;
        } else if (startDate) {
          return eventDate >= startDate;
        } else if (endDate) {
          return eventDate <= endDate;
        } else {
          return true;
        }
      });
    }

    const dates = [];
    const eventCounts = [];

    filteredEvents.forEach((event) => {
      const date = new Date(event.createdAt);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      if (!dates.includes(formattedDate)) {
        dates.push(formattedDate);
        eventCounts.push(1);
      } else {
        const index = dates.indexOf(formattedDate);
        eventCounts[index]++;
      }
    });

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Registered events",
            data: eventCounts,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "linear",
              time: {
                unit: "day",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: Math.max(Math.ceil(filteredEvents.length / 5), 1), // set stepSize as the ceiling of the division of filteredEvents.length by 5 to ensure integer values
                suggestedMax: filteredEvents.length,
                precision: 0, // set precision to 0 to display only integers
              },
            },
          ],
        },
      },
    });

  

  }, [events, selectedRange,dispatch]);
  
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dispatch(fetchEvents());
  //   }, 5000);
  
  //   return () => clearInterval(timer);
  // }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchEvents());
  },[dispatch])

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <div  style={{ height: "100%" }}>
      <DateTimeRangePicker
        onChange={handleRangeChange}
        value={selectedRange}
        format="MM/dd/yyyy h:mm a"
      />
       <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default EventChart