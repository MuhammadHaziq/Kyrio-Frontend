import {
  GET_DISCOUNT_LIST,
  ADD_NEW_DISCOUNT,
  SELECT_ROW_ITEMS_DISCOUNT,
  REDIRECT_BACK_DISCOUNT,
  UPDATE_ITEM_DISCOUNT,
  TOGGLE_DISCOUNT_DELETE_SELECT,
  TOGGLE_ALL_DISCOUNT_DELETE_SELECT,
  DELETE_DISCOUNT,
} from "../../constants/ActionTypes";

const initialState = {
  discount_list: [],
  redirect_discountList: false,
  redirect_update: false,
  update_item_discount: {},
};
const discountReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_DISCOUNT: {
      return Object.assign({}, state, {
        redirect_discountList: action.response,
        redirect_update: false,
      });
    }

    case GET_DISCOUNT_LIST: {
      return { ...state, discount_list: action.response };
    }

    case ADD_NEW_DISCOUNT: {
      return Object.assign({}, state, {
        discount_list: [...state.discount_list, action.response],
        redirect_discountList: true,
      });
    }

    case SELECT_ROW_ITEMS_DISCOUNT: {
      return Object.assign({}, state, {
        update_item_discount: action.response,
        redirect_update: true,
        redirect_discountList: false,
      });
    }

    case UPDATE_ITEM_DISCOUNT: {
      return Object.assign({}, state, {
        discount_list: state.discount_list.slice().map((item) => {
          if (item._id === action.response._id) {
            return action.response;
          }
          return item;
        }),
        redirect_discountList: true,
        redirect_update: false,
      });
    }

    case TOGGLE_DISCOUNT_DELETE_SELECT: {
      return Object.assign({}, state, {
        discount_list: state.discount_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }
    case TOGGLE_ALL_DISCOUNT_DELETE_SELECT: {
      return Object.assign({}, state, {
        discount_list: state.discount_list.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }
    case DELETE_DISCOUNT: {
      let discount_list = state.discount_list;
      for (const id of action.response) {
        discount_list = discount_list.filter((item) => item._id !== id);
      }
      return {
        ...state,
        discount_list,
        redirect_update: false,
        redirect_discountList: true,
      };
    }

    default:
      return { ...state };
  }
};
export default discountReducer;
