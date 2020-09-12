import { LOGIN, MESSAGE, ERROR_MESSAGE } from "../constants/ActionTypes";
import axios from "axios";
// import jwt from "jsonwebtoken";

export const login = (data) => {
  return (dispatch) => {
    // let Token = localStorage.getItem("kyriotoken");
    // let decoded = jwt.decode(Token);
    try {
      axios({
        method: "post",
        url: `http://localhost:3000/kyrio/v1/users/signin`,
        data: data,
      })
        .then((response) => {
          dispatch({ type: LOGIN, response: response.data });
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
        url: `http://localhost:3000/kyrio/v1/users/signup`,
        data: data,
      })
        .then((response) => {
          dispatch({ type: LOGIN, response: response.data });
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
