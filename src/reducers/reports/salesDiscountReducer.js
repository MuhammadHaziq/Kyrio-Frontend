import {
  GET_DISCOUNT_SALES_SUMMARY,
  TOGGLE_DISCOUNT_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_DISCOUNT_SALE_SUMMARY_ALL_SELECT,
  DELETE_DISCOUNT_SALES_SUMMARY,
  SET_LOADING,
} from "../../constants/ActionTypes";

const initialState = {
  sale_discount_summary: [],
  redirect_update: false,
  redirect_sale_discount_summary: true,
  loading: true,
};
const salesDiscountReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, {
        loading: action.response,
      });
    }
    case GET_DISCOUNT_SALES_SUMMARY: {
      return Object.assign({}, state, {
        sale_discount_summary: action.response,
        loading: false,
      });
    }

    case TOGGLE_DISCOUNT_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        sale_discount_summary: state.sale_discount_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_DISCOUNT_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        sale_discount_summary: state.sale_discount_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_DISCOUNT_SALES_SUMMARY: {
      let sale_discount_summary = state.sale_discount_summary;
      for (const id of action.response) {
        sale_discount_summary = sale_discount_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        sale_discount_summary,
        redirect_update: false,
        redirect_sale_discount_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesDiscountReducer;
