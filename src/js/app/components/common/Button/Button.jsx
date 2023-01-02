import React from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";

const Button = ({
  type,
  actionType,
  marginRight,
  children,
  mobileFullWidth,
  handleClick,
  disabled,
}) => {
  let cumulativeStyles = `${style.button}`;

  if (actionType === "primary") {
    cumulativeStyles += ` ${style.primary}`;
  }

  if (actionType === "secondary") {
    cumulativeStyles += ` ${style.secondary}`;
  }

  if (marginRight === "true") {
    cumulativeStyles += ` ${style.marginRight}`;
  }

  if (mobileFullWidth === "true") {
    cumulativeStyles += ` ${style.mobileFullWidth}`;
  }

  return (
    <button
      type={type}
      className={cumulativeStyles}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  actionType: PropTypes.oneOf(["primary", "secondary"]),
  marginRight: PropTypes.oneOf(["true", "false"]),
  mobileFullWidth: PropTypes.oneOf(["true", "false"]),
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  actionType: "primary",
  marginRight: "false",
  mobileFullWidth: "false",
};

export default Button;
