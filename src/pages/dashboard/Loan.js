import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUserLoanDetails, applyForALoan } from "../../actions/loanActions";
import { currencyFormatter } from "../../utils/index";
import DashboardMenu from "../../components/DashboardMenu";
import DashboardContent from "../../components/DashboardContent";
import Message from "../../components/Message";
import PaystackPayment from "../../components/PaystackPayment";

//percentage of loan a user will take against their portfolio value
const maxLoanPercentageOnPortfolio = 0.6; //60%

const paybackInterestPerMonth = [
  {
    duration: "One month",
    interest: 1.1,
    figure: 1,
  },
  {
    duration: "Two months",
    interest: 1.25,
    figure: 2,
  },
  {
    duration: "Three months",
    interest: 1.5,
    figure: 3,
  },
  {
    duration: "Four months",
    interest: 1.7,
    figure: 4,
  },
];

const Loan = () => {
  const [loanAmount, setLoanAmount] = useState(1500);
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState("");
  const [figure, setFigure] = useState(0);
  const [amount, setAmount] = useState(0);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [bankCode, setBankCode] = useState("801");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState("");

  const dispatch = useDispatch();

  const loanDetails = useSelector((state) => state.loanDetails);

  const { loan, loading, error } = loanDetails;

  const loanApplication = useSelector((state) => state.loanApplication);

  const { loading: applicationLoading, error: applicationError } =
    loanApplication;

  useEffect(() => {
    dispatch(getUserLoanDetails());
  }, [dispatch]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
      },
    };

    const getBank = async () => {
      const res = await axios.get("https://api.paystack.co/bank", config);
      setBankList(res.data.data);
    };
    getBank();
  }, []);

  const toggleModal = (amount, percentage, duration, figure) => {
    setShowBankModal(true);
    setAmount(amount);
    setPercentage(percentage);
    setDuration(duration);
    setFigure(figure);
  };

  const applyForLoan = (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    let appliedDate = Date.today().toString("MMMM dS, yyyy");
    let paybackDate = Date.parse(`today + ${figure} months`).toString(
      "MMMM dS, yyyy"
    );

    dispatch(
      applyForALoan(
        Number(amount),
        percentage,
        duration,
        appliedDate,
        paybackDate,
        bankCode,
        accountNumber
      )
    );
    setPaymentLoading(false);
  };

  return (
    <div>
      <DashboardMenu />
      <DashboardContent>
        {applicationError && (
          <Message variant="bg-red-900">{applicationError}</Message>
        )}
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <div className="spinner border-t-4 border-black"></div>
          </div>
        ) : error ? (
          <Message variant="bg-red-900">{error}</Message>
        ) : (
          <div>
            {loan && loan.data && loan.data.active ? (
              <div>
                {loan && loan.data && (
                  <div>
                    <h3 className="uppercase font-bold mb-3 text-center md:text-left">
                      Your loan overview
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-3 shadow bg-gray-50">
                        <h3 className="w-full uppercase font-bold">
                          Loan Amount
                        </h3>
                        <div className="mt-2 text-center">
                          <div className="text-3xl">
                            {currencyFormatter.format(loan.data.amount)}
                          </div>
                          <h5 className="text-xs font-bold mt-2">
                            Loan applied date
                          </h5>
                          <div className="text-xs uppercase my-1">
                            {loan.data.appliedDate}
                          </div>
                        </div>
                      </div>
                      <div className="p-3 shadow bg-gray-50">
                        <h3 className="w-full mb-2 uppercase font-bold">
                          Repayment amount
                        </h3>
                        <div className="mt-2 text-center">
                          <div className="text-3xl">
                            {currencyFormatter.format(
                              loan.data.balance.toFixed(0)
                            )}
                          </div>
                          <h5 className="text-xs font-bold mt-2">
                            Next repayment date
                          </h5>
                          <div className="text-xs uppercase my-1">
                            {loan.data.paybackDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <PaystackPayment
                        email={loan.data.email}
                        balance={loan.data.balance.toFixed(0)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {loan && loan.data && (
                  <div>
                    <h3 className="uppercase font-bold mb-3 flex items-center justify-center md:justify-start">
                      Apply for a loan{" "}
                      {applicationLoading ? (
                        <div className="spinner border-t-4 border-black ml-4"></div>
                      ) : (
                        ""
                      )}
                    </h3>
                    <div>
                      <div className="flex justify-center flex-col items-center mt-4">
                        <h5 className="uppercase text-sm">choose an amount</h5>
                        <div className="text-2xl font-bold mb-2">
                          {currencyFormatter.format(loanAmount)}
                        </div>
                        <input
                          className="w-6/12"
                          type="range"
                          min="1500"
                          max={(
                            Number(loan.data.portfolioValue) *
                            maxLoanPercentageOnPortfolio
                          ).toFixed(0)}
                          step="500"
                          onChange={(e) => setLoanAmount(e.target.value)}
                        />
                      </div>
                      <div className="mt-8">
                        <h5 className="uppercase text-sm text-center mb-2">
                          repayment period
                        </h5>
                        <div className="flex justify-center text-center flex-wrap">
                          {showBankModal ? (
                            <div className="fixed top-0 left-0 bg-black opacity-1 w-full h-full z-50">
                              <div className="flex justify-center mt-4">
                                <form className="bg-white w-72 opacity-100 rounded p-8">
                                  <h4 className="font-bold mb-4">
                                    Enter your Account details
                                  </h4>
                                  <div className="mb-4">
                                    <label className="block">
                                      Account Number
                                    </label>
                                    <input
                                      onChange={(e) =>
                                        setAccountNumber(e.target.value)
                                      }
                                      className="border border-black w-full focus:outline-none px-1"
                                      type="text"
                                      required
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block">Bank</label>
                                    <select
                                      onChange={(e) =>
                                        setBankCode(e.target.value)
                                      }
                                      className="border border-black w-full">
                                      {bankList.length &&
                                        bankList.map((bank, i) => (
                                          <option value={bank.code} key={i + 1}>
                                            {bank.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                  <div>
                                    <button
                                      onClick={applyForLoan}
                                      className="bg-blue-900 align-middle w-full text-white h-10 outline-none">
                                      {paymentLoading ? (
                                        <div className="spinner border-t-4 border-white"></div>
                                      ) : (
                                        "PAY"
                                      )}
                                    </button>
                                  </div>
                                </form>
                                <div
                                  onClick={() => setShowBankModal(false)}
                                  className="z-50 text-white text-2xl cursor-pointer">
                                  x
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}

                          {paybackInterestPerMonth.map((loan, i) => (
                            <div key={i + 1} className="mx-4 mb-4">
                              <button
                                onClick={() =>
                                  toggleModal(
                                    loanAmount,
                                    loan.interest,
                                    loan.duration,
                                    loan.figure
                                  )
                                }
                                className="bg-blue-900 align-middle text-white h-10 leading-none outline-none rounded px-4">
                                {loan.duration}
                              </button>
                              <div className="text-sm">
                                {currencyFormatter.format(
                                  (loanAmount * loan.interest).toFixed(0)
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DashboardContent>
    </div>
  );
};

export default Loan;
