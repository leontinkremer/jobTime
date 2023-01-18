import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./_layout.scss";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../common/Loader";

const Logout = () => {
  const history = useHistory();
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
    history.push("/");
    history.go();
  }, []);
  return <Loader />;
};

export default Logout;
