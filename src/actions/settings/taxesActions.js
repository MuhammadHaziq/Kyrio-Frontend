import {
  MESSAGE,
  ERROR_MESSAGE,
  TOGGLE_DININGS,
  TOGGLE_CATEGORY,
} from "../../constants/ActionTypes";
import { BaseUrl } from "../../constants/baseUrls";
import axios from "axios";

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
