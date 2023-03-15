import * as TYPES from "./types";

const getCategoryInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const GetCategoryReducer = (state = getCategoryInitialState, action) => {
  switch (action.type) {
    case TYPES.GET_CATEGORY_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.GET_CATEGORY_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.GET_CATEGORY_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const addAndUpdateCategoryInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const AddAndUpdateCategoryReducer = (state = addAndUpdateCategoryInitialState, action) => {
  switch (action.type) {
    case TYPES.ADD_CATEGORY_REQUEST:
    case TYPES.UPDATE_CATEGORY_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.ADD_CATEGORY_SUCCESS:
    case TYPES.UPDATE_CATEGORY_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.ADD_CATEGORY_FAIL:
    case TYPES.UPDATE_CATEGORY_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

const deleteCategoryInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const DeleteCategoryReducer = (state = deleteCategoryInitialState, action) => {
  switch (action.type) {
    case TYPES.DELETE_CATEGORY_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_CATEGORY_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case TYPES.DELETE_CATEGORY_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
