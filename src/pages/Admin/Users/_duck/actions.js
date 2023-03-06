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
