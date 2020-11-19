import {
  GET_USER_ROLES,
  ADD_NEW_USER_ROLE,
  REDIRECT_BACK_USER_ROLES,
} from "../../constants/ActionTypes";

const initialState = {
  user_roles: [],
  redirect_user_roles: false,
  redirect_update: false,
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

    case GET_USER_ROLES:
      return Object.assign({}, state, {
        user_roles: action.response,
      });

    case ADD_NEW_USER_ROLE:
      return Object.assign({}, state, {
        user_roles: [action.response, ...state.user_roles],
        redirect_user_roles: true,
      });

    default:
      return { ...state };
  }
};
export default userRolesReducer;
