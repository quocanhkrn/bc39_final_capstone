import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getCategorySendRequest = () => {
  return (dispatch) => {
    dispatch(actGetCategoryRequest());
    api
      .get("cong-viec/lay-menu-loai-cong-viec")
      .then((res) => dispatch(actGetCategorySuccess(res.data.content)))
      .catch((err) => dispatch(actGetCategoryFail(err.response.data.content)));
  };
};

const actGetCategoryRequest = () => {
  return { type: TYPES.GET_CATEGORY_REQUEST };
};

const actGetCategorySuccess = (data) => {
  return {
    type: TYPES.GET_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actGetCategoryFail = (error) => {
  return {
    type: TYPES.GET_CATEGORY_FAIL,
    payload: error,
  };
};

export const addCategorySendRequest = (category, setCategory) => {
  return (dispatch) => {
    dispatch(actAddCategoryRequest());
    switch (category.level) {
      case "01":
        api
          .post(`loai-cong-viec`, category.data)
          .then((res) => {
            dispatch(actAddCategorySuccess(res.data.message));
            dispatch(getCategorySendRequest());
            setCategory(null);
          })
          .catch((err) => dispatch(actAddCategoryFail(err.response.data.content)));
        break;

      case "02":
        api
          .post(`chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai`, { ...category["data"], maLoaiCongViec: category.maLoaiCongViec })
          .then((res) => {
            dispatch(actAddCategorySuccess(res.data.message));
            dispatch(getCategorySendRequest());
            setCategory(null);
          })
          .catch((err) => dispatch(actAddCategoryFail(err.response.data.content)));
        break;
    }
  };
};

const actAddCategoryRequest = () => {
  return { type: TYPES.ADD_CATEGORY_REQUEST };
};

export const actAddCategorySuccess = (data) => {
  return {
    type: TYPES.ADD_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actAddCategoryFail = (error) => {
  return {
    type: TYPES.ADD_CATEGORY_FAIL,
    payload: error,
  };
};

export const updateCategorySendRequest = (category, setCategory) => {
  return (dispatch) => {
    dispatch(actUpdateCategoryRequest());
    switch (category.level) {
      case "01":
        api
          .put(`loai-cong-viec/${category.data.id}`, category.data)
          .then((res) => {
            dispatch(actUpdateCategorySuccess(res.data.content));
            dispatch(getCategorySendRequest());
            setCategory(null);
          })
          .catch((err) => dispatch(actUpdateCategoryFail(err.response.data.content)));
        break;

      case "02":
        api
          .put(`chi-tiet-loai-cong-viec/${category.data.id}`, category.data)
          .then((res) => {
            dispatch(actUpdateCategorySuccess(res.data.content));
            dispatch(getCategorySendRequest());
            setCategory(null);
          })
          .catch((err) => dispatch(actUpdateCategoryFail(err.response.data.content)));
        break;
    }
  };
};

const actUpdateCategoryRequest = () => {
  return { type: TYPES.UPDATE_CATEGORY_REQUEST };
};

export const actUpdateCategorySuccess = (data) => {
  return {
    type: TYPES.UPDATE_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actUpdateCategoryFail = (error) => {
  return {
    type: TYPES.UPDATE_CATEGORY_FAIL,
    payload: error,
  };
};

export const deleteCategorySendRequest = (level, id) => {
  return (dispatch) => {
    dispatch(actDeleteCategoryRequest());

    switch (level) {
      case "level01":
        api
          .delete(`loai-cong-viec/${id}`)
          .then((res) => {
            dispatch(actDeleteCategorySuccess(res.data.message));
            dispatch(getCategorySendRequest());
          })
          .catch((err) => dispatch(actDeleteCategoryFail(err.response.data.content)));
        break;

      case "level02":
      case "level03":
        api
          .delete(`chi-tiet-loai-cong-viec/${id}`)
          .then((res) => {
            dispatch(actDeleteCategorySuccess(res.data.message));
            dispatch(getCategorySendRequest());
          })
          .catch((err) => dispatch(actDeleteCategoryFail(err.response.data.content)));
        break;

      default:
        break;
    }
  };
};

export const actDeleteCategoryRequest = () => {
  return { type: TYPES.DELETE_CATEGORY_REQUEST };
};

const actDeleteCategorySuccess = (data) => {
  return {
    type: TYPES.DELETE_CATEGORY_SUCCESS,
    payload: data,
  };
};

const actDeleteCategoryFail = (error) => {
  return {
    type: TYPES.DELETE_CATEGORY_FAIL,
    payload: error,
  };
};
