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
  Avatar,
  ButtonGroup,
  Button,
  Chip,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Rating,
  Divider,
} from "@mui/material";
import { LastPage, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, AutorenewRounded, DoneAllRounded, Category } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOrderSendRequest } from "../../_duck/actions";

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
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, jobList, userList, categoryList, getOrder } = props;
  const [detailJob, setDetailJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrderSendRequest(id));
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Order date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row) => {
                const { id, maCongViec, nguoiThue, ngayThue, hoanThanh } = row;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>
                      <Typography>
                        {
                          jobList?.find((job) => {
                            return job.id === maCongViec;
                          }).tenCongViec
                        }{" "}
                        <Link
                          onClick={() => {
                            setDialogOpen(true);
                            setDetailJob(
                              jobList?.find((job) => {
                                return job.id === maCongViec;
                              })
                            );
                          }}
                          sx={{ cursor: "pointer" }}>
                          Details
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>{nguoiThue}</TableCell>
                    <TableCell>{ngayThue}</TableCell>
                    <TableCell>
                      {hoanThanh ? (
                        <Chip icon={<DoneAllRounded />} label="Finished" variant="filled" color="success" />
                      ) : (
                        <Chip icon={<AutorenewRounded />} label="Processing" variant="outlined" color="warning" />
                      )}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" size="small">
                        <Button onClick={() => getOrder(row)}>EDIT</Button>
                        <Button color="error" onClick={() => handleDeleteOrder(id)}>
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

      <Dialog fullWidth maxWidth="sm" open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          <Typography fontWeight={"bold"} lineHeight={1}>
            JOB DETAILS
          </Typography>
          <Typography variant="body1">#{detailJob?.id}</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5}>
            <img src={detailJob?.hinhAnh} width={"100%"} />
            <Stack spacing={0.5} alignItems={"flex-start"}>
              <Typography variant="h6" fontWeight={"bold"} color={"primary"} sx={{ textTransform: "uppercase" }}>
                {detailJob?.tenCongViec}
              </Typography>
              <Chip label={detailJob?.chiTietLoaiCongViec} />
            </Stack>
            <Stack spacing={0.5}>
              <Typography>
                Created by:{" "}
                {detailJob &&
                  userList?.find((user) => {
                    return user.id === detailJob.nguoiTao;
                  }).name}
              </Typography>
              <Typography>Price: ${detailJob?.giaTien}</Typography>
              <Divider />
              <Typography>Score: {detailJob?.danhGia}</Typography>
              <Rating value={detailJob?.saoCongViec} readOnly />
              <Divider />
              <Typography variant="body2">
                <Typography component={"span"} variant="inherit" fontWeight={"bold"}>
                  Brief description:
                </Typography>{" "}
                {detailJob?.moTaNgan}
              </Typography>
              <Typography variant="body2">
                <Typography component={"span"} variant="inherit" fontWeight={"bold"}>
                  Description:
                </Typography>{" "}
                {detailJob?.moTa}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
