import React, { useState, useEffect } from "react";
import style from "./_layout.module.scss";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getIsSynced,
  getSyncDataLoaded,
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
import getTimestamp from "../../../utils/date.getTimestamp";

const ClipboardBody = () => {
  const { clipboardBody } = style;
  const timestamp = getTimestamp();
  const user = useSelector(getUsers());
  const [notes, setNotes] = useState(useSelector(getUsersNotes()));
  const dispatch = useDispatch();
  const isSynced = useSelector(getIsSynced());
  const syncDataLoaded = useSelector(getSyncDataLoaded());

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

  // useEffect(() => {
  //   if (!syncDataLoaded) {
  //     window.location.reload(true);
  //   }
  // }, [syncDataLoaded]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(loadUsersList());
  //   }
  // }, [isLoggedIn]);

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

  const handleFavoriteGlobalChange = (note) => {
    console.log("user", user);
    console.log("note", note);

    // console.log("=======");
    const modifiedNote = {
      ...note,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: note.views + 1,
      favorite: note.favorite === false ? true : false,
    };
    console.log("modifiedNote", modifiedNote);

    const newUserNotesArr = [];
    user.notes.map((x) => {
      console.log("x", x);
      if (x.id !== modifiedNote.id) {
        newUserNotesArr.push(x);
      } else {
        newUserNotesArr.push(modifiedNote);
      }
    });
    console.log("newUserNotesArr", newUserNotesArr);

    const newUserObj = {
      ...user,
      notes: newUserNotesArr,
    };

    console.log("newUserObj", newUserObj);

    dispatch(updateUserLocally(newUserObj));
  };

  const handleGlobalHide = (note) => {
    console.log("user", user);
    console.log("note", note);

    // console.log("=======");
    const modifiedNote = {
      ...note,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: note.views + 1,
      archived_at: note.archived_at === 0 ? timestamp : 0,
    };
    console.log("modifiedNote", modifiedNote);

    const newUserNotesArr = [];
    user.notes.map((x) => {
      console.log("x", x);
      if (x.id !== modifiedNote.id) {
        newUserNotesArr.push(x);
      } else {
        newUserNotesArr.push(modifiedNote);
      }
    });
    console.log("newUserNotesArr", newUserNotesArr);

    const newUserObj = {
      ...user,
      notes: newUserNotesArr,
    };

    console.log("newUserObj", newUserObj);

    dispatch(updateUserLocally(newUserObj));
  };

  const handleGlobalRemove = (note) => {
    console.log("user", user);
    console.log("note", note);

    // console.log("=======");
    const modifiedNote = {
      ...note,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: note.views + 1,
      archived_at: note.archived_at === 0 ? timestamp : 0,
    };
    console.log("modifiedNote", modifiedNote);

    const newUserNotesArr = [];
    user.notes.map((x) => {
      console.log("x", x);
      if (x.id !== note.id) {
        newUserNotesArr.push(x);
      }
    });
    console.log("newUserNotesArr", newUserNotesArr);

    const newUserObj = {
      ...user,
      notes: newUserNotesArr,
    };

    console.log("newUserObj", newUserObj);

    dispatch(updateUserLocally(newUserObj));
  };

  const handleGlobalTextChange = (note) => {
    console.log("user", user);
    console.log("note", note);

    // console.log("=======");
    const modifiedNote = {
      ...note,
      last_view_at: timestamp,
      updated_at: timestamp,
      views: note.views + 1,
      heading: note.heading,
      content: note.content,
    };
    console.log("modifiedNote", modifiedNote);

    const newUserNotesArr = [];
    user.notes.map((x) => {
      console.log("x", x);
      if (x.id !== modifiedNote.id) {
        newUserNotesArr.push(x);
      } else {
        newUserNotesArr.push(modifiedNote);
      }
    });
    console.log("newUserNotesArr", newUserNotesArr);

    const newUserObj = {
      ...user,
      notes: newUserNotesArr,
    };

    console.log("newUserObj", newUserObj);

    dispatch(updateUserLocally(newUserObj));
  };

  // console.log("filteredNotes", filteredNotes);
  const count = filteredNotes.length;
  // console.log("count", count);

  return (
    <div className={clipboardBody}>
      {notesCrop.map((item) => (
        <Note
          item={item}
          key={item.id}
          handleFavoriteGlobalChange={handleFavoriteGlobalChange}
          handleGlobalHide={handleGlobalHide}
          handleGlobalRemove={handleGlobalRemove}
          handleGlobalTextChange={handleGlobalTextChange}
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
