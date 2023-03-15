import { AddRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, InputAdornment, Snackbar, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddCategorySuccess, actDeleteCategoryRequest, getCategorySendRequest } from "./_duck/actions";
import FormDialog from "./components/FormDialog";
import CategoryList from "./components/CategoryList";

const Categories = () => {
  const dispatch = useDispatch();
  const { loading: getLoading, data } = useSelector((state) => state.Admin.GetCategory);
  const { loading: deleteLoading, data: deleteSuccessMessage, error: deleteFailMessage } = useSelector((state) => state.Admin.DeleteCategory);
  const [updateUser, setUpdateUser] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategorySendRequest());
    dispatch(actDeleteCategoryRequest());
  }, []);

  useEffect(() => {
    if (data) {
      setCategoryList([...data]);
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
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSearchOnChange = (e) => {
    const keyword = e.target.value.toUpperCase().trim();

    const result = data.filter(
      (category) =>
        category.tenLoaiCongViec.toUpperCase().includes(keyword) ||
        category.dsNhomChiTietLoai.some(
          (subCategory) =>
            subCategory.tenNhom.toUpperCase().includes(keyword) ||
            subCategory.dsChiTietLoai.some((subSubCategory) => subSubCategory.tenChiTiet.toUpperCase().includes(keyword))
        )
    );

    setCategoryList([...result]);
  };

  document.title = "JOB CATEGORY MANAGEMENT | FIVERR";

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextField
          variant="outlined"
          label="Search"
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

        <CategoryList data={categoryList} />

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert variant="filled" severity={deleteSuccessMessage ? "success" : "error"} sx={{ width: "100%" }}>
            {deleteFailMessage ? deleteFailMessage : deleteSuccessMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Categories;
