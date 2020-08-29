import { GET_STORES, ADD_NEW_STORE } from "../../constants/ActionTypes";

const initialState = {
  stores_list:[],
  save_store:false
};
const storeReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_STORES: {
      return { ...state, stores_list: action.response };
    }

    case ADD_NEW_STORE: {
      return {
        ...state,
        save_store:!state.save_store,
        stores_list:[action.response, ...state.stores_list]
      }
    }
    default:
      return { ...state };
  }
};
export default storeReducer;
