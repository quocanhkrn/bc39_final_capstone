import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getJobSendRequest = () => {
  return (dispatch) => {
    dispatch(actGetJobRequest());
    api
      .get("cong-viec")
      .then((res) => dispatch(actGetJobSuccess(res.data.content)))
      .catch((err) => dispatch(actGetJobFail(err.response.data.content)));
  };
};

const actGetJobRequest = () => {
  return { type: TYPES.GET_JOB_REQUEST };
};

const actGetJobSuccess = (data) => {
  return {
    type: TYPES.GET_JOB_SUCCESS,
    payload: data,
  };
};

const actGetJobFail = (error) => {
  return {
    type: TYPES.GET_JOB_FAIL,
    payload: error,
  };
};

export const addJobSendRequest = (job, setJob) => {
  return (dispatch) => {
    dispatch(actAddJobRequest());
    api
      .post("cong-viec", job)
      .then((res) => {
        dispatch(actAddJobSuccess("Thêm công việc thành công"));
        setJob(null);
        dispatch(getJobSendRequest());
      })
      .catch((err) => dispatch(actAddJobFail(err.response.data.content)));
  };
};

const actAddJobRequest = () => {
  return { type: TYPES.ADD_JOB_REQUEST };
};

export const actAddJobSuccess = (data) => {
  return {
    type: TYPES.ADD_JOB_SUCCESS,
    payload: data,
  };
};

const actAddJobFail = (error) => {
  return {
    type: TYPES.ADD_JOB_FAIL,
    payload: error,
  };
};

export const updateJobSendRequest = (job, setJob) => {
  return (dispatch) => {
    dispatch(actUpdateJobRequest());
    api
      .put(`cong-viec/${job.id}`, job)
      .then((res) => {
        dispatch(actUpdateJobSuccess("Cập nhật công việc thành công"));
        setJob(null);
        dispatch(getJobSendRequest());
      })
      .catch((err) => dispatch(actUpdateJobFail(err.response.data.content)));
  };
};

const actUpdateJobRequest = () => {
  return { type: TYPES.UPDATE_JOB_REQUEST };
};

export const actUpdateJobSuccess = (data) => {
  return {
    type: TYPES.UPDATE_JOB_SUCCESS,
    payload: data,
  };
};

const actUpdateJobFail = (error) => {
  return {
    type: TYPES.UPDATE_JOB_FAIL,
    payload: error,
  };
};

export const deleteJobSendRequest = (id) => {
  return (dispatch) => {
    dispatch(actDeleteJobRequest());
    api
      .delete(`cong-viec/${id}`)
      .then((res) => {
        dispatch(actDeleteJobSuccess(res.data.message));
        dispatch(getJobSendRequest());
      })
      .catch((err) => dispatch(actDeleteJobFail(err.response.data.content)));
  };
};

export const actDeleteJobRequest = () => {
  return { type: TYPES.DELETE_JOB_REQUEST };
};

const actDeleteJobSuccess = (data) => {
  return {
    type: TYPES.DELETE_JOB_SUCCESS,
    payload: data,
  };
};

const actDeleteJobFail = (error) => {
  return {
    type: TYPES.DELETE_JOB_FAIL,
    payload: error,
  };
};
