import {
  GET_ITEM_LIST,
  GET_ITEM_STOCK,
  GET_ITEM_STORES,
  TOGGLE_ITEM_DELETE_SELECT,
  TOGGLE_ALL_ITEM_DELETE_SELECT,
  DELETE_ITEM_LIST,
  TOGGLE_SELECT_ALL_ITEM_STORES,
  TOGGLE_SELECT_SINGLE_ITEM_STORES,
  SET_ITEM_STORE_PRICE,
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
        store_list: (action.response || []).map((item) => {
          return { ...item, isSelected: true, price: "" };
        }),
      });
    }
    case TOGGLE_SELECT_ALL_ITEM_STORES: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          return {
            ...item,
            isSelected: action.response,
          };
        }),
      });
    }
    case TOGGLE_SELECT_SINGLE_ITEM_STORES: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          if (item._id === action.response) {
            return {
              ...item,
              isSelected: !item.isSelected,
            };
          }
          return item;
        }),
      });
    }

    case SET_ITEM_STORE_PRICE: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          if (item._id === action.id) {
            return {
              ...item,
              price: action.price,
            };
          }
          return item;
        }),
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
