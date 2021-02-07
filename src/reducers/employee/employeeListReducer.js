import {
  GET_EMPLOYEE_LIST,
  ADD_NEW_EMPLOYEE,
  REDIRECT_BACK_EMPLOYEE_LIST,
  TOGGLE_EMPLOYEE_SINGLE_SELECT,
  TOGGLE_EMPLOYEE_ALL_SELECT,
  DELETE_EMPLOYEE,
  ROW_DATA_EMPLOYEE_LIST,
  UPDATE_EMPLOYEE,
} from "../../constants/ActionTypes";

const initialState = {
  employee_list: [],
  redirect_employee: false,
  redirect_update: false,
  employee_row_data: {},
};
const employeeListReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_EMPLOYEE_LIST: {
      return Object.assign({}, state, {
        redirect_employee: action.response,
        redirect_update: false,
      });
    }

    case GET_EMPLOYEE_LIST:
      return Object.assign({}, state, {
        employee_list: action.response,
      });

    case ADD_NEW_EMPLOYEE:
      return Object.assign({}, state, {
        employee_list: [action.response, ...state.employee_list],
        redirect_employee: true,
      });

    case TOGGLE_EMPLOYEE_SINGLE_SELECT: {
      return Object.assign({}, state, {
        employee_list: state.employee_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_EMPLOYEE_ALL_SELECT: {
      return Object.assign({}, state, {
        employee_list: state.employee_list.map((item) => {
          if (
            item.role !== undefined &&
            item.role !== null &&
            item.role["name"] !== undefined &&
            item.role["name"] !== null &&
            item.role["name"].toUpperCase() !== "OWNER"
          ) {
            return Object.assign({}, item, {
              isDeleted: action.response,
            });
          }
          return item;
        }),
      });
    }

    case DELETE_EMPLOYEE: {
      let employee_list = state.employee_list;
      for (const id of action.response) {
        employee_list = employee_list.filter((item) => item._id !== id);
      }
      return {
        ...state,
        employee_list,
        redirect_update: false,
        redirect_employee: true,
      };
    }
    case ROW_DATA_EMPLOYEE_LIST: {
      return Object.assign({}, state, {
        employee_row_data: action.response,
        redirect_update: true,
        redirect_employee: false,
      });
    }

    case UPDATE_EMPLOYEE: {
      return Object.assign({}, state, {
        employee_list: state.employee_list.map((item) => {
          if (item._id === action.response._id) {
            return action.response;
          }
          return item;
        }),
        employee_row_data: {},
        redirect_update: false,
        redirect_employee: true,
      });
    }

    default:
      return { ...state };
  }
};
export default employeeListReducer;
