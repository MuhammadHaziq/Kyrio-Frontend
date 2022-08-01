import {
  GET_CATEGORY_SALES_SUMMARY,
  TOGGLE_CATEGORY_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_CATEGORY_SALE_SUMMARY_ALL_SELECT,
  DELETE_CATEGORY_SALES_SUMMARY,
  SET_LOADING,
} from "../../constants/ActionTypes";

const initialState = {
  category_sales_summary: [],
  redirect_update: false,
  redirect_sale_category_summary: true,
  loading: true,
};
const salesCategoryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, {
        loading: action.response,
      });
    }

    case GET_CATEGORY_SALES_SUMMARY: {
      return Object.assign({}, state, {
        category_sales_summary: action.response,
        loading: false,
      });
    }

    case TOGGLE_CATEGORY_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        category_sales_summary: state.category_sales_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_CATEGORY_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        category_sales_summary: state.category_sales_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_CATEGORY_SALES_SUMMARY: {
      let category_sales_summary = state.category_sales_summary;
      for (const id of action.response) {
        category_sales_summary = category_sales_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        category_sales_summary,
        redirect_update: false,
        redirect_sale_category_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesCategoryReducer;
