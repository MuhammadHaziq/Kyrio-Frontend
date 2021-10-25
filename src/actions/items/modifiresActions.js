import {
  GET_MODIFIRES_LIST,
  DELETE_MODIFIRES,
  ADD_NEW_MODIFIER,
  REDIRECT_BACK_MODIFIER,
  TOGGLE_MODIFIRES_DELETE_SELECT,
  TOGGLE_ALL_MODIFIRES_DELETE_SELECT,
  UPDATE_MODIFIER_ROW_DATA,
  UPDATE_MODIFER_PROPS_POSITION,
  MESSAGE,
  ERROR_MESSAGE,
  UPDATE_MODIFER,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'

export const redirect_back_modifier = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_MODIFIER,
      response: status,
    });
  };
};

export const get_modifires_list = (storeId) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/modifier/${storeId}`,
        // data: storeId,

      })
        .then((response) => {
          dispatch({ type: GET_MODIFIRES_LIST, response: response.data });
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

export const add_new_modifier = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `items/modifier/`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: ADD_NEW_MODIFIER, response: response.data });
          let msg = {
            open: true,
            message: "Modifier created",
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

export const update_modifire_postion = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `items/modifier/update_position`,
        data: data,

      })
        .then((response) => {
          let msg = {
            open: true,
            message:
              response.data.message || `Modifier Position Updated Successfully`,
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

export const update_modifier_props_postion = (data) => {
  return dispatch => {
    dispatch({
      type: UPDATE_MODIFER_PROPS_POSITION,
      response: data
    })
  }
}

export const delete_modifire = (ids) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "delete",
        url: `items/modifier/${ids}`,

      })
        .then((response) => {
          dispatch({ type: DELETE_MODIFIRES, response: ids });
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

export const toggle_modifire_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODIFIRES_DELETE_SELECT,
      response: data,
    });
  };
};

export const toggle_modifire_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ALL_MODIFIRES_DELETE_SELECT,
      response: status,
    });
  };
};

export const update_row_data = (id) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/modifier/row/${id}`,

      })
        .then((response) => {
          dispatch({
            type: UPDATE_MODIFIER_ROW_DATA,
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
export const update_modifier = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `items/modifier`,

        data: data,
      })
        .then((response) => {
          dispatch({ type: UPDATE_MODIFER, response: response.data });
          let msg = {
            open: true,
            message: response.data.message,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: 'Modifier edited' });
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
