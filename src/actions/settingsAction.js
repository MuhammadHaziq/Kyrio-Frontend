import { ASIDE, SIDEBAR, DARK } from "../constants/ActionTypes";

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
  