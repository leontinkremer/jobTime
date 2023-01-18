import React from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";
import starOutlineLight from "../../../../../images/icon_star_outline_light.png";
import starSolidLight from "../../../../../images/icon_star_solid_light.png";
import counterOutlineLight from "../../../../../images/icon_counter_outline_light.png";
import countingOutlineLight from "../../../../../images/icon_counting_outline_light.png";
import CalendarOutlineLight from "../../../../../images/icon_calendar_outline_light.png";
import BinOutlineLight from "../../../../../images/icon_bin_outline_light.png";
import clipBoardItemColors from "../../../config.json";

const ClipboardBody = () => {
  const {
    clipboardBody,
    clipboardItem,
    itemHeader,
    itemHeaderColumnLeft,
    itemBody,
    itemBodyHeadingSection,
    itemBodyHeadingSymbol,
    itemBodyHeading,
    itemBodyContentSection,
    itemBodyContent,
    iconBox,
    icon,
    statusIndicator,
    indicatorText,
    indicatorTextSmall,
    indicatorTextCalendar,
    indicatorTextDay,
    indicatorTextMonth,
    itemHeaderColumnRight,
    itemAction,
  } = style;

  const items = [
    {
      id: 1,
      symbol: "🥇",
      color_schema: 1,
      heading: "JavaScript (kurz JS) ist eine Skriptsprache",
      content:
        "JavaScript (kurz JS) ist eine Skriptsprache, die ursprünglich 1995 von Netscape für dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen auszuwerten, Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten von HTML zu erweitern.[2] Heute wird JavaScript auch außerhalb von Browsern angewendet, etwa auf Servern und in Microcontrollern.",
      favorite: true,
      created_at: 1670798501,
      updated_at: 1673736101,
      archived_at: "",
    },
    {
      id: 2,
      symbol: "🏠",
      color_schema: 2,
      heading: "Accessing Object Values",
      content: "You can access object values by using dot (.) notation",
      favorite: false,
      created_at: 1670798501,
      updated_at: 1673736101,
      archived_at: 1673736101,
    },
  ];

  const objItemColors = clipBoardItemColors.clipBoardItemColors;
  console.log(objItemColors[1].heading); //

  return (
    <div className={clipboardBody}>
      {items.map((item) => (
        <div key={item.id} className={clipboardItem}>
          <div
            key={item.id}
            className={itemHeader}
            style={{
              backgroundColor: objItemColors[item.color_schema].heading,
            }}
          >
            <div key={item.id} className={itemHeaderColumnLeft}>
              <div key={item} className={statusIndicator}>
                <div key={item} className={iconBox}>
                  <img className={icon} src={counterOutlineLight} alt="Icon" />
                </div>
                <span className={indicatorText}>Nie</span>
              </div>
              <div key={item} className={statusIndicator}>
                <div key={item} className={iconBox}>
                  <img className={icon} src={countingOutlineLight} alt="Icon" />
                </div>
                <span className={indicatorText}>
                  0<span className={indicatorTextSmall}>x</span>
                </span>
              </div>
              <div key={item} className={statusIndicator}>
                <div key={item} className={iconBox}>
                  <img className={icon} src={CalendarOutlineLight} alt="Icon" />
                </div>
                <div className={indicatorTextCalendar}>
                  <p className={indicatorTextDay}>24</p>
                  <p className={indicatorTextMonth}>OKT</p>
                </div>
              </div>
            </div>
            <div className={itemHeaderColumnRight}>
              <div className={itemAction}>
                <div key={item} className={iconBox}>
                  <img
                    className={icon}
                    src={
                      item.favorite === true ? starSolidLight : starOutlineLight
                    }
                    alt="Icon"
                  />
                </div>
              </div>
              <div className={itemAction}>
                <div key={item} className={iconBox}>
                  <img className={icon} src={BinOutlineLight} alt="Icon" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={itemBody}
            style={{
              backgroundColor: objItemColors[item.color_schema].body,
            }}
          >
            <div className={itemBodyHeadingSection}>
              <div className={itemBodyHeadingSymbol}>{item.symbol}</div>
              <div className={itemBodyHeading}>{item.heading}</div>
            </div>
            <div className={itemBodyContentSection}>
              <div className={itemBodyContent}>{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClipboardBody;

{
  /* <div className={clipboardItem}>
  <div className={itemHeader}>Nie</div>
  <div className={itemBody}>Lorem ipsum</div>
</div>; */
}
