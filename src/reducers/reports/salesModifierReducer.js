import {
  GET_MODIFIER_SALES_SUMMARY,
  TOGGLE_MODIFIER_SALE_SUMMARY_SINGLE_SELECT,
  TOGGLE_MODIFIER_SALE_SUMMARY_ALL_SELECT,
  DELETE_MODIFIER_SALES_SUMMARY,
  SET_LOADING,
} from "../../constants/ActionTypes";

const initialState = {
  sale_modifier_summary: [],
  redirect_update: false,
  redirect_sale_modifier_summary: true,
  loading: true,
};
const salesModifierReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, {
        loading: action.response,
      });
    }

    case GET_MODIFIER_SALES_SUMMARY: {
      return Object.assign({}, state, {
        sale_modifier_summary: action.response,
        loading: false,
      });
    }

    case TOGGLE_MODIFIER_SALE_SUMMARY_SINGLE_SELECT: {
      return Object.assign({}, state, {
        sale_modifier_summary: state.sale_modifier_summary.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_MODIFIER_SALE_SUMMARY_ALL_SELECT: {
      return Object.assign({}, state, {
        sale_modifier_summary: state.sale_modifier_summary.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_MODIFIER_SALES_SUMMARY: {
      let sale_modifier_summary = state.sale_modifier_summary;
      for (const id of action.response) {
        sale_modifier_summary = sale_modifier_summary.filter(
          (item) => item._id !== id
        );
      }
      return {
        ...state,
        sale_modifier_summary,
        redirect_update: false,
        redirect_sale_modifier_summary: true,
      };
    }

    default:
      return { ...state };
  }
};
export default salesModifierReducer;
