import {
  GET_LOYALTY,
  ADD_NEW_LOYALTY,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

export const get_loyalty = (storeId) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}loyalty/${storeId}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_LOYALTY, response: response.data });
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

export const add_new_loyalty = (data) => {
  return (dispatch) => {
      dispatch({ type: ADD_NEW_LOYALTY, response: data.loyalty_amount });
    // try {
    //   axios({
    //     method: "post",
    //     url: `${BaseUrl}loyalty`,
    //     data: data,
    //     headers: {
    //       kyrioToken: `${localStorage.getItem("kyrio")}`,
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       dispatch({ type: ADD_NEW_LOYALTY, response: response.data });
    //
    //       let msg = {
    //         open: true,
    //         message: `Save Successfully`,
    //         object: {},
    //         error: false,
    //       };
    //       dispatch({ type: MESSAGE, data: msg });
    //     })
    //     .catch((error) => {
    //       let msg;
    //       let errors = [];
    //       console.log("err", error.response);
    //       if (typeof error.response !== "undefined") {
    //         if (typeof error.response.data.errors !== "undefined") {
    //           (error.response.data.errors || []).map((item) => {
    //             errors.push(item + " ");
    //           });
    //         }
    //         msg = {
    //           open: true,
    //           message:
    //             typeof error.response != "undefined"
    //               ? error.response.status === 404
    //                 ? error.response.statusText
    //                 : errors.length > 0
    //                 ? errors
    //                 : error.response.data.message
    //               : ERROR_MESSAGE,
    //           object:
    //             typeof error.response != "undefined"
    //               ? error.response.data || {}
    //               : {},
    //           error: true,
    //         };
    //         dispatch({ type: MESSAGE, data: msg });
    //       }
    //     });
    // } catch (error) {
    //   console.log("err catch", error);
    //   let msg = {
    //     open: true,
    //     message:
    //       typeof error.response != "undefined"
    //         ? error.response.status === 404
    //           ? error.response.statusText
    //           : error.response.data.message
    //         : ERROR_MESSAGE,
    //     object: {},
    //     error: true,
    //   };
    //   dispatch({ type: MESSAGE, data: msg });
    // }
  };
};
