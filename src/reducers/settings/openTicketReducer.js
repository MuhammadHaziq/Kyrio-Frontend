import {
  GET_STORE_OPEN_TICKET,
  UPDATE_STORE_OPEN_TICKET,
} from "../../constants/ActionTypes";

const initialState = {
  store_ticket: [],
};
const openTicketReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_STORE_OPEN_TICKET: {
      return Object.assign({}, state, {
        store_ticket: action.response,
      });
    }
    case UPDATE_STORE_OPEN_TICKET: {
      return Object.assign({}, state, {
        store_ticket: {
          ...state.store_ticket,
          items: state.store_ticket.items.filter((item) => {
            return item.id !== action.response.selectItemId;
          }),
        },
      });
    }
    default:
      return { ...state };
  }
};
export default openTicketReducer;
