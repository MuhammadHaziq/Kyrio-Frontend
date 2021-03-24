import {
  GET_MODIFIRES_LIST,
  DELETE_MODIFIRES,
  ADD_NEW_MODIFIER,
  REDIRECT_BACK_MODIFIER,
  TOGGLE_MODIFIRES_DELETE_SELECT,
  TOGGLE_ALL_MODIFIRES_DELETE_SELECT,
  UPDATE_MODIFIER_ROW_DATA,
  UPDATE_MODIFER_PROPS_POSITION,
  UPDATE_MODIFER,
} from "../../constants/ActionTypes";

const initialState = {
  modifiers_list: [],
  redirect_modifier: false,
  redirect_update_modifier: false,
  modifier_row_data: {},
};
const modifiresReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_MODIFIER: {
      return Object.assign({}, state, {
        redirect_modifier: action.response,
        redirect_update_modifier: false,
      });
    }

    case GET_MODIFIRES_LIST: {
      return Object.assign({}, state, {
        modifiers_list: action.response,
      });
    }

    case ADD_NEW_MODIFIER: {
      return Object.assign({}, state, {
        modifiers_list: [...state.modifiers_list, action.response],
        redirect_modifier: true,
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
        redirect_update_modifier: false,
        redirect_modifier: true,
      };
    }
    case UPDATE_MODIFER_PROPS_POSITION: {
      return {
        ...state,
        modifiers_list: action.response,
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
    case UPDATE_MODIFIER_ROW_DATA: {
      return Object.assign({}, state, {
        // modifier_row_data: state.modifiers_list.filter(
        //   (item) => item._id === action.response
        // )[0],
        modifier_row_data: action.response,
        redirect_update_modifier: true,
        redirect_modifier: false,
      });
    }
    case UPDATE_MODIFER: {
      return Object.assign({}, state, {
        modifiers_list: state.modifiers_list.slice().map((item) => {
          if (item._id === action.response._id) {
            return action.response;
          }
          return item;
        }),
        redirect_update_modifier: false,
        redirect_modifier: true,
      });
    }
    default:
      return { ...state };
  }
};
export default modifiresReducer;
