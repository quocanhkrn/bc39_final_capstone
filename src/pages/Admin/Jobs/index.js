import { AddRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, InputAdornment, Snackbar, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddJobSuccess, actDeleteJobRequest, getJobSendRequest } from "./_duck/actions";
import DataTable from "./components/Table";
import FormDialog from "./components/FormDialog";
import api from "utils/apiUtil";

const Jobs = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Admin.GetJob);
  const { data: deleteSuccessMessage, error: deleteFailMessage } = useSelector((state) => state.Admin.DeleteJob);
  const [updateJob, setUpdateJob] = useState(null);
  const [userList, setUserList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getJobSendRequest());
    dispatch(actDeleteJobRequest());
  }, []);

  useEffect(() => {
    if (data) {
      setJobList(data);
      api
        .get("users")
        .then((res) => setUserList(res.data.content))
        .then(() => api.get("chi-tiet-loai-cong-viec").then((res) => setCategoryList(res.data.content)));
    }
  }, [data]);

  useEffect(() => {
    if (deleteSuccessMessage || deleteFailMessage) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(false);
    }
  }, [deleteSuccessMessage, deleteFailMessage]);

  const handleGetJob = (job) => {
    setUpdateJob(job);
    setFormDialogOpen(true);
  };

  const handleFormDialogClose = (setJob) => {
    setFormDialogOpen(false);
    dispatch(actAddJobSuccess(null));
    setJob(null);
    setUpdateJob(null);
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
      const newList = [...data].filter((job) => {
        return job.tenCongViec.toUpperCase().indexOf(keyword) !== -1;
      });

      setJobList(newList);
    } else {
      setJobList(data);
    }
  };

  document.title = "JOBS MANAGEMENT | FIVERR";

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextField
          variant="outlined"
          label="Search job name"
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
          NEW JOB
        </Button>

        {data ? (
          <DataTable data={jobList} categoryData={categoryList} getJob={handleGetJob} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <FormDialog open={formDialogOpen} handleClose={handleFormDialogClose} job={updateJob} userData={userList} categoryData={categoryList} />

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert variant="filled" severity={deleteSuccessMessage ? "success" : "error"} sx={{ width: "100%" }}>
            {deleteFailMessage ? deleteFailMessage : deleteSuccessMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Jobs;
