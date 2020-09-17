import { GET_SETTING_FEATURES, UPDATE_SETTING_FEATURES } from "../../constants/ActionTypes";

const initialState = {
  setting_features: [],
};
const featuresReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_SETTING_FEATURES: {
      return Object.assign({}, state, {
        setting_features: action.response,
      });
    }

    // case UPDATE_SETTING_FEATURES: {
    //   return Object.assign({}, state, {
    //     loyalty_amount: action.response,
    //   });
    // }
    default:
      return { ...state };
  }
};
export default featuresReducer;
