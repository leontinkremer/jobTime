import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../../scss/app.scss";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import Navbar from "./components/common/Navbar";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import OnlyPublicRoute from "./components/common/OnlyPublicRoute";
import Logout from "./components/pages/Logout";
import ClipboardPage from "./components/pages/ClipboardPage";
import {
  PATH_CLIPBOARD,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_LOGOUT,
  PATH_SIGNUP,
} from "./utils/paths";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, loadUsersList } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <Switch>
          <ProtectedRoute path={PATH_CLIPBOARD} component={ClipboardPage} />
          <ProtectedRoute path={PATH_DASHBOARD} component={DashboardPage} />
          <OnlyPublicRoute path={PATH_LOGIN} component={LoginPage} />
          <OnlyPublicRoute path={PATH_SIGNUP} component={RegisterPage} />
          <ProtectedRoute path={PATH_LOGOUT} component={Logout} />
          <Route path="/" exact component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
