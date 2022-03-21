import {
  GET_SHIFT_SALES_SUMMARY,
  TOGGLE_SHIFT_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_SHIFT_SALE_SUMMARY_ALL_SELECT,
  DELETE_SHIFT_SALES_SUMMARY,
  ROW_DATA_SHIFT_SALES_SUMMARY,
  TOGGLE_SHIFT_SIDEBAR,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import authAxios from "../../constants/authAxios";

export const get_shift_summary = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `reports/sale/shifts`,
        data: data,
      })
        .then((response) => {
          dispatch({
            type: GET_SHIFT_SALES_SUMMARY,
            response: response.data,
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

export const toggle_shift_summary_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SHIFT_SALE_SUMMARY_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_shift_summary_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SHIFT_SALE_SUMMARY_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_shift_summary = (ids) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SHIFT_SALES_SUMMARY,
      response: JSON.parse(ids),
    });
  };
};
export const toggle_shift_sidebar = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SHIFT_SIDEBAR,
      status: status,
    });
  };
};
export const update_row_data = (row) => {
  return (dispatch) => {
    dispatch({ type: ROW_DATA_SHIFT_SALES_SUMMARY, response: row });
  };
};
