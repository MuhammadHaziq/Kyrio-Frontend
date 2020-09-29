import {
  GET_MODIFIRES_LIST,
  TOGGLE_CATEGORY_DELETE_SELECT,
  TOGGLE_ALL_CATEGORY_DELETE_SELECT,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";
// import jwt from "jsonwebtoken";

export const get_modifires_list = (storeId) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}items/modifier/${storeId}`,
        // data: storeId,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_MODIFIRES_LIST, response: response.data });
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
