import "./reset.css";
import "./style.css";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { CategoryRounded, MiscellaneousServicesRounded, PeopleAltRounded, WorkRounded } from "@mui/icons-material";

const Admin = () => {
  const navigate = useNavigate();

  document.title = "FIVERR ADMINSPACE";

  if (!localStorage.getItem("admin-account")) {
    return <Navigate to={"signin"} />;
  }

  return (
    <>
      <Box sx={{ maxHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Box sx={{ flex: 0 }}>
          <Navbar />
        </Box>
        <Box sx={{ flex: 0, flexGrow: 1, overflowY: "auto", p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Admin;
