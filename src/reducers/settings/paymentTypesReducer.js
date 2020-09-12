import {
  GET_PAYMENT_TYPES,
  REDIRECT_BACK_PAYMENT,
} from "../../constants/ActionTypes";

const initialState = {
  payment_types: [],
  redirect_payment: true,
};
const paymentTypesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_PAYMENT: {
      return Object.assign({}, state, {
        redirect_payment: action.response,
      });
    }

    case GET_PAYMENT_TYPES: {
      return Object.assign({}, state, {
        payment_types: action.response,
      });
    }

    default:
      return { ...state };
  }
};
export default paymentTypesReducer;
