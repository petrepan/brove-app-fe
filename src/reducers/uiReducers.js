import { TOGGLE_MENU_BTN } from "../types/uiTypes";

export const toggleMenu = (state = { showMenu: false }, action) => {
  switch (action.type) {
    case TOGGLE_MENU_BTN:
      return { showMenu: !state.showMenu };
    default:
      return state;
  }
};
