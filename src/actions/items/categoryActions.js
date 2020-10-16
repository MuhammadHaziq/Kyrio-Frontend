import {
  GET_CATEGORY_LIST,
  TOGGLE_CATEGORY_DELETE_SELECT,
  TOGGLE_ALL_CATEGORY_DELETE_SELECT,
  DELETE_CATEGORY,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";
// import jwt from "jsonwebtoken";

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
            object: error.response.data,
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
            object: error.response.data,
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
