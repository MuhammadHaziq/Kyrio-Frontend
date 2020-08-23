import { GET_CATEGORY_LIST } from "../constants/ActionTypes";

const initialState = {
  category_list: [],
};
const categoryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return { ...state, category_list: action.response };
    default:
      return { ...state };
  }
};
export default categoryReducer;
