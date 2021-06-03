import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPortfolio } from "../../actions/portfolioActions";
import { currencyFormatter } from "../../utils/index";
import DashboardMenu from "../../components/DashboardMenu";
import DashboardContent from "../../components/DashboardContent";
import Message from "../../components/Message";

const Portfolio = () => {
  const dispatch = useDispatch();

  const userPortfolios = useSelector((state) => state.userPortfolios);

  const { portfolio, loading, error } = userPortfolios;

  useEffect(() => {
    dispatch(getUserPortfolio());
  }, [dispatch]);

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
            {portfolio && portfolio.data && (
              <div>
                <h3 className="uppercase font-bold mb-3 text-center md:text-left">
                  my portfolio{" "}
                  <span className="text-3xl text-gray-500">
                    {currencyFormatter.format(portfolio.data.portfolioValue)}
                  </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                  {portfolio.data.userPortfolio.map((portfolio) => (
                    <div
                      key={portfolio._id}
                      className="bg-gray-50 p-3 m-1 shadow">
                      <h5 className="font-bold leading-none">
                        {portfolio.symbol}
                      </h5>
                      <div className="leading-none font-light text-sm">
                        {portfolio.totalQuantity} share
                      </div>
                      <div className="mt-4">
                        {currencyFormatter.format(portfolio.equityValue)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DashboardContent>
    </div>
  );
};

export default Portfolio;
