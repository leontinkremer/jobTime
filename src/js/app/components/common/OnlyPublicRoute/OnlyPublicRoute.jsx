import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import "./_layout.scss";

const OnlyPublicRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          return <Redirect to="/dashboard" />;
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

OnlyPublicRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default OnlyPublicRoute;
