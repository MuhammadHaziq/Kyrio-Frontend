import {
  GET_STORES,
  ADD_NEW_STORE,
  REDIRECT_BACK_STORE,
  UPDATE_STORE_ROW_DATA,
  UPDATE_STORE_REDIRECT_STATES,
  UPDATE_STORE,
} from "../../constants/ActionTypes";

const initialState = {
  stores_list: [],
  save_store: false,
  redirect_store: true,
  redirect_update: false,
  update_store_data: {},
};
const storeReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_STORE: {
      return Object.assign({}, state, {
        redirect_store: action.response,
        redirect_update: false,
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
    case UPDATE_STORE_ROW_DATA: {
      return Object.assign({}, state, {
        update_store_data: action.response,
        redirect_update: true,
        redirect_store: false,
      });
    }
    case UPDATE_STORE: {
      return Object.assign({}, state, {
        stores_list: state.stores_list.slice().map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              title: action.response.title,
              address: action.response.address,
              pos: action.response.pos,
              description: action.response.description,
            });
          }
          return item;
        }),
        redirect_store: true,
        redirect_update: false,
      });
    }
    case UPDATE_STORE_REDIRECT_STATES: {
      return Object.assign({}, state, {
        redirect_store: true,
        redirect_update: false,
      });
    }
    default:
      return { ...state };
  }
};
export default storeReducer;
