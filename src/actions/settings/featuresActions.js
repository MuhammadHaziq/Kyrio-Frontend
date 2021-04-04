import {
  GET_SETTING_FEATURES,
  UPDATE_SETTING_FEATURES,
  TOGGLE_FEATURE_MODULE,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const get_setting_features = (storeId) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `features`,
        params: { storeId: storeId },

      })
        .then((response) => {
          if (response.data.status === true) {
            dispatch({
              type: GET_SETTING_FEATURES,
              response: response.data.data,
            });
          } else {
            let msg = {
              open: true,
              message: "Features Not Assigned",
              object: {},
              error: false,
            };
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

export const toggle_feature_module = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "patch",
        url: `features`,
        data: data,

      })
        .then((response) => {
          console.log(response);
          dispatch({ type: TOGGLE_FEATURE_MODULE, response: data.features });
          let msg = {
            open: true,
            message: response.data.message,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          let msg;
          let errors = [];
          console.log("err", error.response);
          if (typeof error.response !== "undefined") {
            if (typeof error.response.data.errors !== "undefined") {
              (error.response.data.errors || []).map((item) => {
                errors.push(item + " ");
              });
            }
            msg = {
              open: true,
              message:
                typeof error.response != "undefined"
                  ? error.response.status === 404
                    ? error.response.statusText
                    : errors.length > 0
                      ? errors
                      : error.response.data.message
                  : ERROR_MESSAGE,
              object:
                typeof error.response != "undefined"
                  ? error.response.data || {}
                  : {},
              error: true,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
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
