import {
  GET_PAYMENT_TYPE_SALES_SUMMARY,
  TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_ALL_SELECT,
  DELETE_PAYMENT_TYPE_SALES_SUMMARY,
  ROW_DATA_PAYMENT_TYPE_SALES_SUMMARY,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";
export const get_sales_payment_type_summary = () => {
  return (dispatch) => {
    try {
      axios({
        method: "GET",
        url: `${BaseUrl}sales/all`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({
            type: GET_PAYMENT_TYPE_SALES_SUMMARY,
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

export const toggle_payment_type_sales_summary_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_payment_type_sales_summary_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_payment_type_sales_summary = (ids) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PAYMENT_TYPE_SALES_SUMMARY,
      response: JSON.parse(ids),
    });
    // try {
    //     axios({
    //         method: "DELETE",
    //         url: `${BaseUrl}employee/employeeList/${ids}`,
    //         headers: {
    //             kyrioToken: `${localStorage.getItem("kyrio")}`,
    //         },
    //     })
    //         .then((response) => {
    //             dispatch({ type: DELETE_PAYMENT_TYPE_SALES_SUMMARY, response: JSON.parse(ids) });
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
    dispatch({ type: ROW_DATA_PAYMENT_TYPE_SALES_SUMMARY, response: row });
  };
};