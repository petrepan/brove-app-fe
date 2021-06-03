import {
  USER_PORTFOLIOS_FAIL,
  USER_PORTFOLIOS_REQUEST,
  USER_PORTFOLIOS_SUCCESS,
} from "../types/portfolioTypes";

export const userPortfoliosReducer = (state = { portfolio: {} }, action) => {
  switch (action.type) {
    case USER_PORTFOLIOS_REQUEST:
      return { ...state, loading: true };
    case USER_PORTFOLIOS_SUCCESS:
      return { loading: false, portfolio: action.payload };
    case USER_PORTFOLIOS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};