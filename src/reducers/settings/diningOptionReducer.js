import {
  GET_DINING_OPTION,
  ADD_NEW_DINING_OPTION,
  REDIRECT_BACK_DINING,
  UPDATE_ROW_DATA_DINING_OPTION,
} from "../../constants/ActionTypes";

const initialState = {
  dining_option_list: [],
  save_dining_option: false,
  redirect_dining: true,
  update_data: {},
  redirect_update: false,
};
const diningOptionReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_DINING: {
      return Object.assign({}, state, {
        redirect_dining: action.response,
        redirect_update: false,
      });
    }

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
    case UPDATE_ROW_DATA_DINING_OPTION: {
      return Object.assign({}, state, {
        update_data: action.response,
        redirect_update: true,
        redirect_dining: false,
      });
    }
    default:
      return { ...state };
  }
};
export default diningOptionReducer;
