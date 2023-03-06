import { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("admin-account");
    navigate(0);
  };

  const renderUserOrLogin = () => {
    if (localStorage.getItem("admin-account")) {
      const { user } = JSON.parse(localStorage.getItem("admin-account"));
      return (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={user.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            <Typography sx={{ mx: 2, mt: 1 }}>{user.name}</Typography>
            <Typography variant="body2" sx={{ mx: 2, mt: -0.5, mb: 1, color: "text.secondary" }}>
              {user.email}
            </Typography>
            <Divider />
            <MenuItem onClick={handleSignOut}>
              <Typography textAlign="center">Sign out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      );
    } else {
      return (
        <Button variant="outlined" color="inherit">
          Login
        </Button>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" sx={{ mr: 2, display: { md: "none" } }} onClick={props.handleDrawerToggle}>
          <MenuRounded />
        </IconButton>
        <Typography
          component="a"
          variant="h4"
          color="inherit"
          sx={{ display: "inline", flexGrow: 1, fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
          onClick={() => navigate("/admin")}>
          FIVERR
          <Typography variant="body1" color="inherit" sx={{ display: "inline", ml: 1, fontWeight: "light" }}>
            ADMINSPACE
          </Typography>
        </Typography>
        {renderUserOrLogin()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
