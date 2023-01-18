import React from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";

const Container = ({ maxWidth, children }) => {
  const { container, containerMaxWidth } = style;

  let cumulativeStyles = `${container}`;

  if (maxWidth === "true") {
    cumulativeStyles += ` ${containerMaxWidth}`;
  }

  console.log(cumulativeStyles);

  return <div className={cumulativeStyles}> {children} </div>;
};

Container.propTypes = {
  containerMaxWidth: PropTypes.oneOf(["true", "false"]),
};

Container.defaultProps = {
  containerMaxWidth: "false",
};

export default Container;
