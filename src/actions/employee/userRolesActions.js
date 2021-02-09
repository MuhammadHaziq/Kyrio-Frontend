import {
  GET_USER_ROLES,
  GET_ROLES_MODULES,
  ADD_NEW_USER_ROLE,
  TOGGLE_BACK_OFFICE_ENABLE,
  TOGGLE_POS_ENABLE,
  REDIRECT_BACK_USER_ROLES,
  TOGGLE_BACK_OFFICE_MODULE,
  TOGGLE_POS_MODULE,
  UPDATE_USER_ROLE,
  GET_UPDATE_USER_ROLE,
  REMOVE_SELECTED_MODULES,
  TOGGLE_ROLE_SINGLE_SELECT,
  TOGGLE_ROLE_ALL_SELECT,
  DELETE_USER_ROLE,
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
        url: `${BaseUrl}roles/get_roles_modules`,
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
        // url: `${BaseUrl}employee/userAccess`,
        url: `${BaseUrl}roles/`,
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
        url: `${BaseUrl}roles/create`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_USER_ROLE, response: response.data });
          let msg = {
            open: true,
            message: "Role Added Successfully",
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

export const update_user_role = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "PATCH",
        url: `${BaseUrl}roles/update`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          dispatch({ type: UPDATE_USER_ROLE, response: response.data });
          let msg = {
            open: true,
            message: "Role Updated Successfully",
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

export const update_row_data = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "GET",
        url: `${BaseUrl}roles/${data.role_id}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: GET_UPDATE_USER_ROLE,
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

export const remove_selected_modules = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SELECTED_MODULES,
    });
  };
};

export const toggle_role_single_select = (row) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ROLE_SINGLE_SELECT,
      response: row,
    });
  };
};
export const toggle_role_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ROLE_ALL_SELECT,
      status: status,
    });
  };
};
export const delete_user_role = (ids) => {
  return (dispatch) => {
    try {
      axios({
        method: "DELETE",
        url: `${BaseUrl}roles/${ids}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: DELETE_USER_ROLE, response: JSON.parse(ids) });
          let msg = {
            open: true,
            message:
              JSON.parse(ids).length > 1
                ? "Employees Deleted Successfully"
                : "Employee Deleted Successfully",
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
