import { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
            <MenuRounded />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}>
            <MenuItem
              onClick={() => {
                navigate("/admin/users");
                handleCloseNavMenu();
              }}>
              <Typography textAlign="center">Users</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/jobs");
                handleCloseNavMenu();
              }}>
              <Typography textAlign="center">Jobs</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/categories");
                handleCloseNavMenu();
              }}>
              <Typography textAlign="center">Categories</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/orders");
                handleCloseNavMenu();
              }}>
              <Typography textAlign="center">Orders</Typography>
            </MenuItem>
          </Menu>
        </Box>
        <Typography
          component="a"
          variant="h4"
          color="inherit"
          sx={{ display: "inline", flexGrow: { xs: 1, md: 0 }, fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
          onClick={() => navigate("/admin")}>
          FIVERR
          <Typography variant="body1" color="inherit" sx={{ display: "inline", ml: 1, fontWeight: "light" }}>
            ADMINSPACE
          </Typography>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
          <Button sx={{ my: 2, color: "white", display: "block" }} onClick={() => navigate("/admin/users")}>
            Users
          </Button>
          <Button sx={{ my: 2, color: "white", display: "block" }} onClick={() => navigate("/admin/jobs")}>
            Jobs
          </Button>
          <Button sx={{ my: 2, color: "white", display: "block" }} onClick={() => navigate("/admin/categories")}>
            Categories
          </Button>
          <Button sx={{ my: 2, color: "white", display: "block" }} onClick={() => navigate("/admin/orders")}>
            Orders
          </Button>
        </Box>
        {renderUserOrLogin()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
