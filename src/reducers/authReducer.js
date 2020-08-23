import { LOGIN } from "../constants/ActionTypes";

const initialState = {
  user: {},
};
const settingsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.response };
    default:
      return state;
  }
};
export default settingsReducer;
