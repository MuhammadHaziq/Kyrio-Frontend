import { ASIDE, SIDEBAR, DARK, SIDEBAR_SETTINGS } from "../constants/ActionTypes";

export const asideToggle = (data) => {
    return (dispatch) => {
        dispatch({ type: ASIDE, response: data });
    }
};
export const sidebarToggle = (data) => {
    return (dispatch) => {
        dispatch({ type: SIDEBAR, response: data });
    }
};
export const themeToggle = (data) => {
    return (dispatch) => {
        dispatch({ type: DARK, response: data });
    }
};
export const toggleSettingSideBar = (data) => {
    return (dispatch) => {
        dispatch({ type: SIDEBAR_SETTINGS, response: data });
    }
}
