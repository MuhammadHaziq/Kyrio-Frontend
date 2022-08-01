import {
  GET_SALES_SUMMARY,
  GET_SALES_GRAPH_DATA,
  TOGGLE_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_SALE_SUMMARY_ALL_SELECT,
  DELETE_SALES_SUMMARY,
  CHANGE_DAYS,
  SET_LOADING,
  ROW_DATA_SALES_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  sales_summary: [],
  redirect_update: false,
  redirect_sale_summary: true,
  sales_graph_data: [],
  filter_days: [],
  loading: true,
};
const salesSummaryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, {
        loading: action.response,
      });
    }
    case GET_SALES_SUMMARY: {
      return Object.assign({}, state, {
        sales_summary: action.response,
      });
    }
    case GET_SALES_GRAPH_DATA: {
      return {
        ...state,
        sales_graph_data: action.response,
        loading: false,
      };
    }
    case TOGGLE_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        sales_summary: state.sales_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        sales_summary: state.sales_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }
    case CHANGE_DAYS: {
      return Object.assign({}, state, {
        filter_days: action.response,
      });
    }
    case DELETE_SALES_SUMMARY: {
      let sales_summary = state.sales_summary;
      for (const id of action.response) {
        sales_summary = sales_summary.filter((item) => item._id !== id);
      }
      return {
        ...state,
        sales_summary,
        redirect_update: false,
        redirect_sale_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesSummaryReducer;
