import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../pages/Login";

const PrivateRoute = ({ component: WrappedComponent, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? <WrappedComponent {...props} /> : <Login />
      }
    />
  );
};

export default PrivateRoute;
