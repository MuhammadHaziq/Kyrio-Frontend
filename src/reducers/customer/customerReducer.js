import {
  GET_CUSTOMERS,
  ADD_NEW_CUSTOMER,
  REDIRECT_BACK_CUSTOMER,
  TOGGLE_CUSTOMER_SINGLE_SELECT,
  TOGGLE_CUSTOMER_ALL_SELECT,
  DELETE_CUSTOMERS,
  ROW_DATA_CUSTOMER,
} from "../../constants/ActionTypes";

const initialState = {
  customer_detail: [],
  redirect_customer: false,
  redirect_update: false,
  customer_row_data: {},
};
const customerReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_CUSTOMER: {
      return Object.assign({}, state, {
        redirect_customer: action.response,
        redirect_update: false,
      });
    }

    case GET_CUSTOMERS:
      return Object.assign({}, state, {
        customer_detail: action.response,
      });

    case ADD_NEW_CUSTOMER:
      return Object.assign({}, state, {
        customer_detail: [action.response, ...state.customer_detail],
        redirect_customer: true,
      });

    case TOGGLE_CUSTOMER_SINGLE_SELECT: {
      return Object.assign({}, state, {
        customer_detail: state.customer_detail.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_CUSTOMER_ALL_SELECT: {
      return Object.assign({}, state, {
        customer_detail: state.customer_detail.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_CUSTOMERS: {
      let customer_detail = state.customer_detail;
      for (const id of action.response) {
        customer_detail = customer_detail.filter((item) => item._id !== id);
      }
      return {
        ...state,
        customer_detail,
        redirect_update: false,
        redirect_customer: true,
      };
    }
    case ROW_DATA_CUSTOMER: {
      return Object.assign({}, state, {
        customer_row_data: action.response,
        redirect_update: true,
        redirect_customer: false,
      });
    }

    default:
      return { ...state };
  }
};
export default customerReducer;
