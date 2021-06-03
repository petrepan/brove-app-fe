import { TOGGLE_MENU_BTN } from "../types/uiTypes";

export const showMenuAction = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MENU_BTN,
  });
};
