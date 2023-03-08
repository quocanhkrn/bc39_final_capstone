import "./reset.css";
import "./style.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

const Admin = () => {
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
