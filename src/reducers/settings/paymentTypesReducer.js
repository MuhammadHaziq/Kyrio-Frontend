import {
  GET_PAYMENT_TYPES,
  REDIRECT_BACK_PAYMENT,
  GET_PAYMENTS_TYPE,
  TOGGLE_PAYMENTS_SINGLE_SELECT,
  TOOGLE_PAYMENTS_ALL_SELECT,
  DELETE_PAYMENTS_TYPE,
  ADD_NEW_PAYMENT_TYPE,
  UPDATE_ROW_DATA_PAYMENT_TYPE,
  UPDATE_PAYMENT_TYPE,
} from "../../constants/ActionTypes";

const initialState = {
  payment_types: [],
  payments_type: [],
  redirect_payment: true,
  update_redirect: false,
  row_data: {},
};
const paymentTypesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_PAYMENT: {
      return Object.assign({}, state, {
        redirect_payment: action.response,
        update_redirect: false,
      });
    }

    case GET_PAYMENT_TYPES: {
      return Object.assign({}, state, {
        payment_types: action.response,
      });
    }
    case GET_PAYMENTS_TYPE: {
      return Object.assign({}, state, {
        payments_type: action.response,
      });
    }
    case ADD_NEW_PAYMENT_TYPE: {
      return Object.assign({}, state, {
        payments_type: [action.response, ...state.payments_type],
      });
    }
    case TOGGLE_PAYMENTS_SINGLE_SELECT: {
      return Object.assign({}, state, {
        payments_type: state.payments_type.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOOGLE_PAYMENTS_ALL_SELECT: {
      return Object.assign({}, state, {
        payments_type: state.payments_type.slice().map((item) => {
          if (item.name.toUpperCase() !== "Cash".toUpperCase()) {
            return Object.assign({}, item, {
              isDeleted: action.response,
            });
          } else {
            return item;
          }
        }),
      });
    }

    case DELETE_PAYMENTS_TYPE: {
      let payments_type = state.payments_type;
      for (const id of JSON.parse(action.response)) {
        payments_type = payments_type.filter((item) => item._id !== id);
      }
      return {
        ...state,
        payments_type,
      };
    }
    case UPDATE_PAYMENT_TYPE: {
      return Object.assign({}, state, {
        payments_type: state.payments_type.slice().map((item) => {
          if (item._id === action.response._id) {
            return action.response;
          }
          return item;
        }),
        redirect_payment: true,
        update_redirect: false,
      });
    }
    case UPDATE_ROW_DATA_PAYMENT_TYPE: {
      return Object.assign({}, state, {
        row_data: action.response,
        redirect_payment: false,
        update_redirect: true,
      });
    }
    default:
      return { ...state };
  }
};
export default paymentTypesReducer;
