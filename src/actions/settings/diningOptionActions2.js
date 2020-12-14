import {
  GET_DINING_OPTION2,
  ADD_NEW_DINING_OPTION2,
  UPDATE_ROW_DATA_DINING_OPTION2,
  UPDATE_DINING_OPTION2,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_DINING2,
  DELETE_DINING_OPTION2,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

export const redirect_back_dining = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_DINING2,
      response: status,
    });
  };
};

export const get_dining_options = () => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}dining2`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_DINING_OPTION2, response: response.data });
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

export const add_new_dining_option = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}dining2`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({
            type: ADD_NEW_DINING_OPTION2,
            response: response.data.data,
          });

          let msg = {
            open: true,
            message: `Dining Save Successfully`,
            object: {},
            error: false,
          };
          dispatch(redirect_back_dining(true));
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

export const update_dining_option = (data) => {
  return (dispatch) => {
    const storeId = JSON.parse(data.stores);
    try {
      axios({
        method: "patch",
        url: `${BaseUrl}dining2`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({
            type: UPDATE_DINING_OPTION2,
            response: response.data.data,
          });
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

export const update_dining_availablity = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "patch",
        url: `${BaseUrl}dining2/update_availabilty`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          let msg = {
            open: true,
            message:
              response.data.message ||
              `Dining Option Availablity Updated Successfully`,
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

export const update_dining_option_postion = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "patch",
        url: `${BaseUrl}dining2/update_position`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          let msg = {
            open: true,
            message:
              response.data.message || `Dining Option Updated Successfully`,
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

export const delete_dining_option = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "delete",
        url: `${BaseUrl}dining2`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: DELETE_DINING_OPTION2, response: data });
          let msg = {
            open: true,
            message:
              response.data.message || `Dining Option Deleted Successfully`,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
          const storeIds = {
            storeId: data.select_store_id,
          };
          dispatch(get_store_dining(storeIds));
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

export const get_store_dining = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "post",
        url: `${BaseUrl}dining2/getStoreDining`,
        data: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_DINING_OPTION2, response: response.data });
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

export const update_dining_row_data = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ROW_DATA_DINING_OPTION2,
      response: data,
    });
  };
};
