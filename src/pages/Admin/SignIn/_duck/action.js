import api from "utils/apiUtil";
import * as TYPES from "./types";

export const signInSendRequest = (user, navigate) => {
  return (dispatch) => {
    dispatch(actSignInRequest());
    api
      .post("auth/signin", user)
      .then((res) => {
        const { user } = res.data.content;
        if (user.role.toUpperCase() === "ADMIN") {
          localStorage.setItem("admin-account", JSON.stringify(res.data.content));
          navigate("/admin/users", { replace: true });
          dispatch(actSignInSuccess(res.data.content));
        } else {
          return Promise.reject({
            response: {
              data: {
                content: "YOU DONT'T HAVE ACCESS PERMISSION",
              },
            },
          });
        }
      })
      .catch((err) => dispatch(actSignInFail(err.response.data.content)));
  };
};

const actSignInRequest = () => {
  return {
    type: TYPES.SIGN_IN_REQUEST,
  };
};

export const actSignInSuccess = (data) => {
  return {
    type: TYPES.SIGN_IN_SUCCESS,
    payload: data,
  };
};

const actSignInFail = (error) => {
  return {
    type: TYPES.SIGN_IN_FAIL,
    payload: error,
  };
};
