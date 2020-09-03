import { TOGGLE_DININGS, TOGGLE_CATEGORY } from "../../constants/ActionTypes";

const initialState = {
  toggle_dinings: [],
  toggle_category:[]
};
const taxesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case TOGGLE_DININGS: {
      if (action.response.length == 0) {
        return { ...state, toggle_dinings: [] };
      } else {
        if (state.toggle_dinings.length == 0) {
          return { ...state, toggle_dinings: [action.response] };
        } else {
          const checkExist = state.toggle_dinings.filter(
            (item) => item.diningId == action.response.diningId
          );
          if (checkExist.length == 0) {
            return {
              ...state,
              toggle_dinings: [...state.toggle_dinings, action.response],
            };
          } else {
            const data = state.toggle_dinings.filter(
              (item) => item.diningId !== action.response.diningId
            );
            return { ...state, toggle_dinings: data };
          }
        }
      }
    }
    case TOGGLE_CATEGORY: {
      if (action.response.length == 0) {
        return { ...state, toggle_category: [] };
      } else {
        if (state.toggle_category.length == 0) {
          return { ...state, toggle_category: [action.response] };
        } else {
          const checkExist = state.toggle_category.filter(
            (item) => item.diningId == action.response.diningId
          );
          if (checkExist.length == 0) {
            return {
              ...state,
              toggle_category: [...state.toggle_category, action.response],
            };
          } else {
            const data = state.toggle_category.filter(
              (item) => item.diningId !== action.response.diningId
            );
            return { ...state, toggle_category: data };
          }
        }
      }
    }

    default:
      return { ...state };
  }
};
export default taxesReducer;
