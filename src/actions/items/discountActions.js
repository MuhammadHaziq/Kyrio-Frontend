import {
  GET_DISCOUNT_LIST,
  ADD_NEW_DISCOUNT,
  SELECT_ROW_ITEMS_DISCOUNT,
  REDIRECT_BACK_DISCOUNT,
  UPDATE_ITEM_DISCOUNT,
  TOGGLE_DISCOUNT_DELETE_SELECT,
  TOGGLE_ALL_DISCOUNT_DELETE_SELECT,
  DELETE_DISCOUNT,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_discount = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_DISCOUNT,
      response: status,
    });
  };
};

export const get_discount_list = (id) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/discount/${id}`,

      })
        .then((response) => {
          dispatch({ type: GET_DISCOUNT_LIST, response: response.data });
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
            ? error.response.status == 404
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

export const add_new_disocunt = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `items/discount/`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_DISCOUNT, response: response.data });
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

export const select_row_data_update = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `items/discount/row/${data._id}`,

      })
        .then((response) => {
          dispatch({
            type: SELECT_ROW_ITEMS_DISCOUNT,
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

export const update_item_discount = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "PATCH",
        url: `items/discount/${data.id}`,
        data: data,

      })
        .then((response) => {
          dispatch({
            type: UPDATE_ITEM_DISCOUNT,
            response: response.data.data,
          });
          let msg = {
            open: true,
            message: response.data.message,
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

export const toggle_discount_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DISCOUNT_DELETE_SELECT,
      response: data,
    });
  };
};

export const toggle_discount_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ALL_DISCOUNT_DELETE_SELECT,
      response: status,
    });
  };
};

export const delete_discount = (id) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "delete",
        url: `items/discount/${id}`,

      })
        .then((response) => {
          dispatch({ type: DELETE_DISCOUNT, response: JSON.parse(id) });
          let msg = {
            open: true,
            message:
              JSON.parse(id).length > 1
                ? "Discounts Deleted Successfully"
                : "Discount Deleted Successfully",
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
