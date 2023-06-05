import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar/>
      <Box flexGrow={1}>
        <Topbar/>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;