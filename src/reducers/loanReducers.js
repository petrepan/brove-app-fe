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
  PAYBACK_LOAN_RESET,
} from "../types/loanTypes";

export const loanDetailsReducer = (state = { loan: {} }, action) => {
  switch (action.type) {
    case LOAN_DETAILS_REQUEST:
      return { ...state, loading: true };
    case LOAN_DETAILS_SUCCESS:
      return { loading: false, loan: action.payload };
    case LOAN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loanApplicationReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAN_APPLICATION_REQUEST:
      return { ...state, loading: true };
    case LOAN_APPLICATION_SUCCESS:
      return { loading: false, loanInfo: action.payload };
    case LOAN_APPLICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const loanPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYBACK_LOAN_REQUEST:
      return { ...state, loading: true };
    case PAYBACK_LOAN_SUCCESS:
      return { loading: false, paymentInfo: action.payload };
    case PAYBACK_LOAN_FAIL:
      return { loading: false, error: action.payload };
    case PAYBACK_LOAN_RESET:
      return {};
    default:
      return state;
  }
};
