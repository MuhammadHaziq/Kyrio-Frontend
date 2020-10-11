import {
  GET_DINING_OPTION,
  ADD_NEW_DINING_OPTION,
  REDIRECT_BACK_DINING,
  UPDATE_DINING_OPTION,
  UPDATE_ROW_DATA_DINING_OPTION,
  DELETE_DINING_OPTION,
} from "../../constants/ActionTypes";

const initialState = {
  dining_option_list: [],
  save_dining_option: false,
  redirect_dining: true,
  update_data: {},
  redirect_update: false,
};
const diningOptionReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_DINING: {
      return Object.assign({}, state, {
        redirect_dining: action.response,
        redirect_update: false,
      });
    }

    case GET_DINING_OPTION: {
      return Object.assign({}, state, {
        dining_option_list: action.response,
      });
    }

    case ADD_NEW_DINING_OPTION: {
      return Object.assign({}, state, {
        save_dining_option: !state.save_store,
        dining_option_list: state.dining_option_list.slice().map((item) => {
          const ids = new Set(action.store.map((ite) => ite.storeId));
          if (ids.has(item.storeId)) {
            return Object.assign({}, item, {
              data: [action.response, ...item.data],
            });
          }
          return item;
        }),

        // dining_option_list: [action.response, ...state.dining_option_list],
      });
    }

    case UPDATE_DINING_OPTION: {
      // return Object.assign({}, state, {
      //   dining_option_list: state.dining_option_list.slice().map((item) => {
      //     if (item._id === action.response._id) {
      //       return action.response;
      //     }
      //     return item;
      //   }),
      //   redirect_update: false,
      //   redirect_dining: true,
      // });
      return Object.assign({}, state, {
        dining_option_list: state.dining_option_list.slice().map((item) => {
          if (item.storeId === action.storeId) {
            return Object.assign({}, item, {
              data: item.data.slice().map((ite) => {
                if (ite._id === action.response._id) {
                  console.log(action.storeId);
                  return action.response;
                }
                return ite;
              }),
            });
          }
          return item;
        }),
        redirect_update: false,
        redirect_dining: true,
      });
    }
    case DELETE_DINING_OPTION: {
      return Object.assign({}, state, {
        dining_option_list: state.dining_option_list.map((item) => {
          return {
            ...item,
            data: item.data.filter((ite) => ite._id !== action.response),
          };
        }),
        redirect_update: false,
        redirect_dining: true,
      });

      // return Object.assign({}, state, {
      //   dining_option_list: state.dining_option_list.filter(
      //     (item) => item._id !== action.response
      //   ),
      //   redirect_update: false,
      //   redirect_dining: true,
      // });
    }
    case UPDATE_ROW_DATA_DINING_OPTION: {
      return Object.assign({}, state, {
        update_data: action.response,
        redirect_update: true,
        redirect_dining: false,
      });
    }
    default:
      return { ...state };
  }
};
export default diningOptionReducer;
