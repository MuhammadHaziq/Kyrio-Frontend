import {
  GET_POS_DEVICES,
  ADD_NEW_POS_DEVICE,
  DELETE_POS_DEVICES,
  TOGGLE_POS_SINGLE_SELECT,
  TOGGLE_POS_ALL_SELECT,
  REDIRECT_BACK_POS_DEVICES,
} from "../../constants/ActionTypes";

const initialState = {
  pos_device_list: [],
  redirect_pos_devices: true,
};
const posDeviceReducecr = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_POS_DEVICES: {
      return Object.assign({}, state, {
        redirect_pos_devices: action.response,
      });
    }

    case GET_POS_DEVICES: {
      return Object.assign({}, state, {
        pos_device_list: action.response,
      });
    }

    case ADD_NEW_POS_DEVICE: {
      return Object.assign({}, state, {
        pos_device_list: [action.response, ...state.pos_device_list],
      });
    }

    case TOGGLE_POS_SINGLE_SELECT: {
      return Object.assign({}, state, {
        pos_device_list: state.pos_device_list.map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              isDeleted: !item.isDeleted,
            });
          }
          return item;
        }),
      });
      // const pos_device_list = state.pos_device_list.slice().map((item) => {
      //   if (item._id == action.response._id) {
      //     return {
      //       ...item,
      //       isDeleted: !item.isDeleted,
      //     };
      //   }
      //   return item;
      // });
      // return {
      //   ...state,
      //   pos_device_list,
      // };
    }

    case TOGGLE_POS_ALL_SELECT: {
      return Object.assign({}, state, {
        pos_device_list: state.pos_device_list.map((item) => {
          return Object.assign({}, item, {
            isDeleted: action.response,
          });
        }),
      });
    }

    case DELETE_POS_DEVICES: {
      let pos_device_list = state.pos_device_list;
      for (const id of JSON.parse(action.response)) {
        pos_device_list = pos_device_list.filter((item) => item._id !== id);
      }
      return {
        ...state,
        pos_device_list,
      };
    }
    default:
      return { ...state };
  }
};
export default posDeviceReducecr;
