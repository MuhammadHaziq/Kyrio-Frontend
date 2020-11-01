import {
  GET_ITEM_LIST,
  GET_ITEM_STOCK,
  GET_ITEM_STORES,
  TOGGLE_ITEM_DELETE_SELECT,
  TOGGLE_ALL_ITEM_DELETE_SELECT,
  DELETE_ITEM_LIST,
  MESSAGE,
  ERROR_MESSAGE,
  TOGGLE_SELECT_ALL_ITEM_STORES,
  TOGGLE_SELECT_SINGLE_ITEM_STORES,
  SET_ITEM_STORE_PRICE,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";
// import jwt from "jsonwebtoken";

export const get_items_list = (data) => {
  return (dispatch) => {
    // const data = { page: 1, limit: 100, storeId: "adfaa0fs0dfa9dsf" };
    try {
      axios({
        method: "get",
        url: `${BaseUrl}items`,
        params: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_ITEM_LIST, response: response.data });
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
            object: error,
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
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const get_items_stock = () => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}items/stock`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_ITEM_STOCK, response: response.data });
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
            object: error.response.data,
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
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const search_item_list = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}items/search`,
        params: data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_ITEM_LIST, response: response.data });
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
            object: error,
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
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const get_items_store = () => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}stores`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_ITEM_STORES, response: response.data });
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
            object: error,
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
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const toggle_item_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ITEM_DELETE_SELECT,
      response: data,
    });
  };
};

export const toggle_item_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ALL_ITEM_DELETE_SELECT,
      response: status,
    });
  };
};

export const delete_item_list = (id) => {
  return (dispatch) => {
    try {
      axios({
        method: "delete",
        url: `${BaseUrl}items/${id}`,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          console.log(response);
          dispatch({ type: DELETE_ITEM_LIST, response: JSON.parse(id) });
          let msg = {
            open: true,
            message: "Item Deleted Successfully",
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

export const toggle_select_all_item_stores = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_ALL_ITEM_STORES,
      response: status,
    });
  };
};
export const toggle_select_single_item_store = (id) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_SINGLE_ITEM_STORES,
      response: id,
    });
  };
};

export const set_item_store_price = (id, price) => {
  return (dispatch) => {
    dispatch({
      type: SET_ITEM_STORE_PRICE,
      price: price,
      id: id,
    });
  };
};
