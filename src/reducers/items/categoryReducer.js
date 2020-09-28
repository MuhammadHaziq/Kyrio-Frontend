import {
  GET_CATEGORY_LIST,
  TOGGLE_CATEGORY_DELETE_SELECT,
  TOGGLE_ALL_CATEGORY_DELETE_SELECT,
} from "../../constants/ActionTypes";

const initialState = {
  category_list: [],
};
const categoryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CATEGORY_LIST: {
      return Object.assign({}, state, {
        category_list: action.response,
      });
    }
    case TOGGLE_CATEGORY_DELETE_SELECT: {
      return Object.assign({}, state, {
        category_list: state.category_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }
    case TOGGLE_ALL_CATEGORY_DELETE_SELECT: {
      return Object.assign({}, state, {
        category_list: state.category_list.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }
    default:
      return { ...state };
  }
};
export default categoryReducer;
