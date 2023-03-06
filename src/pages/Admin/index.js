import "./reset.css";
import "./style.css";
import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Toolbar } from "@mui/material";
import { CategoryRounded, MiscellaneousServicesRounded, PeopleAltRounded, WorkRounded } from "@mui/icons-material";

const Admin = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 200;

  const drawer = (
    <List>
      <Toolbar />
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/admin/users")}>
          <ListItemIcon>
            <PeopleAltRounded />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/admin/jobs")}>
          <ListItemIcon>
            <WorkRounded />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/admin/categories")}>
          <ListItemIcon>
            <CategoryRounded />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/admin/services")}>
          <ListItemIcon>
            <MiscellaneousServicesRounded />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  document.title = "FIVERR ADMINSPACE";

  if (!localStorage.getItem("admin-account")) {
    return <Navigate to={"signin"} />;
  }

  return (
    <>
      <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        <Grid container sx={{ overflow: "hidden", overflowY: "auto" }}>
          <Grid xs md="auto" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}>
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
              open>
              {drawer}
            </Drawer>
          </Grid>
          <Grid xs={12} md sx={{ px: { xs: 5, md: 0 }, py: 4, pl: { md: 30 } }}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
