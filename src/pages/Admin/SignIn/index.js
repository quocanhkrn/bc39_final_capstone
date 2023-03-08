import { useState } from "react";
import "./../reset.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actSignInSuccess, signInSendRequest } from "./_duck/action";
const { Container, Typography, TextField, Button, Box, Alert, CircularProgress } = require("@mui/material");

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.Admin.SignIn);
  const [user, setUser] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    dispatch(actSignInSuccess(null));
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signInSendRequest(user, navigate));
  };

  document.title = "SIGNIN | FIVERR ADMINSPACE";

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh" }}>
      <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
        Welcome back!
      </Typography>
      {loading && <CircularProgress color="warning" sx={{ mx: "auto", my: 1 }} />}
      {error && (
        <Alert severity="error" sx={{ my: 1.5 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleOnSubmit}>
        <TextField type="email" required name="email" onChange={handleOnChange} label="Email" variant="outlined" fullWidth margin="dense"></TextField>
        <TextField
          type="password"
          required
          name="password"
          onChange={handleOnChange}
          label="Password"
          variant="outlined"
          fullWidth
          margin="dense"></TextField>
        <Button type="submit" variant="contained" size="large" fullWidth disableElevation sx={{ my: 1 }}>
          SIGN IN
        </Button>
        <Typography variant="body1" textAlign="center">
          Don't have an account?{" "}
          <Typography component="a" href="/admin/signup" color="primary">
            Signup
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
