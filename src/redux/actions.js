import * as types from "./actionType";
import axios from "axios";
const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});
const userDeleted = () => ({
  type: types.DELETE_USER,
});
const userAdded = () => ({
  type: types.ADD_USER,
});
const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});
const userUpdated = () => ({
  type: types.UPDATE_USER,
});
export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((response) => {
        console.log("response by getting data is => ", response);
        dispatch(getUsers(response.data));
      })
      .catch((error) => console.log(error));
  };
};
export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((response) => {
        console.log("response by deleting data is => ", response);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};
export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, user)
      .then((response) => {
        console.log("response by adding data is => ", response);
        dispatch(userAdded());
      })
      .catch((error) => console.log(error));
  };
};
export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((response) => {
        console.log("response by getting single user data is => ", response);
        dispatch(getUser(response.data));
      })
      .catch((error) => console.log(error));
  };
};
export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, user)
      .then((response) => {
        console.log("response by updating single user data is => ", response);
        dispatch(userUpdated());
      })
      .catch((error) => console.log(error));
  };
};
