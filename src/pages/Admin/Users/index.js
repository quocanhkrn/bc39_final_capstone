import { AddRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, InputAdornment, Snackbar, TextField, Alert } from "@mui/material";
import DataTable from "./components/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddUserSuccess, actDeleteUserRequest, getUserSendRequest } from "./_duck/actions";
import FormDialog from "./components/FormDialog";

const Users = () => {
  const dispatch = useDispatch();
  const { loading: getLoading, data } = useSelector((state) => state.Admin.GetUser);
  const { loading: deleteLoading, data: deleteSuccessMessage, error: deleteFailMessage } = useSelector((state) => state.Admin.DeleteUser);
  const [updateUser, setUpdateUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserSendRequest());
    dispatch(actDeleteUserRequest());
  }, []);

  useEffect(() => {
    if (data) {
      setUserList(data);
    }
  }, [data]);

  useEffect(() => {
    if (deleteSuccessMessage || deleteFailMessage) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(false);
    }
  }, [deleteSuccessMessage, deleteFailMessage]);

  const handleGetUser = (user) => {
    setUpdateUser(user);
    setFormDialogOpen(true);
  };

  const handleFormDialogClose = (setUser) => {
    dispatch(actAddUserSuccess(null));
    setUser(null);
    setUpdateUser(null);
    setFormDialogOpen(false);
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSearchOnChange = (e) => {
    const keyword = e.target.value.toUpperCase();

    if (keyword.trim()) {
      const newList = [...data].filter((user) => {
        return user.name.toUpperCase().indexOf(keyword) !== -1;
      });

      setUserList(newList);
    } else {
      setUserList(data);
    }
  };

  document.title = "USER MANAGEMENT | FIVERR";

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextField
          variant="outlined"
          label="Search user name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={handleSearchOnChange}
        />

        <Button variant="contained" fullWidth sx={{ my: 2 }} onClick={() => setFormDialogOpen(true)}>
          <AddRounded />
          NEW USER
        </Button>

        {data ? (
          <DataTable data={userList} getUser={handleGetUser} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <FormDialog open={formDialogOpen} handleClose={handleFormDialogClose} user={updateUser} />

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert variant="filled" severity={deleteSuccessMessage ? "success" : "error"} sx={{ width: "100%" }}>
            {deleteFailMessage ? deleteFailMessage : deleteSuccessMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Users;
