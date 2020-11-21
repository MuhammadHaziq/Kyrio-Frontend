import {
    GET_TIMECARD_DETAIL,
    GET_TIMECARDS,
    ADD_NEW_TIMECARD,
    REDIRECT_BACK_TIME_CARD,
    TOGGLE_TIMECARD_SINGLE_SELECT,
    TOGGLE_TIMECARD_ALL_SELECT,
    DELETE_TIMECARD,
    ROW_DATA_TIMECARD,
    UPDATE_TIMECARD,
} from "../../constants/ActionTypes";

const initialState = {
    timeCard_list: [],
    timeCard_detail: [],
    redirect_timeCard: false,
    redirect_update: false,
    timeCard_row_data: {},
};
const timeCardReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case REDIRECT_BACK_TIME_CARD: {
            return Object.assign({}, state, {
                redirect_timeCard: action.response,
                redirect_update: false,
            });
        }

        case GET_TIMECARDS:
            return Object.assign({}, state, {
                timeCard_list: action.response,
            });

        case GET_TIMECARD_DETAIL:
            return Object.assign({}, state, {
                timeCard_detail: action.response,
            });

        case ADD_NEW_TIMECARD:
            return Object.assign({}, state, {
                timeCard_list: [action.response, ...state.timeCard_list],
                redirect_timeCard: true,
            });

        case TOGGLE_TIMECARD_SINGLE_SELECT: {
            return Object.assign({}, state, {
                timeCard_list: state.timeCard_list.map((item) => {
                    if (item._id === action.response._id) {
                        return Object.assign({}, item, {
                            isDeleted: !item.isDeleted,
                        });
                    }
                    return item;
                }),
            });
        }

        case TOGGLE_TIMECARD_ALL_SELECT: {
            return Object.assign({}, state, {
                timeCard_list: state.timeCard_list.map((item) => {
                    return Object.assign({}, item, {
                        isDeleted: action.response,
                    });
                }),
            });
        }

        case DELETE_TIMECARD: {
            let timeCard_list = state.timeCard_list;
            for (const id of action.response) {
                timeCard_list = timeCard_list.filter((item) => item._id !== id);
            }
            return {
                ...state,
                timeCard_list,
                redirect_update: false,
                redirect_timeCard: true,
            };
        }
        case ROW_DATA_TIMECARD: {
            return Object.assign({}, state, {
                timeCard_row_data: action.response,
                redirect_update: true,
                redirect_timeCard: false,
            });
        }

        case UPDATE_TIMECARD: {
            return Object.assign({}, state, {
                timeCard_list: state.timeCard_list.map((item) => {
                    if ((item._id === action.response._id)) {
                        return action.response;
                    }
                    return item;
                }),
                timeCard_row_data: {},
                redirect_update: false,
                redirect_timeCard: true,
            });
        }

        default:
            return { ...state };
    }
};
export default timeCardReducer;
