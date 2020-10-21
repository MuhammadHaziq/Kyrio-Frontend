import {
  GET_CATEGORY_LIST,
  ADD_NEW_CATEGORY,
  SELECT_ROW_ITEMS_CATEGORY,
  REDIRECT_BACK_CATEGORY,
  UPDATE_ITEM_CATEGORY,
  TOGGLE_CATEGORY_DELETE_SELECT,
  TOGGLE_ALL_CATEGORY_DELETE_SELECT,
  DELETE_CATEGORY,
} from "../../constants/ActionTypes";

const initialState = {
  category_list: [],
  redirect_categoryList: false,
  redirect_update: false,
  update_item_category: {},
};
const categoryReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_CATEGORY: {
      return Object.assign({}, state, {
        redirect_categoryList: action.response,
        redirect_update: false,
      });
    }

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

    case SELECT_ROW_ITEMS_CATEGORY: {
      return Object.assign({}, state, {
        update_item_category: action.response,
        redirect_update: true,
        redirect_categoryList: false,
      });
    }

    case UPDATE_ITEM_CATEGORY: {
      return Object.assign({}, state, {
        category_list: state.category_list.slice().map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              catTitle: action.response.catTitle,
              catColor: action.response.catColor,
            });
          }
          return item;
        }),
        redirect_categoryList: true,
        redirect_update: false,
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
      let category_list = state.category_list;
      for (const id of action.response) {
        category_list = category_list.filter((item) => item._id !== id);
      }
      return {
        ...state,
        category_list,
        redirect_update: false,
        redirect_categoryList: true,
      };
    }
    default:
      return { ...state };
  }
};
export default categoryReducer;
