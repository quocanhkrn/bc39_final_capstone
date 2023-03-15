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
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddOrderSuccess, addOrderSendRequest, updateOrderSendRequest } from "../../_duck/actions";

const FormDialog = (props) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.Admin.AddAndUpdateOrder);
  const { order: propOrder, jobList, userList, open, handleClose } = props;
  const [order, setOrder] = useState({});

  useEffect(() => {
    dispatch(actAddOrderSuccess(null));
    setOrder(propOrder);
  }, [propOrder]);

  const generateCurrentDate = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const result = `${year}-${month > 10 ? `${month}` : `0${month}`}-${day > 10 ? `${day}` : `0${day}`}`;
    setOrder({ ngayThue: result });
    return result;
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "hoanThanh":
        setOrder((prevOrder) => {
          return { ...prevOrder, [name]: e.target.checked };
        });
        break;

      default:
        setOrder((prevOrder) => {
          return { ...prevOrder, [name]: value };
        });
        break;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (propOrder) {
      dispatch(updateOrderSendRequest(order, setOrder));
    } else {
      dispatch(addOrderSendRequest(order, setOrder));
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={() => {
        handleClose(setOrder);
      }}>
      <Box component={"form"} onSubmit={handleOnSubmit}>
        <DialogTitle>{propOrder ? "UPDATE ORDER" : "ADD ORDER"}</DialogTitle>
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
              <FormControl variant="standard" fullWidth>
                <InputLabel id="job-select-lable">Job</InputLabel>
                <Select
                  labelId="job-select-lable"
                  name="maCongViec"
                  value={order?.maCongViec || ""}
                  required
                  label="Job"
                  onChange={handleOnChange}
                  margin="none">
                  {jobList?.map((job) => {
                    return (
                      <MenuItem key={job.id} value={job.id}>
                        {job.tenCongViec}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="client-select-lable">Client</InputLabel>
                <Select
                  labelId="client-select-lable"
                  name="maNguoiThue"
                  value={order?.maNguoiThue || ""}
                  required
                  label="Client"
                  onChange={handleOnChange}
                  margin="none">
                  {userList?.map((user) => {
                    return (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Hire date"
                type="date"
                name="ngayThue"
                value={order?.ngayThue || generateCurrentDate}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Switch name="hoanThanh" onChange={handleOnChange} />} label="Completed" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(setOrder)}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FormDialog;
