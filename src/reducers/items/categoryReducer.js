import {
  GET_CATEGORY_LIST,
  ADD_NEW_CATEGORY,
  TOGGLE_CATEGORY_DELETE_SELECT,
  TOGGLE_ALL_CATEGORY_DELETE_SELECT,
  DELETE_CATEGORY,
} from "../../constants/ActionTypes";

const initialState = {
  category_list: [],
  redirect_categoryList: false,
};
const categoryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CATEGORY_LIST: {
      return Object.assign({}, state, {
        category_list: action.response,
      });
    }

    case ADD_NEW_CATEGORY: {
      return Object.assign({}, state, {
        category_list: [...state.category_list, action.response],
        redirect_categoryList: true,
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
    case DELETE_CATEGORY: {
      return Object.assign({}, state, {
        category_list: state.category_list.filter((item) => {
          return item.isDeleted !== true;
        }),
      });
    }
    default:
      return { ...state };
  }
};
export default categoryReducer;
