// built-in modules
import React from "react";
import MenueItem from "../MenueItem";

// hoc's

// styles
import style from "./_layout.module.scss";

const {
  secondaryMenue,
  menueMainSection,
  menueSecondarySection,
  menueTertiarySection,
  menueItem,
} = style;

// custom hooks

// components

const SecondaryMenue = () => {
  return (
    <div className={secondaryMenue}>
      <div className={menueMainSection}>
        <MenueItem iconName="PlusSolidDark">Neu</MenueItem>
      </div>
      <div className={menueSecondarySection}>
        <MenueItem>Aktuelle</MenueItem>
        <MenueItem>Ältere</MenueItem>
        <MenueItem>Alle</MenueItem>
      </div>
      <div className={menueTertiarySection}>
        <MenueItem>Favoriten</MenueItem>
        <MenueItem>Archiv</MenueItem>
      </div>
    </div>
  );
};

export default SecondaryMenue;
