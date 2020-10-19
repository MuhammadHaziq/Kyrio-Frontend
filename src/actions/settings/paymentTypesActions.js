import {
  GET_PAYMENT_TYPES,
  ADD_NEW_PAYMENT_TYPE,
  GET_PAYMENTS_TYPE,
  DELETE_PAYMENTS_TYPE,
  UPDATE_ROW_DATA_PAYMENT_TYPE,
  UPDATE_PAYMENT_TYPE,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_PAYMENT,
  TOGGLE_PAYMENTS_SINGLE_SELECT,
  TOOGLE_PAYMENTS_ALL_SELECT,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

export const redirect_back_payment = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_PAYMENT,
      response: status,
    });
  };
};

export const get_payment_types = () => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}paymentTypes`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_PAYMENT_TYPES, response: response.data });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object:
              typeof error.response != "undefined"
                ? error.response.data || {}
                : {},
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const add_new_payment_type = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}paymentsType`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_PAYMENT_TYPE, response: response.data });

          let msg = {
            open: true,
            message: `Payment Save Successfully`,
            object: {},
            error: false,
          };
          dispatch(redirect_back_payment(true));
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          let msg;
          let errors = [];
          console.log("err", error.response);
          if (typeof error.response !== "undefined") {
            if (typeof error.response.data.errors !== "undefined") {
              (error.response.data.errors || []).map((item) => {
                return errors.push(item + " ");
              });
            }
            msg = {
              open: true,
              message:
                typeof error.response != "undefined"
                  ? error.response.status === 404
                    ? error.response.statusText
                    : errors.length > 0
                    ? errors
                    : error.response.data.message
                  : ERROR_MESSAGE,
              object:
                typeof error.response != "undefined"
                  ? error.response.data || {}
                  : {},
              error: true,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const get_payments_type = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}paymentsType`,
        params: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          dispatch({
            type: GET_PAYMENTS_TYPE,
            response: response.data,
          });
        })
        .catch((error) => {
          console.log("err", error.response);

          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object:
              typeof error.response != "undefined"
                ? error.response.data || {}
                : {},
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const toggle_payments_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_PAYMENTS_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_payments_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOOGLE_PAYMENTS_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_payments_type = (id) => {
  return (dispatch) => {
    try {
      axios({
        method: "delete",
        url: `${BaseUrl}paymentsType/${id}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: DELETE_PAYMENTS_TYPE, response: id });
          let msg = {
            open: true,
            message: response.data.message
              ? response.data.message
              : `Payment Type Deleted Successfully`,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response !== "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object:
              typeof error.response !== "undefined"
                ? error.response.data || {}
                : {},
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response !== "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const update_payment_type = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "patch",
        url: `${BaseUrl}paymentsType/${data.id}`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: UPDATE_PAYMENT_TYPE, response: response.data.data });
          let msg = {
            open: true,
            message: response.data.message
              ? response.data.message
              : `Update Successfully`,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response !== "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object:
              typeof error.response !== "undefined"
                ? error.response.data || {}
                : {},
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response !== "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const update_row_data = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ROW_DATA_PAYMENT_TYPE,
      response: data,
    });
  };
};
