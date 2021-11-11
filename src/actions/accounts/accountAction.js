import {
    GET_ACCOUNT,
    CHECK_PASSWORD,
    CHANGE_CHECK_PASSWORD,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    UPDATE_ACCOUNT,
    CHANGE_UPDATE_CHECK,
    MESSAGE,
    ERROR_MESSAGE,
  } from "../../constants/ActionTypes";
  import authAxios from '../../constants/authAxios'
  
export const get_account = () => {
    return (dispatch) => {
      try {
        authAxios({
          method: "GET",
          url: `ownercab/getAccountInfo`,
  
        })
          .then((response) => {
            dispatch({ type: GET_ACCOUNT, response: response.data });
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

export const update_email = (data) => {
    return (dispatch) => {
      try {
        authAxios({
          method: "POST",
          url: `ownercab/changeOwnerEmail`,
          data: data
        })
          .then((response) => {
            if( response.data.status){
                dispatch({ type: CHANGE_EMAIL, response: response.data.email });
            } else {
                let msg = {
                    open: true,
                    message: "Email cannot be updated!",
                    object: {},
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

export const update_password = (data) => {
    return (dispatch) => {
      try {
        authAxios({
          method: "POST",
          url: `ownercab/changeOwnerPassword`,
          data: data
        })
          .then((response) => {
            if( response.data.status){
                dispatch({ type: CHANGE_PASSWORD, response: response.data.status });
            } else {
                let msg = {
                    open: true,
                    message: "Password cannot be updated!",
                    object: {},
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

export const set_account_info = (data) => {
    return (dispatch) => {
      try {
        authAxios({
          method: "POST",
          url: 'ownercab/setAccountInfo',
          data: data
        })
          .then((response) => {
            if( response.data.status){
                dispatch({ type: UPDATE_ACCOUNT, response: response.data });
                let msg = {
                    open: true,
                    message: "Account settings changed",
                    object: {},
                    error: false,
                  };
                dispatch({ type: MESSAGE, data: msg });
            } else {
                let msg = {
                    open: true,
                    message: "Account settings cannot be changed! Contact admin.",
                    object: {},
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



export const change_update_check = (data) => {
    return (dispatch) => {
        dispatch({ type: CHANGE_UPDATE_CHECK, response: data });
    }
}
export const change_check_password = (data) => {
    return (dispatch) => {
        dispatch({ type: CHANGE_CHECK_PASSWORD, response: data });
    }
}
export const check_password = (data) => {
    return (dispatch) => {
      try {
        authAxios({
          method: "POST",
          url: `ownercab/checkPassword`,
          data: data
        })
          .then((response) => {
            dispatch({ type: CHECK_PASSWORD, response: response.data.passwordCorrect });
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
  
  
  
  export const update_account = (data) => {
    return (dispatch) => {
      try {
        authAxios({
          method: "PATCH",
          url: `customers/`,
          data: data,
  
        })
          .then((response) => {
            dispatch({ type: UPDATE_ACCOUNT, response: response.data });
            let msg = {
              open: true,
              message: "Update Points Balance Successfully",
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
  