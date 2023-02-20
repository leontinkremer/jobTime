import React, { useState, useEffect } from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getIsSynced,
  getUsers,
  getUsersNotes,
  loadUsersList,
  updateNoteLocally,
  updateUser,
  updateUserLocally,
  updateUserLocallyNew,
  updateUserNoteFavoriteSettings,
} from "../../../store/users";
import { paginate } from "../../../utils/paginate";
import Pagination from "../Pagination";
import filterNotes from "../../../utils/filterNotes";
import { getFilterBy } from "../../../store/notes";
import Note from "../Note";

const ClipboardBody = () => {
  const { clipboardBody } = style;
  const notes = useSelector(getUsersNotes());
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isSynced = useSelector(getIsSynced());

  // subtask: update user when changed notes.
  // console.log("User:", user);
  // console.log("Notes:", notes);
  const [currentPage, setCurrentPage] = useState(1);
  const filterBy = useSelector(getFilterBy());
  // console.log("filterBy", filterBy);
  const pageSize = 6;

  const filteredNotes = filterNotes(filterBy, notes);

  let notesCrop = paginate(filteredNotes, currentPage, pageSize);
  // console.log("notesCrop", notesCrop);

  // useEffect(() => {
  //   if (user.isSynced === false) {
  //     console.log("Sync data with backend");
  //     console.log("user", user);
  //     dispatch(updateUser(user));
  //   }
  // }, [user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterBy]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(loadUsersList());
  //   }
  // }, [isLoggedIn]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleFavoriteChangeWithModifiedProp = (note) => {
    // console.log("user", user);
    // console.log("note", note);
    // console.log("=======");
    const modifiedNote = {
      ...note,
      favorite: note.favorite === false ? true : false,
    };
    console.log("modifiedNote", modifiedNote);
    dispatch(updateNoteLocally(modifiedNote));
  };

  // useEffect(() => {
  //   if (user.isSynced === false) {
  //     console.log("Sync data with backend");

  //     dispatch(updateUser(user));
  //   }
  //   // console.log("timestamp", timestamp);
  //   // console.log("lastSync", lastSync);
  //   // console.log("diff in ms", timestamp - lastSync);
  // });

  // console.log("filteredNotes", filteredNotes);
  const count = filteredNotes.length;
  // console.log("count", count);

  return (
    <div className={clipboardBody}>
      {notesCrop.map((item) => (
        <Note
          item={item}
          key={item.id}
          handleFavoriteChangeWithModifiedProp={
            handleFavoriteChangeWithModifiedProp
          }
        />
      ))}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ClipboardBody;
