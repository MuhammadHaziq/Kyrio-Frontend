import {
  GET_CATEGORY_LIST,
  ADD_NEW_CATEGORY,
  SELECT_ROW_ITEMS_CATEGORY,
  REDIRECT_BACK_CATEGORY,
  UPDATE_ITEM_CATEGORY,
  TOGGLE_CATEGORY_DELETE_SELECT,
  TOGGLE_ALL_CATEGORY_DELETE_SELECT,
  DELETE_CATEGORY,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";
// import jwt from "jsonwebtoken";

export const redirect_back_category = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_CATEGORY,
      response: status,
    });
  };
};

export const get_category_list = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}items/categories`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_CATEGORY_LIST, response: response.data });
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

export const add_new_category = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}items/categories`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: ADD_NEW_CATEGORY, response: response.data });
          let msg = {
            open: true,
            message: "Catgeory Created Successfully",
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

export const select_row_data_update = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "GET",
        url: `${BaseUrl}items/categories/row/${data._id}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({
            type: SELECT_ROW_ITEMS_CATEGORY,
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

export const update_item_category = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "PATCH",
        url: `${BaseUrl}items/categories/${data.id}`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({
            type: UPDATE_ITEM_CATEGORY,
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

export const toggle_category_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_CATEGORY_DELETE_SELECT,
      response: data,
    });
  };
};

export const toggle_category_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ALL_CATEGORY_DELETE_SELECT,
      response: status,
    });
  };
};

export const delete_categories = (id) => {
  return (dispatch) => {
    try {
      axios({
        method: "delete",
        url: `${BaseUrl}items/categories/${id}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: DELETE_CATEGORY, response: JSON.parse(id) });
          let msg = {
            open: true,
            message:
              JSON.parse(id).length > 1
                ? "Categories Deleted Successfully"
                : "Category Deleted Successfully",
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
