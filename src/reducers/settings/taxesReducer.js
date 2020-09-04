import {
  TOGGLE_DININGS,
  TOGGLE_CATEGORY,
  GET_CATEGORY_ITEMS,
  TOGGLE_CATEGORY_ITEMS,
  GET_CATEGORY_TAX,
  GET_DINING_TAX,
  DINING_SELECT_STATUS,
  CATEGORY_SELECT_STATUS,
  CATEGORY_ITEMS_SELECT_STATUS,
} from "../../constants/ActionTypes";

const initialState = {
  tax_category_list: [],
  tax_dining_list: [],
  toggle_dinings: [],
  toggle_category: [],
  toggle_category_items: [],
  category_items: [],
};
const taxesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
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
      let tax_dining_list = []
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
      if(action.response.length == 0) {
        tax_dining_list = state.tax_dining_list.slice().map((item) => {
            return {
              ...item,
              isSelected: false,
            };
          })
      }
      return {
        ...state,
        tax_dining_list,
      };
    }

    case CATEGORY_SELECT_STATUS: {
        let tax_category_list = []
       tax_category_list = state.tax_category_list.slice().map((item) => {
        if (item._id == action.response.categoryId) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
      if(action.response.length == 0) {
        tax_category_list = state.tax_category_list.slice().map((item) => {
            return {
              ...item,
              isSelected: false,
            };
          })
      }
      return {
        ...state,
        tax_category_list,
      };
    }

    case CATEGORY_ITEMS_SELECT_STATUS: {
      let category_items = []
            let tax_category_list = []
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
         tax_category_list = state.tax_category_list
          .slice()
          .map((item) => {
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
// case TOGGLE_DININGS: {
//   if (action.response.length == 0) {
//     return { ...state, toggle_dinings: [] };
//   } else {
//     if (state.toggle_dinings.length == 0) {
//       return { ...state, toggle_dinings: [action.response] };
//     } else {
//       const checkExist = state.toggle_dinings.filter(
//         (item) => item.diningId == action.response.diningId
//       );
//       if (checkExist.length == 0) {
//         return {
//           ...state,
//           toggle_dinings: [...state.toggle_dinings, action.response],
//         };
//       } else {
//         const data = state.toggle_dinings.filter(
//           (item) => item.diningId !== action.response.diningId
//         );
//         return { ...state, toggle_dinings: data };
//       }
//     }
//   }
// }

// case TOGGLE_CATEGORY_ITEMS: {
//   //  Check Category Items
//   let toggle_category_items = [];
//   if (state.toggle_category_items.length == 0) {
//     toggle_category_items = [action.categoryItems];
//     // return { ...state, toggle_category_items: [action.categoryItems] };
//   } else {
//     const checkExist = state.toggle_category_items.filter(
//       (item) => item.itemId == action.categoryItems.itemId
//     );
//     if (checkExist.length == 0) {
//       toggle_category_items = [
//         ...state.toggle_category_items,
//         action.categoryItems,
//       ];
//       // return {
//       //   ...state,
//       //   toggle_category_items: [...state.toggle_category_items, action.categoryItems],
//       // };
//     } else {
//       const data = state.toggle_category_items.filter(
//         (item) => item.itemId !== action.categoryItems.itemId
//       );
//       toggle_category_items = data;
//       // return { ...state, toggle_category_items: data };
//     }
//   }
//
//   //  Check Category
//   let toggle_category = [];
//   if (state.toggle_category.length == 0) {
//     toggle_category = [action.category];
//     // return { ...state, toggle_category: [action.category] };
//   } else {
//     const categoryExist = state.toggle_category.filter(
//       (item) => item.categoryId == action.category.categoryId
//     );
//     if (categoryExist.length == 0) {
//       toggle_category = [...state.toggle_category, action.category];
//       // return {
//       //   ...state,
//       //   toggle_category: [...state.toggle_category, action.category],
//       // };
//     } else {
//       const check_category_item_id = toggle_category_items.filter(
//         (item) => item.categoryId == action.category.categoryId
//       );
//       if (check_category_item_id.length == 0) {
//         const data = state.toggle_category.filter(
//           (item) => item.categoryId !== action.category.categoryId
//         );
//         toggle_category = data;
//         // return { ...state, toggle_category: data };
//       } else {
//         toggle_category = state.toggle_category;
//       }
//     }
//   }
//   if (action.category.length == 0 && action.categoryItems.length == 0) {
//     toggle_category = [];
//     toggle_category_items = [];
//   }
//   const category_items = state.category_items.slice().map((item) => {
//     if (item._id == action.categoryItems.itemId) {
//       return {
//         ...item,
//         isSetected: item.isSelected ? false : true,
//       };
//     }
//     return item;
//   });
//   return {
//     ...state,
//     toggle_category,
//     toggle_category_items,
//     category_items,
//   };
// }

// case TOGGLE_CATEGORY: {
//   if (action.response.length == 0) {
//     return { ...state, toggle_category: [] };
//   } else {
//     if (state.toggle_category.length == 0) {
//       return { ...state, toggle_category: [action.response] };
//     } else {
//       const checkExist = state.toggle_category.filter(
//         (item) => item.categoryId == action.response.categoryId
//       );
//       if (checkExist.length == 0) {
//         return {
//           ...state,
//           toggle_category: [...state.toggle_category, action.response],
//         };
//       } else {
//         const data = state.toggle_category.filter(
//           (item) => item.categoryId !== action.response.categoryId
//         );
//         return { ...state, toggle_category: data };
//       }
//     }
//   }
// }
