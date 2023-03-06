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
} from "@mui/material";
import { LastPage, FirstPage, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";

function TablePaginationActions(props) {
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
}

const DataTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data } = props;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Certifications</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, avatar, name, email, phone, birthday, role, skill, certification } = row;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>
                      <Avatar src={avatar} />
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>{birthday}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>
                      {skill?.map((skill) => {
                        return <Chip key={skill} label={skill} />;
                      })}
                    </TableCell>
                    <TableCell>
                      {certification?.map((certification) => {
                        return <Chip key={certification} label={certification} />;
                      })}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" size="small">
                        <Button>EDIT</Button>
                        <Button color="error">DELETE</Button>
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
