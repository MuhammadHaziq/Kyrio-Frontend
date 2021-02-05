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
} from "../../constants/ActionTypes";

const initialState = {
  user_roles: [],
  redirect_user_roles: false,
  redirect_update: false,
  user_role_row_data: {},
  backOfficeModules: [],
  posModules: [],
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
      });
    case TOGGLE_BACK_OFFICE_ENABLE: {
      const backOfficeModules = state.backOfficeModules.slice().map((item) => {
        return {
          ...item,
          enable: !item.enable,
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
          enable: !item.enable,
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
              if (backOff._id == action.id) {
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
            if (pos._id == action.id) {
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

    default:
      return { ...state };
  }
};
export default userRolesReducer;
