import {
  TOGGLE_DININGS,
  TOGGLE_CATEGORY,
  GET_CATEGORY_ITEMS,
  TOGGLE_CATEGORY_ITEMS,
} from "../../constants/ActionTypes";

const initialState = {
  toggle_dinings: [],
  toggle_category: [],
  toggle_category_items: [],
  category_items: [],
};
const taxesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CATEGORY_ITEMS: {
      return {
        ...state,
        category_items: action.response,
      };
    }

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
            (item) => item.categoryId == action.response.categoryId
          );
          if (checkExist.length == 0) {
            return {
              ...state,
              toggle_category: [...state.toggle_category, action.response],
            };
          } else {
            const data = state.toggle_category.filter(
              (item) => item.categoryId !== action.response.categoryId
            );
            return { ...state, toggle_category: data };
          }
        }
      }
    }

    case TOGGLE_CATEGORY_ITEMS: {
      //  Check Category Items
      let toggle_category_items = [];
      if (state.toggle_category_items.length == 0) {
        toggle_category_items = [action.categoryItems];
        // return { ...state, toggle_category_items: [action.categoryItems] };
      } else {
        const checkExist = state.toggle_category_items.filter(
          (item) => item.itemId == action.categoryItems.itemId
        );
        if (checkExist.length == 0) {
          toggle_category_items = [
            ...state.toggle_category_items,
            action.categoryItems,
          ];
          // return {
          //   ...state,
          //   toggle_category_items: [...state.toggle_category_items, action.categoryItems],
          // };
        } else {
          const data = state.toggle_category_items.filter(
            (item) => item.itemId !== action.categoryItems.itemId
          );
          toggle_category_items = data;
          // return { ...state, toggle_category_items: data };
        }
      }

      //  Check Category
      let toggle_category = [];
      if (state.toggle_category.length == 0) {
        toggle_category = [action.category];
        // return { ...state, toggle_category: [action.category] };
      } else {
        const categoryExist = state.toggle_category.filter(
          (item) => item.categoryId == action.category.categoryId
        );
        if (categoryExist.length == 0) {
          toggle_category = [...state.toggle_category, action.category];
          // return {
          //   ...state,
          //   toggle_category: [...state.toggle_category, action.category],
          // };
        } else {
          const check_category_item_id = toggle_category_items.filter(
            (item) => item.categoryId == action.category.categoryId
          );
          if (check_category_item_id.length == 0) {
            const data = state.toggle_category.filter(
              (item) => item.categoryId !== action.category.categoryId
            );
            toggle_category = data;
            // return { ...state, toggle_category: data };
          } else {
            toggle_category = state.toggle_category;
          }
        }
      }
      if (action.category.length == 0 && action.categoryItems.length == 0) {
        toggle_category = [];
        toggle_category_items = [];
      }
      return {
        ...state,
        toggle_category,
        toggle_category_items,
      };
    }

    default:
      return { ...state };
  }
};
export default taxesReducer;
