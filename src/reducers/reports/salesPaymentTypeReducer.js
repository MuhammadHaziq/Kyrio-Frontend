import {
  GET_PAYMENT_TYPE_SALES_SUMMARY,
  TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_ALL_SELECT,
  DELETE_PAYMENT_TYPE_SALES_SUMMARY,
  ROW_DATA_PAYMENT_TYPE_SALES_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
  paymentType_sales_summary: [],
  redirect_update: false,
  redirect_paymentType_sales_summary: true,
};
const salesPaymentTypeReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_PAYMENT_TYPE_SALES_SUMMARY: {
      return Object.assign({}, state, {
        paymentType_sales_summary: action.response,
      });
    }

    case TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        paymentType_sales_summary: state.paymentType_sales_summary.map(
          (item) => {
            if (item._id === action.response._id) {
              return Object.assign({}, item, {
                isDeleted: !item.isDeleted,
              });
            }
            return item;
          }
        ),
      });
    }

    case TOGGLE_PAYMENT_TYPE_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        paymentType_sales_summary: state.paymentType_sales_summary.map(
          (item) => {
            return Object.assign({}, item, {
              isDeleted: action.response,
            });
          }
        ),
      });
    }

    case DELETE_PAYMENT_TYPE_SALES_SUMMARY: {
      let paymentType_sales_summary = state.paymentType_sales_summary;
      for (const id of action.response) {
        paymentType_sales_summary = paymentType_sales_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        paymentType_sales_summary,
        redirect_update: false,
        redirect_paymentType_sales_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesPaymentTypeReducer;
