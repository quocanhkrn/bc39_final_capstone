import * as TYPES from "./types";

const getJobInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const GetJobReducer = (state = getJobInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_JOB_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.GET_JOB_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.GET_JOB_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const addAndUpdateJobInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const AddAndUpdateJobReducer = (state = addAndUpdateJobInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_JOB_REQUEST:
    case TYPES.UPDATE_JOB_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_JOB_SUCCESS:
    case TYPES.UPDATE_JOB_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_JOB_FAIL:
    case TYPES.UPDATE_JOB_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const deleteJobInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const DeleteJobReducer = (state = deleteJobInitialState, action) => {
  switch (action.type) {
    case TYPES.DELETE_JOB_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_JOB_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_JOB_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
