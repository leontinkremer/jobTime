// built-in modules
import React from "react";
import Icon from "../../common/Icon";

// hoc's

// styles
import style from "./_layout.module.scss";

const {
  menueItem,
  menueItemActive,
  menueItemTextBox,
  menueItemText,
  menueItemTextActive,
} = style;

// custom hooks

// componentsr

const MenueItem = ({ id, children, active, iconName, handleClick }) => {
  const menueItemClassNames = [menueItem, active ? menueItemActive : ""];

  const menueItemTextClassNames = [
    menueItemText,
    active ? menueItemTextActive : "",
  ];

  return (
    <div
      className={menueItemClassNames.join(" ")}
      onClick={() => handleClick(id)}
    >
      {iconName && <Icon iconName={iconName} />}

      <div className={menueItemTextBox}>
        <div className={menueItemTextClassNames.join(" ")}>{children}</div>
      </div>
    </div>
  );
};

export default MenueItem;
