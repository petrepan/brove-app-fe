import { AxiosAuth } from "../utils/index";
import {
  USER_PORTFOLIOS_FAIL,
  USER_PORTFOLIOS_REQUEST,
  USER_PORTFOLIOS_SUCCESS,
} from "../types/portfolioTypes";
import Api from "../Api";

export const getUserPortfolio = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PORTFOLIOS_REQUEST,
    });

    const res = await AxiosAuth().get(`${Api}/api/portfolios/get-user-portfolio`);

    dispatch({
      type: USER_PORTFOLIOS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PORTFOLIOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : error.data,
    });
  }
};