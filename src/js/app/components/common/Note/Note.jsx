// built-in modules
import React from "react";

// custom modules
import clipBoardItemColors from "../../../config.json";
import getLastViewIndicator from "../../../utils/getLastViewIndicator";
import getDate from "../../../utils/date";

// icons
import starOutlineLight from "../../../../../images/icon_star_outline_light.png";
import starSolidLight from "../../../../../images/icon_star_solid_light.png";
import counterOutlineLight from "../../../../../images/icon_counter_outline_light.png";
import countingOutlineLight from "../../../../../images/icon_counting_outline_light.png";
import CalendarOutlineLight from "../../../../../images/icon_calendar_outline_light.png";
import BinOutlineLight from "../../../../../images/icon_bin_outline_light.png";
import BinSolidLight from "../../../../../images/icon_bin_solid_light.png";
import EyeoffSolidLight from "../../../../../images/icon_eyeoff_solid_light.png";
import EyeonOutlineLight from "../../../../../images/icon_eyeon_outline_light.png";

// hoc's

// styles
import style from "./_layout.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLastSync,
  getUsers,
  updateUser,
  updateUserLocally,
} from "../../../store/users";
import getTimestamp from "../../../utils/date.getTimestamp";

const {
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

// custom hooks

// components

const Note = ({
  item,
  handleFavoriteGlobalChange,
  handleGlobalHide,
  handleGlobalTextChange,
  handleGlobalRemove,
}) => {
  const timestamp = getTimestamp();
  const [note, setNote] = useState(item);
  const objItemColors = clipBoardItemColors.clipBoardItemColors;

  const handleFavoriteChange = () => {
    handleFavoriteLocalChange();
    handleFavoriteGlobalChange(note);
  };

  const handleHide = () => {
    handleLocalHide();
    handleGlobalHide(note);
  };

  const handleRemove = () => {
    handleGlobalRemove(note);
  };

  const handleTextChange = () => {
    handleLocalTextChange();
    handleGlobalTextChange(note);
  };

  const handleLocalTextChange = () => {
    setNote((prevState) => ({
      ...prevState,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: prevState.views + 1,
    }));
  };

  const handleChange = (data) => {
    console.log("data.target.name", data.target.name);
    setNote((prevState) => ({
      ...prevState,
      [data.target.name]: data.target.value,
      last_view_at: timestamp,
      updated_at: timestamp,
      // [data.name]: data.value,
    }));
  };

  const handleLocalHide = () => {
    setNote((prevState) => ({
      ...prevState,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: prevState.views + 1,
      archived_at: prevState.archived_at === 0 ? timestamp : 0,
      // [data.name]: data.value,
    }));
  };

  const handleFavoriteLocalChange = () => {
    setNote((prevState) => ({
      ...prevState,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: prevState.views + 1,
      favorite: prevState.favorite === true ? false : true,
    }));
  };

  return (
    <div key={note.id} className={clipboardItem}>
      <div
        key={note.id}
        className={itemHeader}
        style={{
          backgroundColor: objItemColors[note.color_schema].heading,
        }}
      >
        <div
          key={"itemHeaderColumnLeft_" + note.id}
          className={itemHeaderColumnLeft}
        >
          <div
            key={"statusIndicatorCounter_" + note.id}
            className={statusIndicator}
          >
            <div key={"iconBox_" + note.id} className={iconBox}>
              <img
                key={"icon_" + note.id}
                className={icon}
                src={counterOutlineLight}
                alt="Icon"
              />
            </div>
            <span key={"indicatorText_" + note.id} className={indicatorText}>
              {getLastViewIndicator(note.last_view_at)}
            </span>
          </div>
          <div
            key={"statusIndicatorCounting_" + note.id}
            className={statusIndicator}
          >
            <div key={"iconBox_" + note.id} className={iconBox}>
              <img
                key={"icon_" + note.id}
                className={icon}
                src={countingOutlineLight}
                alt="Icon"
              />
            </div>
            <span key={"indicatorText_" + note.id} className={indicatorText}>
              {note.views}
              <span
                key={"indicatorTextSmall_" + note.id}
                className={indicatorTextSmall}
              >
                x
              </span>
            </span>
          </div>
          <div
            key={"statusIndicatorCalendar_" + note.id}
            className={statusIndicator}
          >
            <div key={"iconBox_" + note.id} className={iconBox}>
              <img
                key={"icon_" + note.id}
                className={icon}
                src={CalendarOutlineLight}
                alt="Icon"
              />
            </div>
            <div
              key={"indicatorTextCalendar_" + note.id}
              className={indicatorTextCalendar}
            >
              <p
                key={"indicatorTextDay_" + note.id}
                className={indicatorTextDay}
              >
                {getDate("dayAsNumber", note.created_at)}
              </p>
              <p
                key={"indicatorTextMonth_" + note.id}
                className={indicatorTextMonth}
              >
                {getDate("monthAsTextShort", note.created_at)}
              </p>
            </div>
          </div>
        </div>
        <div
          key={"itemHeaderColumnRight_" + note.id}
          className={itemHeaderColumnRight}
        >
          <div
            key={"itemActionFavorite_" + note.id}
            onClick={() => {
              handleFavoriteChange();
            }}
            className={itemAction}
            id={note.id}
          >
            <div key={"iconBox_" + note.id} className={iconBox}>
              <img
                key={"icon_" + note.id}
                className={icon}
                src={note.favorite === true ? starSolidLight : starOutlineLight}
                alt="Icon"
              />
            </div>
          </div>
          {/* // working on hidden action */}
          <div
            key={"itemActionHidden_" + note.id}
            className={itemAction}
            onClick={() => handleHide()}
          >
            <div key={"iconBox_" + note.id} className={iconBox}>
              <img
                key={"icon_" + note.id}
                className={icon}
                src={!!note.archived_at ? EyeoffSolidLight : EyeonOutlineLight}
                alt="Icon"
              />
            </div>
          </div>
          <div
            key={"itemActionRemoved_" + note.id}
            className={itemAction}
            onClick={() => handleRemove()}
          >
            <div key={"iconBox_" + note.id} className={iconBox}>
              <img
                key={"icon_" + note.id}
                className={icon}
                src={BinOutlineLight}
                alt="Icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        key={"itemBody_" + note.id}
        className={itemBody}
        style={{
          backgroundColor: objItemColors[note.color_schema].body,
        }}
      >
        <div
          key={"itemBodyHeadingSection_" + note.id}
          className={itemBodyHeadingSection}
        >
          <div
            key={"itemBodyHeadingSymbol_" + note.id}
            className={itemBodyHeadingSymbol}
          >
            {note.symbol}
          </div>
          <div key={"itemBodyHeading_" + note.id} className={itemBodyHeading}>
            <input
              id={"itemBodyHeading_" + note.id}
              key={"itemBodyHeading_" + note.id}
              className={itemBodyHeading}
              name="heading"
              value={note.heading}
              onChange={handleChange}
              onBlur={handleTextChange}
            ></input>
          </div>
        </div>
        <div
          key={"itemBodyContentSection_" + note.id}
          className={itemBodyContentSection}
        >
          <textarea
            id={"itemBodyContent_" + note.id}
            key={"itemBodyContent_" + note.id}
            className={itemBodyContent}
            name="content"
            value={note.content}
            onChange={handleChange}
            onBlur={handleTextChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Note;
