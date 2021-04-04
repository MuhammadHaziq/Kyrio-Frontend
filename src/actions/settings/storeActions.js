import {
  GET_STORES,
  ADD_NEW_STORE,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_STORE,
  UPDATE_STORE_ROW_DATA,
  UPDATE_STORE_REDIRECT_STATES,
  UPDATE_STORE,
  DELETE_STORE,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_store = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_STORE,
      response: status,
    });
  };
};

export const get_stores = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `stores`,

      })
        .then((response) => {
          dispatch({ type: GET_STORES, response: response.data });
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

export const add_new_store = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `stores`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_STORE, response: response.data });
          let msg = {
            open: true,
            message: `Store Save Successfully`,
            object: {},
            error: false,
          };
          dispatch(redirect_back_store(true));
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

export const update_store = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `stores/${data._id}`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: UPDATE_STORE, response: data });
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

export const delete_store = (ids) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "delete",
        url: `stores/${ids}`,

      })
        .then((response) => {
          console.log(response);
          let ids = [];
          // let msg = {
          //   open: true,
          //   message: response.data.message,
          //   object: {},
          //   error: false,
          // };
          // dispatch({ type: MESSAGE, data: msg });
          if (response.data.message.length > 0) {
            response.data.message.map((item) => {
              let msg = {
                open: true,
                message: item.message,
                object: {},
                error: item.error,
              };
              dispatch({ type: MESSAGE, data: msg });
              if (item.error === false) {
                ids.push(item.storeId);
              }
            });
          }
          ids = JSON.stringify(ids);
          console.log("ids", ids);
          dispatch({
            type: DELETE_STORE,
            response: ids,
          });
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

export const get_store_row = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `stores/row/${data._id}`,

      })
        .then((response) => {
          dispatch({
            type: UPDATE_STORE_ROW_DATA,
            response: response.data,
          });
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

export const update_store_redirect_states = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_STORE_REDIRECT_STATES,
    });
  };
};
