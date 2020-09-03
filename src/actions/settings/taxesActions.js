import {
  MESSAGE,
  ERROR_MESSAGE,
  TOGGLE_DININGS,
  TOGGLE_CATEGORY,
  GET_CATEGORY_ITEMS,
  TOGGLE_CATEGORY_ITEMS
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

export const get_catgeory_item = (data) => {
  return (dispatch) => {
    try {
      axios({
        method: "get",
        url: `${BaseUrl}items/categories/categoryItem`,
        params:data,
        headers: {
          kyrioToken: `${localStorage.getItem("kyrio")}`,
        },
      })
        .then((response) => {
          dispatch({ type: GET_CATEGORY_ITEMS, response: response.data });
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
            object: error.response.data || {},
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
}


export const toggle_dinings = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DININGS,
      response: data,
    });
  };
};

export const toggle_category =(data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_CATEGORY,
      response: data,
    });
  };
}

export const toggle_category_item = (categoryItems, category) => {
  return dispatch=> {
    console.log(categoryItems)
    dispatch({
      type:TOGGLE_CATEGORY_ITEMS,
      category:category,
      categoryItems:categoryItems
    })
  }
}
