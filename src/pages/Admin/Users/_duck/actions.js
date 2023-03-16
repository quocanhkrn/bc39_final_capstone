import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getUserSendRequest = () => {
  return (dispatch) => {
    dispatch(actGetUserRequest());
    api
      .get("users")
      .then((res) => dispatch(actGetUserSuccess(res.data.content)))
      .catch((err) => dispatch(actGetUserFail(err.response.data.content)));
  };
};

const actGetUserRequest = () => {
  return { type: TYPES.GET_USER_REQUEST };
};

const actGetUserSuccess = (data) => {
  return {
    type: TYPES.GET_USER_SUCCESS,
    payload: data,
  };
};

const actGetUserFail = (error) => {
  return {
    type: TYPES.GET_USER_FAIL,
    payload: error,
  };
};

export const addUserSendRequest = (user, setUser) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    api
      .post("users", user)
      .then((res) => {
        setUser(null);
        dispatch(actAddUserSuccess("Thêm người dùng thành công"));
        dispatch(getUserSendRequest());
      })
      .catch((err) => dispatch(actAddUserFail(err.response.data.content)));
  };
};

const actAddUserRequest = () => {
  return { type: TYPES.ADD_USER_REQUEST };
};

export const actAddUserSuccess = (data) => {
  return {
    type: TYPES.ADD_USER_SUCCESS,
    payload: data,
  };
};

export const actAddUserFail = (error) => {
  return {
    type: TYPES.ADD_USER_FAIL,
    payload: error,
  };
};

export const updateUserSendRequest = (user, setUser) => {
  return (dispatch) => {
    dispatch(actUpdateUserRequest());
    api
      .put(`users/${user.id}`, user)
      .then((res) => {
        dispatch(actUpdateUserSuccess("Cập nhật người dùng thành công"));
        setUser(null);
        dispatch(getUserSendRequest());
      })
      .catch((err) => dispatch(actUpdateUserFail(err.response.data.content)));
  };
};

const actUpdateUserRequest = () => {
  return { type: TYPES.UPDATE_USER_REQUEST };
};

export const actUpdateUserSuccess = (data) => {
  return {
    type: TYPES.UPDATE_USER_SUCCESS,
    payload: data,
  };
};

const actUpdateUserFail = (error) => {
  return {
    type: TYPES.UPDATE_USER_FAIL,
    payload: error,
  };
};

export const deleteUserSendRequest = (id) => {
  return (dispatch) => {
    dispatch(actDeleteUserRequest());
    api
      .delete(`users?id=${id}`)
      .then((res) => {
        dispatch(actDeleteUserSuccess(res.data.message));
        dispatch(getUserSendRequest());
      })
      .catch((err) => dispatch(actDeleteUserFail(err.response.data.content)));
  };
};

export const actDeleteUserRequest = () => {
  return { type: TYPES.DELETE_USER_REQUEST };
};

const actDeleteUserSuccess = (data) => {
  return {
    type: TYPES.DELETE_USER_SUCCESS,
    payload: data,
  };
};

const actDeleteUserFail = (error) => {
  return {
    type: TYPES.DELETE_USER_FAIL,
    payload: error,
  };
};
