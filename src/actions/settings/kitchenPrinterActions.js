import {
  GET_KICTCH_PRINTER,
  ADD_NEW_KITCHEN_PRINTER,
  DELETE_KITCHEN_PRINTER,
  TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT,
  TOGGLE_KITCHEN_PRINTER_SELECT_ALL,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_KITCHEN,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

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
      axios({
        method: "get",
        url: `${BaseUrl}kitchenPrinter`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
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
                ? error.response.status == 404
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

export const add_new_kitchen_printer = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}kitchenPrinter`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_KITCHEN_PRINTER, response: response.data });

          let msg = {
            open: true,
            message: `Dining Save Successfully`,
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
                ? error.response.status == 404
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

export const update_kitchen_printer = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "patch",
        url: `${BaseUrl}kitchenPrinter`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          // dispatch({type:GET_KICTCH_PRINTER, response:response.data})
          let msg = {
            open: true,
            message: `Dining Option Updated Successfully`,
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
                ? error.response.status == 404
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

export const delete_kitchen_printer = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "delete",
        url: `${BaseUrl}kitchenPrinter/${data}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
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
                ? error.response.status == 404
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
