// built-in modules
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// hoc's

// styles
import style from "./_layout.module.scss";

const { clipboardPage, asideLeft, mainArea, asideRight } = style;

// custom hooks
import { useAuth } from "../../../hooks/useAuth";

// components
import ClipboardArea from "../../common/ClipboardArea/ClipboardArea";
import SecondaryMenue from "../../secondaryMenue/SecondaryMenue/SecondaryMenue";
// import SecondaryMenue from "../../secondaryMenue/SecondaryMenue";

const ClipboardPage = () => {
  return (
    <div className={clipboardPage}>
      <aside className={asideLeft}>
        <SecondaryMenue />
      </aside>
      <main className={mainArea}>
        <ClipboardArea />
      </main>
      <aside className={asideRight}></aside>
    </div>
  );
};

export default ClipboardPage;
