import React from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";

const Button = ({
  type,
  actionType,
  marginRight,
  marginTop,
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
      style={{
        marginTop: marginTop,
      }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  actionType: PropTypes.oneOf(["primary", "secondary"]),
  marginRight: PropTypes.oneOf(["true", "false"]),
  marginTop: PropTypes.string,
  mobileFullWidth: PropTypes.oneOf(["true", "false"]),
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  actionType: "primary",
  marginRight: "false",
  marginTop: "0",
  mobileFullWidth: "false",
};

export default Button;
