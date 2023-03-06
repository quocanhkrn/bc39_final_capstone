import { SearchRounded } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import DataTable from "./components/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSendRequest } from "./_duck/actions";

const Users = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.Admin.GetUser);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    dispatch(getUserSendRequest());
  }, []);

  useEffect(() => {
    if (data) {
      setUserList([...data]);
    }
  }, [data]);

  document.title = "USER MANAGEMENT | FIVERR";

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
          sx={{ mb: 2 }}
        />
        <DataTable data={userList} />
      </Box>
    </>
  );
};

export default Users;
