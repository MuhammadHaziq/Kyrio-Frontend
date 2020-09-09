import {
  GET_KICTCH_PRINTER,
  ADD_NEW_KITCHEN_PRINTER,
  DELETE_KITCHEN_PRINTER,
  TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT,
  TOGGLE_KITCHEN_PRINTER_SELECT_ALL,
} from "../../constants/ActionTypes";

const initialState = {
  kitchen_printers: [],
  save_kitchen_printer: false,
};
const kitchenPrinterReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_KICTCH_PRINTER: {
      return { ...state, kitchen_printers: action.response };
    }

    case ADD_NEW_KITCHEN_PRINTER: {
      return {
        ...state,
        save_kitchen_printer: !state.save_store,
        kitchen_printers: [action.response, ...state.kitchen_printers],
      };
    }
    case TOGGLE_KITCHEN_PRINTER_SINGLE_SELECT: {
      const kitchen_printers = state.kitchen_printers.slice().map((item) => {
        if (item._id === action.response._id) {
          return {
            ...item,
            isDeleted: !item.isDeleted,
          };
        }
        return item;
      });
      return {
        ...state,
        kitchen_printers,
      };
    }

    case TOGGLE_KITCHEN_PRINTER_SELECT_ALL: {
      const kitchen_printers = state.kitchen_printers.slice().map((item) => {
        return {
          ...item,
          isDeleted: action.response,
        };
      });
      return {
        ...state,
        kitchen_printers,
      };
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
    default:
      return { ...state };
  }
};
export default kitchenPrinterReducer;
