import {
  GET_EMPLOYEE_SALES_SUMMARY,
  TOGGLE_EMPLOYEE_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_EMPLOYEE_SALE_SUMMARY_ALL_SELECT,
  DELETE_EMPLOYEE_SALES_SUMMARY,
  ROW_DATA_EMPLOYEE_SALES_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  employee_sales_summary: [],
  redirect_update: false,
  redirect_employee_sales_summary: true,
};
const salesEmployeeReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_EMPLOYEE_SALES_SUMMARY: {
      return Object.assign({}, state, {
        employee_sales_summary: action.response,
      });
    }

    case TOGGLE_EMPLOYEE_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        employee_sales_summary: state.employee_sales_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_EMPLOYEE_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        employee_sales_summary: state.employee_sales_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_EMPLOYEE_SALES_SUMMARY: {
      let employee_sales_summary = state.employee_sales_summary;
      for (const id of action.response) {
        employee_sales_summary = employee_sales_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        employee_sales_summary,
        redirect_update: false,
        redirect_employee_sales_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesEmployeeReducer;
