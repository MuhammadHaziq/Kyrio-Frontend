import { GET_POS_DEVICES, ADD_NEW_POS_DEVICE } from "../../constants/ActionTypes";

const initialState = {
  pos_device_list:[],
  save_pos_device:false
};
const posDeviceReducecr = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_POS_DEVICES: {
      return { ...state, pos_device_list: action.response };
    }

    case ADD_NEW_POS_DEVICE: {
      return {
        ...state,
        save_pos_device:!state.save_store,
        pos_device_list:[action.response, ...state.pos_device_list]
      }
    }
    default:
      return { ...state };
  }
};
export default posDeviceReducecr;
