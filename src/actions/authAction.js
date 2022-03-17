import {
  LOGIN,
  MESSAGE,
  ERROR_MESSAGE,
  LOGOUT,
  CONFIRM,
  RESET_PASSWORD_REQUEST,
  CONFIRM_PASSWORD,
  CHECK_URL,
} from "../constants/ActionTypes";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrls";
// import jwt from "jsonwebtoken";

export const login = (data) => {
  return (dispatch) => {
    // let Token = localStorage.getItem("kyriotoken");
    // let decoded = jwt.decode(Token);
    try {
      axios({
        method: "post",
        url: `${BaseUrl}users/signin`,
        data: data,
      })
        .then((response) => {
          dispatch({ type: LOGIN, response: response.data });
          // dispatch({
          //   type: GET_SETTING_FEATURES,
          //   response: response.data.roleData,
          // });
          localStorage.setItem("kyrio", response.data.UserToken);
          let msg = {
            open: true,
            message: `Welcome to ${response.data.businessName}`,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};
export const signup = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}users/signup`,
        data: data,
      })
        .then((response) => {
          dispatch({ type: LOGIN, response: response.data });
          // dispatch({
          //   type: GET_SETTING_FEATURES,
          //   response: response.data.roleData,
          // });
          localStorage.setItem("kyrio", response.data.UserToken);
          let msg = {
            open: true,
            message: `Welcome to ${response.data.businessName}`,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};
export const resetPassword = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}users/cabrestorepassword`,
        data: data,
      })
        .then((response) => {
          dispatch({ type: RESET_PASSWORD_REQUEST, response: response.data });
          if (response.data.success) {
            let msg = {
              open: true,
              message: `Please check your inbox`,
              object: {},
              error: false,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
        })
        .catch((error) => {
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};
export const confirmPassword = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}users/cabrestorepassword/confirm`,
        data: data,
      })
        .then((response) => {
          dispatch({ type: CONFIRM_PASSWORD, response: response.data });
          if (response.data.success) {
            let msg = {
              open: true,
              message: `Password chagned successfully!`,
              object: {},
              error: false,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
        })
        .catch((error) => {
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};
export const checkUrl = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}users/cabrestorepassword/check`,
        data: { ticket: data },
      })
        .then((response) => {
          dispatch({ type: CHECK_URL, response: response.data });
          if (response.data.success) {
            let msg = {
              open: false,
              message: ``,
              object: { type: "url_check" },
              error: false,
            };
            dispatch({ type: MESSAGE, data: msg });
          } else {
            let msg = {
              open: true,
              message: response.data.message,
              object: { type: "url_check" },
              error: true,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
        })
        .catch((error) => {
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};
export const confirmEmail = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}users/confirm/${data}`,
      })
        .then((response) => {
          dispatch({ type: CONFIRM, response: response.data });
          if (response.data.success) {
            let msg = {
              open: true,
              message: `Email verified successfully`,
              object: {},
              error: false,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
        })
        .catch((error) => {
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const Logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
