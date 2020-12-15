import {
  GET_SALES_CATEGORY_SUMMARY,
  TOGGLE_SALE_CATEGORY_SUMMARY_SINGLE_SELECT,
  TOGGLE_SALE_CATEGORY_SUMMARY_ALL_SELECT,
  DELETE_SALES_CATEGORY_SUMMARY,
  ROW_DATA_SALES_CATEGORY_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  sales_category_summary: [],
  redirect_update: false,
  redirect_sale_category_summary: true,
};
const salesCategoryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_SALES_CATEGORY_SUMMARY: {
      return Object.assign({}, state, {
        sales_category_summary: action.response,
      });
    }

    case TOGGLE_SALE_CATEGORY_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        sales_category_summary: state.sales_category_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_SALE_CATEGORY_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        sales_category_summary: state.sales_category_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_SALES_CATEGORY_SUMMARY: {
      let sales_category_summary = state.sales_category_summary;
      for (const id of action.response) {
        sales_category_summary = sales_category_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        sales_category_summary,
        redirect_update: false,
        redirect_sale_category_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesCategoryReducer;
