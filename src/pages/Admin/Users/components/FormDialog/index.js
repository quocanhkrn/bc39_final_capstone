import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddUserSuccess, addUserSendRequest, updateUserSendRequest } from "../../_duck/actions";

const FormDialog = (props) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.Admin.AddAndUpdateUser);
  const { user: propUser, open, handleClose } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(actAddUserSuccess(null));
    setUser(propUser);
  }, [propUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (propUser) {
      dispatch(updateUserSendRequest(user, setUser));
    } else {
      dispatch(addUserSendRequest(user, setUser));
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={() => {
        handleClose(setUser);
      }}>
      <Box component={"form"} onSubmit={handleOnSubmit}>
        <DialogTitle>{propUser ? "UPDATE USER" : "ADD USER"}</DialogTitle>
        <DialogContent sx={{ overflow: "initial" }}>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {error || data ? (
            <Alert severity={error ? "error" : "success"} sx={{ mb: 2 }}>
              {error || data}
            </Alert>
          ) : (
            ""
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={user?.name || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={user?.email || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={user?.password || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                value={user?.phone || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Birthday"
                name="birthday"
                value={user?.birthday || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="role-select-lable">Role</InputLabel>
                <Select
                  labelId="role-select-lable"
                  name="role"
                  value={user?.role || ""}
                  required
                  label="Role"
                  onChange={handleOnChange}
                  margin="none">
                  <MenuItem value={"USER"}>User</MenuItem>
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FormDialog;
