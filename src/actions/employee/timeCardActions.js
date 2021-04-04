import {
  GET_TIMECARDS,
  GET_TIMECARD_DETAIL,
  ADD_NEW_TIMECARD,
  GET_TOTAL_WORING_HOURS,
  REDIRECT_BACK_TIME_CARD,
  TOGGLE_TIMECARD_SINGLE_SELECT,
  TOGGLE_TIMECARD_ALL_SELECT,
  DELETE_TIMECARD,
  ROW_DATA_TIMECARD,
  UPDATE_TIMECARD,
  MESSAGE,
  ERROR_MESSAGE,
} from "../../constants/ActionTypes";
import authAxios from '../../constants/authAxios'


export const redirect_back_timeCard = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_TIME_CARD,
      response: status,
    });
  };
};

export const get_timeCards = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/timecard`,

      })
        .then((response) => {
          dispatch({ type: GET_TIMECARDS, response: response.data });
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
export const get_total_time_hours = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/timeCard/totalWorkingHour`,

      })
        .then((response) => {
          dispatch({ type: GET_TOTAL_WORING_HOURS, response: response.data });
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

export const get_timeCard_detail = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/employeeList`,

      })
        .then((response) => {
          dispatch({ type: GET_TIMECARD_DETAIL, response: response.data });
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

export const add_new_timeCard = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "POST",
        url: `employee/timecard`,
        data: data,

      })
        .then((response) => {
          dispatch({ type: ADD_NEW_TIMECARD, response: response.data });
          let msg = {
            open: true,
            message: "Time Card Created Successfully",
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

export const toggle_timeCard_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TIMECARD_SINGLE_SELECT,
      response: data,
    });
  };
};

export const toggle_timeCard_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TIMECARD_ALL_SELECT,
      response: status,
    });
  };
};

export const delete_timeCard = (ids) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "DELETE",
        url: `employee/timecard/${ids}`,

      })
        .then((response) => {
          dispatch({ type: DELETE_TIMECARD, response: JSON.parse(ids) });
          let msg = {
            open: true,
            message:
              JSON.parse(ids).length > 1
                ? "Time Cards Deleted Successfully"
                : "Time Card Deleted Successfully",
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

export const update_row_data = (row) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "GET",
        url: `employee/timecard/row/${row._id}`,

      })
        .then((response) => {
          dispatch({ type: ROW_DATA_TIMECARD, response: response.data });
          // dispatch({ type: GET_TIMECARDS, response: response.data });
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
  // return (dispatch) => {
  //     dispatch({ type: ROW_DATA_TIMECARD, response: row });
  // };
};

export const update_timeCard = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "PATCH",
        url: `employee/timecard`,
        data: data,

      })
        .then((response) => {
          console.log(response.data);
          dispatch({ type: UPDATE_TIMECARD, response: response.data });
          let msg = {
            open: true,
            message: "Update Time Card Successfully",
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
