import {
  GET_ITEM_SALES_SUMMARY,
  TOGGLE_ITEM_SALE_SINGLE_SELECT,
  TOGGLE_ITEM_SALE_ALL_SELECT,
  DELETE_ITEM_SALES,
  ROW_DATA_ITEM_SALES_SUMMARY,
  MESSAGE,
  ERROR_MESSAGE,
  SET_LOADING,
} from "../../constants/ActionTypes";
import authAxios from "../../constants/authAxios";

export const get_item_sale_summary = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `reports/sale/item`,
        data: data,
      })
        .then((response) => {
          dispatch({
            type: GET_ITEM_SALES_SUMMARY,
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
export const toggle_item_sale_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ITEM_SALE_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_item_sale_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ITEM_SALE_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_item_sale = (ids) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM_SALES,
      response: JSON.parse(ids),
    });
    // try {
    //     authAxios({
    //         method: "DELETE",
    //         url: `employee/employeeList/${ids}`,
    //
    //     })
    //         .then((response) => {
    //             dispatch({ type: DELETE_ITEM_SALES, response: JSON.parse(ids) });
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
    dispatch({ type: ROW_DATA_ITEM_SALES_SUMMARY, response: row });
  };
};
