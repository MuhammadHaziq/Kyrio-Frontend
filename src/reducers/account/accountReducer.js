import {
  GET_ACCOUNT,
  CHECK_PASSWORD,
  CHANGE_CHECK_PASSWORD,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  UPDATE_ACCOUNT,
  CHANGE_UPDATE_CHECK
} from "../../constants/ActionTypes";

const initialState = {
  account_detail: {},
  password_correct: "",
  updated: null
};
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT: {
      return Object.assign({}, state, {
        account_detail: action.response,
      });
    }

    case CHECK_PASSWORD: {
      return Object.assign({}, state, {
        password_correct: action.response,
      });
    }

    case CHANGE_CHECK_PASSWORD: {
      return Object.assign({}, state, {
        password_correct: "",
      });
    }

    case CHANGE_EMAIL: {
      return Object.assign({}, state, {
        account_detail: {
            ...state.account_detail,
            email: action.response
        },
        updated: true
      });
    }
    case CHANGE_PASSWORD: {
      return Object.assign({}, state, {
        updated: true
      });
    }
    case UPDATE_ACCOUNT: {
      return Object.assign({}, state, {
        account_detail: {
            ...state.account_detail,
            businessName: action.response.businessName,
            timezone: action.response.timezone,
            language: action.response.language
        },
        updated: true
      });
    }
    case CHANGE_UPDATE_CHECK: {
      return Object.assign({}, state, {
        updated: null
      });
    }

    default:
      return { ...state };
  }
};
export default accountReducer;
