import {
  GET_DINING_OPTION,
  ADD_NEW_DINING_OPTION,
  UPDATE_ROW_DATA_DINING_OPTION,
  UPDATE_DINING_OPTION,
  MESSAGE,
  ERROR_MESSAGE,
  REDIRECT_BACK_DINING,
  DELETE_DINING_OPTION,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_dining = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_DINING,
      response: status,
    });
  };
};

export const get_dining_options = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `dining`,

      })
        .then((response) => {
          dispatch({ type: GET_DINING_OPTION, response: response.data });
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
    const store = data.store
    try {
      authAxios({
        method: "post",
        url: `dining`,
        data: data,

      })
        .then((response) => {
          dispatch({
            type: ADD_NEW_DINING_OPTION,
            response: response.data,
            store: store,
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
    const storeId = JSON.parse(data.store);
    try {
      authAxios({
        method: "patch",
        url: `dining/`,
        data: data,

      })
        .then((response) => {
          dispatch({
            type: UPDATE_DINING_OPTION,
            response: response.data.data,
            storeId:
              storeId !== undefined && storeId !== null && storeId.length > 0
                ? storeId[0].storeId
                : "",
          });
          let msg = {
            open: true,
            message: `Dining Option Updated Successfully`,
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
          const storeData = { storeId: data.propStoreId };
          dispatch(get_store_dining(storeData));
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
      authAxios({
        method: "patch",
        url: `dining/update_availabilty`,
        data: data,

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
      authAxios({
        method: "patch",
        url: `dining/update_position`,
        data: data,

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
      authAxios({
        method: "delete",
        url: `dining/${data.id}`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: DELETE_DINING_OPTION, response: data });
          let msg = {
            open: true,
            message:
              response.data.message || `Dining Option Deleted Successfully`,
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
    try {
      authAxios({
        method: "get",
        url: `dining/row/${data._id}`,

      })
        .then((response) => {
          dispatch({
            type: UPDATE_ROW_DATA_DINING_OPTION,
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
