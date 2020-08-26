import { GET_ITEM_LIST, GET_ITEM_STOCK } from "../constants/ActionTypes";

const initialState = {
  item_list: [],
  stock_list: [],
};
const itemReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_ITEM_LIST: {
      return { ...state, item_list: action.response };
    }
    case GET_ITEM_STOCK: {
      return {
        ...state,
        stock_list: action.response,
      };
    }
    default:
      return { ...state };
  }
};
export default itemReducer;
