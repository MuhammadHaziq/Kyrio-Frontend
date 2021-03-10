import {
  GET_SALES_RECEIPT_SUMMARY,
  TOGGLE_SALE_RECEIPT_SUMMARY_SINGLE_SELECT,
  TOGGLE_SALE_RECEIPT_SUMMARY_ALL_SELECT,
  DELETE_SALES_RECEIPT_SUMMARY,
  ROW_DATA_SALES_RECEIPT_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  sale_receipt_summary: [],
  redirect_update: false,
  redirect_sale_receipt_summary: true,
};
const salesReceiptReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_SALES_RECEIPT_SUMMARY: {
      return Object.assign({}, state, {
        sale_receipt_summary: action.response,
      });
    }

    case TOGGLE_SALE_RECEIPT_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        sale_receipt_summary: state.sale_receipt_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_SALE_RECEIPT_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        sale_receipt_summary: state.sale_receipt_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_SALES_RECEIPT_SUMMARY: {
      let sale_receipt_summary = state.sale_receipt_summary;
      for (const id of action.response) {
        sale_receipt_summary = sale_receipt_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        sale_receipt_summary,
        redirect_update: false,
        redirect_sale_receipt_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesReceiptReducer;
