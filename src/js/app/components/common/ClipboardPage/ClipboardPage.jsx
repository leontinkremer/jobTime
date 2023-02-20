// built-in modules
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// hoc's

// styles
import style from "./_layout.module.scss";

const { clipboardPage, asideLeft, mainArea, asideRight } = style;

// components
import ClipboardArea from "../ClipboardArea/ClipboardArea";

const ClipboardPage = () => {
  return (
    <div className={clipboardPage}>
      <aside className={asideLeft}>left</aside>
      <main className={mainArea}>
        <ClipboardArea />
      </main>
      <aside className={asideRight}>right</aside>
    </div>
  );
};

export default ClipboardPage;
