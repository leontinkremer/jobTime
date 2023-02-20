// built-in modules
import React from "react";

// hoc's

// styles
import style from "./_layout.module.scss";

const { pageTileBox, pageTileBoxActive, pageTile, pageTileActive } = style;

// custom hooks

// components

const PaginationPageTileBox = ({ children, active, onPageChange, page }) => {
  const classNames = {
    pageTileBox: [pageTileBox, active ? pageTileBoxActive : ""],
    pageTile: [pageTile, active ? pageTileActive : ""],
  };

  return (
    <button
      id={"page_" + page.toString()}
      key={"page_" + page.toString()}
      className={classNames.pageTileBox.join(" ")}
      onClick={() => onPageChange(children)}
    >
      <span
        id={"page_span_" + page.toString()}
        key={"page_span_" + page.toString()}
        className={classNames.pageTile.join(" ")}
      >
        {children}
      </span>
    </button>
  );
};

export default PaginationPageTileBox;
