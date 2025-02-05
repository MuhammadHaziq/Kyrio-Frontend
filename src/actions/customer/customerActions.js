import {
  GET_CUSTOMERS,
  ADD_NEW_CUSTOMER,
  REDIRECT_BACK_CUSTOMER,
  TOGGLE_CUSTOMER_SINGLE_SELECT,
  TOGGLE_CUSTOMER_ALL_SELECT,
  DELETE_CUSTOMERS,
  ROW_DATA_CUSTOMER,
  UPDATE_POINTS_BALANCE,
  UPDATE_CUSTOMER,
  EDIT_PROFILE_VIEW,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_customer = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_CUSTOMER,
      response: status,
    });
  };
};

export const get_customers = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `customers/all`,

      })
        .then((response) => {
          dispatch({ type: GET_CUSTOMERS, response: response.data });
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

export const get_customers_search = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `customers/${data.search}`,

      })
        .then((response) => {
          dispatch({ type: GET_CUSTOMERS, response: response.data });
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

export const add_new_customer = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `customers/`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: ADD_NEW_CUSTOMER, response: response.data });
          let msg = {
            open: true,
            message: "Customer Created Successfully",
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

export const toggle_customer_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_CUSTOMER_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_customer_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_CUSTOMER_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_customer = (ids) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "DELETE",
        url: `customers/delete/${ids}`,

      })
        .then((response) => {
          dispatch({ type: DELETE_CUSTOMERS, response: JSON.parse(ids) });
          let msg = {
            open: true,
            message:
              JSON.parse(ids).length > 1
                ? "Customers Deleted Successfully"
                : "Customer Deleted Successfully",
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

export const update_row_data = (row) => {
  return (dispatch) => {
    dispatch({ type: ROW_DATA_CUSTOMER, response: row });
  };
};
export const edit_profile_view = (status, customer_view) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PROFILE_VIEW,
      status: status,
      customer_view: customer_view,
    });
  };
};

export const update_points_balance = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "PATCH",
        url: `customers/point_balance`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: UPDATE_POINTS_BALANCE, response: data });
          let msg = {
            open: true,
            message: "Update Points Balance Successfully",
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

export const update_customer = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "PATCH",
        url: `customers/`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: UPDATE_CUSTOMER, response: response.data });
          let msg = {
            open: true,
            message: "Update Points Balance Successfully",
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
