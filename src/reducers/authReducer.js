import {
  LOGIN,
  TOGGLE_FEATURE_MODULE,
  GET_FEATURE_MODULE,
  LOGOUT,
  SET_ACCESS_RIGHT_MODULE,
} from "../constants/ActionTypes";

const initialState = {
  user: {},
};
const settingsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.response };

    case TOGGLE_FEATURE_MODULE: {
      const data = action.response;

      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          features: data.features,
          settings: data.settings,
        }),
      });
    }

    case SET_ACCESS_RIGHT_MODULE: {
      const data = action.response;

      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          roleData: data,
        }),
      });
    }
    case GET_FEATURE_MODULE: {
      const data = action.response;

      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          features: data.features,
          settings: data.settings,
        }),
      });
    }

    case LOGOUT: {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
};
export default settingsReducer;
//   case TOGGLE_FEATURE_MODULE: {
//     const data = JSON.parse(action.response);
//     return Object.assign({}, state, {
//       user: Object.assign({}, state.user, {
//         roleData: Object.assign({}, state.user.roleData, {
//           features: state.user.roleData.features.slice().map((item) => {
//             return Object.assign({}, item, {
//               enable:
//                 data.filter((ite) => ite.featureId === item.featureId)
//                   .length > 0
//                   ? data
//                       .filter((ite) => ite.featureId === item.featureId)
//                       .map((ite) => {
//                         return ite.enable;
//                       })[0]
//                   : item.enable,
//             });
//           }),
//           settings: Object.assign({}, state.user.roleData.settings, {
//             settingModules: state.user.roleData.settings.settingModules
//               .slice()
//               .map((item) => {
//                 return Object.assign({}, item, {
//                   enable:
//                     data.filter((ite) => ite.featureId === item.featureId)
//                       .length > 0
//                       ? data
//                           .filter((ite) => ite.featureId === item.featureId)
//                           .map((ite) => {
//                             return ite.enable;
//                           })[0]
//                       : item.enable,
//                 });
//               }),
//           }),
//         }),
//       }),
//     });
//   }
