import { AxiosAuth } from "../utils/index";
import {
  LOAN_DETAILS_REQUEST,
  LOAN_DETAILS_SUCCESS,
  LOAN_DETAILS_FAIL,
  LOAN_APPLICATION_REQUEST,
  LOAN_APPLICATION_SUCCESS,
  LOAN_APPLICATION_FAIL,
  PAYBACK_LOAN_REQUEST,
  PAYBACK_LOAN_SUCCESS,
  PAYBACK_LOAN_FAIL,
} from "../types/loanTypes";
import Api from "../Api";

export const getUserLoanDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAN_DETAILS_REQUEST,
    });

    const res = await AxiosAuth().get(`${Api}/api/loans/get-user-loan`);

    dispatch({
      type: LOAN_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : error.data,
    });
  }
};

export const applyForALoan =
  (
    amount,
    percentage,
    duration,
    appliedDate,
    paybackDate,
    bankCode,
    accountNumber
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOAN_APPLICATION_REQUEST,
      });

      const res = await AxiosAuth().post(`${Api}/api/loans/apply-for-loan`, {
        amount,
        percentage,
        duration,
        appliedDate,
        paybackDate,
        bankCode,
        accountNumber,
      });

      dispatch({
        type: LOAN_APPLICATION_SUCCESS,
        payload: res.data,
      });

      window.location.reload();
    } catch (error) {
      dispatch({
        type: LOAN_APPLICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : error.data,
      });
    }
  };

export const paybackLoan = (amount, paidAt) => async (dispatch) => {
  try {
    dispatch({
      type: PAYBACK_LOAN_REQUEST,
    });

    const res = await AxiosAuth().put(`${Api}/api/loans/payback-loan`, {
      amount,
      paidAt,
    });

    dispatch({
      type: PAYBACK_LOAN_SUCCESS,
      payload: res.data,
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
    dispatch({
      type: PAYBACK_LOAN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : error.data,
    });
  }
};
