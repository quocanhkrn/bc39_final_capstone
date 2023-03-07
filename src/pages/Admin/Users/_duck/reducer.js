import * as TYPES from "./types";

const getUserInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const GetUserReducer = (state = getUserInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.GET_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.GET_USER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const addAndUpdateUserInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const AddAndUpdateUserReducer = (state = addAndUpdateUserInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_USER_REQUEST:
    case TYPES.UPDATE_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_USER_SUCCESS:
    case TYPES.UPDATE_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_USER_FAIL:
    case TYPES.UPDATE_USER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const deleteUserInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const DeleteUserReducer = (state = deleteUserInitialState, action) => {
  switch (action.type) {
    case TYPES.DELETE_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_USER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
