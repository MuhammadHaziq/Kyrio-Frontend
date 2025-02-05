import {
  GET_STORE_OPEN_TICKET,
  ADD_NEW_OPEN_TICKET,
  MESSAGE,
  ERROR_MESSAGE,
  UPDATE_STORE_OPEN_TICKET,
  REDIRECT_BACK_TICKET,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_ticket = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_TICKET,
      response: status,
    });
  };
};
export const add_new_open_ticket = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `tickets/saveOpenTicket`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          let msg = {
            open: true,
            message:
              typeof response != "undefined"
                ? response.data.message != "undefined"
                  ? response.data.message
                  : "Ticket Successfully Add"
                : "",
            object: {},
            error: false,
          };
          dispatch(redirect_back_ticket(true));
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          // console.log("err", error.response);
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

export const get_store_open_ticket = (storeId) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `tickets/getStoreTicket/${storeId}`,

      })
        .then((response) => {
          dispatch({
            type: GET_STORE_OPEN_TICKET,
            response: response.data.data,
          });
          // let msg = {
          //   open: true,
          //   message:
          //     typeof response != "undefined"
          //       ? response.data.message != "undefined"
          //         ? response.data.message
          //         : "Record Not Found"
          //       : "",
          //   object: {},
          //   error: false,
          // };
          // if (response.data.message !== undefined) {
          //   dispatch({ type: MESSAGE, data: msg });
          // }
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

/*export const add_new_dining_option = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `dining`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_DINING_OPTION, response: response.data });

          let msg = {
            open: true,
            message: `Dining Save Successfully`,
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

export const update_dining_option = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `dining`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          // dispatch({type:GET_DINING_OPTION, response:response.data})
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

export const get_store_dining = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `dining/getStoreDining`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: GET_DINING_OPTION, response: response.data });
          let msg = {
            open: true,
            message:
              response.data.length === 0
                ? `No Dining Found `
                : `Selected Store Dining`,
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
*/

export const delete_open_ticket = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `tickets`,

        data: data,
      })
        .then((response) => {
          console.log(response);
          dispatch({
            type: UPDATE_STORE_OPEN_TICKET,
            response: data,
          });
          let msg = {
            open: true,
            message:
              typeof response != "undefined"
                ? response.data.message != "undefined"
                  ? response.data.message
                  : "Record Not Found"
                : "",
            object: {},
            error: false,
          };
          if (response.data.message !== undefined) {
            dispatch({ type: MESSAGE, data: msg });
          }
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
