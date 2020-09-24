import { GET_STORE_OPEN_TICKET } from "../../constants/ActionTypes";

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
    default:
      return { ...state };
  }
};
export default openTicketReducer;
