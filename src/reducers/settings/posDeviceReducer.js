import {
  GET_POS_DEVICES,
  ADD_NEW_POS_DEVICE,
  DELETE_POS_DEVICES,
  TOGGLE_POS_SINGLE_SELECT,
  TOGGLE_POS_ALL_SELECT,
  REDIRECT_BACK_POS_DEVICES,
  SELECT_ROW_DATA_UPDATE,
  UPDATE_POS_DEVICE,
  UPDATE_POS_DEIVCES_REDIRECT_STATES,
} from "../../constants/ActionTypes";

const initialState = {
  pos_device_list: [],
  redirect_pos_devices: true,
  pos_device_row: {},
  redirect_pos_device_update: false,
};
const posDeviceReducecr = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_POS_DEVICES: {
      return Object.assign({}, state, {
        redirect_pos_devices: action.response,
        redirect_pos_device_update: false,
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

    case UPDATE_POS_DEVICE: {
      return Object.assign({}, state, {
        pos_device_list: state.pos_device_list.slice().map((item) => {
          if (item._id === action.response._id) {
            return Object.assign({}, item, {
              title: action.response.title,
              // store: JSON.parse`(action.response.store),
            });
          }
          return item;
        }),
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
    case SELECT_ROW_DATA_UPDATE: {
      return Object.assign({}, state, {
        pos_device_row: action.response,
        redirect_pos_device_update: true,
        redirect_pos_devices: false,
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
    case UPDATE_POS_DEIVCES_REDIRECT_STATES: {
      return Object.assign({}, state, {
        redirect_pos_device_update: false,
        redirect_pos_devices: true,
      });
    }
    default:
      return { ...state };
  }
};
export default posDeviceReducecr;
