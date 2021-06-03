import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { userPortfoliosReducer } from "./reducers/portfolioReducers";
import {
  loanDetailsReducer,
  loanApplicationReducer,
  loanPaymentReducer,
} from "./reducers/loanReducers";
import { toggleMenu } from "./reducers/uiReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userPortfolios: userPortfoliosReducer,
  loanDetails: loanDetailsReducer,
  loanApplication: loanApplicationReducer,
  loanPayment: loanPaymentReducer,
  toggleMenu,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
