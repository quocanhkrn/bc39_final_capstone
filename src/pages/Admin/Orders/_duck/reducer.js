import * as TYPES from "./types";

const getOrderInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const GetOrderReducer = (state = getOrderInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_ORDER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.GET_ORDER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.GET_ORDER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const addAndUpdateOrderInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const AddAndUpdateOrderReducer = (state = addAndUpdateOrderInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_ORDER_REQUEST:
    case TYPES.UPDATE_ORDER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_ORDER_SUCCESS:
    case TYPES.UPDATE_ORDER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_ORDER_FAIL:
    case TYPES.UPDATE_ORDER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const deleteOrderInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const DeleteOrderReducer = (state = deleteOrderInitialState, action) => {
  switch (action.type) {
    case TYPES.DELETE_ORDER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_ORDER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_ORDER_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
