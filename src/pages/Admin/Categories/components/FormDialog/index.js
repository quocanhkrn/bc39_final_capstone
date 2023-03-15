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
import { actAddCategorySuccess, addCategorySendRequest, updateCategorySendRequest } from "../../_duck/actions";

const FormDialog = (props) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.Admin.AddAndUpdateCategory);
  const { open, handleClose, updatedCategory: propCategory } = props;
  const [category, setCategory] = useState({});

  useEffect(() => {
    setCategory({ ...propCategory });
  }, [propCategory]);

  const handleOnChange = (e) => {
    dispatch(actAddCategorySuccess(null));

    const { name, value } = e.target;

    setCategory((prevCategory) => {
      return { ...prevCategory, data: { ...prevCategory.data, [name]: value } };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (propCategory.data) {
      dispatch(updateCategorySendRequest(category, setCategory));
    } else {
      dispatch(addCategorySendRequest(category, setCategory));
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={() => {
        handleClose(setCategory);
      }}>
      <Box component={"form"} onSubmit={handleOnSubmit}>
        <DialogTitle>{propCategory?.data ? "UPDATE CATEGORY" : "ADD CATEGORY"}</DialogTitle>
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
          <TextField
            label="Name"
            type="text"
            name={category?.level === "01" ? "tenLoaiCongViec" : "tenChiTiet"}
            value={category?.data?.tenLoaiCongViec || category?.data?.tenChiTiet || ""}
            required
            onChange={handleOnChange}
            variant="standard"
            fullWidth
            margin="none"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(setCategory)}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FormDialog;
