import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  IconButton,
  ButtonGroup,
  Button,
  Typography,
  Rating,
} from "@mui/material";
import { LastPage, FirstPage, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteJobSendRequest } from "../../_duck/actions";

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <FirstPage />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        <LastPage />
      </IconButton>
    </Box>
  );
};

const DataTable = (props) => {
  const { getJob, data } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (data) {
      setPage(0);
    }
  }, [data]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDeleteJob = (id) => {
    dispatch(deleteJobSendRequest(id));
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center" width={"150px"}>
                  Cover
                </TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Created by</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Brief description</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row) => {
                let { id, tenCongViec, danhGia, giaTien, nguoiTao, tenNguoiTao, hinhAnh, moTa, chiTietLoaiCongViec, moTaNgan, saoCongViec } = row;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>
                      <img width={"100%"} src={hinhAnh} />
                    </TableCell>
                    <TableCell>{tenCongViec}</TableCell>
                    <TableCell>{tenNguoiTao}</TableCell>
                    <TableCell>{chiTietLoaiCongViec}</TableCell>
                    <TableCell>${giaTien}</TableCell>
                    <TableCell>{danhGia}</TableCell>
                    <TableCell>
                      <Rating value={saoCongViec} readOnly />
                    </TableCell>
                    <TableCell width={"300px"}>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          lineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}>
                        {moTaNgan}
                      </Typography>
                    </TableCell>
                    <TableCell width={"300px"}>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          lineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}>
                        {moTa}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" size="small">
                        <Button onClick={() => getJob(row)}>EDIT</Button>
                        <Button color="error" onClick={() => handleDeleteJob(id)}>
                          DELETE
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </>
  );
};

export default DataTable;
