import {
    GET_SALES_SUMMARY,
    TOGGLE_SALE_SUMMARY_SINGLE_SELECT,
    TOGGLE_SALE_SUMMARY_ALL_SELECT,
    DELETE_SALES_SUMMARY,
    ROW_DATA_SALES_SUMMARY,
} from "../../constants/ActionTypes";

const initialState = {
    sales_summary: [],
    redirect_update: false,
    redirect_sale_summary: true,
};
const salesSummaryReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case GET_SALES_SUMMARY: {
            return Object.assign({}, state, {
                sales_summary: action.response,
            });
        }

        case TOGGLE_SALE_SUMMARY_SINGLE_SELECT: {
            return Object.assign({}, state, {
                sales_summary: state.sales_summary.map((item) => {
                    if (item._id === action.response._id) {
                        return Object.assign({}, item, {
                            isDeleted: !item.isDeleted,
                        });
                    }
                    return item;
                }),
            });
        }

        case TOGGLE_SALE_SUMMARY_ALL_SELECT: {
            return Object.assign({}, state, {
                sales_summary: state.sales_summary.map((item) => {
                    return Object.assign({}, item, {
                        isDeleted: action.response,
                    });
                }),
            });
        }

        case DELETE_SALES_SUMMARY: {
            let sales_summary = state.sales_summary;
            for (const id of action.response) {
                sales_summary = sales_summary.filter((item) => item._id !== id);
            }
            return {
                ...state,
                sales_summary,
                redirect_update: false,
                redirect_sale_summary: true,
            };
        }

        default:
            return { ...state };
    }
};
export default salesSummaryReducer;