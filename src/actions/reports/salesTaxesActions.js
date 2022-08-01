import {
  GET_TAXES_SALES_SUMMARY,
  TOGGLE_TAXES_SALE_SINGLE_SELECT,
  TOGGLE_TAXES_SALE_ALL_SELECT,
  DELETE_TAXES_SALES,
  ROW_DATA_TAXES_SALES_SUMMARY,
  MESSAGE,
  ERROR_MESSAGE,
  SET_LOADING,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import authAxios from "../../constants/authAxios";

export const get_tax_sale_summary = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: "reports/sale/taxes",
        data: data,
      })
        .then((response) => {
          dispatch({
            type: GET_TAXES_SALES_SUMMARY,
            response: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
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
export const toggle_tax_sale_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TAXES_SALE_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_tax_sale_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TAXES_SALE_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_tax_sale = (ids) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TAXES_SALES,
      response: JSON.parse(ids),
    });
    // try {
    //     authAxios({
    //         method: "DELETE",
    //         url: `employee/employeeList/${ids}`,
    //     })
    //         .then((response) => {
    //             dispatch({ type: DELETE_TAXES_SALES, response: JSON.parse(ids) });
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
    dispatch({ type: ROW_DATA_TAXES_SALES_SUMMARY, response: row });
  };
};
