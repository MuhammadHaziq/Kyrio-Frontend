import { GET_PAYMENT_TYPES } from "../../constants/ActionTypes";

const initialState = {
  payment_types: [],
};
const paymentTypesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
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
