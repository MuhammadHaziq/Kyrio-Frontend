import { GET_ITEM_LIST } from "../constants/ActionTypes";

const initialState = {
  item_list: [],
};
const itemReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_ITEM_LIST:
      return { ...state, item_list: action.response };
    default:
      return { ...state };
  }
};
export default itemReducer;
