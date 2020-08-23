import { ASIDE, SIDEBAR, DARK } from "../constants/ActionTypes";

const initialState = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: true
};
const settingsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ASIDE:
      return { ...state, asideShow: action.response };
    case SIDEBAR:
      return { ...state, sidebarShow: action.response };
    case DARK:
      return { ...state, darkMode: action.response };
    default:
      return state;
  }
};
export default settingsReducer;
