import { AddRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, InputAdornment, Snackbar, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddOrderSuccess, actDeleteOrderRequest, getOrderSendRequest } from "./_duck/actions";
import DataTable from "./components/Table";
import FormDialog from "./components/FormDialog";
import api from "utils/apiUtil";
import { getJobSendRequest } from "../Jobs/_duck/actions";
import { getUserSendRequest } from "../Users/_duck/actions";

const Users = () => {
  const dispatch = useDispatch();
  const { data: jobList } = useSelector((state) => state.Admin.GetJob);
  const { data: userList } = useSelector((state) => state.Admin.GetUser);
  const { loading: getLoading, data } = useSelector((state) => state.Admin.GetOrder);
  const { loading: deleteLoading, data: deleteSuccessMessage, error: deleteFailMessage } = useSelector((state) => state.Admin.DeleteOrder);
  const [updateOrder, setUpdateOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [categoryList, setCategoryList] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrderSendRequest());
    dispatch(actDeleteOrderRequest());
  }, []);

  useEffect(() => {
    if (data) {
      setOrderList(data);
      dispatch(getJobSendRequest());
      dispatch(getUserSendRequest());
    }
  }, [data]);

  useEffect(() => {
    if (deleteSuccessMessage || deleteFailMessage) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(false);
    }
  }, [deleteSuccessMessage, deleteFailMessage]);

  const handleGetOrder = (user) => {
    setUpdateOrder(user);
    setFormDialogOpen(true);
  };

  const handleFormDialogClose = (setOrder) => {
    dispatch(actAddOrderSuccess(null));
    setOrder(null);
    setUpdateOrder(null);
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
      const newList = [...data].filter((order) => {
        return order.nguoiThue.toUpperCase().indexOf(keyword) !== -1;
      });

      setOrderList(newList);
    } else {
      setOrderList(data);
    }
  };

  document.title = "ORDER MANAGEMENT | FIVERR";

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextField
          variant="outlined"
          label="Search client name"
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
          NEW ORDER
        </Button>

        {data ? (
          <DataTable data={orderList} jobList={jobList} userList={userList} categoryList={categoryList} getOrder={handleGetOrder} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <FormDialog open={formDialogOpen} handleClose={handleFormDialogClose} order={updateOrder} jobList={jobList} userList={userList} />

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
