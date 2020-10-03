import {
  GET_CATEGORY_ITEMS,
  GET_CATEGORY_TAX,
  GET_DINING_TAX,
  DINING_SELECT_STATUS,
  CATEGORY_SELECT_STATUS,
  CATEGORY_ITEMS_SELECT_STATUS,
  GET_TAXES_TYPE,
  GET_TAXES_OPTION,
  GET_ITEM_TAXES,
  TOGGLE_TAXES_SELECT_SINGLE,
  TOGGLE_TAXES_SELECT_ALL,
  INSERT_NEW_TAX,
  DELETE_ITEM_TAXES,
  REDIRECT_BACK_TAXES,
  UPDATE_ROW_DATA_TAX,
  UPDATE_TAX,
  REMOVE_UPDATE_ROW_DATA
} from "../../constants/ActionTypes";

const initialState = {
  tax_category_list: [],
  tax_dining_list: [],
  category_items: [],
  tax_types: [],
  tax_options: [],
  item_taxes: [],
  redirect_taxes: true,
  update_redirect: false,
  tax_row_data: {},
};
const taxesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_TAXES: {
      return Object.assign({}, state, {
        redirect_taxes: action.response,
        update_redirect: false,
      });
    }

    case GET_ITEM_TAXES: {
      return Object.assign({}, state, {
        item_taxes: action.response,
      });
    }

    case INSERT_NEW_TAX: {
      return Object.assign({}, state, {
        item_taxes: [action.response, ...state.item_taxes],
        tax_dining_list: state.tax_dining_list.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
        tax_category_list: state.tax_category_list.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
        tax_category_list: state.tax_category_list.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
        category_items: state.category_items.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
      });
    }

    case DELETE_ITEM_TAXES: {
      let item_taxes = state.item_taxes;
      for (const id of JSON.parse(action.response)) {
        item_taxes = item_taxes.filter((item) => item._id !== id);
      }
      return {
        ...state,
        item_taxes,
      };
    }
    case GET_TAXES_TYPE: {
      return Object.assign({}, state, {
        tax_types: action.response,
      });
    }

    case GET_TAXES_OPTION: {
      return Object.assign({}, state, {
        tax_options: action.response,
      });
    }

    case GET_DINING_TAX: {
      return Object.assign({}, state, {
        tax_dining_list: action.response.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
      });
    }

    case GET_CATEGORY_TAX: {
      return Object.assign({}, state, {
        tax_category_list: action.response,
      });
    }

    case TOGGLE_TAXES_SELECT_SINGLE: {
      return Object.assign({}, state, {
        item_taxes: state.item_taxes.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
    }

    case TOGGLE_TAXES_SELECT_ALL: {
      return Object.assign({}, state, {
        item_taxes: state.item_taxes.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case GET_CATEGORY_ITEMS: {
      return Object.assign({}, state, {
        category_items: action.response,
      });
    }

    case DINING_SELECT_STATUS: {
      return Object.assign({}, state, {
        tax_dining_list: state.tax_dining_list.map((item) => {
          console.log('tate.tax_dining_list', item)
          if (action.response.length !== 0) {
            /**
            *This code use when user update the taxes
            *
            */
            if(Array.isArray(action.response) == true){
                const ids = new Set(action.response.map(ite=>ite.diningId))
                  if(ids.has(item._id )) {
                    return Object.assign({}, item, {
                      isSelected: !item.isSelected,
                    });
                  }
                  return item
                  /**
                  *End This code use when user update the taxes
                  *
                  */
            }else {
              if (item._id === action.response.diningId) {
              return Object.assign({}, item, {
                isSelected: !item.isSelected,
              });
            }
              return item;
          }
            // if (item._id === action.response.diningId) {
            //   return Object.assign({}, item, {
            //     isSelected: !item.isSelected,
            //   });
            // }
            // return item;
          } else {
            return Object.assign({}, item, {
              isSelected: false,
            });
          }
        }),
      });
    }

    case CATEGORY_SELECT_STATUS: {
      let status = false
      return Object.assign({}, state, {
        tax_category_list: state.tax_category_list.map((item) => {
          if (action.response.length !== 0) {
            /*
            *  Use For Update Screen
            **/
            if(Array.isArray(action.response)  === true) {
              const ids = new Set(action.response.map(ite=>ite.categoryId))
                if(ids.has(item._id )) {
                  return Object.assign({}, item, {
                    isSelected: !item.isSelected,
                  });
                }
                return item
                /**
                *End This code use when user update the Categoires
                */
            }else {
              if (item._id === action.response.categoryId) {
                status = !item.isSelected
                return Object.assign({}, item, {
                  isSelected: !item.isSelected,
                });
              }
              return item;
            }

          } else {
            return Object.assign({}, item, {
              isSelected: false,
            });
          }
        }),
        category_items:state.category_items.map(item=> {
          if (action.response.length !== 0) {
            /*
            *  Use For Update Screen
            **/
            if(Array.isArray(action.response) === true) {
              // const ids= action.response.map(item=> {return item.itemId  || []})
              const ids= new Set(state.tax_row_data.items || []).map(item=> {return item.itemId})
              if(ids.has(item._id )) {
                return Object.assign({}, item, {
                  isSelected: !item.isSelected,
                });
              }
              return item
              /**
              *End This code use when user update the Categoires
              */
            }else {
              if(item.category !== undefined && item.category !== null){
                if (item.category.id === action.response.categoryId) {
                  return Object.assign({}, item, {
                    isSelected: status,
                  });
                  // isSelected: !item.isSelected,
                }
                return item;
              }
  return item;
            }

          } else {
            return Object.assign({}, item, {
              isSelected: false,
            });
          }
        })
      });
    }

    case CATEGORY_ITEMS_SELECT_STATUS: {
      let category_items = [];
      let tax_category_list = [];
      category_items = state.category_items.slice().map((item) => {
        if (item._id === action.categoryItems.itemId) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
      const check_category_item_id = category_items.filter(
        (item) =>
          item.category !== undefined && item.category !== null && item.category.id === action.category.categoryId &&
          item.isSelected === true
      );
      tax_category_list = state.tax_category_list.slice().map((item) => {
        if (item._id === action.category.categoryId) {
          return {
            ...item,
            isSelected: check_category_item_id.length === 0 ? false : true,
          };
        }
        return item;
      });
      if (action.categoryItems.length === 0 && action.category.length === 0) {
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

    case UPDATE_ROW_DATA_TAX: {
      return Object.assign({}, state, {
        tax_row_data: action.response,
        update_redirect: true,
        redirect_taxes: false,
      });
    }
    case REMOVE_UPDATE_ROW_DATA: {
      return Object.assign({}, state, {
        tax_row_data:{},
        tax_dining_list: state.tax_dining_list.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
        tax_category_list: state.tax_category_list.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
        tax_category_list: state.tax_category_list.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
        category_items: state.category_items.map((item) => {
          return Object.assign({}, item, {
            isSelected: false,
          });
        }),
      })
    }
    default:
      return { ...state };
  }
};
export default taxesReducer;
