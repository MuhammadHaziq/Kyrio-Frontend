import {
  REDIRECT_BACK_ITEMS,
  GET_ITEM_LIST,
  GET_ITEM_STOCK,
  GET_ITEM_STORES,
  ITEM_SAVE,
  TOGGLE_ITEM_DELETE_SELECT,
  TOGGLE_ALL_ITEM_DELETE_SELECT,
  DELETE_ITEM_LIST,
  TOGGLE_SELECT_ALL_ITEM_STORES,
  TOGGLE_SELECT_SINGLE_ITEM_STORES,
  SET_ITEM_STORE_PRICE,
  SAVE_ITEM_VARIANTS,
  UPDATE_VARIANT_PRICE,
  UPDATE_VARIANT_COST,
  UPDATE_VARIANT_SKU,
  UPDATE_VARIANT_BARCODE,
  DELETE_ITEM_VARIANTS_OPTION,
  DELETE_ITEM_VARIANTS,
  TOGGLE_ITEM_STOCK,
  SET_ITEM_STORE_IN_STOCK,
  SET_ITEM_STORE_LOW_STOCK,
} from "../../constants/ActionTypes";

const initialState = {
  item_list: [],
  stock_list: [],
  store_list: [],
  item_variants: [],
  variants: [],
  redirect_itemList: false,
  redirect_update: false,
  item_stock_toggle: false,
};
const itemReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_ITEMS: {
      return Object.assign({}, state, {
        redirect_itemList: action.response,
        redirect_update: false,
      });
    }

    case GET_ITEM_LIST: {
      return Object.assign({}, state, {
        item_list: action.response,
      });
    }
    case GET_ITEM_STOCK: {
      return Object.assign({}, state, {
        stock_list: action.response,
      });
    }
    case GET_ITEM_STORES: {
      return Object.assign({}, state, {
        store_list: (action.response || []).map((item) => {
          return { ...item, isSelected: true, price: "" };
        }),
      });
    }
    case ITEM_SAVE: {
      return Object.assign({}, state, {
        item_list: [action.response, ...state.item_list],
        redirect_itemList: true,
      });
    }
    case TOGGLE_SELECT_ALL_ITEM_STORES: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          return {
            ...item,
            isSelected: action.response,
          };
        }),
      });
    }
    case TOGGLE_SELECT_SINGLE_ITEM_STORES: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          if (item._id === action.response) {
            return {
              ...item,
              isSelected: !item.isSelected,
            };
          }
          return item;
        }),
      });
    }

    case TOGGLE_ITEM_STOCK: {
      return Object.assign({}, state, {
        item_stock_toggle: action.response,
      });
    }
    case SET_ITEM_STORE_PRICE: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              price: action.value,
            };
          }
          return item;
        }),
      });
    }
    case SET_ITEM_STORE_IN_STOCK: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              inStock: action.value,
            };
          }
          return item;
        }),
      });
    }
    case SET_ITEM_STORE_LOW_STOCK: {
      return Object.assign({}, state, {
        store_list: state.store_list.slice().map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              lowStock: action.value,
            };
          }
          return item;
        }),
      });
    }
    case SAVE_ITEM_VARIANTS: {
      let variants = [];

      // action.response.map((item) => {
      //   item.optionValue.map((ite) => {
      //     return variants.push({
      //       title: ite,
      //       price: item.price,
      //       cost: item.cost,
      //       sku: item.sku,
      //       barcode: item.barcode,
      //       optionName: item.optionName,
      //     });
      //   });
      // });
      return Object.assign({}, state, {
        item_variants: action.response,
      });
    }

    case DELETE_ITEM_VARIANTS_OPTION: {
      return Object.assign({}, state, {
        item_variants: state.item_variants.filter(
          (item, index) => index !== action.idx
        ),
      });
    }
    case DELETE_ITEM_VARIANTS: {
      return Object.assign({}, state, {
        item_variants: state.item_variants.slice().map((item, index) => {
          if (item._id === action.response.id) {
            return {
              ...item,
              optionNames: item.optionNames.filter(
                (item, index) => index !== action.response.vairantIndex
              ),
              optionValue: item.optionValue.filter(
                (ite, indx) => indx !== action.response.variantIndex
              ),
            };
          }
          return item;
        }),
      });
    }

    case UPDATE_VARIANT_PRICE: {
      return Object.assign({}, state, {
        item_variants: state.item_variants.slice().map((item, index) => {
          if (item._id === action.optionId) {
            return {
              ...item,

              optionValue: item.optionValue.map((ite, index) => {
                if (index === action.index) {
                  return {
                    ...ite,
                    price: action.value,
                  };
                }
                return ite;
              }),
            };
          }
          return item;
        }),
      });
    }
    case UPDATE_VARIANT_COST: {
      return Object.assign({}, state, {
        item_variants: state.item_variants.slice().map((item, index) => {
          if (item._id === action.optionId) {
            return {
              ...item,
              optionValue: item.optionValue.map((ite, index) => {
                if (index === action.index) {
                  return {
                    ...ite,
                    cost: action.value,
                  };
                }
                return ite;
              }),
            };
          }
          return item;
        }),
      });
      // return Object.assign({}, state, {
      //   variants: state.variants.slice().map((item, index) => {
      //     if (index === action.index) {
      //       return {
      //         ...item,
      //         cost: action.value,
      //       };
      //     }
      //     return item;
      //   }),
      // });
    }
    case UPDATE_VARIANT_SKU: {
      return Object.assign({}, state, {
        item_variants: state.item_variants.slice().map((item, index) => {
          if (item._id === action.optionId) {
            return {
              ...item,
              optionValue: item.optionValue.map((ite, index) => {
                if (index === action.index) {
                  return {
                    ...ite,
                    sku: action.value,
                  };
                }
                return ite;
              }),
            };
          }
          return item;
        }),
      });
    }
    case UPDATE_VARIANT_BARCODE: {
      return Object.assign({}, state, {
        item_variants: state.item_variants.slice().map((item, index) => {
          if (item._id === action.optionId) {
            return {
              ...item,
              optionValue: item.optionValue.map((ite, index) => {
                if (index === action.index) {
                  return {
                    ...ite,
                    barcode: action.value,
                  };
                }
                return ite;
              }),
            };
          }
          return item;
        }),
      });
    }
    case TOGGLE_ITEM_DELETE_SELECT: {
      return Object.assign({}, state, {
        item_list: state.item_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }
    case TOGGLE_ALL_ITEM_DELETE_SELECT: {
      return Object.assign({}, state, {
        item_list: state.item_list.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }
    case DELETE_ITEM_LIST: {
      return Object.assign({}, state, {
        item_list: state.item_list.filter((item) => {
          return item.isDeleted !== true;
        }),
      });
    }

    default:
      return { ...state };
  }
};
export default itemReducer;
