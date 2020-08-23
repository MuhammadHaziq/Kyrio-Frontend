import { MESSAGE } from "../constants/ActionTypes";

const initialState = {
  open: false,
  position: "top-center",
  message: "",
  object: {},
  error: false,
};
const settingsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case MESSAGE:
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
};
export default settingsReducer;
