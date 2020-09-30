import {
  GET_MODIFIRES_LIST,
  DELETE_MODIFIRES,
  TOGGLE_MODIFIRES_DELETE_SELECT,
  TOGGLE_ALL_MODIFIRES_DELETE_SELECT,
} from "../../constants/ActionTypes";

const initialState = {
  modifiers_list: [],
};
const modifiresReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_MODIFIRES_LIST: {
      return Object.assign({}, state, {
        modifiers_list: action.response,
      });
    }

    case DELETE_MODIFIRES: {
      let modifiers_list = state.modifiers_list;
      for (const id of JSON.parse(action.response)) {
        modifiers_list = modifiers_list.filter((item) => item._id !== id);
      }
      return {
        ...state,
        modifiers_list,
      };
    }
    case TOGGLE_MODIFIRES_DELETE_SELECT: {
      return Object.assign({}, state, {
        modifiers_list: state.modifiers_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }
    case TOGGLE_ALL_MODIFIRES_DELETE_SELECT: {
      return Object.assign({}, state, {
        modifiers_list: state.modifiers_list.map((item) => {
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
export default modifiresReducer;
