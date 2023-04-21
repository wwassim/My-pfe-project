import { Box, Typography,  } from "@mui/material";


const StatBox = ({ title, subtitle, icon, progress, increase }) => {
 

  return (
    <Box className="w-full m-[10px]">
      <Box className="flex justify-between">
          {icon}
          <Typography
            sx={{ color:"#141414" }}
            fontWeight="bold"
          >
            {title}
          </Typography>
      </Box>
      <Box className="flex justify-between mt-2px" >
        <Typography variant="h6" sx={{ color: "#4cceac"}}>
          {subtitle}
        </Typography>

      </Box>
    </Box>
  );
};

export default StatBox;