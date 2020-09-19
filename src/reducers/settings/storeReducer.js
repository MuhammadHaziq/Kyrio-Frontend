import {
  GET_STORES,
  ADD_NEW_STORE,
  REDIRECT_BACK_STORE,
} from "../../constants/ActionTypes";

const initialState = {
  stores_list: [],
  save_store: false,
  redirect_store: true,
};
const storeReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_STORE: {
      return Object.assign({}, state, {
        redirect_store: action.response,
      });
    }

    case GET_STORES: {
      return Object.assign({}, state, {
        stores_list: action.response,
      });
    }

    case ADD_NEW_STORE: {
      return Object.assign({}, state, {
        save_store: !state.save_store,
        stores_list: [action.response, ...state.stores_list],
      });
    }
    default:
      return { ...state };
  }
};
export default storeReducer;
