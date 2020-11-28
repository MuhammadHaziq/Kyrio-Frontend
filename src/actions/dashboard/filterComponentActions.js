import {
  DATE_TIME_CHANGE,
  TIME_CHANGE,
  STORES_CHANGE,
  EMPLOYEE_CHANGE,
  UNMOUNT_FILTER_STATE,
} from "../../constants/ActionTypes";

export const change_in_date_time = (date) => {
  return (dispatch) => {
    dispatch({
      type: DATE_TIME_CHANGE,
      response: date,
    });
  };
};

export const change_in_time = (time) => {
  return (dispatch) => {
    dispatch({
      type: TIME_CHANGE,
      response: time,
    });
  };
};

export const stores_change = (stores) => {
  return (dispatch) => {
    dispatch({
      type: STORES_CHANGE,
      response: stores,
    });
  };
};

export const employee_change = (employee) => {
  return (dispatch) => {
    dispatch({
      type: EMPLOYEE_CHANGE,
      response: employee,
    });
  };
};
export const unmount_filter = (employee) => {
  return (dispatch) => {
    dispatch({
      type: UNMOUNT_FILTER_STATE,
    });
  };
};
