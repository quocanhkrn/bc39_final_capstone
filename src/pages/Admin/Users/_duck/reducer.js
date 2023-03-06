import * as TYPES from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const GetUserReducer = (state = initialState, action) => {
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
