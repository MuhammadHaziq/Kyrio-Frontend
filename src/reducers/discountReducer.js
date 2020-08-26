import { GET_DISCOUNT_LIST } from "../constants/ActionTypes";

const initialState = {
  discount_list: [],
};
const discountReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_DISCOUNT_LIST: {
      return { ...state, discount_list: action.response };
    }

    default:
      return { ...state };
  }
};
export default discountReducer;
