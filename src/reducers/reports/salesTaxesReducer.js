import {
  GET_TAXES_SALES_SUMMARY,
  TOGGLE_TAXES_SALE_SINGLE_SELECT,
  TOGGLE_TAXES_SALE_ALL_SELECT,
  DELETE_TAXES_SALES,
  ROW_DATA_TAXES_SALES_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  taxes_sales_summary: [],
  redirect_update: false,
  redirect_taxes_sales_summary: true,
};
const salesTaxesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_TAXES_SALES_SUMMARY: {
      return Object.assign({}, state, {
        taxes_sales_summary: action.response,
      });
    }

    case TOGGLE_TAXES_SALE_SINGLE_SELECT: {
      return Object.assign({}, state, {
        taxes_sales_summary: state.taxes_sales_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_TAXES_SALE_ALL_SELECT: {
      return Object.assign({}, state, {
        taxes_sales_summary: state.taxes_sales_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_TAXES_SALES: {
      let taxes_sales_summary = state.taxes_sales_summary;
      for (const id of action.response) {
        taxes_sales_summary = taxes_sales_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        taxes_sales_summary,
        redirect_update: false,
        redirect_taxes_sales_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesTaxesReducer;
