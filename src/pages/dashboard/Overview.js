import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserOverview } from "../../actions/userActions";
import { currencyFormatter } from "../../utils/index";
import DashboardMenu from "../../components/DashboardMenu";
import DashboardContent from "../../components/DashboardContent";
import PortfolioChart from "../../components/PortfolioChart";
import Message from "../../components/Message";

const Overview = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  useEffect(() => {
    dispatch(getUserOverview());
  }, [dispatch]);

  const chartData =
    user && user.data
      ? user.data.userPortfolio.map((portfolio) => {
          return {
            value: portfolio.equityValue,
            name: portfolio.symbol,
          };
        })
      : "";
  console.log(chartData);

  return (
    <div>
      <DashboardMenu />
      <DashboardContent>
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <div className="spinner border-t-4 border-black"></div>
          </div>
        ) : error ? (
          <Message variant="bg-red-900">{error}</Message>
        ) : (
          <div>
            <h3 className="uppercase font-bold mb-3 text-center md:text-left">account overview</h3>
            <div className="flex flex-col md:flex-row">
              <div className="border border-gray px-2 mb-5 md:mb-0 md:w-3/5">
                <h3 className="border-b py-2 w-full uppercase font-bold">
                  Portfolio
                </h3>
                <div className="md:p-12 py-8 text-center">
                  <h5 className="uppercase font-light text-sm">Value</h5>
                  <div className="text-3xl">
                    {user &&
                      user.data &&
                      currencyFormatter.format(user.data.portfolioValue)}
                  </div>
                </div>
              </div>
              <div className="p-3 shadow bg-gray-50 md:w-2/5 md:ml-4">
                <h3 className="w-full mb-2 uppercase font-bold">Your Loan</h3>
                {user && user.data && user.data.loanDetails.active ? (
                  <div className="mt-8">
                    <h5 className="uppercase font-bold text-gray-500 text-sm">
                      Next loan repayment
                    </h5>
                    <div className="text-3xl">
                      {currencyFormatter.format(
                        user.data.loanDetails.balance.toFixed(0)
                      )}
                    </div>
                    <div className="text-xs uppercase my-1">
                      {user.data.loanDetails.paybackDate}
                    </div>
                    <Link
                      to="/dashboard/loan"
                      className="underline text-sm mt-4 block">
                      View details
                    </Link>
                  </div>
                ) : (
                  <div className="mt-14">You have no active loan</div>
                )}
              </div>
            </div>
            <div className="mt-12">
              <h4 className="uppercase font-bold text-gray-600">
                portfolio breakdown
              </h4>
              <PortfolioChart data={chartData} />
            </div>
          </div>
        )}
      </DashboardContent>
    </div>
  );
};

export default Overview;
