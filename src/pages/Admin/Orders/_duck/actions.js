import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getOrderSendRequest = () => {
  return (dispatch) => {
    dispatch(actGetOrderRequest());

    let data = [];

    api
      .get("thue-cong-viec")
      .then((res) => {
        data = [...res.data.content];

        data.forEach((order) => {
          const { maNguoiThue } = order;

          api.get(`users/${maNguoiThue}`).then((res) => {
            order.nguoiThue = res.data.content.name;
          });
        });
      })
      .then(() => {
        dispatch(actGetOrderSuccess(data));
      })
      .catch((err) => dispatch(actGetOrderFail(err.response.data.content)));
  };
};

const actGetOrderRequest = () => {
  return { type: TYPES.GET_ORDER_REQUEST };
};

const actGetOrderSuccess = (data) => {
  return {
    type: TYPES.GET_ORDER_SUCCESS,
    payload: data,
  };
};

const actGetOrderFail = (error) => {
  return {
    type: TYPES.GET_ORDER_FAIL,
    payload: error,
  };
};

export const addOrderSendRequest = (order, setOrder) => {
  return (dispatch) => {
    dispatch(actAddOrderRequest());
    api
      .post("thue-cong-viec", order)
      .then((res) => {
        dispatch(actAddOrderSuccess("Thuê dịch vụ thành công"));
        setOrder(null);
        dispatch(getOrderSendRequest());
      })
      .catch((err) => dispatch(actAddOrderFail(err.response.data.content)));
  };
};

const actAddOrderRequest = () => {
  return { type: TYPES.ADD_ORDER_REQUEST };
};

export const actAddOrderSuccess = (data) => {
  return {
    type: TYPES.ADD_ORDER_SUCCESS,
    payload: data,
  };
};

const actAddOrderFail = (error) => {
  return {
    type: TYPES.ADD_ORDER_FAIL,
    payload: error,
  };
};

export const updateOrderSendRequest = (order, setOrder) => {
  return (dispatch) => {
    dispatch(actUpdateOrderRequest());
    api
      .put(`thue-cong-viec/${order.id}`, order)
      .then((res) => {
        dispatch(actUpdateOrderSuccess("Cập nhật thành công"));
        setOrder(null);
        dispatch(getOrderSendRequest());
      })
      .catch((err) => dispatch(actUpdateOrderFail(err.response.data.content)));
  };
};

const actUpdateOrderRequest = () => {
  return { type: TYPES.UPDATE_ORDER_REQUEST };
};

export const actUpdateOrderSuccess = (data) => {
  return {
    type: TYPES.UPDATE_ORDER_SUCCESS,
    payload: data,
  };
};

const actUpdateOrderFail = (error) => {
  return {
    type: TYPES.UPDATE_ORDER_FAIL,
    payload: error,
  };
};

export const deleteOrderSendRequest = (id) => {
  return (dispatch) => {
    dispatch(actDeleteOrderRequest());
    api
      .delete(`thue-cong-viec/${id}`)
      .then((res) => {
        dispatch(actDeleteOrderSuccess(res.data.message));
        dispatch(getOrderSendRequest());
      })
      .catch((err) => dispatch(actDeleteOrderFail(err.response.data.content)));
  };
};

export const actDeleteOrderRequest = () => {
  return { type: TYPES.DELETE_ORDER_REQUEST };
};

const actDeleteOrderSuccess = (data) => {
  return {
    type: TYPES.DELETE_ORDER_SUCCESS,
    payload: data,
  };
};

const actDeleteOrderFail = (error) => {
  return {
    type: TYPES.DELETE_ORDER_FAIL,
    payload: error,
  };
};
