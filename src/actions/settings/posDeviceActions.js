import {
  GET_POS_DEVICES,
  ADD_NEW_POS_DEVICE,
  TOGGLE_POS_SINGLE_SELECT,
  TOGGLE_POS_ALL_SELECT,
  DELETE_POS_DEVICES,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_POS_DEVICES,
  SELECT_ROW_DATA_UPDATE,
  UPDATE_POS_DEVICE,
  UPDATE_POS_DEIVCES_REDIRECT_STATES,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'

export const redirect_back_pos_devices = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_POS_DEVICES,
      response: status,
    });
  };
};

export const get_pos_devices = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `devices`,

      })
        .then((response) => {
          dispatch({ type: GET_POS_DEVICES, response: response.data });
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

export const add_new_pos_device = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `devices`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: ADD_NEW_POS_DEVICE, response: response.data });
          let msg = {
            open: true,
            message: `Pos Device Add Successfully`,
            object: {},
            error: false,
          };
          dispatch(redirect_back_pos_devices(true));
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

export const get_store_pos_device = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `devices/getStoreDevice`,
        data: { storeId: data },

      })
        .then((response) => {
          dispatch({
            type: GET_POS_DEVICES,
            response:
              Object.keys(response.data).length > 0 ? [response.data] : [],
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

export const update_pos_device = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `devices/${data._id}`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: UPDATE_POS_DEVICE, response: data });
          let msg = {
            open: true,
            message: response.data.message,
            object: {},
            error: false,
          };
          dispatch(redirect_back_pos_devices(true));
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

export const delete_pos_devices = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "delete",
        url: `devices/${data}`,

      })
        .then((response) => {
          dispatch({ type: DELETE_POS_DEVICES, response: data });
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

export const select_row_data_update = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `devices/row/${data._id}`,

      })
        .then((response) => {
          dispatch({
            type: SELECT_ROW_DATA_UPDATE,
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

export const toggle_pos_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_POS_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_pso_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_POS_ALL_SELECT,
      response: status,
    });
  };
};

export const update_redirect_states_after_delete = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_POS_DEIVCES_REDIRECT_STATES,
    });
  };
};
