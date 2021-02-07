import {
  GET_USER_ROLES,
  GET_ROLES_MODULES,
  ADD_NEW_USER_ROLE,
  TOGGLE_BACK_OFFICE_ENABLE,
  TOGGLE_POS_ENABLE,
  TOGGLE_BACK_OFFICE,
  REDIRECT_BACK_USER_ROLES,
  TOGGLE_BACK_OFFICE_MODULE,
  TOGGLE_POS_MODULE,
  UPDATE_USER_ROLE,
  GET_UPDATE_USER_ROLE,
  REMOVE_SELECTED_MODULES,
} from "../../constants/ActionTypes";

const initialState = {
  user_roles: [],
  redirect_user_roles: false,
  redirect_update: false,
  user_role_row_data: {},
  backOfficeModules: [],
  copyBackOfficeModules: [],
  posModules: [],
  copyPosModules: [],
  user_role_row_data: {},
};
const userRolesReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case REDIRECT_BACK_USER_ROLES: {
      return Object.assign({}, state, {
        redirect_user_roles: action.response,
        redirect_update: false,
      });
    }
    case GET_ROLES_MODULES: {
      return {
        ...state,
        backOfficeModules: action.backofficeModules,
        posModules: action.posModules,
        copyBackOfficeModules: action.backofficeModules,
        copyPosModules: action.posModules,
      };
    }
    case GET_USER_ROLES:
      return Object.assign({}, state, {
        user_roles: action.response,
      });

    case ADD_NEW_USER_ROLE:
      return Object.assign({}, state, {
        user_roles: [action.response, ...state.user_roles],
        redirect_user_roles: true,
        backOfficeModules: state.copyBackOfficeModules,
        posModules: state.copyPosModules,
      });

    case UPDATE_USER_ROLE: {
      const user_roles = state.user_roles.slice().map((item) => {
        if (item.role_id == action.response.role_id) {
          return action.response;
        }
        return item;
      });
      return {
        user_roles: user_roles,
        redirect_user_roles: true,
        redirect_update: false,
      };
    }
    case TOGGLE_BACK_OFFICE_ENABLE: {
      const backOfficeModules = state.backOfficeModules.slice().map((item) => {
        return {
          ...item,
          enable: action.status,
        };
      });
      return {
        ...state,
        backOfficeModules,
      };
    }
    case TOGGLE_POS_ENABLE: {
      const posModules = state.posModules.slice().map((item) => {
        return {
          ...item,
          enable: action.status,
        };
      });
      return {
        ...state,
        posModules,
      };
    }

    case TOGGLE_BACK_OFFICE_MODULE: {
      const backOfficeModules = state.backOfficeModules
        .slice()
        .map((item, index) => {
          return {
            ...item,
            modules: item.modules.map((backOff, backIndex) => {
              if (backOff.moduleId == action.id) {
                return {
                  ...backOff,
                  enable: !backOff.enable,
                };
              }
              return backOff;
            }),
          };
        });
      return {
        ...state,
        backOfficeModules,
      };
    }
    case TOGGLE_POS_MODULE: {
      const posModules = state.posModules.slice().map((item, index) => {
        return {
          ...item,
          modules: item.modules.map((pos, backIndex) => {
            if (pos.moduleId == action.id) {
              return {
                ...pos,
                enable: !pos.enable,
              };
            }
            return pos;
          }),
        };
      });
      return {
        ...state,
        posModules,
      };
    }
    case GET_UPDATE_USER_ROLE: {
      return {
        ...state,
        user_role_row_data: action.response,
        redirect_user_roles: false,
        redirect_update: true,
      };
    }
    case REMOVE_SELECTED_MODULES: {
      return {
        ...state,
        backOfficeModules: state.copyBackOfficeModules,
        posModules: state.copyPosModules,
      };
    }
    default:
      return { ...state };
  }
};
export default userRolesReducer;
