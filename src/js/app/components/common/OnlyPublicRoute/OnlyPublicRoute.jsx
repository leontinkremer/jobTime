import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import "./_layout.scss";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/users";

const OnlyPublicRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
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
