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
  UPDATE_ITEM_ROW_DATA,
  REMOVE_ROW_DATA,
  UPDATE_ITEM_RECORD,
  ITEM_IMPORT_ERRORS,
  REDIRECT_CONFIRM_UPLOAD,
} from "../../constants/ActionTypes";

const initialState = {
  item_list: [],
  stock_list: [],
  store_list: [],
  item_variants: [],
  variants: [],
  redirect_itemList: false,
  redirect_update: false,
  show_item_import_errors: false,
  item_stock_toggle: false,
  item_row_data: {},
  orignal_store_list: [],
  total_modifiers: 0,
  orignal_total_modifiers: 0,
  errors: [],
  confirm_upload: false,
  conifrm_message: "",
  show_import_loading: false,
};
const itemReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_ITEMS: {
      return Object.assign({}, state, {
        redirect_itemList: action.response,
        redirect_update: false,
        show_item_import_errors: false,
        confirm_upload: false,
        conifrm_message: "",
        show_import_loading: false,
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
      let modifiers = 0;
      return Object.assign({}, state, {
        store_list: (action.response || []).map((item) => {
          return { ...item, isSelected: true, price: "" };
        }),
        orignal_store_list: (action.response || []).map((item) => {
          return { ...item, isSelected: true, price: "" };
        }),
        total_modifiers: (action.response || [])
          .map((item) => {
            return (modifiers = modifiers + (item.modifiers || []).length);
          })
          .reduce((a, b) => b + a),
        orignal_total_modifiers: (action.response || [])
          .map((item) => {
            return (modifiers = modifiers + (item.modifiers || []).length);
          })
          .reduce((a, b) => b + a),
      });
    }
    case ITEM_SAVE: {
      return Object.assign({}, state, {
        item_list: [action.response, ...state.item_list],
        item_variants: [],
        store_list: state.store_list.slice().map((item) => {
          return {
            ...item,
            price: "",
            inStock: "",
            lowStock: "",
          };
        }),
        redirect_itemList: true,
      });
    }

    case REDIRECT_CONFIRM_UPLOAD: {
      return {
        ...state,
        confirm_upload: action.response,
        conifrm_message: action.conifrm_message,
        show_import_loading: false,
      };
    }

    case UPDATE_ITEM_RECORD: {
      return Object.assign({}, state, {
        item_list: state.item_list.slice().map((item) => {
          if (item._id === action.id) {
            return action.response;
          }
          return item;
        }),
        item_variants: [],
        store_list: state.store_list.slice().map((item) => {
          return {
            ...item,
            price: "",
            inStock: "",
            lowStock: "",
          };
        }),
        redirect_itemList: true,
        redirect_update: false,
        show_item_import_errors: false,
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
          if (item.id === action.response) {
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
      if (action.id === "") {
        return Object.assign({}, state, {
          store_list: state.store_list.slice().map((item) => {
            return {
              ...item,
              price: action.value,
            };
          }),
        });
      } else {
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
              optionName: item.optionName.filter(
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
      let item_list = state.item_list;
      for (const id of action.response) {
        item_list = item_list.filter((item) => item._id !== id);
      }
      return {
        ...state,
        item_list,
        item_row_data: {},
        item_variants: [],
        redirect_itemList: true,
        redirect_update: false,
        show_item_import_errors: false,
      };
      // return Object.assign({}, state, {
      //   item_list: state.item_list.filter((item) => {
      //     return item.isDeleted !== true;
      //   }),
      //   item_row_data: {},
      //   item_variants: [],
      //   redirect_itemList: true,
      //   redirect_update: false,
      // });
    }

    case UPDATE_ITEM_ROW_DATA: {
      let filterStore = [];
      const storeList = state.store_list.slice().map((item) => {
        filterStore = action.response.stores.filter(
          (ite) => ite.id === item.id
        )[0];
        if (
          filterStore !== undefined &&
          filterStore !== null &&
          Object.keys(filterStore).length > 0
        ) {
          if (item.id === filterStore.id) {
            return { ...filterStore, isSelected: true };
          }
          return { ...item, isSelected: false };
        }
        return { ...item, isSelected: false };
      });
      return Object.assign({}, state, {
        item_row_data: action.response,
        item_variants:
          action.response.varients !== null &&
          action.response.varients !== undefined
            ? action.response.varients
            : [],
        store_list: storeList,
        redirect_itemList: false,
        redirect_update: true,
      });
    }
    case ITEM_IMPORT_ERRORS: {
      return {
        ...state,
        errors: action.response,
        show_item_import_errors: action.status,
        confirm_upload: false,
        conifrm_message: "",
        show_import_loading:action.import_loading
      };
    }
    case REMOVE_ROW_DATA: {
      return Object.assign({}, state, {
        item_row_data: {},
        item_variants: [],
        store_list: state.orignal_store_list,
        total_modifiers: state.orignal_total_modifiers,
        redirect_itemList: true,
        redirect_update: false,
        errors: [],
        show_item_import_errors: false,
        show_import_loading: false,
      });
    }
    default:
      return { ...state };
  }
};
export default itemReducer;
