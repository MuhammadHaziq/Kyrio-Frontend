import {
  GET_DISCOUNT_LIST,
  ADD_NEW_DISCOUNT,
  TOGGLE_DISCOUNT_DELETE_SELECT,
  TOGGLE_ALL_DISCOUNT_DELETE_SELECT,
  DELETE_DISCOUNT,
} from "../../constants/ActionTypes";

const initialState = {
  discount_list: [],
  redirect_discountList: false,
};
const discountReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_DISCOUNT_LIST: {
      return { ...state, discount_list: action.response };
    }

    case ADD_NEW_DISCOUNT: {
      return Object.assign({}, state, {
        discount_list: [...state.discount_list, action.response],
        redirect_discountList: true,
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
      return Object.assign({}, state, {
        discount_list: state.discount_list.filter((item) => {
          return item.isDeleted !== true;
        }),
      });
    }
    default:
      return { ...state };
  }
};
export default discountReducer;
