import {
  GET_KICTCH_PRINTER,
  ADD_NEW_KITCHEN_PRINTER,
  DELETE_KITCHEN_PRINTER,
  TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT,
  TOGGLE_KITCHEN_PRINTER_SELECT_ALL,
  REDIRECT_BACK_KITCHEN,
  SELECT_UPDATE_ROW,
  UPDATE_KICTCH_PRINTER,
  UPDATE_KITCHEN_PRINTER_REDIRECT_STATES,
} from "../../constants/ActionTypes";

const initialState = {
  kitchen_printers: [],
  redirect_kitchen: true,
  update_row: {},
  update_redirect: false,
};
const kitchenPrinterReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_KITCHEN: {
      return Object.assign({}, state, {
        redirect_kitchen: action.response,
        update_redirect: false,
      });
    }

    case GET_KICTCH_PRINTER: {
      return Object.assign({}, state, {
        kitchen_printers: action.response,
      });
    }

    case ADD_NEW_KITCHEN_PRINTER: {
      return Object.assign({}, state, {
        kitchen_printers: [action.response, ...state.kitchen_printers],
      });
    }
    case TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT: {
      return Object.assign({}, state, {
        kitchen_printers: state.kitchen_printers.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_KITCHEN_PRINTER_SELECT_ALL: {
      return Object.assign({}, state, {
        kitchen_printers: state.kitchen_printers.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case UPDATE_KICTCH_PRINTER: {
      return Object.assign({}, state, {
        kitchen_printers: state.kitchen_printers.slice().map((item) => {
          if (item._id === action.response._id) {
            return action.response;
          }
          return item;
        }),
        update_redirect: false,
        redirect_kitchen: true,
      });
    }
    case DELETE_KITCHEN_PRINTER: {
      let kitchen_printers = state.kitchen_printers;
      for (const id of JSON.parse(action.response)) {
        kitchen_printers = kitchen_printers.filter((item) => item._id !== id);
      }
      return {
        ...state,
        kitchen_printers,
      };
    }

    case SELECT_UPDATE_ROW: {
      return Object.assign({}, state, {
        update_row: action.response,
        update_redirect: true,
        redirect_kitchen: false,
      });
    }
    case UPDATE_KITCHEN_PRINTER_REDIRECT_STATES: {
      return Object.assign({}, state, {
        update_redirect: false,
        redirect_kitchen: true,
      })
    }
    default:
      return { ...state };
  }
};
export default kitchenPrinterReducer;
