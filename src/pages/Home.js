import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
//import Table from '@material-ui/core';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import Paper from '@mui/material/Paper';
//import Paper from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const useStyles = makeStyles({
  table: {
    marginTop: 10,
    minWidth: 900,
  },
});
const useButtonStyles = makeStyles({
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      m: 1,
    },
  },
});
export const Home = () => {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    // dispatch(loadUsers());
  };
  useEffect(() => {
    dispatch(loadUsers());
    console.log("called again get users");
  }, []);
  return (
    <div>
      <div className={buttonStyles.button}>
        <Button color="secondary" onClick={() => navigate("/addUser")}>
          Add User
        </Button>
      </div>
      <TableContainer>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name </StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={buttonStyles.button}>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        <Button
                          color="primary"
                          onClick={() => {
                            navigate(`/edituser/${user.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
