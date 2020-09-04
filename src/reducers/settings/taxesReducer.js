import {
  GET_CATEGORY_ITEMS,
  GET_CATEGORY_TAX,
  GET_DINING_TAX,
  DINING_SELECT_STATUS,
  CATEGORY_SELECT_STATUS,
  CATEGORY_ITEMS_SELECT_STATUS,
  GET_TAXES_TYPE,
  GET_TAXES_OPTION,
} from "../../constants/ActionTypes";

const initialState = {
  tax_category_list: [],
  tax_dining_list: [],
  category_items: [],
  tax_types: [],
  tax_options: [],
};
const taxesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_TAXES_TYPE: {
      return {
        ...state,
        tax_types: action.response,
      };
    }
    case GET_TAXES_OPTION: {
      return {
        ...state,
        tax_options: action.response,
      };
    }

    case GET_DINING_TAX: {
      return { ...state, tax_dining_list: action.response };
    }

    case GET_CATEGORY_TAX: {
      return { ...state, tax_category_list: action.response };
    }

    case GET_CATEGORY_ITEMS: {
      return {
        ...state,
        category_items: action.response,
      };
    }

    case DINING_SELECT_STATUS: {
      let tax_dining_list = [];
      tax_dining_list = state.tax_dining_list.slice().map((item) => {
        if (item._id == action.response.diningId) {
          console.log("diningItem", item);
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
      if (action.response.length == 0) {
        tax_dining_list = state.tax_dining_list.slice().map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
      }
      return {
        ...state,
        tax_dining_list,
      };
    }

    case CATEGORY_SELECT_STATUS: {
      let tax_category_list = [];
      tax_category_list = state.tax_category_list.slice().map((item) => {
        if (item._id == action.response.categoryId) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
      if (action.response.length == 0) {
        tax_category_list = state.tax_category_list.slice().map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
      }
      return {
        ...state,
        tax_category_list,
      };
    }

    case CATEGORY_ITEMS_SELECT_STATUS: {
      let category_items = [];
      let tax_category_list = [];
      category_items = state.category_items.slice().map((item) => {
        if (item._id == action.categoryItems.itemId) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
      const check_category_item_id = category_items.filter(
        (item) =>
          item.category.categoryId == action.category.categoryId &&
          item.isSelected == true
      );
      tax_category_list = state.tax_category_list.slice().map((item) => {
        if (item._id == action.category.categoryId) {
          return {
            ...item,
            isSelected: check_category_item_id.length == 0 ? false : true,
          };
        }
        return item;
      });
      if (action.categoryItems.length == 0 && action.category.length == 0) {
        console.log("action", action);
        category_items = state.category_items.slice().map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
        tax_category_list = state.tax_category_list.slice().map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
      }
      return {
        ...state,
        category_items,
        tax_category_list,
      };
    }

    default:
      return { ...state };
  }
};
export default taxesReducer;
