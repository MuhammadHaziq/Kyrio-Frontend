import { GET_LOYALTY, ADD_NEW_LOYALTY } from "../../constants/ActionTypes";

const initialState = {
  loyalty_amount: "0.00",
};
const loyaltyReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_LOYALTY: {
      return Object.assign({}, state, {
        loyalty_amount: action.response,
      });
    }

    case ADD_NEW_LOYALTY: {
      return Object.assign({}, state, {
        loyalty_amount: action.response,
      });
    }
    default:
      return { ...state };
  }
};
export default loyaltyReducer;
