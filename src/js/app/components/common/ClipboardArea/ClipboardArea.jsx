import React from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";
import Container from "../Container/Container";
import ClipboardBody from "../ClipboardBody";

const ClipboardArea = () => {
  const { clipboardArea } = style;

  return (
    <Container>
      <div className={clipboardArea}>
        <ClipboardBody />
      </div>
    </Container>
  );
};

export default ClipboardArea;
