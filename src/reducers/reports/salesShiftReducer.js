import {
  GET_SHIFT_SALES_SUMMARY,
  TOGGLE_SHIFT_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_SHIFT_SALE_SUMMARY_ALL_SELECT,
  DELETE_SHIFT_SALES_SUMMARY,
  ROW_DATA_SHIFT_SALES_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  sale_shift_summary: [],
  redirect_update: false,
  redirect_sale_shift_summary: true,
};
const salesShiftReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_SHIFT_SALES_SUMMARY: {
      return Object.assign({}, state, {
        sale_shift_summary: action.response,
      });
    }

    case TOGGLE_SHIFT_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        sale_shift_summary: state.sale_shift_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_SHIFT_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        sale_shift_summary: state.sale_shift_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_SHIFT_SALES_SUMMARY: {
      let sale_shift_summary = state.sale_shift_summary;
      for (const id of action.response) {
        sale_shift_summary = sale_shift_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        sale_shift_summary,
        redirect_update: false,
        redirect_sale_shift_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesShiftReducer;