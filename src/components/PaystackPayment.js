import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { paybackLoan } from "../actions/loanActions";

const PaystackPayment = ({ balance, email }) => {
  const [key, setKey] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();

  const loanPayment = useSelector((state) => state.loanPayment);

  const { loading } = loanPayment;

  useEffect(() => {
    const getKey = async () => {
      const { data: clientKey } = await axios.get(
        "https://loan-backend-app.herokuapp.com/api/config/paystack"
      );
      setKey(clientKey);
    };
    getKey();
  }, [key]);

  useEffect(() => {
    setAmount(balance);
  }, [balance]);

  const config = {
    reference: new Date().getTime(),
    email,
    amount: Number(amount) * 100 * 460,
    publicKey: key,
  };

  const PayStackHooks = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          type="button"
          disabled={Number(amount) > Number(balance)}
          className={`${
            Number(amount) > Number(balance)
              ? "bg-red bg-gray-300 cursor-not-allowed"
              : "bg-blue-900"
          } text-white px-4 py-2 rounded outline-none`}
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}>
          Pay loan
        </button>
        {loading && (
          <div className="absolute top-0 left-0 bg-gray-50 opacity-50 w-full h-full">
            <div className="flex items-center flex-col justify-center h-full">
              <div className="spinner border-t-4 mr-2 border-black"></div>
              confirming payment...
            </div>
          </div>
        )}
      </div>
    );
  };

  const onSuccess = (reference) => {
    let paidAt = Date.today().toString("MMMM dS, yyyy");
    dispatch(paybackLoan(Number(amount), paidAt));
  };

  const onClose = (ref) => console.log(ref);

  return (
    <div>
      {Number(amount) > Number(balance) ? (
        <span className="leading-none text-red-500 text-xs">
          You've exceeded {balance}
        </span>
      ) : (
        ""
      )}

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="border-black border block mb-3 focus:outline-none rounded-sm pl-1"
      />

      <PayStackHooks />
    </div>
  );
};

export default PaystackPayment;
