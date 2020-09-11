import {
  GET_DINING_OPTION,
  ADD_NEW_DINING_OPTION,
} from "../../constants/ActionTypes";

const initialState = {
  dining_option_list: [],
  save_dining_option: false,
};
const diningOptionReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_DINING_OPTION: {
      return Object.assign({}, state, {
        dining_option_list: action.response,
      });
    }

    case ADD_NEW_DINING_OPTION: {
      return Object.assign({}, state, {
        save_dining_option: !state.save_store,
        dining_option_list: [action.response, ...state.dining_option_list],
      });
    }
    default:
      return { ...state };
  }
};
export default diningOptionReducer;
