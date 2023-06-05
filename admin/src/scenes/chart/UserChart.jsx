import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "chart.js/auto";
import { fetchUsers } from "../../redux/userSlice";
import { Box, TextField } from "@mui/material";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

const UserChart = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState([null, null]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let filteredUsers = users;

    if (selectedRange !== null) {
      const startDate = selectedRange[0];
      const endDate = selectedRange[1];

      filteredUsers = users.filter((user) => {
        const userDate = new Date(user.createdAt);
        if (startDate && endDate) {
          return userDate >= startDate && userDate <= endDate;
        } else if (startDate) {
          return userDate >= startDate;
        } else if (endDate) {
          return userDate <= endDate;
        } else {
          return true;
        }
      });
    }

    const dates = [];
    const userCounts = [];

    filteredUsers.forEach((user) => {
      const date = new Date(user.createdAt);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      if (!dates.includes(formattedDate)) {
        dates.push(formattedDate);
        userCounts.push(1);
      } else {
        const index = dates.indexOf(formattedDate);
        userCounts[index]++;
      }
    });

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Registered Users",
            data: userCounts,
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
                stepSize: Math.max(Math.ceil(filteredUsers.length / 5), 1), // set stepSize as the ceiling of the division of filteredUsers.length by 5 to ensure integer values
                suggestedMax: filteredUsers.length,
                precision: 0, // set precision to 0 to display only integers
              },
            },
          ],
        },
      },
    });

  

  }, [users, selectedRange,dispatch]);
  
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dispatch(fetchUsers());
  //   }, 5000);
  
  //   return () => clearInterval(timer);
  // }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch])
  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <>
          <DateTimeRangePicker
            onChange={handleRangeChange}
            value={selectedRange}
            format="MM/dd/yyyy h:mm a"
          />
         <div style={{ height: "100%" }}>
          <canvas ref={canvasRef}></canvas>
        </div>
    </>
  )
}

export default UserChart