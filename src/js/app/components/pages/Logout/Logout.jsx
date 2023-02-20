import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./_layout.scss";
import Loader from "../../common/Loader";
import { logOut } from "../../../store/users";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
    history.go();
  }, []);
  return <Loader />;
};

export default Logout;
