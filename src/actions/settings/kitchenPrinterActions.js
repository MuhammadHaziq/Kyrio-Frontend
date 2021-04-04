import {
  GET_KICTCH_PRINTER,
  ADD_NEW_KITCHEN_PRINTER,
  DELETE_KITCHEN_PRINTER,
  TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT,
  TOGGLE_KITCHEN_PRINTER_SELECT_ALL,
  SELECT_UPDATE_ROW,
  UPDATE_KICTCH_PRINTER,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_KITCHEN,
  UPDATE_KITCHEN_PRINTER_REDIRECT_STATES,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_kitchen = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_KITCHEN,
      response: status,
    });
  };
};

export const get_kitchen_printers = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `kitchenPrinter`,

      })
        .then((response) => {
          dispatch({ type: GET_KICTCH_PRINTER, response: response.data });
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

export const add_new_kitchen_printer = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `kitchenPrinter`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_KITCHEN_PRINTER, response: response.data });

          let msg = {
            open: true,
            message: `Kitchen Printer Save Successfully`,
            object: {},
            error: false,
          };
          dispatch(redirect_back_kitchen(true));
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

export const update_kitchen_printer = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `kitchenPrinter`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({
            type: UPDATE_KICTCH_PRINTER,
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

export const delete_kitchen_printer = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "delete",
        url: `kitchenPrinter/${data}`,

      })
        .then((response) => {
          dispatch({
            type: DELETE_KITCHEN_PRINTER,
            response: data,
          });
          let msg = {
            open: true,
            message: "Kitchen Printer Deleted Successfully",
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

export const select_update_row = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `kitchenPrinter/row/${data._id}`,

      })
        .then((response) => {
          dispatch({
            type: SELECT_UPDATE_ROW,
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

export const toggle_kitchen_printer_single_select = (row) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT,
      response: row,
    });
  };
};

export const toggle_kitchen_printer_select_all = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_KITCHEN_PRINTER_SELECT_ALL,
      response: status,
    });
  };
};

export const update_redirect_states_after_pos_delete = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_KITCHEN_PRINTER_REDIRECT_STATES,
    });
  };
};
