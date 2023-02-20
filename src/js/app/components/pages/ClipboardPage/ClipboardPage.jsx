// built-in modules
import React from "react";
import { useSelector } from "react-redux";
import { getDataStatus } from "../../../store/users";

// components
import ClipboardArea from "../../common/ClipboardArea/ClipboardArea";
import Loader from "../../common/Loader";
import SecondaryMenue from "../../common/SecondaryMenue/SecondaryMenue";

// styles
import style from "./_layout.module.scss";
const { clipboardPage, asideLeft, mainArea, asideRight } = style;

const ClipboardPage = () => {
  const dataLoaded = useSelector(getDataStatus());
  if (!dataLoaded) return <Loader />;

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
