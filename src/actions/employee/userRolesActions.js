import {
  GET_USER_ROLES,
  ADD_NEW_USER_ROLE,
  REDIRECT_BACK_USER_ROLES,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

export const redirect_back_user_roles = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_USER_ROLES,
      response: status,
    });
  };
};

export const get_user_access_list = () => {
  return (dispatch) => {
    try {
      axios({
        method: "GET",
        url: `${BaseUrl}employee/userAccess`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_USER_ROLES, response: response.data });
        })
        .catch((error) => {
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
export const add_new_role = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "POST",
        // url: `${BaseUrl}employee/employeeList`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: ADD_NEW_USER_ROLE, response: response.data });
          let msg = {
            open: true,
            message: "Employee Created Successfully",
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
