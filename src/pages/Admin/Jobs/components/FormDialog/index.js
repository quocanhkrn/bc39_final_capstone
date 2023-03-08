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
  InputAdornment,
  Rating,
  Typography,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddJobSuccess, addJobSendRequest, updateJobSendRequest } from "../../_duck/actions";

const FormDialog = (props) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.Admin.AddAndUpdateJob);
  const { job: propJob, open, handleClose, userData, categoryData } = props;
  const [job, setJob] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    dispatch(actAddJobSuccess(null));
    setJob(propJob);
  }, [propJob]);

  useEffect(() => {
    let list = [];

    categoryData?.forEach((group) => {
      group.dsChiTietLoai.forEach((category) => {
        if (
          !list.some((element) => {
            return element.id === category.id;
          })
        ) {
          list.push(category);
        }
      });
    });

    setCategoryList([...list]);
  }, [categoryData]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "hinhAnh":
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          setJob((prevJob) => {
            return { ...prevJob, hinhAnhBlob: blob, hinhAnhSrc: URL.createObjectURL(file) };
          });
        };
        break;

      case "danhGia":
      case "saoCongViec":
        setJob((prevJob) => {
          return { ...prevJob, [name]: parseInt(value) };
        });
        break;

      default:
        setJob((prevJob) => {
          return { ...prevJob, [name]: value };
        });
        break;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (propJob) {
      dispatch(updateJobSendRequest(job, setJob));
    } else {
      dispatch(addJobSendRequest(job, setJob));
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={() => {
        handleClose(setJob);
      }}>
      <Box component={"form"} onSubmit={handleOnSubmit}>
        <DialogTitle>{propJob ? "UPDATE JOB" : "ADD JOB"}</DialogTitle>
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
                name="tenCongViec"
                value={job?.tenCongViec || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                name="giaTien"
                value={job?.giaTien || ""}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="creator-select-lable">Created by</InputLabel>
                <Select
                  labelId="creator-select-lable"
                  name="nguoiTao"
                  value={job?.nguoiTao || ""}
                  required
                  label="Created by"
                  onChange={handleOnChange}
                  margin="none">
                  {userData?.map((user) => {
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
              <FormControl variant="standard" fullWidth>
                <InputLabel id="catagory-select-lable">Category</InputLabel>
                <Select
                  labelId="catagory-select-lable"
                  name="maChiTietLoaiCongViec"
                  value={job?.maChiTietLoaiCongViec || ""}
                  required
                  label="Category"
                  onChange={handleOnChange}
                  margin="none">
                  {categoryList.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.tenChiTiet}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Score"
                type="number"
                name="danhGia"
                value={job?.danhGia || 0}
                required
                onChange={handleOnChange}
                variant="standard"
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="legend">Rating</Typography>
              <Rating size="large" name="saoCongViec" value={job?.saoCongViec || 0} onChange={handleOnChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brief description"
                type="text"
                name="moTaNgan"
                value={job?.moTaNgan || ""}
                onChange={handleOnChange}
                variant="standard"
                multiline
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                type="text"
                name="moTa"
                value={job?.moTa || ""}
                onChange={handleOnChange}
                variant="standard"
                multiline
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input type="file" name="hinhAnh" onChange={handleOnChange} variant="standard" fullWidth margin="none" sx={{ mb: 1 }} />
              <img src={job?.hinhAnh || ""} width={"100%"} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(setJob)}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FormDialog;
