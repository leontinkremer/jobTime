import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { getNotesLoadingStatus, loadNotesList } from "../store/notes";
import { getIsLoggedIn } from "../store/users";

// subtask: working on it

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  // implement getNotesStatusLoading
  const notesStatusLoading = useSelector(getNotesLoadingStatus());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadNotesList());
    }
  }, [isLoggedIn]);
  // if (notesStatusLoading) return <Loader />;
  return children;
};

export default AppLoader;
