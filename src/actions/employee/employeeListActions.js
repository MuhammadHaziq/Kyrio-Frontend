import {
  GET_EMPLOYEE_LIST,
  ADD_NEW_EMPLOYEE,
  REDIRECT_BACK_EMPLOYEE_LIST,
  TOGGLE_EMPLOYEE_SINGLE_SELECT,
  TOGGLE_EMPLOYEE_ALL_SELECT,
  DELETE_EMPLOYEE,
  ROW_DATA_EMPLOYEE_LIST,
  UPDATE_EMPLOYEE,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_employee = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_EMPLOYEE_LIST,
      response: status,
    });
  };
};

export const get_employee_list = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/employeeList`,

      })
        .then((response) => {
          dispatch({ type: GET_EMPLOYEE_LIST, response: response.data });
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
export const get_store_employee_list = (storeId) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/employeeList/get_store_employee_list/${storeId}`,

      })
        .then((response) => {
          dispatch({ type: GET_EMPLOYEE_LIST, response: response.data });
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

export const get_employee_search = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/employeeList`,
        params: data,

      })
        .then((response) => {
          dispatch({ type: GET_EMPLOYEE_LIST, response: response.data });
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

export const add_new_employee = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `employee/employeeList`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: ADD_NEW_EMPLOYEE, response: response.data });
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

export const toggle_employee_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_EMPLOYEE_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_employee_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_EMPLOYEE_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_employee = (ids) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "DELETE",
        url: `employee/employeeList/${ids}`,

      })
        .then((response) => {
          dispatch({ type: DELETE_EMPLOYEE, response: JSON.parse(ids) });
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

export const update_row_data = (row) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/employeeList/${row._id}`,

      })
        .then((response) => {
          dispatch({ type: ROW_DATA_EMPLOYEE_LIST, response: response.data });

          // dispatch({ type: DELETE_EMPLOYEE, response: JSON.parse(ids) });
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

export const update_employee = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "PATCH",
        url: `employee/employeeList`,
        data: data,

      })
        .then((response) => {
          console.log(response.data);
          dispatch({ type: UPDATE_EMPLOYEE, response: response.data });
          let msg = {
            open: true,
            message: "Update Employee Successfully",
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
