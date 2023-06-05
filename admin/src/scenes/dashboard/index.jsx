import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import UsersList from "./UsersList";
import UserChart from "./UserChart";
import EventChart from "./EventChart";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import EventsList from "./EventsList";

const Dashboard=()=>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
       
      </Box>
      {/* Content */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="260px"
        gap="20px"

      >
          {/* <!-- Row 1 --> */}
          <Box
          gridColumn="span 8"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          >
            <UsersList/>
          </Box>
 
          <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          >
              <UserChart/>
          </Box>
          {/* <!-- Row 2 --> */}
          <Box
          gridColumn="span 8"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          >
             <EventsList/>
          </Box>
          <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          >
           <EventChart/>
          </Box>
      </Box>
    </Box>
)
}

export default Dashboard