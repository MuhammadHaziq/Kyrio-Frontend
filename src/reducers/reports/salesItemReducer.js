import {
  GET_ITEM_SALES_SUMMARY,
  TOGGLE_ITEM_SALE_SINGLE_SELECT,
  TOGGLE_ITEM_SALE_ALL_SELECT,
  DELETE_ITEM_SALES,
  // ROW_DATA_ITEM_SALES_SUMMARY,
  SET_LOADING,
} from "../../constants/ActionTypes";

const initialState = {
  item_sales_summary: [],
  redirect_update: false,
  redirect_item_sales_summary: true,
  loading: true,
};
const salesItemReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, {
        loading: action.response,
      });
    }

    case GET_ITEM_SALES_SUMMARY: {
      return Object.assign({}, state, {
        item_sales_summary: action.response,
        loading: false,
      });
    }

    case TOGGLE_ITEM_SALE_SINGLE_SELECT: {
      return Object.assign({}, state, {
        item_sales_summary: state.item_sales_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_ITEM_SALE_ALL_SELECT: {
      return Object.assign({}, state, {
        item_sales_summary: state.item_sales_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_ITEM_SALES: {
      let item_sales_summary = state.item_sales_summary;
      for (const id of action.response) {
        item_sales_summary = item_sales_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        item_sales_summary,
        redirect_update: false,
        redirect_item_sales_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesItemReducer;
