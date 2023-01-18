import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import "./_layout.scss";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();
  console.log("current User from ProtectedRoute Component", currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRoute;
