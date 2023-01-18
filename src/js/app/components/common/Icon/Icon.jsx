// built-in modules
import React from "react";

// third-party modules
import PropTypes from "prop-types";

// images
import starOutlineLight from "../../../../../images/icon_star_outline_light.png";
import starSolidLight from "../../../../../images/icon_star_solid_light.png";
import counterOutlineLight from "../../../../../images/icon_counter_outline_light.png";
import countingOutlineLight from "../../../../../images/icon_counting_outline_light.png";
import CalendarOutlineLight from "../../../../../images/icon_calendar_outline_light.png";
import BinOutlineLight from "../../../../../images/icon_bin_outline_light.png";
import PlusSolidDark from "../../../../../images/icon_plus_solid_dark.png";

import clipBoardItemColors from "../../../config.json";

// hoc's

// styles
import style from "./_layout.module.scss";

const { iconBox, icon } = style;

// custom hooks

// components

const Icon = ({ iconName, iconAltText }) => {
  let iconSrc;

  iconName === "starSolidLight" ? (iconSrc = starSolidLight) : "";
  iconName === "PlusSolidDark" ? (iconSrc = PlusSolidDark) : "";

  return (
    <div className={iconBox}>
      <img className={icon} src={iconSrc} alt={iconAltText} />
    </div>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string,
  iconAltText: PropTypes.string,
};

Icon.defaultProps = {
  iconName: "starSolidLight",
  iconAltText: "Icon",
};

export default Icon;
