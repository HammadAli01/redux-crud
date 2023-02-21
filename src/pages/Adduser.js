import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  field: {
    "& > :not(style)": { width: "45ch" },
  },
});

export const Adduser = () => {
  const initialData = { name: "", email: "", contact: "", address: "" };
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    dispatch(addUser(data));
    navigate("/");
    setData(initialData);
  };
  return (
    <div>
      <form className={classes.field}>
        <TextField
          id="standard-basic"
          variant="standard"
          name="name"
          label="Name"
          type="text"
          value={data.name}
          onChange={(e) => {
            inputChangeHandler(e);
          }}
        />
        <br />
        <TextField
          id="standard-basic"
          variant="standard"
          name="email"
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => {
            inputChangeHandler(e);
          }}
        />
        <br />
        <TextField
          id="standard-basic"
          variant="standard"
          name="contact"
          label="Contact"
          type="number"
          value={data.contact}
          onChange={(e) => {
            inputChangeHandler(e);
          }}
        />
        <br />
        <TextField
          id="standard-basic"
          variant="standard"
          name="address"
          label="Address"
          type="text "
          value={data.address}
          onChange={(e) => {
            inputChangeHandler(e);
          }}
        />
        <br />
        <Button
          color="primary"
          type="submit"
          style={{ width: "100px", border: "1px solid black", margin: "10px" }}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
