// built-in modules
import React, { useState } from "react";

// hoc's

// styles
import style from "./_layout.module.scss";

// custom modules
import { filterVariables } from "../../../config.json";

// components
import MenueItem from "../SecondaryMenueItem";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getFilterBy } from "../../../store/notes";

const {
  secondaryMenue,
  menueMainSection,
  menueSecondarySection,
  menueTertiarySection,
  menueItem,
} = style;

const SecondaryMenue = () => {
  const filterBy = useSelector(getFilterBy());
  const dispatch = useDispatch();
  const { ALL_NOTES, ARCHIVED_NOTES, CURRENT_NOTES, FAVORED_NOTES, OLD_NOTES } =
    filterVariables;

  const menueItems = [
    {
      id: CURRENT_NOTES,
      active: true,
      name: "Aktuelle",
      icon: "",
      section: 2,
    },
    {
      id: OLD_NOTES,
      active: false,
      name: "Ältere",
      icon: "",
      section: 2,
    },
    {
      id: ALL_NOTES,
      active: false,
      name: "Alle",
      icon: "",
      section: 2,
    },
    {
      id: FAVORED_NOTES,
      active: false,
      name: "Favoriten",
      icon: "",
      section: 3,
    },
    {
      id: ARCHIVED_NOTES,
      active: false,
      name: "Archiv",
      icon: "",
      section: 3,
    },
  ];

  // console.log(menueItems[0].name);

  const changeFilterBy = (filterId) => {
    dispatch(changeFilter(filterId));
    // console.log("filterId", filterId);
  };

  return (
    <div className={secondaryMenue}>
      <div className={menueMainSection}>
        <MenueItem iconName="PlusSolidDark">Neu</MenueItem>
      </div>
      <div className={menueSecondarySection}>
        {menueItems.map((item) => {
          if (item.section === 2) {
            return (
              <MenueItem
                iconName={item.icon}
                active={filterBy === item.id}
                id={item.id}
                key={item.id}
                handleClick={changeFilterBy}
              >
                {item.name}
              </MenueItem>
            );
          }
        })}
      </div>
      <div className={menueTertiarySection}>
        {menueItems.map((item) => {
          if (item.section === 3) {
            return (
              <MenueItem
                iconName={item.icon}
                active={filterBy === item.id}
                id={item.id}
                key={item.id}
                handleClick={changeFilterBy}
              >
                {item.name}
              </MenueItem>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SecondaryMenue;
