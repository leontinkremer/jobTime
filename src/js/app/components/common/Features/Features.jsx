import React from "react";
import style from "./_layout.module.scss";
import clockIcon from "../../../../../images/clockIcon.png";

const {
  container,
  row,
  column,
  card,
  cardBody,
  iconBox,
  icon,
  contentBox,
  cardHeading,
  cardText,
  cardLink,
} = style;

const Features = () => {
  return (
    <header className={container} id="features">
      <div className={row}>
        <div className={column}>
          <div className={card}>
            <div className={cardBody}>
              <div className={iconBox}>
                <img className={icon} src={clockIcon} alt="Icon" />
              </div>
              <div className={contentBox}>
                <h4 className={cardHeading}>Lorem Ipsum</h4>
                <p className={cardText}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                </p>
                <a className={cardLink} href="#">
                  Jetzt registrieren →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={column}>
          <div className={card}>
            <div className={cardBody}>
              <div className={iconBox}>
                <img className={icon} src={clockIcon} alt="Icon" />
              </div>
              <div className={contentBox}>
                <h4 className={cardHeading}>Lorem Ipsum</h4>
                <p className={cardText}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                </p>
                <a className={cardLink} href="#">
                  Jetzt registrieren →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={column}>
          <div className={card}>
            <div className={cardBody}>
              <div className={iconBox}>
                <img className={icon} src={clockIcon} alt="Icon" />
              </div>
              <div className={contentBox}>
                <h4 className={cardHeading}>Lorem Ipsum</h4>
                <p className={cardText}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                </p>
                <a className={cardLink} href="#">
                  Jetzt registrieren →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Features;
