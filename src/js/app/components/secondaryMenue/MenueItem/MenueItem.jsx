// built-in modules
import React from "react";
import Icon from "../../common/Icon";

// hoc's

// styles
import style from "./_layout.module.scss";

const { menueItem, menueItemTextBox, menueItemText } = style;

// custom hooks

// components

const MenueItem = ({ children, iconName }) => {
  return (
    <div className={menueItem}>
      {iconName && <Icon iconName={iconName} />}

      <div className={menueItemTextBox}>
        <div className={menueItemText}>{children}</div>
      </div>
    </div>
  );
};

export default MenueItem;
