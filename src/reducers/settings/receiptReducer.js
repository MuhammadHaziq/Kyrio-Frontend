import { GET_RECEIPT, ADD_NEW_RECEIPT } from "../../constants/ActionTypes";

const initialState = {
  receipt_data: {},
};
const receiptReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_RECEIPT: {
      return Object.assign({}, state, {
        receipt_data: action.response,
      });
    }

    case ADD_NEW_RECEIPT: {
      return Object.assign({}, state, {
        receipt_data: action.response,
      });
    }
    default:
      return { ...state };
  }
};
export default receiptReducer;
