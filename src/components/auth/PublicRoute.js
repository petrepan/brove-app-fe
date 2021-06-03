import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: WrappedComponent, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Redirect to="/dashboard/overview" />
        ) : (
          <WrappedComponent {...props} />
        )
      }
    />
  );
};

export default PublicRoute
