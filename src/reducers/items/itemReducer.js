import {
  GET_ITEM_LIST,
  GET_ITEM_STOCK,
  GET_ITEM_STORES,
  TOGGLE_ITEM_DELETE_SELECT,
  TOGGLE_ALL_ITEM_DELETE_SELECT,
  DELETE_ITEM_LIST,
} from "../../constants/ActionTypes";

const initialState = {
  item_list: [],
  stock_list: [],
  store_list: [],
};
const itemReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_ITEM_LIST: {
      return Object.assign({}, state, {
        item_list: action.response,
      });
    }
    case GET_ITEM_STOCK: {
      return Object.assign({}, state, {
        stock_list: action.response,
      });
    }
    case GET_ITEM_STORES: {
      return Object.assign({}, state, {
        store_list: action.response,
      });
    }
    case TOGGLE_ITEM_DELETE_SELECT: {
      return Object.assign({}, state, {
        item_list: state.item_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }
    case TOGGLE_ALL_ITEM_DELETE_SELECT: {
      return Object.assign({}, state, {
        item_list: state.item_list.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }
    case DELETE_ITEM_LIST: {
      return Object.assign({}, state, {
        item_list: state.item_list.filter((item) => {
          return item.isDeleted !== true;
        }),
      });
    }
    default:
      return { ...state };
  }
};
export default itemReducer;
