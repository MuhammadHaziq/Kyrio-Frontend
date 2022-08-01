import {
  GET_DISCOUNT_SALES_SUMMARY,
  TOGGLE_DISCOUNT_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_DISCOUNT_SALE_SUMMARY_ALL_SELECT,
  DELETE_DISCOUNT_SALES_SUMMARY,
  ROW_DATA_DISCOUNT_SALES_SUMMARY,
  MESSAGE,
  ERROR_MESSAGE,
  SET_LOADING,
} from "../../constants/ActionTypes";
import authAxios from "../../constants/authAxios";

export const get_discount_summary = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `reports/sale/discounts`,
        data: data,
      })
        .then((response) => {
          dispatch({
            type: GET_DISCOUNT_SALES_SUMMARY,
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
export const toggle_loading = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      response: data,
    });
  };
};
export const toggle_discount_summary_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DISCOUNT_SALE_SUMMARY_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_discount_summary_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DISCOUNT_SALE_SUMMARY_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_discount_summary = (ids) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_DISCOUNT_SALES_SUMMARY,
      response: JSON.parse(ids),
    });
    // try {
    //     authAxios({
    //         method: "DELETE",
    //         url: `employee/employeeList/${ids}`,
    //     })
    //         .then((response) => {
    //             dispatch({ type: DELETE_DISCOUNT_SALES_SUMMARY, response: JSON.parse(ids) });
    //             let msg = {
    //                 open: true,
    //                 message:
    //                     JSON.parse(ids).length > 1
    //                         ? "Sales Deleted Successfully"
    //                         : "Sale Deleted Successfully",
    //                 object: {},
    //                 error: false,
    //             };
    //             dispatch({ type: MESSAGE, data: msg });
    //         })
    //         .catch((error) => {
    //             console.log("err", error.response);
    //             let msg = {
    //                 open: true,
    //                 message:
    //                     typeof error.response != "undefined"
    //                         ? error.response.status === 404
    //                             ? error.response.statusText
    //                             : error.response.data.message
    //                         : ERROR_MESSAGE,
    //                 object:
    //                     typeof error.response != "undefined"
    //                         ? error.response.data || {}
    //                         : {},
    //                 error: true,
    //             };
    //             dispatch({ type: MESSAGE, data: msg });
    //         });
    // } catch (error) {
    //     console.log("err catch", error);
    //     let msg = {
    //         open: true,
    //         message:
    //             typeof error.response != "undefined"
    //                 ? error.response.status === 404
    //                     ? error.response.statusText
    //                     : error.response.data.message
    //                 : ERROR_MESSAGE,
    //         object: {},
    //         error: true,
    //     };
    //     dispatch({ type: MESSAGE, data: msg });
    // }
  };
};

export const update_row_data = (row) => {
  return (dispatch) => {
    dispatch({ type: ROW_DATA_DISCOUNT_SALES_SUMMARY, response: row });
  };
};
