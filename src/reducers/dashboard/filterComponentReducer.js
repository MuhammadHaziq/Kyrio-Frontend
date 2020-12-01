import {
  DATE_TIME_CHANGE,
  TIME_CHANGE,
  STORES_CHANGE,
  EMPLOYEE_CHANGE,
  UNMOUNT_FILTER_STATE,
} from "../../constants/ActionTypes";

const initialState = {
  filterDate: {},
  filterTime: {},
  filterStores: "",
  filterEmployees: "",
};
const filterComponentReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case DATE_TIME_CHANGE: {
      return Object.assign({}, state, {
        filterDate: action.response,
      });
    }
    case TIME_CHANGE: {
      return Object.assign({}, state, {
        filterTime: action.response,
      });
    }
    case STORES_CHANGE: {
      return Object.assign({}, state, {
        filterStores: action.response,
      });
    }
    case EMPLOYEE_CHANGE: {
      return Object.assign({}, state, {
        filterEmployees: action.response,
      });
    }
    case UNMOUNT_FILTER_STATE: {
      return Object.assign({}, state);
    }
    default:
      return { ...state };
  }
};
export default filterComponentReducer;
