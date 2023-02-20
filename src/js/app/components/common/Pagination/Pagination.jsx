// built-in modules
import React from "react";
import _ from "lodash";
import PaginationPageTileBox from "../PaginationPageTileBox";

// hoc's

// styles
import style from "./_layout.module.scss";
const { paginationSection, paginationBox } = style;

// custom hooks

// components

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <div className={paginationSection}>
      <div className={paginationBox}>
        {pages.map((page) => (
          <PaginationPageTileBox
            page={page}
            key={"page_" + page}
            active={page === currentPage ? true : false}
            onPageChange={onPageChange}
          >
            {page}
          </PaginationPageTileBox>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
