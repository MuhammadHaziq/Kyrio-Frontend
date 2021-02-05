import {
  GET_USER_ROLES,
  GET_ROLES_MODULES,
  ADD_NEW_USER_ROLE,
  TOGGLE_BACK_OFFICE_ENABLE,
  TOGGLE_POS_ENABLE,
  REDIRECT_BACK_USER_ROLES,
  TOGGLE_BACK_OFFICE_MODULE,
  TOGGLE_POS_MODULE,
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

export const get_roles_modules = () => {
  return (dispatch) => {
    try {
      axios({
        method: "GET",
        url: `${BaseUrl}employee/userAccess/get_roles_modules`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({
            type: GET_ROLES_MODULES,
            response: response.data,
            backofficeModules:
              response.data !== undefined &&
              response.data !== null &&
              response.data.length > 0
                ? [response.data[0].backofficeModules]
                : [],
            posModules:
              response.data !== undefined &&
              response.data !== null &&
              response.data.length > 0
                ? [response.data[0].posModules]
                : [],
          });
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
export const toggleBackOffice = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_BACK_OFFICE_ENABLE,
      status: status,
    });
  };
};
export const togglePOS = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_POS_ENABLE,
      status: status,
    });
  };
};
export const toggle_back_office_module = (id) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_BACK_OFFICE_MODULE,
      id: id,
    });
  };
};

export const toggle_pos_module = (id) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_POS_MODULE,
      id: id,
    });
  };
};
